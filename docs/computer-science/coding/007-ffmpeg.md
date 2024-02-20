---
title: 使用FFMPEG库连接摄像头
date: 2024-02-20
icon: QSS
cover: "https://images.pexels.com/photos/454880/pexels-photo-454880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
category: 
  - Package
tag:
  - FFMPEG
---

:::tip 简介
使用FFMPEG库连接USB摄像头
:::

## FFMPEG库
FFmpeg 是领先的多媒体框架，能够解码、编码、 转码、复用、解复用、流、过滤和播放几乎所有人类和机器创建的东西。


## 实例
使用ffmpeg库连接USB摄像头，可以正常播放以及保存。
```C++
//CameraManage.h
#pragma once
#include <iostream>
#include <vector>
#include <QImage>
#include <opencv2/opencv.hpp>
#include <thread>
#include <QObject>
#include "QSignalProxy.h"
#include "TS_Queue.h"
extern "C"
{
#include <libavdevice/avdevice.h>
#include <libavcodec/avcodec.h>
#include <libswscale/swscale.h>
#include <libavutil/timestamp.h>
#include <libavutil/time.h>
#include <libavformat/avformat.h>
}

using std::thread;
using std::shared_ptr;

typedef shared_ptr<AVPacket> AVPacket_ptr;
class CameraManage;

class Camera{
public:
    Camera(const std::string& deviceURL, int deviceNo, CameraManage* parent) : deviceURL(deviceURL), deviceNo(deviceNo), _parent(parent) {
    }

    ~Camera()
    {
        Stop();
    }

    void Start()
    {
        Stop();
        _stop = false;
        _playTh = std::jthread(&Camera::Playing, this);
    }

    void Stop()
    {
        _stop = true;
    }

    void saveBegin()
    {
        saveStop();
        _record_pktQueue.ResetQueue();
        _saveStop = false;
        _saveTh = std::jthread(&Camera::Saving, this);
    }

    void saveStop()
    {
        _saveStop = true;
        _record_pktQueue.StopQueue();
        _record_pktQueue.Clear();
    }

    int Playing();

    int Saving();

    std::string getDeviceURL(){
        return deviceURL;
    }

    int getDeviceNo(){
        return deviceNo;
    }

private:
    std::atomic_bool _stop = false;
    std::atomic_bool _saveStop = true;
    std::jthread _playTh;
    std::jthread _saveTh;
    CameraManage* _parent;
    std::string deviceURL;
    int deviceNo;
    AVFormatContext* inputFormatContext;
    AVFormatContext* outputFormatContext;
    AVDictionary* options;
    int videoStreamIndex;
    const AVCodec* codec;
    TS_Queue<AVPacket_ptr> _record_pktQueue;
};


class CameraManage {
public:
    CameraManage();

    ~CameraManage();

    int getDev();

    void openDev();
    void openDev(int devNo);
    void closeDev();
    void closeDev(int devNo);
    void saveBegin();
    void saveStop();
    bool isCameraExist(const std::string& deviceURL);
    std::vector<std::string> deviceURLs;
    QSignalProxy* sig;

private:
    std::vector<Camera*> _cameras;

};
```

```C++
//CameraManage.cpp
#include "CameraManage.h"

QImage YUV422pToQImageRGB32(AVFrame* frame)
{
    AVPixelFormat pixelFormat = static_cast<AVPixelFormat>(frame->format);
    int width = frame->width;
    int height = frame->height;
    QImage image(width, height, QImage::Format_RGB888);
    SwsContext* swsContext = sws_getContext(width, height, static_cast<AVPixelFormat>(frame->format),
                                            width, height, AV_PIX_FMT_RGB24, 0, nullptr, nullptr, nullptr);

    // 分配输出缓冲区
    uint8_t* outputBuffer[1] = { image.bits() };
    int outputLinesize[1] = { static_cast<int>(qint64(image.bytesPerLine())) };

    // 执行颜色转换
    sws_scale(swsContext, frame->data, frame->linesize, 0, height, outputBuffer, outputLinesize);

    // 释放 SwsContext
    sws_freeContext(swsContext);

    return image;
}

CameraManage::CameraManage() {
    avdevice_register_all();
    sig = new QSignalProxy();
}

CameraManage::~CameraManage() {
    closeDev();
}

int CameraManage::getDev() {
    std::cout << std::this_thread::get_id() << std::endl;

    const AVInputFormat* inputFormat = av_find_input_format("dshow");

    AVDeviceInfoList* deviceList = nullptr;

    if (avdevice_list_input_sources(inputFormat, nullptr, nullptr, &deviceList) >= 0) {
        if (deviceList->nb_devices > 0) {
            std::cout << "Available devices:" << std::endl;
            for (int i = 0; i < deviceList->nb_devices; ++i) {
//                std::cout << i << ". " << deviceList->devices[i]->device_name << std::endl;
                // 可以根据需要选择默认设备名称
                if(*deviceList->devices[i]->media_types==AVMEDIA_TYPE_VIDEO){
                    std::cout << i << ". " << deviceList->devices[i]->device_name << std::endl;
                    std::string deviceURL =std::string(deviceList->devices[i]->device_name);
                    deviceURLs.push_back(deviceURL);
                }
            }
        }
        avdevice_free_list_devices(&deviceList);
    }

    return deviceURLs.size();
}

void CameraManage::openDev() {
    for(int i = 0; i < deviceURLs.size(); i++){
        if (!isCameraExist(deviceURLs[i])){
            Camera* ca = new Camera(deviceURLs[i],i,this);
            ca->Start();
            _cameras.push_back(ca);
        }
    }
}

void CameraManage::openDev(int devNo) {
    if (devNo < deviceURLs.size() && !isCameraExist(deviceURLs[devNo])){
        Camera* ca = new Camera(deviceURLs[devNo],devNo,this);
        ca->Start();
        _cameras.push_back(ca);
    }
}

void CameraManage::closeDev() {
    for (auto& ca : _cameras) {
        ca->Stop();
        delete ca;
    }
    _cameras.clear();
}

void CameraManage::closeDev(int devNo) {
    for (auto it = _cameras.begin(); it != _cameras.end(); ++it) {
        if ((*it)->getDeviceNo() == devNo) {  // 假设 Camera 类有一个名为 getDeviceNo() 的公有成员函数来获取设备编号
            (*it)->Stop();
            delete *it;
            _cameras.erase(it);
            break;
        }
    }
}

void CameraManage::saveBegin() {
    for (auto& ca : _cameras){
        ca->saveBegin();
    }
}

void CameraManage::saveStop() {
    for (auto& ca : _cameras){
        ca->saveStop();
    }
}

bool CameraManage::isCameraExist(const std::string& deviceURL) {
    for (Camera* ca : _cameras) {
        if (ca->getDeviceURL() == deviceURL) {
            return true;
        }
    }
    return false;
}

int Camera::Playing() {
    std::cout << std::this_thread::get_id() << std::endl;
    inputFormatContext = avformat_alloc_context();
    options = nullptr;
    const AVInputFormat* inputFormat = av_find_input_format("dshow");
    av_dict_set(&options, "input_format", "mjpeg", 0);
    av_dict_set(&options, "framerate", "30", 0);
    std::string deviceName = "video=" + deviceURL;
    //打开输入流
    int ret = avformat_open_input(&inputFormatContext , deviceName.c_str(), inputFormat, &options);
    if (ret != 0) {
        char errbuf[AV_ERROR_MAX_STRING_SIZE];
        av_strerror(ret, errbuf, sizeof(errbuf));
        std::cerr << "Failed to open device: " << errbuf << std::endl;
        return -1;
    }

    if (avformat_find_stream_info(inputFormatContext , &options) < 0) {
        fprintf(stderr, "无法获取流信息\n");
        return -1;
    }
    videoStreamIndex = -1;
    for (unsigned int i = 0; i < inputFormatContext ->nb_streams; i++) {
        if (inputFormatContext ->streams[i]->codecpar->codec_type == AVMEDIA_TYPE_VIDEO) {
            videoStreamIndex = i;
            break;
        }
    }
    if (videoStreamIndex == -1) {
        fprintf(stderr, "无法找到视频流\n");
        return -1;
    }

    //查找解码器
    const AVCodecParameters* codecParams = inputFormatContext ->streams[videoStreamIndex]->codecpar;
    codec = avcodec_find_decoder(codecParams->codec_id);
    if (!codec) {
        fprintf(stderr, "找不到解码器\n");
        return -1;
    }
    // 打开解码器
    AVCodecContext* codecContext = avcodec_alloc_context3(codec);
    if (!codecContext) {
        fprintf(stderr, "无法分配解码器上下文\n");
        return -1;
    }
    if (avcodec_parameters_to_context(codecContext, codecParams) < 0) {
        fprintf(stderr, "无法复制解码器参数到上下文\n");
        return -1;
    }
    if (avcodec_open2(codecContext, codec, NULL) < 0) {
        fprintf(stderr, "无法打开解码器\n");
        return -1;
    }

    AVFrame* frame = av_frame_alloc();
    while (!_stop)
    {
        //声明智能指针，可以自定义指针的析构方法
        AVPacket_ptr packet(new AVPacket, [](AVPacket* p)
        {
            //av_packet_unref(p);
        });

        if (av_read_frame(inputFormatContext , packet.get()) < 0)
            break;
        if (packet->stream_index == videoStreamIndex) {
            if(true){
                _record_pktQueue.emplace(packet);
            }
            avcodec_send_packet(codecContext, packet.get());
            avcodec_receive_frame(codecContext, frame);
            //将frame转为QImage发送给Qt界面进行显示
            QImage image = YUV422pToQImageRGB32(frame);
            _parent->sig->sendQImage(image, deviceNo);
        }
    }
    avformat_close_input(&inputFormatContext );
    avformat_free_context(inputFormatContext );
    av_dict_free(&options);
}

int Camera::Saving() {
    std::cout << std::this_thread::get_id() << std::endl;
    outputFormatContext = avformat_alloc_context();
    std::string output_filename = "output_" + std::to_string(deviceNo) + ".avi";  // .avi文件才可以正常播放，.mjpeg和.mp4格式无法播放
    // 打开输出文件
    if (avformat_alloc_output_context2(&outputFormatContext, nullptr, nullptr, output_filename.c_str()) < 0) {
        // 错误处理
        return -1;
    }

    // 创建输出流
    AVStream* outputStream = avformat_new_stream(outputFormatContext, codec);
    if (!outputStream) {
        // 错误处理
        return -1;
    }
    outputStream->time_base = AVRational{1, 30};
    // 复制输入流的编码参数到输出流
    if (avcodec_parameters_copy(outputStream->codecpar,inputFormatContext->streams[videoStreamIndex]->codecpar)< 0) {
        fprintf(stderr, "Error copying codec parameters\n");
        return -1;
    }
    // 打开输出流
    if (avio_open(&outputFormatContext->pb, output_filename.c_str(), AVIO_FLAG_WRITE) < 0) {
        // 错误处理
        return -1;
    }
    // 写入文件头
    if (avformat_write_header(outputFormatContext, nullptr) < 0) {
        // 错误处理
        return -1;
    }
    int64_t lastDts = 0;
    while (!_saveStop) {
        AVPacket_ptr pkt_ptr;
        bool stat = _record_pktQueue.pop(pkt_ptr);
        if(stat)
        {
            if (pkt_ptr->stream_index == videoStreamIndex) {
                //packet.dts = packet.pts = AV_NOPTS_VALUE;
                pkt_ptr->dts = pkt_ptr->pts = lastDts;
                lastDts = pkt_ptr->dts + pkt_ptr->duration;
                // 转换时间戳为输出流的时间基准
                av_packet_rescale_ts(pkt_ptr.get(), inputFormatContext->streams[videoStreamIndex]->time_base,
                                     outputFormatContext->streams[videoStreamIndex]->time_base);
                if (av_interleaved_write_frame(outputFormatContext, pkt_ptr.get()) < 0) {
                    fprintf(stderr, "Error writing video frame\n");
                    return -1;
                }
            }
        }
    }
    // 写入文件尾
    av_write_trailer(outputFormatContext);
    avio_close(outputFormatContext->pb);
    avformat_free_context(outputFormatContext);
    return 0;
}
```

::: details 参考链接：  
1. [FFmpeg 中文网](https://ffmpeg.p2hp.com/)
:::
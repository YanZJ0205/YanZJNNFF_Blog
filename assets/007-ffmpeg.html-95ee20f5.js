import{_ as l}from"./plugin-vue_export-helper-c27b6911.js";import{g as s,o as a,c as v,a as e,b as n,f as d,h as t}from"./app-efa7d7ff.js";const r={},c=t(`<div class="hint-container tip"><p class="hint-container-title">简介</p><p>使用FFMPEG库连接USB摄像头</p></div><h2 id="ffmpeg库" tabindex="-1"><a class="header-anchor" href="#ffmpeg库" aria-hidden="true">#</a> FFMPEG库</h2><p>FFmpeg 是领先的多媒体框架，能够解码、编码、 转码、复用、解复用、流、过滤和播放几乎所有人类和机器创建的东西。</p><h3 id="常用音视频术语和概念" tabindex="-1"><a class="header-anchor" href="#常用音视频术语和概念" aria-hidden="true">#</a> 常用音视频术语和概念</h3><ul><li>容器/文件(Conainer/File)：指特定格式的多媒体文件，比如mp4、flv、mov等视频格式；</li><li>媒体流(Stream)：一个容器（如mp4文件）中可存在多个流，可以是视频流、音频流、字幕流。</li><li>数据帧/数据包（Frame/Packet）：一个流媒体是由大量的数据帧构成的。</li><li>编码器/解码器：编解码器是以帧为单位进行压缩数据和复原数据的，对原始数据和压缩的数据进行转换。</li></ul><h3 id="ffmpeg常用库" tabindex="-1"><a class="header-anchor" href="#ffmpeg常用库" aria-hidden="true">#</a> FFMPEG常用库</h3><ul><li>libavutil<br> 核心工具库，例如log模块。在ffmpeg中很多功能模块都会依赖avutil库作一些基本的音视频操作。</li><li><strong>libavformat</strong><br> 文件格式和协议库，该模块是最重要的模块之一，封装了Protocol层和Demuxer、Muxer层。</li><li><strong>libavcodec</strong><br> 编解码库，封装了一些基本的Codec层。但是一些Codec是具备自己的License的，所以ffmpeg是没有默认把这类的库添加进来的，例如：libx264,FDK-AAC等库。ffmpeg就像一个平台一样，可以将第三方的Codec以插件的方式添加进来，然后为开发者提供统一的接口，进行使用。</li><li><strong>libswresample</strong><br> 该模块用于音频重采样，可以对数字音频进行声道数、数据格式、采样率等多种基本信息进行转换。例如：把一段音频的声道由双声道转换成单声道的数据，就可以通过该库进行操作。</li><li><strong>libswscale</strong><br> 该模块提供了将图像进行格式信息转换的模块。例如：可以将YUV数据转换成RGB数据，可以将1280720的尺寸的数据缩放尺寸至800480的数据。</li><li>libavfilter<br> 音视频滤镜库，该库提供了音频和视频特效的处理功能。</li></ul><h3 id="ffmpeg常用函数" tabindex="-1"><a class="header-anchor" href="#ffmpeg常用函数" aria-hidden="true">#</a> FFMPEG常用函数</h3><h4 id="初始化" tabindex="-1"><a class="header-anchor" href="#初始化" aria-hidden="true">#</a> 初始化</h4><ul><li><code>avdevice_register_all()</code>：对设备进行注册；</li><li><code>avformat_network_init()</code>：初始化网络库以及网络加密协议相关的库。</li></ul><h4 id="封装相关函数" tabindex="-1"><a class="header-anchor" href="#封装相关函数" aria-hidden="true">#</a> 封装相关函数</h4><ul><li><code>avformat_alloc_context()</code>：负责申请一个AVFormatContext上下文结构体的内存，并进行简单的初始化，以提供给其他函数使用；</li><li><code>avformat_free_context()</code>：释放不使用的AVFormatContext；</li><li><code>avformat_close_input()</code>：关闭解复用器。</li><li><code>avformat_free_context()</code>：进行释放；</li><li><code>avformat_open_input()</code>：打开输入视频文件；</li><li><code>avformat_find_stream_info()</code>：获取视频文件信息；</li><li><code>av_read_frame()</code>：读取音视频包；</li><li><code>avformat_seek_file()</code>：根据时间戳定位文件的位置；</li><li><code>av_seek_frame()</code>：根据流的大小定位文件的位置；</li></ul><p>封装格式步骤：</p><ol><li>分配解复用器上下文（avformat_alloc_context()）；</li><li>根据url打开本地文件或网络流（avformat_open_input()）；</li><li>读取媒体的数据包，查找流信息（avformat_find_stream_info()）；</li><li>遍历数据 <ul><li>从文件中读取数据包（av_read_frame()）；</li><li>或者 定位文件位置进行遍历（avformat_seek_file()、av_seek_frame()）；</li></ul></li><li>关闭解复用器（avformat_close_input()）或释放不使用的资源；</li></ol><h4 id="解码相关函数" tabindex="-1"><a class="header-anchor" href="#解码相关函数" aria-hidden="true">#</a> 解码相关函数</h4><ul><li><code>avcodec_alloc_context3()</code>：分配解码器上下文；</li><li><code>avcodec_find_decoder()</code>：根据ID查找解码器；</li><li><code>avcodec_find_decoder_by_name()</code>：根据解码器名字查找解码器；</li><li><code>avcodec_open2()</code>：打开编解码器；</li><li><code>avcodec_send_packet()</code>：发送编码数据包；</li><li><code>avcodec_receive_frame()</code>：接受解码后的数据；</li><li><code>avcodec_free_context()</code>：释放解码器上下文，此函数包含了avcodec_close()；</li><li><code>avcodec_close()</code>：关闭解码器；</li></ul><h4 id="常用数据结构" tabindex="-1"><a class="header-anchor" href="#常用数据结构" aria-hidden="true">#</a> 常用数据结构</h4><ul><li><code>AVFormatContext</code>：封装格式上喜爱文结构体，统领全局的结构体，保存了视频文件封装格式等相关信息；</li><li><code>AVInputFormat</code>：输入的format；封装格式（例如：FLV、MP4），每个封装格式都对应一个该结构体；</li><li><code>AVOutputFormat</code>：输出的format，例如：输出到网络流，输出到文件等；</li><li><code>AVStream</code>：一个视频容器（即文件）中存在多路流数据，每路流都对应一个该结构体，例如：视频流、音频流、字幕流等；</li><li><code>AVCodecContext</code>：编解码器上下文结构体，保存了音视频编解码相关的信息；</li><li><code>AVCodec</code>：每一种音视频编解码器（例如：H.264解码器）都对应一个该结构体；</li><li><code>AVPacket</code>：存储一帧压缩编码数据；</li><li><code>AVFrame</code>：存储一帧解码后的数据（可以是视频解码后的像素数据，也可以是音频采样后的数据）；</li></ul><h2 id="实例" tabindex="-1"><a class="header-anchor" href="#实例" aria-hidden="true">#</a> 实例</h2><p>使用ffmpeg库连接USB摄像头，可以正常播放以及保存。</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>//CameraManage.h
#pragma once
#include &lt;iostream&gt;
#include &lt;vector&gt;
#include &lt;QImage&gt;
#include &lt;opencv2/opencv.hpp&gt;
#include &lt;thread&gt;
#include &lt;QObject&gt;
#include &quot;QSignalProxy.h&quot;
#include &quot;TS_Queue.h&quot;
extern &quot;C&quot;
{
#include &lt;libavdevice/avdevice.h&gt;
#include &lt;libavcodec/avcodec.h&gt;
#include &lt;libswscale/swscale.h&gt;
#include &lt;libavutil/timestamp.h&gt;
#include &lt;libavutil/time.h&gt;
#include &lt;libavformat/avformat.h&gt;
}

using std::thread;
using std::shared_ptr;

typedef shared_ptr&lt;AVPacket&gt; AVPacket_ptr;
class CameraManage;

class Camera{
public:
    Camera(const std::string&amp; deviceURL, int deviceNo, CameraManage* parent) : deviceURL(deviceURL), deviceNo(deviceNo), _parent(parent) {
    }

    ~Camera()
    {
        Stop();
    }

    void Start()
    {
        Stop();
        _stop = false;
        _playTh = std::jthread(&amp;Camera::Playing, this);
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
        _saveTh = std::jthread(&amp;Camera::Saving, this);
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
    TS_Queue&lt;AVPacket_ptr&gt; _record_pktQueue;
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
    bool isCameraExist(const std::string&amp; deviceURL);
    std::vector&lt;std::string&gt; deviceURLs;
    QSignalProxy* sig;

private:
    std::vector&lt;Camera*&gt; _cameras;

};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>//CameraManage.cpp
#include &quot;CameraManage.h&quot;

QImage YUV422pToQImageRGB32(AVFrame* frame)
{
    AVPixelFormat pixelFormat = static_cast&lt;AVPixelFormat&gt;(frame-&gt;format);
    int width = frame-&gt;width;
    int height = frame-&gt;height;
    QImage image(width, height, QImage::Format_RGB888);
    SwsContext* swsContext = sws_getContext(width, height, static_cast&lt;AVPixelFormat&gt;(frame-&gt;format),
                                            width, height, AV_PIX_FMT_RGB24, 0, nullptr, nullptr, nullptr);

    // 分配输出缓冲区
    uint8_t* outputBuffer[1] = { image.bits() };
    int outputLinesize[1] = { static_cast&lt;int&gt;(qint64(image.bytesPerLine())) };

    // 执行颜色转换
    sws_scale(swsContext, frame-&gt;data, frame-&gt;linesize, 0, height, outputBuffer, outputLinesize);

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
    std::cout &lt;&lt; std::this_thread::get_id() &lt;&lt; std::endl;

    const AVInputFormat* inputFormat = av_find_input_format(&quot;dshow&quot;);

    AVDeviceInfoList* deviceList = nullptr;

    if (avdevice_list_input_sources(inputFormat, nullptr, nullptr, &amp;deviceList) &gt;= 0) {
        if (deviceList-&gt;nb_devices &gt; 0) {
            std::cout &lt;&lt; &quot;Available devices:&quot; &lt;&lt; std::endl;
            for (int i = 0; i &lt; deviceList-&gt;nb_devices; ++i) {
//                std::cout &lt;&lt; i &lt;&lt; &quot;. &quot; &lt;&lt; deviceList-&gt;devices[i]-&gt;device_name &lt;&lt; std::endl;
                // 可以根据需要选择默认设备名称
                if(*deviceList-&gt;devices[i]-&gt;media_types==AVMEDIA_TYPE_VIDEO){
                    std::cout &lt;&lt; i &lt;&lt; &quot;. &quot; &lt;&lt; deviceList-&gt;devices[i]-&gt;device_name &lt;&lt; std::endl;
                    std::string deviceURL =std::string(deviceList-&gt;devices[i]-&gt;device_name);
                    deviceURLs.push_back(deviceURL);
                }
            }
        }
        avdevice_free_list_devices(&amp;deviceList);
    }

    return deviceURLs.size();
}

void CameraManage::openDev() {
    for(int i = 0; i &lt; deviceURLs.size(); i++){
        if (!isCameraExist(deviceURLs[i])){
            Camera* ca = new Camera(deviceURLs[i],i,this);
            ca-&gt;Start();
            _cameras.push_back(ca);
        }
    }
}

void CameraManage::openDev(int devNo) {
    if (devNo &lt; deviceURLs.size() &amp;&amp; !isCameraExist(deviceURLs[devNo])){
        Camera* ca = new Camera(deviceURLs[devNo],devNo,this);
        ca-&gt;Start();
        _cameras.push_back(ca);
    }
}

void CameraManage::closeDev() {
    for (auto&amp; ca : _cameras) {
        ca-&gt;Stop();
        delete ca;
    }
    _cameras.clear();
}

void CameraManage::closeDev(int devNo) {
    for (auto it = _cameras.begin(); it != _cameras.end(); ++it) {
        if ((*it)-&gt;getDeviceNo() == devNo) {  // 假设 Camera 类有一个名为 getDeviceNo() 的公有成员函数来获取设备编号
            (*it)-&gt;Stop();
            delete *it;
            _cameras.erase(it);
            break;
        }
    }
}

void CameraManage::saveBegin() {
    for (auto&amp; ca : _cameras){
        ca-&gt;saveBegin();
    }
}

void CameraManage::saveStop() {
    for (auto&amp; ca : _cameras){
        ca-&gt;saveStop();
    }
}

bool CameraManage::isCameraExist(const std::string&amp; deviceURL) {
    for (Camera* ca : _cameras) {
        if (ca-&gt;getDeviceURL() == deviceURL) {
            return true;
        }
    }
    return false;
}

int Camera::Playing() {
    std::cout &lt;&lt; std::this_thread::get_id() &lt;&lt; std::endl;
    inputFormatContext = avformat_alloc_context();
    options = nullptr;
    const AVInputFormat* inputFormat = av_find_input_format(&quot;dshow&quot;);
    av_dict_set(&amp;options, &quot;input_format&quot;, &quot;mjpeg&quot;, 0);
    av_dict_set(&amp;options, &quot;framerate&quot;, &quot;30&quot;, 0);
    std::string deviceName = &quot;video=&quot; + deviceURL;
    //打开输入流
    int ret = avformat_open_input(&amp;inputFormatContext , deviceName.c_str(), inputFormat, &amp;options);
    if (ret != 0) {
        char errbuf[AV_ERROR_MAX_STRING_SIZE];
        av_strerror(ret, errbuf, sizeof(errbuf));
        std::cerr &lt;&lt; &quot;Failed to open device: &quot; &lt;&lt; errbuf &lt;&lt; std::endl;
        return -1;
    }

    if (avformat_find_stream_info(inputFormatContext , &amp;options) &lt; 0) {
        fprintf(stderr, &quot;无法获取流信息\\n&quot;);
        return -1;
    }
    videoStreamIndex = -1;
    for (unsigned int i = 0; i &lt; inputFormatContext -&gt;nb_streams; i++) {
        if (inputFormatContext -&gt;streams[i]-&gt;codecpar-&gt;codec_type == AVMEDIA_TYPE_VIDEO) {
            videoStreamIndex = i;
            break;
        }
    }
    if (videoStreamIndex == -1) {
        fprintf(stderr, &quot;无法找到视频流\\n&quot;);
        return -1;
    }

    //查找解码器
    const AVCodecParameters* codecParams = inputFormatContext -&gt;streams[videoStreamIndex]-&gt;codecpar;
    codec = avcodec_find_decoder(codecParams-&gt;codec_id);
    if (!codec) {
        fprintf(stderr, &quot;找不到解码器\\n&quot;);
        return -1;
    }
    // 打开解码器
    AVCodecContext* codecContext = avcodec_alloc_context3(codec);
    if (!codecContext) {
        fprintf(stderr, &quot;无法分配解码器上下文\\n&quot;);
        return -1;
    }
    if (avcodec_parameters_to_context(codecContext, codecParams) &lt; 0) {
        fprintf(stderr, &quot;无法复制解码器参数到上下文\\n&quot;);
        return -1;
    }
    if (avcodec_open2(codecContext, codec, NULL) &lt; 0) {
        fprintf(stderr, &quot;无法打开解码器\\n&quot;);
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

        if (av_read_frame(inputFormatContext , packet.get()) &lt; 0)
            break;
        if (packet-&gt;stream_index == videoStreamIndex) {
            if(true){
                _record_pktQueue.emplace(packet);
            }
            avcodec_send_packet(codecContext, packet.get());
            avcodec_receive_frame(codecContext, frame);
            //将frame转为QImage发送给Qt界面进行显示
            QImage image = YUV422pToQImageRGB32(frame);
            _parent-&gt;sig-&gt;sendQImage(image, deviceNo);
        }
    }
    avformat_close_input(&amp;inputFormatContext );
    avformat_free_context(inputFormatContext );
    av_dict_free(&amp;options);
}

int Camera::Saving() {
    std::cout &lt;&lt; std::this_thread::get_id() &lt;&lt; std::endl;
    outputFormatContext = avformat_alloc_context();
    std::string output_filename = &quot;output_&quot; + std::to_string(deviceNo) + &quot;.avi&quot;;  // .avi文件才可以正常播放，.mjpeg和.mp4格式无法播放
    // 打开输出文件
    if (avformat_alloc_output_context2(&amp;outputFormatContext, nullptr, nullptr, output_filename.c_str()) &lt; 0) {
        // 错误处理
        return -1;
    }

    // 创建输出流
    AVStream* outputStream = avformat_new_stream(outputFormatContext, codec);
    if (!outputStream) {
        // 错误处理
        return -1;
    }
    outputStream-&gt;time_base = AVRational{1, 30};
    // 复制输入流的编码参数到输出流
    if (avcodec_parameters_copy(outputStream-&gt;codecpar,inputFormatContext-&gt;streams[videoStreamIndex]-&gt;codecpar)&lt; 0) {
        fprintf(stderr, &quot;Error copying codec parameters\\n&quot;);
        return -1;
    }
    // 打开输出流
    if (avio_open(&amp;outputFormatContext-&gt;pb, output_filename.c_str(), AVIO_FLAG_WRITE) &lt; 0) {
        // 错误处理
        return -1;
    }
    // 写入文件头
    if (avformat_write_header(outputFormatContext, nullptr) &lt; 0) {
        // 错误处理
        return -1;
    }
    int64_t lastDts = 0;
    while (!_saveStop) {
        AVPacket_ptr pkt_ptr;
        bool stat = _record_pktQueue.pop(pkt_ptr);
        if(stat)
        {
            if (pkt_ptr-&gt;stream_index == videoStreamIndex) {
                //packet.dts = packet.pts = AV_NOPTS_VALUE;
                pkt_ptr-&gt;dts = pkt_ptr-&gt;pts = lastDts;
                lastDts = pkt_ptr-&gt;dts + pkt_ptr-&gt;duration;
                // 转换时间戳为输出流的时间基准
                av_packet_rescale_ts(pkt_ptr.get(), inputFormatContext-&gt;streams[videoStreamIndex]-&gt;time_base,
                                     outputFormatContext-&gt;streams[videoStreamIndex]-&gt;time_base);
                if (av_interleaved_write_frame(outputFormatContext, pkt_ptr.get()) &lt; 0) {
                    fprintf(stderr, &quot;Error writing video frame\\n&quot;);
                    return -1;
                }
            }
        }
    }
    // 写入文件尾
    av_write_trailer(outputFormatContext);
    avio_close(outputFormatContext-&gt;pb);
    avformat_free_context(outputFormatContext);
    return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,22),m={class:"hint-container details"},u=e("summary",null,"参考链接：",-1),o={href:"https://ffmpeg.p2hp.com/",target:"_blank",rel:"noopener noreferrer"},b={href:"https://blog.csdn.net/qq_17623363/article/details/122146742",target:"_blank",rel:"noopener noreferrer"};function _(p,g){const i=s("ExternalLinkIcon");return a(),v("div",null,[c,e("details",m,[u,e("ol",null,[e("li",null,[e("a",o,[n("FFmpeg 中文网"),d(i)])]),e("li",null,[e("a",b,[n("ffmpeg常用库、术语、API、数据结构总结"),d(i)])])])])])}const C=l(r,[["render",_],["__file","007-ffmpeg.html.vue"]]);export{C as default};

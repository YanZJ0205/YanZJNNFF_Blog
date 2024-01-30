---
title: QCamera Class
date: 2024-01-30
icon: QSS
cover: "https://images.pexels.com/photos/735987/pexels-photo-735987.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
category: 
  - Qt
tag:
  - qt6.6
  - qt class
---

:::tip 简介
`QCamera`类从`Qt5`到`Qt6`有较大的改变，`Qt5`中使用的`QCameraViewfinder`和`QCameraImageCapture`在`Qt6`中都不再使用，取而代之的是多媒体管理中心类`QMediaCaptureSession`。
:::

## 连接视频
1. 查找设备
可以使用`QCameraDevice`来得到可以使用的摄像头设备列表
```
const QList<QCameraDevice> cameras = QMediaDevices::videoInputs();
```

::: details 参考链接：  
1. [QCamera Class](https://doc.qt.io/qt-6/qcamera.html)
2. [Camera Example](https://doc.qt.io/qt-6/qtmultimedia-camera-example.html)
3. [QMediaCaptureSession Class](https://doc.qt.io/qt-6/qmediacapturesession.html)
4. [Qt6与输入输出设备](https://blog.csdn.net/u011442415/article/details/129370856)
:::
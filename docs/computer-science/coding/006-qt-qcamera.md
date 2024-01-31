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
需要包含以下头文件
```
#include <QCamera>
#include <QCameraDevice>
#include <QMediaDevices>
#include <QMediaCaptureSession>
#include <QVideoSink>
```

需要包含以下声明
```
QVideoSink videoSink;
QScopedPointer<QCamera> m_camera;
QMediaCaptureSession m_captureSession;
```

具体实现
```
const QList<QCameraDevice> cameras = QMediaDevices::videoInputs();  //获取设备列表
m_camera.reset(new QCamera(cameras[0]));
m_captureSession.setCamera(m_camera.data());
m_captureSession.setVideoSink(&videoSink);

QObject::connect(&camera->videoSink, &QVideoSink::videoFrameChanged, this, [&](const QVideoFrame &frame){
  //处理frame
  QPixmap pixmap = QPixmap::fromImage(preview);
  captureImageLabel.setPixmap(pixmap);  //captureImageLabel是一个QLabel对象，这里可以采用其他方法显示在界面上
}
```

遇到的问题
1. 槽函数现在是在主线程中调用的，怎么可以把VideoSink信号的触发以及对应的槽函数写到子线程中，再往主线程发最终用来显示的图片，提高程序的运行效率

#### QImage和QPixmap的区别与转换

`QImage`是为了修改图片的效果而设计的，`QPixmap`是专门为了绘图产生的，`QImage`偏向处理，`QPixmap`偏向绘制，如果一张图片不用进行处理，直接显示建议选用`QPixmap`，如果需要对图片进行处理再显示，选用`QImage`。

```
//QPixmap->QImage
QImage image = pixmap.toImage();

//QImage->QPixmap
QPixmap pixmap = QPixmap::fromImage(image);
```

#### QScopedPointer Qt智能指针

`QScopedPointer`和C++中的智能指针`std::unique_ptr`其概念是一样的，它包装了`new`操作符在堆上分配的动态对象，能够保证动态创建的对象在任何时候都可以被正确地删除。但它有更严格的所有权，并且不能转让，一旦获取了对象的管理权，你就无法再从它那里取回来。也就是说，只要出了作用域，指针就会被自动删除。

使用`QScopedPointer`智能指针动态创建的对象，一旦出了作用域就会 被自动释放并置空，那么如果需要函数返回值怎么办呢？

```
QLabel * createLabel()
{
    QScopedPointer<QLabel> pLabel(new QLabel());
    //return pLabel.data();  //invalid
    return  pLabel.take(); //valid
}

int main(int argc, char *argv[])
{
    QApplication a(argc, argv);
    QScopedPointer<QLabel> p1(createLabel());
    p1->setText("hello");
    p1->show();
    return a.exec();
}
```

注意，我们在`createLabel()`函数中创建`label`对象并返回时，不能使用`data()`，而要使用`take()`;

因为 `T *QScopedPointer::data() const`返回指向对象的常量指针，`QScopedPointer`仍拥有对象所有权。 所以通过`data()`返回过后就被自动删除了，从而导致`mian`函数中的`p1`变成了野指针，程序崩溃。

而使用`T *QScopedPointer::take()`也是返回对象指针，但`QScopedPointer`不再拥有对象所有权，而是转移到调用这个函数的caller，同时`QScopePointer`对象指针置为`NULL`。

#### connect函数线程通信思考

Qt中`connect`函数原型如下，第五个参数`Qt::ConnectionType`根据接收者和发送者是否在同一个线程而不同

```
QObject::connect(const QObject *sender, const char *signal, const QObject *receiver, const char *method, Qt::ConnectionType type = Qt::AutoConnection)
```

`Qt::ConnectionType`的取值有五种：
- `Qt::AutoConnection`
默认值，使用此值，连接类型会在信号发射时决定。如果接收者和发送者在同一个线程，则自动使用`Qt::DirectConnection`类型，如果接收者和发送者不在同一个线程，则自动使用`Qt::QueuedConnection`类型。
- `Qt::DirectConnection`
槽函数运行于信号发送者所在的线程，效果上就像是直接在信号发送的位置调用了槽函数。多线程下比较危险，可能会造成崩溃。
- `Qt::QueuedConnection`
槽函数在控制回到接收者所在线程的事件循环时被调用，槽函数运行于信号接收者所在线程。发送信号后，槽函数不会立即被调用，等到接收者当前函数执行完，进入事件循环之后，槽函数才会被调用。多线程下用这个类型。
- `Qt::BlockingQueuedConnection`
槽函数的调用时机与Qt::QueuedConnection 一致，不过在发送完信号后，发送者所在线程会阻塞，直到槽函数运行完。接收者和发送者绝对不能在一个线程，否则会死锁。在多线程间需要同步的场合会用到这个。
- `Qt::UniqueConnection`
此类型可通过 “|”  与以上四个结合在一起使用。此类型为当某个信号和槽已经连接时，在进行重复连接时就会失败，可避免重复连接。如果重复连接，槽函数会重复执行。

::: details 参考链接：  
1. [QCamera Class](https://doc.qt.io/qt-6/qcamera.html)
2. [Camera Example](https://doc.qt.io/qt-6/qtmultimedia-camera-example.html)
3. [QMediaCaptureSession Class](https://doc.qt.io/qt-6/qmediacapturesession.html)
4. [Qt6与输入输出设备](https://blog.csdn.net/u011442415/article/details/129370856)
:::
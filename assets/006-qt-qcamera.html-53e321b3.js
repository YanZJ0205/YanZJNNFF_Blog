import{_ as d}from"./plugin-vue_export-helper-c27b6911.js";import{g as c,o as t,c as o,a as e,b as n,f as a,h as r}from"./app-42b9414f.js";const l={},s=r(`<div class="hint-container tip"><p class="hint-container-title">简介</p><p><code>QCamera</code>类从<code>Qt5</code>到<code>Qt6</code>有较大的改变，<code>Qt5</code>中使用的<code>QCameraViewfinder</code>和<code>QCameraImageCapture</code>在<code>Qt6</code>中都不再使用，取而代之的是多媒体管理中心类<code>QMediaCaptureSession</code>。</p></div><h2 id="连接视频" tabindex="-1"><a class="header-anchor" href="#连接视频" aria-hidden="true">#</a> 连接视频</h2><p>需要包含以下头文件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#include &lt;QCamera&gt;
#include &lt;QCameraDevice&gt;
#include &lt;QMediaDevices&gt;
#include &lt;QMediaCaptureSession&gt;
#include &lt;QVideoSink&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>需要包含以下声明</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>QVideoSink videoSink;
QScopedPointer&lt;QCamera&gt; m_camera;
QMediaCaptureSession m_captureSession;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>具体实现</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const QList&lt;QCameraDevice&gt; cameras = QMediaDevices::videoInputs();  //获取设备列表
m_camera.reset(new QCamera(cameras[0]));
m_captureSession.setCamera(m_camera.data());
m_captureSession.setVideoSink(&amp;videoSink);

QObject::connect(&amp;camera-&gt;videoSink, &amp;QVideoSink::videoFrameChanged, this, [&amp;](const QVideoFrame &amp;frame){
  //处理frame
  QPixmap pixmap = QPixmap::fromImage(preview);
  captureImageLabel.setPixmap(pixmap);  //captureImageLabel是一个QLabel对象，这里可以采用其他方法显示在界面上
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>遇到的问题</p><ol><li>槽函数现在是在主线程中调用的，怎么可以把VideoSink信号的触发以及对应的槽函数写到子线程中，再往主线程发最终用来显示的图片，提高程序的运行效率</li></ol><h4 id="qimage和qpixmap的区别与转换" tabindex="-1"><a class="header-anchor" href="#qimage和qpixmap的区别与转换" aria-hidden="true">#</a> QImage和QPixmap的区别与转换</h4><p><code>QImage</code>是为了修改图片的效果而设计的，<code>QPixmap</code>是专门为了绘图产生的，<code>QImage</code>偏向处理，<code>QPixmap</code>偏向绘制，如果一张图片不用进行处理，直接显示建议选用<code>QPixmap</code>，如果需要对图片进行处理再显示，选用<code>QImage</code>。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>//QPixmap-&gt;QImage
QImage image = pixmap.toImage();

//QImage-&gt;QPixmap
QPixmap pixmap = QPixmap::fromImage(image);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="qscopedpointer-qt智能指针" tabindex="-1"><a class="header-anchor" href="#qscopedpointer-qt智能指针" aria-hidden="true">#</a> QScopedPointer Qt智能指针</h4><p><code>QScopedPointer</code>和C++中的智能指针<code>std::unique_ptr</code>其概念是一样的，它包装了<code>new</code>操作符在堆上分配的动态对象，能够保证动态创建的对象在任何时候都可以被正确地删除。但它有更严格的所有权，并且不能转让，一旦获取了对象的管理权，你就无法再从它那里取回来。也就是说，只要出了作用域，指针就会被自动删除。</p><p>使用<code>QScopedPointer</code>智能指针动态创建的对象，一旦出了作用域就会 被自动释放并置空，那么如果需要函数返回值怎么办呢？</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>QLabel * createLabel()
{
    QScopedPointer&lt;QLabel&gt; pLabel(new QLabel());
    //return pLabel.data();  //invalid
    return  pLabel.take(); //valid
}

int main(int argc, char *argv[])
{
    QApplication a(argc, argv);
    QScopedPointer&lt;QLabel&gt; p1(createLabel());
    p1-&gt;setText(&quot;hello&quot;);
    p1-&gt;show();
    return a.exec();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，我们在<code>createLabel()</code>函数中创建<code>label</code>对象并返回时，不能使用<code>data()</code>，而要使用<code>take()</code>;</p><p>因为 <code>T *QScopedPointer::data() const</code>返回指向对象的常量指针，<code>QScopedPointer</code>仍拥有对象所有权。 所以通过<code>data()</code>返回过后就被自动删除了，从而导致<code>mian</code>函数中的<code>p1</code>变成了野指针，程序崩溃。</p><p>而使用<code>T *QScopedPointer::take()</code>也是返回对象指针，但<code>QScopedPointer</code>不再拥有对象所有权，而是转移到调用这个函数的caller，同时<code>QScopePointer</code>对象指针置为<code>NULL</code>。</p><h4 id="connect函数线程通信思考" tabindex="-1"><a class="header-anchor" href="#connect函数线程通信思考" aria-hidden="true">#</a> connect函数线程通信思考</h4><p>Qt中<code>connect</code>函数原型如下，第五个参数<code>Qt::ConnectionType</code>根据接收者和发送者是否在同一个线程而不同</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>QObject::connect(const QObject *sender, const char *signal, const QObject *receiver, const char *method, Qt::ConnectionType type = Qt::AutoConnection)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code>Qt::ConnectionType</code>的取值有五种：</p><ul><li><code>Qt::AutoConnection</code><br> 默认值，使用此值，连接类型会在信号发射时决定。如果接收者和发送者在同一个线程，则自动使用<code>Qt::DirectConnection</code>类型，如果接收者和发送者不在同一个线程，则自动使用<code>Qt::QueuedConnection</code>类型。</li><li><code>Qt::DirectConnection</code><br> 槽函数运行于信号发送者所在的线程，效果上就像是直接在信号发送的位置调用了槽函数。多线程下比较危险，可能会造成崩溃。</li><li><code>Qt::QueuedConnection</code><br> 槽函数在控制回到接收者所在线程的事件循环时被调用，槽函数运行于信号接收者所在线程。发送信号后，槽函数不会立即被调用，等到接收者当前函数执行完，进入事件循环之后，槽函数才会被调用。多线程下用这个类型。</li><li><code>Qt::BlockingQueuedConnection</code><br> 槽函数的调用时机与Qt::QueuedConnection 一致，不过在发送完信号后，发送者所在线程会阻塞，直到槽函数运行完。接收者和发送者绝对不能在一个线程，否则会死锁。在多线程间需要同步的场合会用到这个。</li><li><code>Qt::UniqueConnection</code><br> 此类型可通过 “|” 与以上四个结合在一起使用。此类型为当某个信号和槽已经连接时，在进行重复连接时就会失败，可避免重复连接。如果重复连接，槽函数会重复执行。</li></ul>`,25),m={class:"hint-container details"},p=e("summary",null,"参考链接：",-1),u={href:"https://doc.qt.io/qt-6/qcamera.html",target:"_blank",rel:"noopener noreferrer"},v={href:"https://doc.qt.io/qt-6/qtmultimedia-camera-example.html",target:"_blank",rel:"noopener noreferrer"},b={href:"https://doc.qt.io/qt-6/qmediacapturesession.html",target:"_blank",rel:"noopener noreferrer"},Q={href:"https://blog.csdn.net/u011442415/article/details/129370856",target:"_blank",rel:"noopener noreferrer"};function g(h,x){const i=c("ExternalLinkIcon");return t(),o("div",null,[s,e("details",m,[p,e("ol",null,[e("li",null,[e("a",u,[n("QCamera Class"),a(i)])]),e("li",null,[e("a",v,[n("Camera Example"),a(i)])]),e("li",null,[e("a",b,[n("QMediaCaptureSession Class"),a(i)])]),e("li",null,[e("a",Q,[n("Qt6与输入输出设备"),a(i)])])])])])}const S=d(l,[["render",g],["__file","006-qt-qcamera.html.vue"]]);export{S as default};

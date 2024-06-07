import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as n,h as d}from"./app-0597aaff.js";const l={},s=d(`<div class="hint-container tip"><p class="hint-container-title">简介</p><p>使用jthread库实现通用设备类多线程方法</p></div><h2 id="jthread库介绍" tabindex="-1"><a class="header-anchor" href="#jthread库介绍" aria-hidden="true">#</a> jthread库介绍</h2><p><code>std ::jthread</code> 是C++20的新特性，其实例表示一个自动加入且可协作取消的线程。与 <code>std::thread</code> 相比， <code>std::jthread</code> 具有异常安全的线程终止流程，并且可以在大多数情况下替换它，只需很少或无需更改代码。除了拥有 <code>std::thread</code> 完全相同的功能以及API外，还增加了以下功能：</p><ul><li>可停止：提供了停止线程相关的API，可以更好的管理线程；</li><li>顶层函数：<code>jthread</code> 所要运行的顶层函数可选的接收一个 <code>std::stop_token</code> 对象作为第一个参数；</li><li>自动停止：析构函数会调用 <code>request_stop</code> 方法，停止当前线程；</li><li>自动加入：析构函数会根据当前线程的 <code>joinable</code> 状态，自动调用 <code>join</code> 方法，不再需要显式调用 <code>join</code> 来等待线程结束，从而避免了忘记加入线程带来的问题；</li><li>异常处理：<code>jthread</code> 对象可以处理线程中可能抛出的异常，确保异常不会无限制地传播到主线程之外；</li></ul><h2 id="代码" tabindex="-1"><a class="header-anchor" href="#代码" aria-hidden="true">#</a> 代码</h2><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>//device.h
#include &lt;iostream&gt;
#include &lt;vector&gt;
#include &lt;thread&gt;
#include &lt;functional&gt;

class Device
{
public:
    Device(DeviceManage* parent)
            : _parent(parent)
    {
    }

    ~Device()
    {
        Stop();
    }

    void Start()
    {
        _worker = std::make_unique&lt;std::jthread&gt;(std::bind_front(&amp;Device::Playing, this));
    }

    void Stop()
    {
        if (_worker)
        {
            _worker.reset(nullptr);
        }
    }

    int Playing(std::stop_token st);

private:
    std::unique_ptr&lt;std::jthread&gt; _worker = nullptr;
    DeviceManage* _parent;
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>//device.cpp
#include &quot;device.h&quot;

int Device::Playing(std::stop_token st) {
    while (!st.stop_requested())
    {
        //do something here
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="说明" tabindex="-1"><a class="header-anchor" href="#说明" aria-hidden="true">#</a> 说明</h2><ul><li>使用设备对象类来管理单个设备，每个设备需要进行的操作可以在调用 <code>Start</code> 方法后在线程函数 <code>Playing</code> 函数中进行。</li><li>线程函数使用智能指针来管理，在线程函数被创建时自动创建，线程函数结束后自动释放</li><li>使用 <code>jthread</code> 来管理线程的创建和释放</li></ul><div class="hint-container info"><p class="hint-container-title">为什么在 Stop 函数中只需要将线程指针 _worker 置为 nullptr ？</p><p>实际上，当我们把 <code>_worker</code> 置为 <code>nullptr</code> 时，该线程对象会自动调用 <code>jthread</code> 的析构函数，在析构函数中会自动的判断当前线程是否正在运行中，如果在运行的话会调用 <code>request_stop()</code> 方法停止线程，并调用 <code>join()</code> 方法等待线程结束。</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>~jthread() {
        _Try_cancel_and_join();
    }

void _Try_cancel_and_join() noexcept {
        if (_Impl.joinable()) {
            _Ssource.request_stop();
            _Impl.join();
        }
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div>`,10),a=[s];function c(r,v){return i(),n("div",null,a)}const u=e(l,[["render",c],["__file","009-device-class.html.vue"]]);export{u as default};

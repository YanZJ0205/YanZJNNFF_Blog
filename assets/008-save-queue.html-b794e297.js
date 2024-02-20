import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as n,c as i,h as d}from"./app-129c0a4c.js";const l={},s=d(`<div class="hint-container tip"><p class="hint-container-title">简介</p><p>C++实现了一个多线程可安全使用的队列。</p></div><h2 id="源码" tabindex="-1"><a class="header-anchor" href="#源码" aria-hidden="true">#</a> 源码</h2><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>#include &lt;thread&gt;
#include &lt;mutex&gt;
#include &lt;condition_variable&gt;
#include &lt;queue&gt;

template&lt;typename T&gt;
class TS_Queue
{
public:
    TS_Queue()
            : queue_(), mutex_(), cond_(), request_to_end_(false), enqueue_data_(true)
    {
    }

    ~TS_Queue()
    {
        StopQueue();
    }

    template&lt;typename ...Args&gt;
    void emplace(Args&amp;&amp; ...args)
    {
        std::unique_lock&lt;std::mutex&gt; lock(mutex_);
        if (enqueue_data_)
        {
            queue_.emplace(std::forward&lt;Args&gt;(args)...);
            cond_.notify_one();
        }
    }

    bool pop(T&amp; result)
    {
        std::unique_lock&lt;std::mutex&gt; lock(mutex_);

        while (queue_.empty() &amp;&amp; (!request_to_end_))
        {
            cond_.wait(lock);
        }

        if (request_to_end_)
        {
            doEndActions();
            return false;
        }

        result = queue_.front();
        queue_.pop();

        return true;
    }

    void Clear()
    {
        std::unique_lock&lt;std::mutex&gt; lock(mutex_);
        while (!queue_.empty())
        {
            queue_.pop();
        }
    }

    void StopQueue()
    {
        std::unique_lock&lt;std::mutex&gt; lock(mutex_);
        request_to_end_ = true;
        enqueue_data_ = false;
        cond_.notify_one();
    }

    // newly added
    void ResetQueue()
    {
        std::unique_lock&lt;std::mutex&gt; lock(mutex_);
        while (!queue_.empty())
        {
            queue_.pop();
        }
        enqueue_data_ = true;
        request_to_end_ = false;
    }

    unsigned int size()
    {
        std::unique_lock&lt;std::mutex&gt; lock(mutex_);
        return static_cast&lt;unsigned int&gt;(queue_.size());
    }

    bool empty() const
    {
        std::unique_lock&lt;std::mutex&gt; lock(mutex_);
        return (queue_.empty());
    }

private:
    void doEndActions()
    {
        enqueue_data_ = false;

        while (!queue_.empty())
        {
            queue_.pop();
        }
    }

    std::queue&lt;T&gt; queue_;          // Use STL queue to store data
    mutable std::mutex mutex_;     // The mutex to synchronise on
    std::condition_variable cond_; // The condition to wait for

    bool request_to_end_;
    bool enqueue_data_;
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),u=[s];function v(a,c){return n(),i("div",null,u)}const m=e(l,[["render",v],["__file","008-save-queue.html.vue"]]);export{m as default};

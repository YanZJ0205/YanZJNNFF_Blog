---
title: 多线程安全队列
date: 2024-02-20
icon: QSS
cover: "https://images.pexels.com/photos/844452/pexels-photo-844452.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
category: 
  - C++
tag:
  - C++
---

:::tip 简介
C++实现了一个多线程可安全使用的队列。
:::

## 源码
```C++
#include <thread>
#include <mutex>
#include <condition_variable>
#include <queue>

template<typename T>
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

    template<typename ...Args>
    void emplace(Args&& ...args)
    {
        std::unique_lock<std::mutex> lock(mutex_);
        if (enqueue_data_)
        {
            queue_.emplace(std::forward<Args>(args)...);
            cond_.notify_one();
        }
    }

    bool pop(T& result)
    {
        std::unique_lock<std::mutex> lock(mutex_);

        while (queue_.empty() && (!request_to_end_))
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
        std::unique_lock<std::mutex> lock(mutex_);
        while (!queue_.empty())
        {
            queue_.pop();
        }
    }

    void StopQueue()
    {
        std::unique_lock<std::mutex> lock(mutex_);
        request_to_end_ = true;
        enqueue_data_ = false;
        cond_.notify_one();
    }

    // newly added
    void ResetQueue()
    {
        std::unique_lock<std::mutex> lock(mutex_);
        while (!queue_.empty())
        {
            queue_.pop();
        }
        enqueue_data_ = true;
        request_to_end_ = false;
    }

    unsigned int size()
    {
        std::unique_lock<std::mutex> lock(mutex_);
        return static_cast<unsigned int>(queue_.size());
    }

    bool empty() const
    {
        std::unique_lock<std::mutex> lock(mutex_);
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

    std::queue<T> queue_;          // Use STL queue to store data
    mutable std::mutex mutex_;     // The mutex to synchronise on
    std::condition_variable cond_; // The condition to wait for

    bool request_to_end_;
    bool enqueue_data_;
};
```
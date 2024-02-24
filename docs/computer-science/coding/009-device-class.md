---
title: 设备类多线程实现方法
date: 2024-02-24
icon: QSS
cover: "https://images.pexels.com/photos/6487206/pexels-photo-6487206.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
category: 
  - Common
tag:
  - jthread
---

:::tip 简介
使用jthread库实现通用设备类多线程方法
:::

## jthread库介绍

`std ::jthread` 是C++20的新特性，其实例表示一个自动加入且可协作取消的线程。与 `std::thread` 相比，  `std::jthread` 具有异常安全的线程终止流程，并且可以在大多数情况下替换它，只需很少或无需更改代码。除了拥有 `std::thread` 完全相同的功能以及API外，还增加了以下功能：
- 可停止：提供了停止线程相关的API，可以更好的管理线程；
- 顶层函数：`jthread` 所要运行的顶层函数可选的接收一个 `std::stop_token` 对象作为第一个参数；
- 自动停止：析构函数会调用 `request_stop` 方法，停止当前线程；
- 自动加入：析构函数会根据当前线程的 `joinable` 状态，自动调用 `join` 方法，不再需要显式调用 `join` 来等待线程结束，从而避免了忘记加入线程带来的问题；
- 异常处理：`jthread` 对象可以处理线程中可能抛出的异常，确保异常不会无限制地传播到主线程之外；

## 代码

```C++
//device.h
#include <iostream>
#include <vector>
#include <thread>
#include <functional>

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
        _worker = std::make_unique<std::jthread>(std::bind_front(&Device::Playing, this));
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
    std::unique_ptr<std::jthread> _worker = nullptr;
    DeviceManage* _parent;
};
```

```C++
//device.cpp
#include "device.h"

int Device::Playing(std::stop_token st) {
    while (!st.stop_requested())
    {
        //do something here
    }
}
```

## 说明
- 使用设备对象类来管理单个设备，每个设备需要进行的操作可以在调用 `Start` 方法后在线程函数 `Playing` 函数中进行。
- 线程函数使用智能指针来管理，在线程函数被创建时自动创建，线程函数结束后自动释放
- 使用 `jthread` 来管理线程的创建和释放

::: info 为什么在 Stop 函数中只需要将线程指针 _worker 置为 nullptr ？
实际上，当我们把 `_worker` 置为 `nullptr` 时，该线程对象会自动调用 `jthread` 的析构函数，在析构函数中会自动的判断当前线程是否正在运行中，如果在运行的话会调用 `request_stop()` 方法停止线程，并调用 `join()` 方法等待线程结束。
```C++
~jthread() {
        _Try_cancel_and_join();
    }

void _Try_cancel_and_join() noexcept {
        if (_Impl.joinable()) {
            _Ssource.request_stop();
            _Impl.join();
        }
    }
```
:::

---
title: UDP通信
date: 2024-02-20
cover: "https://images.pexels.com/photos/2441454/pexels-photo-2441454.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
category: 
  - UDP
tag:
  - UDP
---

:::tip 简介
asio实现UDP通信
:::

## Asio库
Asio是一个跨平台的C++网络库，它是Boost库的一部分，它是异步输入输出的核心。Asio提供了一组异步的I/O操作，包括TCP和UDP的socket、定时器、串口等。Asio的核心是一个事件循环，它使用epoll、kqueue、IOCP等系统调用来实现异步I/O操作。Asio的事件循环是单线程的，但是它提供了一些接口来实现多线程的异步操作。

## UDP客户端类

```C++
class UDPClient
{
public:
    UDPClient(): _socket((_ioc))
    {
    }

    ~UDPClient()
    {
        Stop();
    }

    bool Start(const std::string& ip, const std::string& multicast_addr, int port)
    {
        Stop();
        _ioc.restart();

        bool success = true;
        try
        {
            //进行UDP连接
            _endpoint = udp::endpoint(asio::ip::address_v4::any(), port);
            _socket.open(_endpoint.protocol());
            _socket.set_option(asio::ip::udp::socket::reuse_address(true));
            _socket.bind(_endpoint);
            _socket.set_option(asio::ip::multicast::join_group(
                    asio::ip::address_v4::from_string(multicast_addr)
                    , asio::ip::address_v4::from_string(ip)));
        }
        catch (std::exception& e)
        {
            std::cerr << "Exception: " << e.what() << "\n";
            success = false;
        }

        if (success)
        {
            DoRead();
            _t = std::jthread([this](){
                _ioc.run();
            });
        }

        return success;
    }

    void Stop()
    {
        Close();
        _ioc.stop();
        if (_t.joinable())
        {
            _t.join();
        }
        _ioc.run();
    }

    void Close()
    {
        _ioc.post(
                [this]()
                {
                    if (_socket.is_open())
                    {
                        _socket.close();
                    }
                });
    }

    void Send(const udp::endpoint& endpoint, const Buffer& buffer)
    {
        _ioc.post(
                [this, buffer, endpoint]()
                {
                    bool write_in_progress = !_send_queue.empty();
                    _send_queue.emplace_back(buffer, endpoint);
                    if (!write_in_progress)
                    {
                        DoWrite();
                    }
                }
        );
    }

private:
    void DoWrite()
    {
        _socket.async_send_to(_send_queue.front().first.ToBuffer(), _send_queue.front().second,
                                 [this](std::error_code ec, std::size_t length)
                                 {
                                     if (!ec)
                                     {
                                         _send_queue.pop_front();
                                         if (!_send_queue.empty())
                                         {
                                             DoWrite();
                                         }
                                     }
                                     else
                                     {
                                         printf("%s\n",std::system_error(ec).what());
                                     }
                                 });
    }

    //DoRead() 函数负责监听 UDP 套接字上的消息，并在消息到达时调用 on_message 函数进行处理
    void DoRead()
    {
        _socket.async_receive_from(asio::buffer(_buffer, _max_buffer_size), _sender_endpoint,
                                   [this](std::error_code ec, std::size_t bytes_received)
                                   {
                                       if (!ec)
                                       {
                                           if (bytes_received > 0 and on_message)
                                           {
                                               string_view s(_buffer, bytes_received);
                                               on_message(_sender_endpoint, s);
                                           }
                                       }
                                       else
                                       {
                                           std::cout << std::system_error(ec).what() << std::endl;
                                       }
                                       DoRead();
                                   });
    }

public:
    using OnMsgType = std::function<void(const udp::endpoint& endpoint, const std::string_view& buffer)>;
    OnMsgType on_message = nullptr;

private:
    constexpr static size_t _max_buffer_size = 64 * 1024;
    io_context _ioc;
    udp::socket _socket;
    udp::endpoint _endpoint;
    udp::endpoint _sender_endpoint;
    char _buffer[_max_buffer_size];
    deque<std::pair<Buffer, udp::endpoint>> _send_queue;
    std::jthread _t;
};
```

```C++
//使用方式
const std::string c_multicast_addr = "224.0.2.2";
const std::string c_listen_addr = "192.168.0.4";
const int c_multicast_port = 42101;

UDPClient _udp_client;
_udp_client.on_message = [this](const udp::endpoint& endpoint, const std::string_view& buffer){
    //消息处理程序
}

_udp_client.Start(c_listen_addr, c_multicast_addr,c_multicast_port);
```
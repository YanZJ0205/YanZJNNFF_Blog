---
title: CMakeList基础
date: 2024-01-19
cover: "https://images.pexels.com/photos/813872/pexels-photo-813872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
category: 
  - Common
tag:
  - C++
---

## CMakeList文件的作用

CMakeList.txt是CMake的构建配置文件，用来包含项目中的各种配置，可以通过CMake命令转为makefile文件。使用CMake后，项目的构建流程为

```flow
op1=>operation: CMakeList
op2=>operation: Makefile
op3=>operation: .exe

op1(right)->op2(right)->op3
```

## 常用命令

使用以下项目结构
- build 构建项目中间文件
- include 头文件
- lib 编译生成库
- sec 源文件

#### 基本命令

```CMake
# cmake的最低版本要求
cmake_minimum_required(VERSION 3.4)

# 工程名称
project(Demo)

# 生成可执行文件demo.exe
add_executable(demo demo.cpp)
```

#### 编译类型设置

```CMake
# 生成可执行文件
add_executable(demo demo.cpp) 

# 生成静态库common.lib
add_library(common STATIC util.cpp) 

# 生成动态库或共享库common.dll
add_library(common SHARED util.cpp) 
```

#### 指定源文件

```CMake
# 明确指定包含的源文件
add_library(demo demo.cpp test.cpp util.cpp)

# 搜索当前目录下的所有.cpp文件
aux_source_directory(. SRC_LIST) # 搜索当前目录下的所有.cpp文件
add_library(demo ${SRC_LIST})

# 自定义搜索规则
file(GLOB SRC_LIST "*.cpp" "protocol/*.cpp")
add_library(demo ${SRC_LIST})
# 或者
file(GLOB SRC_LIST "*.cpp")
file(GLOB SRC_PROTOCOL_LIST "protocol/*.cpp")
add_library(demo ${SRC_LIST} ${SRC_PROTOCOL_LIST})
# 或者
aux_source_directory(. SRC_LIST)
aux_source_directory(protocol SRC_PROTOCOL_LIST)
add_library(demo ${SRC_LIST} ${SRC_PROTOCOL_LIST})

# 搜集文件
file(GLOB files  LIST_DIRECTORIES false *)
```

#### 查找指定的库文件

```CMake
find_library( # lib变量名
              log-lib
 
              # 默认的搜索路径为 cmake 包含的系统库
              log )
```

#### 设置包含的目录

```CMake
include_directories(
    ${CMAKE_CURRENT_SOURCE_DIR}
    ${CMAKE_CURRENT_BINARY_DIR}
    ${CMAKE_CURRENT_SOURCE_DIR}/include
)
```

#### 设置链接库搜索目录

```CMake
link_directories(${CMAKE_CURRENT_SOURCE_DIR}/libs)
```

#### 设置target需要链接的库

```CMake
target_link_libraries( # 目标库
                       demo
 
                       # 目标库需要链接的库
                       # 上面 find_library 指定的变量名
                       ${log-lib} )
```

#### 设置变量

```CMake
# 主要有set和list两个用法
set(SRC_LIST main.cpp)
set(SRC_LIST ${SRC_LIST} test.cpp) # 追加设置变量的值
list(APPEND SRC_LIST test.cpp) 
list(REMOVE_ITEM SRC_LIST main.cpp) # 追加或删除变量
```

#### 条件控制

```CMake
# if语句
逻辑判断和比较：
if (expression)：expression 不为空（0,N,NO,OFF,FALSE,NOTFOUND）时为真
if (not exp)：与上面相反
if (var1 AND var2)
if (var1 OR var2)
if (COMMAND cmd)：如果 cmd 确实是命令并可调用为真
if (EXISTS dir) if (EXISTS file)：如果目录或文件存在为真
if (file1 IS_NEWER_THAN file2)：当 file1 比 file2 新，或 file1/file2 中有一个不存在时为真，文件名需使用全路径
if (IS_DIRECTORY dir)：当 dir 是目录时为真
if (DEFINED var)：如果变量被定义为真
if (var MATCHES regex)：给定的变量或者字符串能够匹配正则表达式 regex 时为真，此处 var 可以用 var 名，也可以用 ${var}
if (string MATCHES regex)

数字比较：
if (variable LESS number)：LESS 小于
if (string LESS number)
if (variable GREATER number)：GREATER 大于
if (string GREATER number)
if (variable EQUAL number)：EQUAL 等于
if (string EQUAL number)

字母表顺序比较：
if (variable STRLESS string)
if (string STRLESS string)
if (variable STRGREATER string)
if (string STRGREATER string)
if (variable STREQUAL string)
if (string STREQUAL string)
```

```CMake
# while循环
while(condition)
    ...
endwhile()
```

```CMake
# loop_var是循环变量，start和stop是循环范围的起始值和结束值，而step是可选的循环步长
foreach(loop_var RANGE start stop [step])
    ...
endforeach(loop_var)
```

#### 打印信息

```CMake
# 使用message函数来打印中间信息
message(${PROJECT_SOURCE_DIR})
message("build with debug mode")
message(WARNING "this is warnning message")
message(FATAL_ERROR "this build has many error") # FATAL_ERROR 会导致编译失败
```

#### 包含其他CMake文件

```CMake
# 指定包含文件的全路径
include(./common.cmake) 
# 在搜索路径中搜索def.cmake文件
include(def) 
# 设置include的搜索路径
set(CMAKE_MODULE_PATH ${CMAKE_CURRENT_SOURCE_DIR}/cmake)
```

## 常用变量

#### 预定义
```js
PROJECT_SOURCE_DIR：工程的根目录
PROJECT_BINARY_DIR：运行 cmake 命令的目录，通常是 ${PROJECT_SOURCE_DIR}/build
PROJECT_NAME：返回通过 project 命令定义的项目名称
CMAKE_CURRENT_SOURCE_DIR：当前处理的 CMakeLists.txt 所在的路径
CMAKE_CURRENT_BINARY_DIR：target 编译目录
CMAKE_CURRENT_LIST_DIR：CMakeLists.txt 的完整路径
CMAKE_CURRENT_LIST_LINE：当前所在的行
CMAKE_MODULE_PATH：定义自己的 cmake 模块所在的路径，SET(CMAKE_MODULE_PATH ${PROJECT_SOURCE_DIR}/cmake)，然后可以用INCLUDE命令来调用自己的模块
EXECUTABLE_OUTPUT_PATH：重新定义目标二进制可执行文件的存放位置
LIBRARY_OUTPUT_PATH：重新定义目标链接库文件的存放位置
```

#### 环境变量

```CMake
# 使用环境变量
$ENV{Name}

# 写入环境变量
set(ENV{Name} value) # 这里没有“$”符号
```

#### 系统信息

```js
CMAKE_MAJOR_VERSION：cmake 主版本号，比如 3.4.1 中的 3
­CMAKE_MINOR_VERSION：cmake 次版本号，比如 3.4.1 中的 4
­CMAKE_PATCH_VERSION：cmake 补丁等级，比如 3.4.1 中的 1
­CMAKE_SYSTEM：系统名称，比如 Linux-­2.6.22
­CMAKE_SYSTEM_NAME：不包含版本的系统名，比如 Linux
­CMAKE_SYSTEM_VERSION：系统版本，比如 2.6.22
­CMAKE_SYSTEM_PROCESSOR：处理器名称，比如 i686
­UNIX：在所有的类 UNIX 平台下该值为 TRUE，包括 OS X 和 cygwin
­WIN32：在所有的 win32 平台下该值为 TRUE，包括 cygwin
```

#### 开关选项

```js
BUILD_SHARED_LIBS：
这个开关用来控制默认的库编译方式，如果不进行设置，使用 add_library 又没有指定库类型的情况下，默认编译生成的库都是静态库。如果 set(BUILD_SHARED_LIBS ON) 后，默认生成的为动态库
CMAKE_C_FLAGS：
设置 C 编译选项，也可以通过指令 add_definitions() 添加
CMAKE_CXX_FLAGS：
设置 Cplus 编译选项，也可以通过指令 add_definitions() 添加

add_definitions(-DENABLE_DEBUG -DABC) # 参数之间用空格分隔
```

::: details 参考链接：
1. [CMake Reference Documentation](https://cmake.org/cmake/help/latest/)
1. [CMake编译基础知识、流程结构、CMakeLists.txt命令、程序运行](https://blog.csdn.net/weixin_49347928/article/details/131405947)
:::
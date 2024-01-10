---
title: 动态库链接
date: 2024-01-10
cover: "https://images.pexels.com/photos/953626/pexels-photo-953626.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
category: 
  - C++
tag:
  - VS2022
  - C++
---

## 动态库链接方法

#### 创建动态依赖库项目

1. 在 Visual Studio 中，右键点击解决方案，选择“添加” > “新项目”
2. 在“新建项目”对话框中，选择“Visual C++” > “动态链接库（DLL）”
3. 为动态链接库项目指定名称和位置，并点击“确定”
4. 确保动态链接库可以成功构建生成DLL文件和LIB文件（LIB文件生成需要动态链接库项目中包含导出符号）

#### 添加项目引用

1. 在解决方案资源管理器中，右键点击主项目（通常是一个可执行文件项目）目录下的“引用”，选择“添加引用”
2. 选择要引用的动态链接库项目
3. 确定并关闭添加引用对话框

#### 配置依赖项和链接器设置

1. 在主项目的属性对话框中，选择“配置属性” > “常规”，确保“配置类型”设置为“应用程序（.exe）”
2. 在“配置属性” > “C/C++” > “常规” > “附加包含目录”中，添加动态链接库项目的头文件路径（如果需要）
3. 在“配置属性” > “链接器” > “常规” > “附加库目录”中，添加动态链接库文件（.dll 文件）所在的路径
4. 在“配置属性” > “链接器” > “输入” > “附加依赖项”中，添加动态链接库项目的库文件名（通常是 .lib 文件）

#### 使用动态链接库的功能

1. 在主项目的源代码中，包含动态链接库项目的头文件（如果需要）
2. 使用动态链接库项目提供的函数和类等功能

#### 构建和运行

1. 构建整个解决方案，确保动态链接库项目和主项目都被成功编译和链接
2. 运行主项目，它将能够使用动态链接库项目提供的功能

## 参考链接

[创建和使用自己的动态链接库 (C++)](https://learn.microsoft.com/zh-cn/cpp/build/walkthrough-creating-and-using-a-dynamic-link-library-cpp?view=msvc-170)
[VS2019下C++生成DLL并且成功调用](https://blog.csdn.net/weixin_43729127/article/details/128977461?spm=1001.2101.3001.6650.6&utm_medium=distribute.pc_relevant.none-task-blog-2~default~BlogCommendFromBaidu~Rate-6-128977461-blog-112764805.235%5Ev38%5Epc_relevant_sort_base1&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2~default~BlogCommendFromBaidu~Rate-6-128977461-blog-112764805.235%5Ev38%5Epc_relevant_sort_base1&utm_relevant_index=10)


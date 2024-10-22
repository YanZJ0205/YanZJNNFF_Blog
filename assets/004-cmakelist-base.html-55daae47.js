import{_ as l}from"./plugin-vue_export-helper-c27b6911.js";import{g as i,o as c,c as r,f as e,a as n,b as a,h as t}from"./app-d5e9c3f8.js";const v={},u=n("h2",{id:"cmakelist文件的作用",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#cmakelist文件的作用","aria-hidden":"true"},"#"),a(" CMakeList文件的作用")],-1),o=n("p",null,"CMakeList.txt是CMake的构建配置文件，用来包含项目中的各种配置，可以通过CMake命令转为makefile文件。使用CMake后，项目的构建流程为",-1),m=t(`<h2 id="常用命令" tabindex="-1"><a class="header-anchor" href="#常用命令" aria-hidden="true">#</a> 常用命令</h2><p>使用以下项目结构</p><ul><li>build 构建项目中间文件</li><li>include 头文件</li><li>lib 编译生成库</li><li>sec 源文件</li></ul><h4 id="基本命令" tabindex="-1"><a class="header-anchor" href="#基本命令" aria-hidden="true">#</a> 基本命令</h4><div class="language-CMake line-numbers-mode" data-ext="CMake"><pre class="language-CMake"><code># cmake的最低版本要求
cmake_minimum_required(VERSION 3.4)

# 工程名称
project(Demo)

# 生成可执行文件demo.exe
add_executable(demo demo.cpp)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="编译类型设置" tabindex="-1"><a class="header-anchor" href="#编译类型设置" aria-hidden="true">#</a> 编译类型设置</h4><div class="language-CMake line-numbers-mode" data-ext="CMake"><pre class="language-CMake"><code># 生成可执行文件
add_executable(demo demo.cpp) 

# 生成静态库common.lib
add_library(common STATIC util.cpp) 

# 生成动态库或共享库common.dll
add_library(common SHARED util.cpp) 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="指定源文件" tabindex="-1"><a class="header-anchor" href="#指定源文件" aria-hidden="true">#</a> 指定源文件</h4><div class="language-CMake line-numbers-mode" data-ext="CMake"><pre class="language-CMake"><code># 明确指定包含的源文件
add_library(demo demo.cpp test.cpp util.cpp)

# 搜索当前目录下的所有.cpp文件
aux_source_directory(. SRC_LIST) # 搜索当前目录下的所有.cpp文件
add_library(demo \${SRC_LIST})

# 自定义搜索规则
file(GLOB SRC_LIST &quot;*.cpp&quot; &quot;protocol/*.cpp&quot;)
add_library(demo \${SRC_LIST})
# 或者
file(GLOB SRC_LIST &quot;*.cpp&quot;)
file(GLOB SRC_PROTOCOL_LIST &quot;protocol/*.cpp&quot;)
add_library(demo \${SRC_LIST} \${SRC_PROTOCOL_LIST})
# 或者
aux_source_directory(. SRC_LIST)
aux_source_directory(protocol SRC_PROTOCOL_LIST)
add_library(demo \${SRC_LIST} \${SRC_PROTOCOL_LIST})

# 搜集文件
file(GLOB files  LIST_DIRECTORIES false *)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="查找指定的库文件" tabindex="-1"><a class="header-anchor" href="#查找指定的库文件" aria-hidden="true">#</a> 查找指定的库文件</h4><div class="language-CMake line-numbers-mode" data-ext="CMake"><pre class="language-CMake"><code>find_library( # lib变量名
              log-lib
 
              # 默认的搜索路径为 cmake 包含的系统库
              log )
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="设置包含的目录" tabindex="-1"><a class="header-anchor" href="#设置包含的目录" aria-hidden="true">#</a> 设置包含的目录</h4><div class="language-CMake line-numbers-mode" data-ext="CMake"><pre class="language-CMake"><code>include_directories(
    \${CMAKE_CURRENT_SOURCE_DIR}
    \${CMAKE_CURRENT_BINARY_DIR}
    \${CMAKE_CURRENT_SOURCE_DIR}/include
)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="设置链接库搜索目录" tabindex="-1"><a class="header-anchor" href="#设置链接库搜索目录" aria-hidden="true">#</a> 设置链接库搜索目录</h4><div class="language-CMake line-numbers-mode" data-ext="CMake"><pre class="language-CMake"><code>link_directories(\${CMAKE_CURRENT_SOURCE_DIR}/libs)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="设置target需要链接的库" tabindex="-1"><a class="header-anchor" href="#设置target需要链接的库" aria-hidden="true">#</a> 设置target需要链接的库</h4><div class="language-CMake line-numbers-mode" data-ext="CMake"><pre class="language-CMake"><code>target_link_libraries( # 目标库
                       demo
 
                       # 目标库需要链接的库
                       # 上面 find_library 指定的变量名
                       \${log-lib} )
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="设置变量" tabindex="-1"><a class="header-anchor" href="#设置变量" aria-hidden="true">#</a> 设置变量</h4><div class="language-CMake line-numbers-mode" data-ext="CMake"><pre class="language-CMake"><code># 主要有set和list两个用法
set(SRC_LIST main.cpp)
set(SRC_LIST \${SRC_LIST} test.cpp) # 追加设置变量的值
list(APPEND SRC_LIST test.cpp) 
list(REMOVE_ITEM SRC_LIST main.cpp) # 追加或删除变量
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="条件控制" tabindex="-1"><a class="header-anchor" href="#条件控制" aria-hidden="true">#</a> 条件控制</h4><div class="language-CMake line-numbers-mode" data-ext="CMake"><pre class="language-CMake"><code># if语句
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
if (var MATCHES regex)：给定的变量或者字符串能够匹配正则表达式 regex 时为真，此处 var 可以用 var 名，也可以用 \${var}
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-CMake line-numbers-mode" data-ext="CMake"><pre class="language-CMake"><code># while循环
while(condition)
    ...
endwhile()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-CMake line-numbers-mode" data-ext="CMake"><pre class="language-CMake"><code># loop_var是循环变量，start和stop是循环范围的起始值和结束值，而step是可选的循环步长
foreach(loop_var RANGE start stop [step])
    ...
endforeach(loop_var)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="打印信息" tabindex="-1"><a class="header-anchor" href="#打印信息" aria-hidden="true">#</a> 打印信息</h4><div class="language-CMake line-numbers-mode" data-ext="CMake"><pre class="language-CMake"><code># 使用message函数来打印中间信息
message(\${PROJECT_SOURCE_DIR})
message(&quot;build with debug mode&quot;)
message(WARNING &quot;this is warnning message&quot;)
message(FATAL_ERROR &quot;this build has many error&quot;) # FATAL_ERROR 会导致编译失败
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="包含其他cmake文件" tabindex="-1"><a class="header-anchor" href="#包含其他cmake文件" aria-hidden="true">#</a> 包含其他CMake文件</h4><div class="language-CMake line-numbers-mode" data-ext="CMake"><pre class="language-CMake"><code># 指定包含文件的全路径
include(./common.cmake) 
# 在搜索路径中搜索def.cmake文件
include(def) 
# 设置include的搜索路径
set(CMAKE_MODULE_PATH \${CMAKE_CURRENT_SOURCE_DIR}/cmake)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="常用变量" tabindex="-1"><a class="header-anchor" href="#常用变量" aria-hidden="true">#</a> 常用变量</h2><h4 id="预定义" tabindex="-1"><a class="header-anchor" href="#预定义" aria-hidden="true">#</a> 预定义</h4><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token constant">PROJECT_SOURCE_DIR</span>：工程的根目录
<span class="token constant">PROJECT_BINARY_DIR</span>：运行 cmake 命令的目录，通常是 $<span class="token punctuation">{</span><span class="token constant">PROJECT_SOURCE_DIR</span><span class="token punctuation">}</span><span class="token operator">/</span>build
<span class="token constant">PROJECT_NAME</span>：返回通过 project 命令定义的项目名称
<span class="token constant">CMAKE_CURRENT_SOURCE_DIR</span>：当前处理的 CMakeLists<span class="token punctuation">.</span>txt 所在的路径
<span class="token constant">CMAKE_CURRENT_BINARY_DIR</span>：target 编译目录
<span class="token constant">CMAKE_CURRENT_LIST_DIR</span>：CMakeLists<span class="token punctuation">.</span>txt 的完整路径
<span class="token constant">CMAKE_CURRENT_LIST_LINE</span>：当前所在的行
<span class="token constant">CMAKE_MODULE_PATH</span>：定义自己的 cmake 模块所在的路径，<span class="token constant">SET</span><span class="token punctuation">(</span><span class="token constant">CMAKE_MODULE_PATH</span> $<span class="token punctuation">{</span><span class="token constant">PROJECT_SOURCE_DIR</span><span class="token punctuation">}</span><span class="token operator">/</span>cmake<span class="token punctuation">)</span>，然后可以用<span class="token constant">INCLUDE</span>命令来调用自己的模块
<span class="token constant">EXECUTABLE_OUTPUT_PATH</span>：重新定义目标二进制可执行文件的存放位置
<span class="token constant">LIBRARY_OUTPUT_PATH</span>：重新定义目标链接库文件的存放位置
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="环境变量" tabindex="-1"><a class="header-anchor" href="#环境变量" aria-hidden="true">#</a> 环境变量</h4><div class="language-CMake line-numbers-mode" data-ext="CMake"><pre class="language-CMake"><code># 使用环境变量
$ENV{Name}

# 写入环境变量
set(ENV{Name} value) # 这里没有“$”符号
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="系统信息" tabindex="-1"><a class="header-anchor" href="#系统信息" aria-hidden="true">#</a> 系统信息</h4><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token constant">CMAKE_MAJOR_VERSION</span>：cmake 主版本号，比如 <span class="token number">3.4</span><span class="token number">.1</span> 中的 <span class="token number">3</span>
­<span class="token constant">CMAKE_MINOR_VERSION</span>：cmake 次版本号，比如 <span class="token number">3.4</span><span class="token number">.1</span> 中的 <span class="token number">4</span>
­<span class="token constant">CMAKE_PATCH_VERSION</span>：cmake 补丁等级，比如 <span class="token number">3.4</span><span class="token number">.1</span> 中的 <span class="token number">1</span>
­<span class="token constant">CMAKE_SYSTEM</span>：系统名称，比如 Linux<span class="token operator">-</span>­<span class="token number">2.6</span><span class="token number">.22</span>
­<span class="token constant">CMAKE_SYSTEM_NAME</span>：不包含版本的系统名，比如 Linux
­<span class="token constant">CMAKE_SYSTEM_VERSION</span>：系统版本，比如 <span class="token number">2.6</span><span class="token number">.22</span>
­<span class="token constant">CMAKE_SYSTEM_PROCESSOR</span>：处理器名称，比如 i686
­<span class="token constant">UNIX</span>：在所有的类 <span class="token constant">UNIX</span> 平台下该值为 <span class="token constant">TRUE</span>，包括 <span class="token constant">OS</span> <span class="token constant">X</span> 和 cygwin
­<span class="token constant">WIN32</span>：在所有的 win32 平台下该值为 <span class="token constant">TRUE</span>，包括 cygwin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="开关选项" tabindex="-1"><a class="header-anchor" href="#开关选项" aria-hidden="true">#</a> 开关选项</h4><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token constant">BUILD_SHARED_LIBS</span>：
这个开关用来控制默认的库编译方式，如果不进行设置，使用 add_library 又没有指定库类型的情况下，默认编译生成的库都是静态库。如果 <span class="token function">set</span><span class="token punctuation">(</span><span class="token constant">BUILD_SHARED_LIBS</span> <span class="token constant">ON</span><span class="token punctuation">)</span> 后，默认生成的为动态库
<span class="token constant">CMAKE_C_FLAGS</span>：
设置 <span class="token constant">C</span> 编译选项，也可以通过指令 <span class="token function">add_definitions</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 添加
<span class="token constant">CMAKE_CXX_FLAGS</span>：
设置 Cplus 编译选项，也可以通过指令 <span class="token function">add_definitions</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 添加

<span class="token function">add_definitions</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token constant">DENABLE_DEBUG</span> <span class="token operator">-</span><span class="token constant">DABC</span><span class="token punctuation">)</span> # 参数之间用空格分隔
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,36),p={class:"hint-container details"},b=n("summary",null,"参考链接：",-1),_={href:"https://cmake.org/cmake/help/latest/",target:"_blank",rel:"noopener noreferrer"},k={href:"https://blog.csdn.net/weixin_49347928/article/details/131405947",target:"_blank",rel:"noopener noreferrer"};function h(C,E){const d=i("FlowChart"),s=i("ExternalLinkIcon");return c(),r("div",null,[u,o,e(d,{id:"flowchart-6",code:"eJzLLzC0tcsvSC1KLMnMz7NScPZNzE71ySwu4covMEKRAUmkZeakAiWMUST0UitSuYCihhpFmekZJZq6QEkjJLYxFwAH6CIq",preset:"vue"}),m,n("details",p,[b,n("ol",null,[n("li",null,[n("a",_,[a("CMake Reference Documentation"),e(s)])]),n("li",null,[n("a",k,[a("CMake编译基础知识、流程结构、CMakeLists.txt命令、程序运行"),e(s)])])])])])}const S=l(v,[["render",h],["__file","004-cmakelist-base.html.vue"]]);export{S as default};

---
title: Markdown基础
date: 2024-1-3
cover: "https://images.pexels.com/photos/789380/pexels-photo-789380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
category: 
  - Markdown
tag:
  - Markdown
---

## Markdown标题语法

创建标题时可在标题文本前加上`#`，`#`的数量代表标题的级别。并且由于不同的Markdown应用程序处理`#`和标题之间的空格方式并不一致，需在`#`和标题文本间使用空格

例如： `# 一级标题`

## Markdown段落语法

使用空白行将一行或多行文本进行分割，并且不要使用空格或制表位缩进段落

## Markdown换行语法

在一行的末尾添加两个或多个空格，然后按回车键换行

## Markdown强调语法

通过将文本设置为粗体或斜体来强调其重要性

可以通过在需要加粗部分的前后添加两个`*`或`_`  
例如：输入`**加粗**`，可以得到**加粗**

可以通过在需要使用斜体部分的前后添加一个`*`或`_`  
例如：输入`*斜体*`，可以得到*斜体*

如果需要同时使用粗体和斜体，则需要在需要使用加粗和斜体部分的前后添加三个`*`或`_`。  
例如：输入`***加粗斜体***`，可以得到***加粗斜体***

## Markdown引用语法

要创建快引用，需要在段落前添加`>`符号
例如：输入`>这是一个引用`

>这是一个引用

块引用可以包含多个段落，需要为段落之间的空白行添加`>`
例如：输入
```
>这是一个引用
>
>这是一个引用
```

>这是一个引用
>
>这是一个引用

嵌套块的引用则是将嵌套块的引用符号增加一个`>`变为`>>`
例如：输入
```
>这是一个引用
>
>>这是一个引用
```

>这是一个引用
>
>>这是一个引用

并且引用中也可以包含其他Markdown语法

## Markdown列表语法

可以创建有序列表或无序列表

有序列表需从数字1起始，使用`1. 文本`的格式，数字不需要按顺序排列

1. 文本


无序列表则是在文本前加上`-`、`+`、`*`，如`- 文本`

- 文本

## Markdown代码语法

要将文本表示为代码，需要将文本使用`` ` ``包括

## Markdown分隔线语法

要创建分隔线，需要在单独一行上使用三个或多个`***`、`---`、`___`

下面为分隔线

---

## Markdown链接语法

链接文本放在中括号中，链接地址放在后面的括号中，链接标题可选`[显示名](链接地址 "链接标题")`，例如[YanZJNNFF's Blog](https://yzjnnff.github.io/blog/ "很酷的博客")

使用尖括号`< >`可将URL或email地址变为可点击的链接`<https://yzjnnff.github.io/blog/>`

<https://yzjnnff.github.io/blog/>

## Markdown图片语法

要添加图片，可使用`![图片名](图片地址 "图片标题")`

![这是图片](https://wallpapers.com/images/high/demon-slayer-akaza-annihilation-type-technique-85jwx2r4t5howzk3.webp "Akaza")

链接图片，可使用`[![图片名](图片地址 "图片标题")](链接地址)`

[![这是图片](https://wallpapers.com/images/high/demon-slayer-akaza-annihilation-type-technique-85jwx2r4t5howzk3.webp "Akaza")](https://yzjnnff.github.io/blog/)

## Markdown转义字符语法

要显示原本用于格式化Markdown文档的字符，可在字符前添加`\`
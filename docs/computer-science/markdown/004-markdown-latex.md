---
title: Markdown插入Latex公式
date: 2024-02-24
cover: "https://images.pexels.com/photos/948615/pexels-photo-948615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
category: 
  - Markdown
tag:
  - Markdown
---

:::tip
如何在Markdown中插入Latex公式
:::

## 数学模式

在 LaTeX 中，最常用到的主要有文本模式和数学模式这两种模式。数学模式又可分为行内公式{inline math)和行间公式 (display math) 两种形式。

行内公式 `$ ... $`
行间公式 `$$ ... $$`

> 函数 `${f(x)=a+\cdots}$`
> 函数 ${f(x)=\cdots}$
> 函数 `$${f(x)=\cdots \tag{1.1}}$$`
> 函数 $${f(x)=\cdots \tag{1.1}}$$

## 输入上下标

`^` 表示上标， `_` 表示下标。如果上下标的内容多于一个字符，要用大括号 { } 把这些内容括起来当成一个整体。上下标是可以嵌套的，也可以同时使用。

> 求和 `$\sum_i^na_i$`
> 求和 $\sum_i^na_i$

## 输入分数

分数的输入形式为 `$\frac{分子}{分母}$`

> `$\frac{1}{2+i}$`
> $\frac{1}{2+i}$

## 上下划线与花括号

```
$$ 
\begin{array}{c}
\overline{a+b+c} \\
\underline{a+b+c} \\
\overleftarrow{a+b} \\
\underleftarrow{a+b} \\
\underleftrightarrow{a+b} \\
\vec{x} = \vec{AB} \\
\text{a}+\rlap{\phantom{b+c+d}}b+\text{c+d+e}+f
\end{array}
$$
```

$$
\begin{array}{c}
\overline{a+b+c} \\
\underline{a+b+c} \\
\overleftarrow{a+b} \\
\underleftarrow{a+b} \\
\underleftrightarrow{a+b} \\
\vec{x} = \vec{AB} \\
\text{a}+\rlap{\phantom{b+c+d}}b+\text{c+d+e}+f
\end{array}
$$

## 输入根号

```
$$
\begin{align*}
\sqrt {12} \\
\sqrt[n]{12} 
\end{align*}
$$
```

$$
\begin{align*}
\sqrt {12} \\
\sqrt[n]{12} 
\end{align*}
$$

## 输入括号和分割符

`()` , `[]` , `|` 分别表示原尺寸的形状，由于大括号 `{}` 在 `LaTeX` 中有特定含义, 所以使用需要转义, 即 `\{` 和 `\}` 分别表示表示 `{` `}` 。当需要显示大尺寸的上述符号时, 在上述符号前加上 `\left` 和 `\right` 命令。

```
$\{a\}$
```

$\{a\}$

## 矩阵

矩阵中，不同的列使用 `&` 分割，行使用 `\\` 分割

```
$$
\begin{matrix}
a & b \\
c & d
\end{matrix} 
$$

$$
\begin{bmatrix}
a & b \\
c & d
\end{bmatrix} 
$$

$$
\begin{vmatrix}
a & b \\
c & d
\end{vmatrix} 
$$

$$
\begin{pmatrix}
a & b \\
c & d
\end{pmatrix} 
$$

$$
\begin{Bmatrix}
a & b \\
c & d
\end{Bmatrix} 
$$

$$
\begin{Vmatrix}
a & b \\
c & d
\end{Vmatrix} 
$$

$$
\chi(\lambda) =  
\begin{vmatrix}
\lambda - a & -b & -c \\
-d & \lambda - e & -f \\
-g & -h & \lambda - i 
\end{vmatrix}
$$

```
$$
\begin{matrix}
a & b \\
c & d
\end{matrix} 
$$

$$
\begin{bmatrix}
a & b \\
c & d
\end{bmatrix} 
$$

$$
\begin{vmatrix}
a & b \\
c & d
\end{vmatrix} 
$$

$$
\begin{pmatrix}
a & b \\
c & d
\end{pmatrix} 
$$

$$
\begin{Bmatrix}
a & b \\
c & d
\end{Bmatrix} 
$$

$$
\begin{Vmatrix}
a & b \\
c & d
\end{Vmatrix} 
$$

$$
\chi(\lambda) =  
\begin{vmatrix}
\lambda - a & -b & -c \\
-d & \lambda - e & -f \\
-g & -h & \lambda - i 
\end{vmatrix}
$$

## 省略号

```
$$
\begin{array}{c}
\ldots \\
\cdots \\
\vdots \\
\ddots \\
\end{array}
$$
```

$$
\begin{array}{c}
\ldots \\
\cdots \\
\vdots \\
\ddots \\
\end{array}
$$

## 单行公式与多行公式
`equation` 环境用来输入单行公式, 自动生成编号, 也可以使用 `\tag{...}` 自己对公式编号; 使用 `equation*` 环境, 不会自动生成公式编号, 后续介绍的公式输入环境都是在自动编号后面加上 `*` 便是不自动编号环境。

```
$$
\begin{equation}
(a+b) \times c = a\times c + b \times c \\
\end{equation}
$$

$$
\begin{equation*}
(a+b) \times c = a\times c + b \times c \\
\end{equation*}
$$
```

$$
\begin{equation}
(a+b) \times c = a\times c + b \times c \\
\end{equation}
$$

$$
\begin{equation*}
(a+b) \times c = a\times c + b \times c \\
\end{equation*}
$$

`align` 环境用来输入按照等号(或者其他关系符)对齐的方程组, 在关系符前加 `&` 表示对齐；`align` 环境还允许排列多列对齐公式, 列与列之间使用 `&` 分割

```
$$
\begin{align}
f(x) &= a_nx^n \\
g(x) &= x^2
\end{align}
$$

$$
\begin{align*}
 x &= t & x &= \cos t &  x &= t \\
 y &= 2t & y &= \sin (t+1) & y &= \sin t \\
\end{align*}
$$

$$
\begin{align*}
& (a+b)(a^2-ab+b^2) \\
= {}& a^3-a^2b+ab^2+a^2b-ab^2+b^2 \\
= {}& a^3 + b^3
\end{align*}
$$
```

$$
\begin{align}
f(x) &= a_nx^n \\
g(x) &= x^2
\end{align}
$$

$$
\begin{align*}
 x &= t & x &= \cos t &  x &= t \\
 y &= 2t & y &= \sin (t+1) & y &= \sin t \\
\end{align*}
$$

$$
\begin{align*}
& (a+b)(a^2-ab+b^2) \\
= {}& a^3-a^2b+ab^2+a^2b-ab^2+b^2 \\
= {}& a^3 + b^3
\end{align*}
$$

## 将公式组合成块

最常见的是 `case` 环境, 他在几行公式前面用花括号括起来, 表示几种不同的情况; 每行公式使用 `&` 分隔, 便是表达式与条件。

```
$$
\begin{equation}
D(x) = \begin{cases}
1, & \text{if } x \in \mathbb{Q}; \\
0, & \text{if } x \in
     \mathbb{R}\setminus\mathbb{Q}.
\end{cases}
\end{equation}
$$
```

$$
\begin{equation}
D(x) = \begin{cases}
1, & \text{if } x \in \mathbb{Q}; \\
0, & \text{if } x \in
     \mathbb{R}\setminus\mathbb{Q}.
\end{cases}
\end{equation}
$$



::: details 参考链接：
1. [MarkDown 中使用 LaTeX 数学式](https://www.cnblogs.com/nowgood/p/Latexstart.html)
2. [Cmd Markdown 公式指导手册](https://www.zybuluo.com/codeep/note/163962#cmd-markdown-%E5%85%AC%E5%BC%8F%E6%8C%87%E5%AF%BC%E6%89%8B%E5%86%8C)
:::
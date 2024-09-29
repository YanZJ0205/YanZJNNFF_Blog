---
title: Freespace
date: 2024-08-30
icon: QSS
cover: "https://images.pexels.com/photos/27925463/pexels-photo-27925463.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
category: 
  - Algorithm
tag:
  - freespace
---

:::tip 简介
Freespace 指场景中没有被物体占据的空间区域，判断好Freespace就可以在跟踪问题中判断准可通行区域
:::

## 基础

### Markov assumption

马尔可夫假设（Markov assumption）也称为马尔可夫性，是指一个随机过程在给定现在状态的条件下，未来的状态与过去的状态是独立的。

假设一个随机过程的状态序列为 $\{X_1,X_2,X_3,...\}$，根据马尔可夫假设，对于任意的时刻 $t$，在已知当前状态 $X_t$ 的情况下，未来状态 $X_{t+1},X_{t+2},...$ 的条件概率分布只与当前状态 $X_t$ 有关，而与过去的状态 $X_1,X_2,...,X_{t-1}$ 无关。
用数学语言表示为：$$P(X_{t+1} = x_{t+1}|X_{t} = x_{t},X_{t-1} = x_{t-1},...,X_{1} = x_{1}) = P(X_{t+1} = x_{t+1}|X_{t} = x_{t})$$

### Bayes' theorem

贝叶斯公式是概率论中的重要公式，用于计算在已知某些条件下事件发生的后验概率。

贝叶斯公式为：$$P(A|B) = \frac{P(B|A)P(A)}{P(B)}$$

其中，$P(A|B)$是在事件 $B$ 发生的条件下事件 $A$ 发生的概率，称为后验概率；$P(B|A)$是在事件 $A$ 发生的条件下事件 $B$ 发生的概率；$P(A)$是事件的先验概率，即不考虑当前观测信息时对事件 $A$ 发生的概率估计；$P(B)$是事件 $B$ 的边缘概率。

1. 后验概率$P(A|B)$：

    - 表示在获得新的观测信息（事件$B$发生）后，对事件$A$发生概率的更新估计
    - 综合了先验概率和新的观测信息，使我们对事件$A$的认识更加准确。

2. 似然函数$P(B|A)$：

    - 衡量了在事件$A$发生的情况下，观测到事件$B$的可能性。
    - 它反映了事件$A$和事件$B$之间的关联程度。

3. 先验概率$P(A)$：

    - 是在没有新的观测信息时，对事件$A$发生概率的初始估计。
    - 可以基于历史数据、经验或主观判断来确定。

4. 边缘概率$P(B)$：

    - 是事件$B$发生的概率，不考虑事件$A$的影响。
    - 可以通过对所有可能的事件$A$求和得到，即$P(B) = \sum_{i}P(B|A_i)P(A_i)$。

## Update Occupancy Map

### Occupancy Map

将空间划分为一个个小网格（cell），每个cell中存储cell内是否有障碍物的概率，这样的地图称为Occupancy Map，由于所有cell构成一个网，所以也称为Grid Map。

以2D Occupancy Map为例，每个cell中都有一个概率，那整个地图可以看做一个描述障碍物分布的概率分布（严格要归一化后才是概率分布）。构建地图的过程，就是根据传感器（比如Lider）的观测，更新这个概率分布。

设每个cell的概率相对于其他cell是独立的，更新地图的概率分布就简化为更新每个cell的概率。即在已知1到t时刻所有观测的情况下，该cell中有障碍物的概率，记为$$P(m_i|z{1:t})$$

### odds

考虑到更新的方便，每个cell中实际存储的可以是概率对应的Odds。

Odds定义为有障碍物的概率与无障碍物概率的比，即$$o(m_i|z{1:t}) = \frac{p(m_i|z_{1:t})}{1-p(m_i|z_{1:t})} = \frac{p(m_i|z_{1:t})}{p(\neg m_i|z_{1:t})}$$

已知Odds，也很容易反算出对应的概率。可以将Odds理解为一个映射，将值域在[0,1]
之间的概率映射到[0,+∞)。

### update odds

根据贝叶斯公式，有$$p(m_i|z_{1:t}) = \frac{p(z_t|m_i,z_{1:t-1})p(m_i|z_{1:t-1})}{p(z_t|z_{1:t-1})}$$

根据一阶马尔科夫(Markov Assumption)的观测独立性假设，t时刻观测值只与t时刻状态有关，已知障碍物$m_i$的情况下，观测结果与之前的观测无关，则$$p(m_i|z_{1:t}) = \frac{p(z_t|m_i)p(m_i|z_{1:t-1})}{p(z_t|z_{1:t-1})}$$

于是根据Odds的定义，可得
$$\begin{aligned}
o\left(m_{i} \mid z_{1: t}\right) & =\frac{p\left(m_{i} \mid z_{1: t}\right)}{p\left(\neg m_{i} \mid z_{1: t}\right)} \\
& =\frac{p\left(z_{t} \mid m_{i}\right) p\left(m_{i} \mid z_{1: t-1}\right)}{p\left(z_{t} \mid \neg m_{i}\right) p\left(\neg m_{i} \mid z_{1: t-1}\right)} \\
& =\frac{p\left(z_{t} \mid m_{i}\right)}{p\left(z_{t} \mid \neg m_{i}\right)} \cdot o\left(m_{i} \mid z_{1: t-1}\right) \\
& =\frac{p\left(m_{i} \mid z_{t}\right) p\left(z_{t}\right) / p\left(m_{i}\right)}{p\left(\neg m_{i} \mid z_{t}\right) p\left(z_{t}\right) / p\left(\neg m_{i}\right)} \cdot o\left(m_{i} \mid z_{1: t-1}\right) \quad \text { Bayes' theorem } \\
& =o\left(m_{i} \mid z_{t}\right) \cdot o\left(m_{i} \mid z_{1: t-1}\right) \cdot \underbrace{\frac{p\left(\neg m_{i}\right)}{p\left(m_{i}\right)}}_{\text {prior }}
\end{aligned}$$

在没有观测的情况下，一般假设cell有障碍物的概率为0.5，即$p(m_i)=p(\neg m_i)=0.5$，所以最终有$$o(m_i|z_{1:t})=o(m_i|z_t)\cdot o(m_i|z_{1:t-1})$$

即更新某个cell的Odds时，只需用新的观测结果对应的Odds，乘以该cell原本的Odds即可。

比如Lider击中cell中的物体，并返回一个距离值，这时可认为cell中有障碍物的概率为0.9，即$p(m_i|hit)=0.9$，对应的Odds就是$o(m_i|hit)=9$，如果激光没有击中任何东西，则其传输路径上的所有cell存在障碍物的概率就较低，设为$p(m_i|loss)=0.2$，对应的Odds即$o(m_i|loss)=0.25$。这样，Odds的更新就变成了根据激光的返回情况，选择乘以9还是0.25。

### 对数odds

更进一步的，可以对Odds取对数，每个cell中保存的也是Odds的对数值，则Odds的更新变为$$\log o(m_i|z_{1:t})=\log o(m_i|z_t)+\log o(m_i|z_{1:t-1})$$

即将乘法变为了加法，在$\log o(m_{i}|z_{t})$是几个已知常数值的情况下（如之前Lider的例子），这种方式更高效。

::: details 参考链接：  
1. [Occupancy Map的更新](https://aipiano.github.io/2019/04/24/Occupancy-Map%E7%9A%84%E6%9B%B4%E6%96%B0/)
2. [Occupancy Grid Map](https://guoyongyu.github.io/summary/Occupancy%20Grid%20Map/)
3. [DR_CAN(卡尔曼滤波器)](https://www.bilibili.com/video/BV1ez4y1X7eR/?spm_id_from=333.999.0.0&vd_source=2d40d7c7101925535ea5fadd4c60f031)
4. [无迹卡尔曼滤波推导Part1](https://blog.csdn.net/heqiunong/article/details/127082510)
:::
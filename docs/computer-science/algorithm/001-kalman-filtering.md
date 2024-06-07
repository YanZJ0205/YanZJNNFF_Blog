---
title: kalman滤波
date: 2024-02-20
icon: QSS
cover: "https://images.pexels.com/photos/844452/pexels-photo-844452.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
category: 
  - Algorithm
tag:
  - kalman filtering
---

:::tip 简介
卡尔曼滤波（Kalman filtering）是一种利用线性系统状态方程，通过系统输入输出观测数据，对系统状态进行最优估计的算法。
:::

## 简介
卡尔曼滤波可以用于有不确定信息的动态系统，判断系统下一步的动作。他利用系统中现象的相关性，来得到系统的实际状态。

不确定性的来源：

- 不存在完美的数学模型
- 系统的扰动不可控，也很难建模
- 测量传感器存在误差

卡尔曼滤波非常适合不断变化的系统。他的优点是内存占用少（只需要保存之前的状态，不需要保留历史记录），而且速度非常快，适合解决实时问题和嵌入式系统。

学习卡尔曼滤波需要对概率和矩阵有基本的了解。

## 变量定义

**过程噪声协方差矩阵$Q$**

1. 表示系统状态的不确定性：

   - 矩阵对角线上的元素代表各个状态量的方差，反映了状态量的不确定性。
   - 非对角线元素反映了状态量之间的相关性
  
2. 控制卡尔曼增益：

   - 卡尔曼滤波的核心是利用测量值来更新状态估计。过程噪声协方差矩阵$Q$ 和测量噪声协方差矩阵$R$ 共同决定了卡尔曼增益的大小
   - 当$Q$ 较大时，表示系统模型存在较大的不确定性，此时应该更相信测量值，卡尔曼增益会较大。
   - 当$Q$ 较小时，表示系统模型比较准确，此时应该更相信系统模型，卡尔曼增益会较小。

3. 平滑状态估计：

   -  过程噪声协方差矩阵$Q$影响状态估计的平滑性。$Q$ 较大时，状态估计对测量噪声更不敏感，滤波效果更好。
   -  但同时也意味着状态估计对系统模型的依赖性降低。对实际状态变化的响应会变慢。

**测量噪声协方差矩阵$R$**

1. 表示测量值的不确定性：

  - 矩阵对角线上的元素代表各个测量值的方差，反应了测量值的不确定性。
  - 非对角线元素反映了测量值之间的相关性。

2. 控制卡尔曼增益：

  - 当$R$ 较大时，表示测量值的不确定性较大，应该更相信系统模型，卡尔曼增益会较小。
  - 当$R$ 较小时，表示测量值比较精确，应该更相信测量值，卡尔曼增益会较大。

3. 平滑状态估计：

  - 测量噪声协方差矩阵R也会影响状态估计的平滑性。$R$ 较大时，状态估计对测量噪声更不敏感，滤波效果更好。
  - 但同时也意味着状态估计对测量值的依赖性降低，对实际状态变化的响应会变慢。

## 线性系统卡尔曼滤波

**线性系统状态空间方程:**

$$\begin{aligned}&x_{ k}=Ax_{k-1}+B*U_{k-1}+w_{k-1}\\&Z_{k}=Hx_{k}+v_{k}\end{aligned}$$

其中 $x_k$ 是状态向量，$A$ 是状态转移矩阵，$U_k$是状态控制向量，$B$ 是控制变量矩阵，$w$ 为过程噪声，$v$ 为测量噪声，$w$ 和 $v$ 均服从正态分布，$w\sim N(0,Q)$，$v\sim N(0,R)$ 

**预测：**
$$\begin{aligned}&\widehat{x}_{k}^{-}=A\widehat{x}_{k-1}+B*U_{k-1}\\&P_{k}^{-}=AP_{k-1}A^{T}+Q\end{aligned}$$

**更新：**
$$\begin{aligned}&K_k=\frac{P_{k}^{-}H_k^T}{H_{k}P_{k}^{-}H_k^T+R}\\&\widehat{x}_k=\widehat{x}_{k}^{-}+K_k(Z_k-H_k\widehat{x}_{k}^{-})\\&P_k=(I-K_{k}H_{k})P_{k}^{-}\end{aligned}$$

其中 $\widehat{x}_{k}^{-}$ 为 $k$ 时刻先验估计状态，$\widehat{x}_{k-1}$ ，$\widehat{x}_{k}$ 为 $k-1$ 和 $k$ 时刻的后验估计状态，$P_{k-1}$ 和 $P_{k}$ 分别为 $k-1$ 和 $k$ 时刻的后验估计协方差，$P_{k}^{-}$ 分别为 $k$ 时刻的先验估计协方差，$K_{k}$ 为卡尔曼增益。

## 扩展卡尔曼滤波(EKF)

**非线性系统状态空间方程：**
$$\begin{aligned}&x_k=f(x_{k-1},u_{k-1},w_{k-1})\\&Z_k=h(x_k,v_k)\end{aligned}$$

**线性化后：**
$$\begin{aligned}&x_k=\tilde{x}_{k-1}+A(x_{k-1}-\widehat{x}_{k-1})+Ww_{k-1}\\&z_k=\tilde{z}_k+H(x_k-\widehat{x}_k)+Vv_k\end{aligned}$$

其中，$x_k$ 在 $\widehat{x}_{k-1}$ 处线性化，$Z_k$ 在 $\widehat{x}_{k}$ 处线性化，$H=\frac{\partial h}{\partial x}/\widehat{x}_k$，$V=\frac{\partial h}{\partial v}/\widehat{x}_k$

**预测：**
$$\begin{aligned}&\widehat{x}_{k}^{-}=f(\widehat{x}_{k-1},u_{k-1},0)\\&P_{k}^{-}=AP_{k-1}A^T+WQW^T\end{aligned}$$

**更新：**
$$\begin{aligned}
&\widehat{x}_k=\widehat{x}_k^-+K_k(Z_k-h(\widehat{x}_k^-,0)) \\
&K_k=\frac{P_k^-H^T}{HP_k^-H^T+VRV^T} \\
&P_k=(I-K_kH)P_k^-
\end{aligned}$$

## 无迹卡尔曼滤波(UKF)

 无迹卡尔曼滤波不采用泰勒展开实现非线性系统线性化，而是采用无迹变换（Unscented Transform，UT）来处理均值和协方差的非线性传递问题。

** 无迹变化：**

- 原状态分布中按某一规则选取一些采样点（其均值和方差等于原状态分布的均值和方差）
- 将点带入非线性方程中（求取变换后的均值和协方差）

**预测：**

1. 利用上一时刻的后验估计 $\widehat{x}_{k-1}$ 以及后验估计误差协方差 ${P}_{k-1}$ ，确定性采样生成2n+1个带权值的样本点（或 sigma points）

$$\begin{aligned}
&\chi_{0}={\widehat{x}}_{k-1} \\
&w_{0}=\frac{\kappa}{n+\kappa} \\
&\chi_{i} ={\widehat{x}}_{k-1} + \left(\sqrt{(n+\kappa) {P}_{k-1}} \right)_{i},i = 1,2,\cdots,n \\
&w_{i} = \frac{1}{2(n+\kappa)} \\
&\chi_{n+i} = {\widehat{x}}_{k-1} - \left(\sqrt{\left(n+\kappa\right){P}_{k-1}} \right)_{i},i=1,2,\cdots,n \\
&w_{n+i}=\frac{1}{2(n+\kappa)}
\end{aligned}$$

1. 将所有样本点通过非线性变换 $f\begin{bmatrix}\cdot\end{bmatrix}$

$${Y}_i=f\left[x_i,{u}_{k-1},k\right]$$

3. 根据2n+1个 $Y_i$ ，得到先验估计 ${\widehat{x}}_{k-1}$

$${\widehat{x}}_k^-=\sum_{i=0}^{2n}w_i\cdot{Y}_i$$

4. 根据2n+1个 $Y_i$ ，以及先验估计 ${\widehat{x}}_{k-1}$，计算先验估计协方差 ${P}_{k-1}^-$

$${P}_k^-=\sum_{i=0}^{2n}w_i\cdot\left({Y}_i-{\widehat{x}}_k^-\right)\left({Y}_i-{\widehat{x}}_k^-\right)^T$$

**更新：**

1. 将所有样本点通过非线性变换 $h\begin{bmatrix}\cdot\end{bmatrix}$

$${Z}_i=h\left[x_i,{u}_{k-1},k\right]$$

2. 对当前时刻的观测值进行预测

$${z}_k^-=\sum_{i=0}^{2n}w_i\cdot{Z}_i$$

3. 计算 ${P}_k^-\left({z},{z}\right)$

$${P}_k^-\left({z},{z}\right)={R}+\sum_{i=0}^{2n}w_i\cdot\left({Z}_i-{z}_k^-\right)\left({Z}_i-{z}_k^-\right)^T$$

4. 计算状态向量的先验估计与测量向量的先验估计的互相关矩阵 ${P}_k^-\left(x,{z}\right)$

$${P}_k^-\left(x,{z}\right)=\sum_{i=0}^{2n}w_i\cdot\left({Y}_i-{\widehat{x}}_k^-\right)\left({Z}_i-{z}_k^-\right)^T$$

5. 套入更新公式

$$\begin{aligned}
&{\widehat{x}}_k = {\widehat{x}}_k^- + {K}_k \left({z}_k - {H}{\widehat{x}}_k^-\right) \\
&{P}_k=\left(I-{K}_k{H}\right){P}_k^- \\
&{K}_{k} ={P}_{k}^{-} (x,{z}) \begin{bmatrix}{P}_{k}^{-} ({z},{z})\end{bmatrix}^{-1}
\end{aligned}$$

::: details 参考链接：  
1. [How a Kalman filter works, in pictures](https://www.bzarg.com/p/how-a-kalman-filter-works-in-pictures/)
2. [运动模型（CV&CA&CTRV）](https://blog.csdn.net/ouok000/article/details/125999213)
3. [DR_CAN(卡尔曼滤波器)](https://www.bilibili.com/video/BV1ez4y1X7eR/?spm_id_from=333.999.0.0&vd_source=2d40d7c7101925535ea5fadd4c60f031)
4. [无迹卡尔曼滤波推导Part1](https://blog.csdn.net/heqiunong/article/details/127082510)
:::
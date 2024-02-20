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
数据滤波是去除噪声还原真实数据的一种数据处理技术，Kalman滤波在测量方差已知的情况下能够从一系列存在测量噪声的数据中，估计动态系统的状态。卡尔曼滤波会根据各测量量在不同时间下的值，考虑各时间下的联合分布，再产生对未知变数的估计，因此会比只以单一测量量为基础的估计方式要准。
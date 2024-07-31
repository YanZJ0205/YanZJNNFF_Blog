---
title: 雷达跟踪算法
date: 2024-03-22
icon: QSS
cover: "https://images.pexels.com/photos/171198/pexels-photo-171198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
category: 
  - Algorithm
tag:
  - radar
  - track
---

:::tip 简介
雷达跟踪算法笔记
:::
# 流程


# 模块

## 坐标系转换

#### 原理

坐标系转换是指将空间实体位置描述从一种坐标系转换到另一种坐标系的过程，这个过程通过建立两个坐标系统之间的对应关系来实现。

要将角雷达坐标系转换到自车坐标系，可以使用以下步骤来计算转换矩阵：

1. 确定角雷达坐标系和自车坐标系之间的相对位置关系。通常，角雷达位于车辆的某个固定位置，并且可以通过平移和旋转来描述相对位置。

2. 根据相对位置关系，确定角雷达坐标系相对于自车坐标系的平移量x和y以及旋转角度yaw。

3. 使用平移量x和y以及旋转角度yaw，构建变换矩阵。

如果角雷达坐标系的原点位于自车坐标系的某个位置，且角雷达坐标系与自车坐标系之间没有缩放因子，则转换矩阵可以表示为：
$$
M_L2V = \begin{bmatrix}
cos(yaw) & -sin(yaw) & x \\
sin(yaw) & cos(yaw) & y \\
0 & 0 & 1
\end{bmatrix} 
$$

#### 代码实现

```
void GetTransformMatrixL2V(float x, float y, float yaw, float M_L2V[9])
{
    float c = COS(yaw);
    float s = SIN(yaw);
    M_B2A[0] = c;
    M_B2A[1] = -s;
    M_B2A[2] = x;
    M_B2A[3] = s;
    M_B2A[4] = c;
    M_B2A[5] = y;
    M_B2A[6] = 0;
    M_B2A[7] = 0;
    M_B2A[8] = 1;
}
```


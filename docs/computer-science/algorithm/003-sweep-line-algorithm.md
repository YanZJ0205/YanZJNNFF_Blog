---
title: 扫描线算法
date: 2024-03-18
icon: QSS
cover: "https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=600"
category: 
  - Algorithm
tag:
  - sweep line algorithm
---

:::tip 简介
扫描线算法（Sweep Line Algorithm）或平面扫描算法（Plane Sweep Algorithm）是一种算法模式，虚拟扫描线或扫描面来解决欧几里德空间中的各种问题，一般被用来解决图形面积，周长等问题，是计算几何中的关键技术之一。
:::

## 简介

该算法通过扫描图像的每一条水平线，找到与多边形相交的线段，并确定相应的填充区域。

## 基本步骤

1. 确定多边形的边界：将多边形的顶点按照从上到下的顺序排序，并确定每条边的起点和终点。

2. 初始化扫描线：从多边形的最高顶点开始，按照从上到下的顺序，依次扫描每一条水平线。

3. 寻找交点：对于当前扫描线，确定与多边形边界相交的线段，即找到与扫描线相交的边。通过计算扫描线与多边形边的交点，得到交点的 x 坐标。

4. 确定填充区域：根据交点的 x 坐标，确定相邻两个交点之间的区域为需要填充的区域。

5. 进行颜色填充：在确定的填充区域内填充指定的颜色。

6. 更新扫描线：将扫描线向下移动一条水平线，重复步骤 3-6，直到扫描到多边形的最低顶点。

## 算法实现
```
//天际线问题
import heapq
from typing import List
 
 
class Solution:
    def getSkyline(self, buildings: List[List[int]]) -> List[List[int]]:
        result = list()
        if not buildings:
            return result
 
        boundaries = list()
        for building in buildings:
            boundaries.append((building[0], building[2]))
            boundaries.append((building[1], -building[2]))
        # 排序规则：x坐标小的在前面，x坐标相同时，高度较大的在前面
        boundaries.sort(key=lambda x: (x[0], -x[1]))
 
        pre_height = 0
        # 这里我们需要维护一个大根堆，使较大的高度在堆顶
        pq = list()
        heapq.heappush(pq, 0)
        for boundary in boundaries:
            # 如果遇到左侧的边界，就将其加入优先级队列
            if boundary[1] > 0:
                # 大根堆，所以要取高度的负值
                heapq.heappush(pq, -boundary[1])
            # 如果遇到右侧的边界，就将右侧的边界出队
            else:
                # 移除该右侧边界
                pq.remove(boundary[1])
                heapq.heapify(pq)
 
            # 获取堆顶的元素的高度，注意取负值
            current = -pq[0]
            if current != pre_height:
                result.append([boundary[0], current])
                pre_height = current
        return result
```

::: details 参考链接：  
1. [天际线问题](https://www.cnblogs.com/larry1024/p/17683177.html#%E9%A2%98%E7%9B%AE-2)
:::
import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{g as l,o as s,c as d,a as i,b as a,f as r,h as t}from"./app-cbfccce4.js";const c={},v=t(`<div class="hint-container tip"><p class="hint-container-title">简介</p><p>扫描线算法（Sweep Line Algorithm）或平面扫描算法（Plane Sweep Algorithm）是一种算法模式，虚拟扫描线或扫描面来解决欧几里德空间中的各种问题，一般被用来解决图形面积，周长等问题，是计算几何中的关键技术之一。</p></div><h2 id="简介" tabindex="-1"><a class="header-anchor" href="#简介" aria-hidden="true">#</a> 简介</h2><p>该算法通过扫描图像的每一条水平线，找到与多边形相交的线段，并确定相应的填充区域。</p><h2 id="基本步骤" tabindex="-1"><a class="header-anchor" href="#基本步骤" aria-hidden="true">#</a> 基本步骤</h2><ol><li><p>确定多边形的边界：将多边形的顶点按照从上到下的顺序排序，并确定每条边的起点和终点。</p></li><li><p>初始化扫描线：从多边形的最高顶点开始，按照从上到下的顺序，依次扫描每一条水平线。</p></li><li><p>寻找交点：对于当前扫描线，确定与多边形边界相交的线段，即找到与扫描线相交的边。通过计算扫描线与多边形边的交点，得到交点的 x 坐标。</p></li><li><p>确定填充区域：根据交点的 x 坐标，确定相邻两个交点之间的区域为需要填充的区域。</p></li><li><p>进行颜色填充：在确定的填充区域内填充指定的颜色。</p></li><li><p>更新扫描线：将扫描线向下移动一条水平线，重复步骤 3-6，直到扫描到多边形的最低顶点。</p></li></ol><h2 id="算法实现" tabindex="-1"><a class="header-anchor" href="#算法实现" aria-hidden="true">#</a> 算法实现</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>//天际线问题
import heapq
from typing import List
 
 
class Solution:
    def getSkyline(self, buildings: List[List[int]]) -&gt; List[List[int]]:
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
            if boundary[1] &gt; 0:
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7),u={class:"hint-container details"},o=i("summary",null,"参考链接：",-1),b={href:"https://www.cnblogs.com/larry1024/p/17683177.html#%E9%A2%98%E7%9B%AE-2",target:"_blank",rel:"noopener noreferrer"};function m(p,h){const e=l("ExternalLinkIcon");return s(),d("div",null,[v,i("details",u,[o,i("ol",null,[i("li",null,[i("a",b,[a("天际线问题"),r(e)])])])])])}const f=n(c,[["render",m],["__file","003-sweep-line-algorithm.html.vue"]]);export{f as default};

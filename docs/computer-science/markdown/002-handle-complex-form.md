---
title: Markdown处理复杂表格
date: 2024-01-09
cover: "https://images.pexels.com/photos/300857/pexels-photo-300857.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
category: 
  - Markdown
tag:
  - Markdown
---

Markdown很难制作复杂的表格，但其有着兼容HTML的特点，对于复杂的表格，我们需要利用这个特点，利用Excel编辑表格，并将其转为HTML格式导入Markdown


## Excel转Markdown


1. 准备好需要处理的excel表格
![测试表格](\../../.vuepress/public/assets/image/computer-science/markdown/002/image.png)
2. 将其另存为html格式
![另存为](\../../.vuepress/public/assets/image/computer-science/markdown/002/image1.png)
3. 使用记事本打开.html文件，找到`<table>...</table>`标签内容
![记事本](\../../.vuepress/public/assets/image/computer-science/markdown/002/image2.png)

    ```html
    <table width="216" border="0" cellpadding="0" cellspacing="0" style='width:162.00pt;border-collapse:collapse;table-layout:fixed;'>
        <col width="72" span="3" style='width:54.00pt;'/>
        <tr height="18" style='height:13.50pt;'>
        <td class="xl65" height="54" width="72" rowspan="3" style='height:40.50pt;width:54.00pt;border-right:none;border-bottom:none;' x:str>测试</td>
        <td width="72" style='width:54.00pt;' x:str>excel</td>
        <td width="72" align="right" style='width:54.00pt;' x:num>1</td>
        </tr>
        <tr height="18" style='height:13.50pt;'>
        <td x:str>html</td>
        <td align="right" x:num>2</td>
        </tr>
        <tr height="18" style='height:13.50pt;'>
        <td x:str>markdown</td>
        <td align="right" x:num>3</td>
        </tr>
        <![if supportMisalignedColumns]> 
        <tr width="0" style='display:none;'/> 
        <![endif]> 
      </table>
    ```

4. 预览时报错
![预览报错](\../../.vuepress/public/assets/image/computer-science/markdown/002/image3.png)
Markdown解析器通常会忽略或不支持HTML中的特殊语法，因此在您的Markdown中使用`<![if supportMisalignedColumns]>`会导致解析器无法理解或处理该部分代码，从而引发错误。
解决方法：删除这块条件判断语句。

    ```html
    <table width="216" border="0" cellpadding="0" cellspacing="0" style='width:162.00pt;border-collapse:collapse;table-layout:fixed;'>
        <col width="72" span="3" style='width:54.00pt;'/>
        <tr height="18" style='height:13.50pt;'>
        <td class="xl65" height="54" width="72" rowspan="3" style='height:40.50pt;width:54.00pt;border-right:none;border-bottom:none;' x:str>测试</td>
        <td width="72" style='width:54.00pt;' x:str>excel</td>
        <td width="72" align="right" style='width:54.00pt;' x:num>1</td>
        </tr>
        <tr height="18" style='height:13.50pt;'>
        <td x:str>html</td>
        <td align="right" x:num>2</td>
        </tr>
        <tr height="18" style='height:13.50pt;'>
        <td x:str>markdown</td>
        <td align="right" x:num>3</td>
        </tr>
        <![if supportMisalignedColumns]> 
        <tr width="0" style='display:none;'/> 
        <![endif]> 
      </table>
    ```

5. 预览效果

    <table width="216" border="0" cellpadding="0" cellspacing="0" style='width:162.00pt;border-collapse:collapse;table-layout:fixed;'>
        <col width="72" span="3" style='width:54.00pt;'/>
        <tr height="18" style='height:13.50pt;'>
        <td class="xl65" height="54" width="72" rowspan="3" style='height:40.50pt;width:54.00pt;border-right:none;border-bottom:none;' x:str>测试</td>
        <td width="72" style='width:54.00pt;' x:str>excel</td>
        <td width="72" align="right" style='width:54.00pt;' x:num>1</td>
        </tr>
        <tr height="18" style='height:13.50pt;'>
        <td x:str>html</td>
        <td align="right" x:num>2</td>
        </tr>
        <tr height="18" style='height:13.50pt;'>
        <td x:str>markdown</td>
        <td align="right" x:num>3</td>
        </tr>
      </table>

    预览后可发现测试列下面没有边框,这是由于在单元格的样式设置中设置了`border-bottom:none`;，这会导致该单元格的下边框不显示，这里选择移除`border-bottom:none`

    ```html
    <table width="216" border="0" cellpadding="0" cellspacing="0" style='width:162.00pt;border-collapse:collapse;table-layout:fixed;'>
        <col width="72" span="3" style='width:54.00pt;'/>
        <tr height="18" style='height:13.50pt;'>
        <td class="xl65" height="54" width="72" rowspan="3" style='height:40.50pt;width:54.00pt;border-right:none;' x:str>测试</td>
        <td width="72" style='width:54.00pt;' x:str>excel</td>
        <td width="72" align="right" style='width:54.00pt;' x:num>1</td>
        </tr>
        <tr height="18" style='height:13.50pt;'>
        <td x:str>html</td>
        <td align="right" x:num>2</td>
        </tr>
        <tr height="18" style='height:13.50pt;'>
        <td x:str>markdown</td>
        <td align="right" x:num>3</td>
        </tr>
        <![if supportMisalignedColumns]> 
        <tr width="0" style='display:none;'/> 
        <![endif]> 
      </table>
    ```
    
6. 最终预览效果

    <table width="216" border="0" cellpadding="0" cellspacing="0" style='width:162.00pt;border-collapse:collapse;table-layout:fixed;'>
      <col width="72" span="3" style='width:54.00pt;'/>
      <tr height="18" style='height:13.50pt;'>
        <td class="xl65" height="54" width="72" rowspan="3" style='height:40.50pt;width:54.00pt;border-right:none;' x:str>测试</td>
        <td width="72" style='width:54.00pt;' x:str>excel</td>
        <td width="72" align="right" style='width:54.00pt;' x:num>1</td>
      </tr>
      <tr height="18" style='height:13.50pt;'>
        <td x:str>html</td>
        <td align="right" x:num>2</td>
      </tr>
      <tr height="18" style='height:13.50pt;'>
        <td x:str>markdown</td>
        <td align="right" x:num>3</td>
      </tr>
      </table>

  

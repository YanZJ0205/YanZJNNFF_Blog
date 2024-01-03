---
title: QSS
date: 2023-12-29
icon: QSS
cover: "https://images.pexels.com/photos/19616610/pexels-photo-19616610.jpeg"
category: 
  - Qt
tag:
  - Qt
  - QSS
---

## 概述

QSS(Qt Style Sheets)Qt样式表，用于美化Qt程序界面。本文介绍如何使用QSS，以及一些参考QSS模版。

- 官方文档[Qt Style Sheets Reference](https://doc.qt.io/qt-5/stylesheet-reference.html)

- 参考博客[muzing的杂货铺](https://muzing.top/posts/28a1d80f/)

## 基本语法

QSS规则集由选择器和声明组成，选择器选择改变的控件样式，声明为类似于字典的键值对。

```python
QWidget #选择器
{
    #键值对
    color: blue;
    background-color: yellow;
}
```

## 使用方式

### python
在 _main.py_ 的 **QApplication** 或 **QMainWindow** 中加载样式。 

##### 编写QSS
新建一个扩展名为 _.qss_ 的文件，添加至 _qrc_ 中

##### 加载QSS

创建一个加载QSS样式表的公共类
```python
class QSSLoader:
    def __init__(self):
        pass

    @staticmethod
    def read_qss_file(qss_file_name):
        with open(qss_file_name, 'r',  encoding='UTF-8') as file:
            return file.read()
```
在代码中加载QSS样式表
```python
app = QApplication(sys.argv)
window = MainWindow()
 
style_file = './style.qss'
style_sheet = QSSLoader.read_qss_file(style_file)
window.setStyleSheet(style_sheet)

window.show()
sys.exit(app.exec_())
```

## QSS主题样例

### Qt官方样例

[Qt Style Sheets Examples](https://doc.qt.io/qt-5/stylesheet-examples.html)

###PyQt-Fluent-Widgets
[zhiyiYo/PyQt-Fluent-Widgets](https://github.com/zhiyiYo/PyQt-Fluent-Widgets) ——基于 C++ Qt/PyQt/PySide 的流畅设计小部件库

小部件库：
![example](https://raw.githubusercontent.com/zhiyiYo/PyQt-Fluent-Widgets/master/docs/source/_static/Interface.jpg)

使用方法参考[中文文档](https://github.com/zhiyiYo/PyQt-Fluent-Widgets/blob/master/docs/README_zh.md)


### Qt-Material

[UN-GCPDS/qt-material](https://github.com/UN-GCPDS/qt-material) ——PySide2、PySide6、PyQt5和PyQt6的Material风格样式表

暗色主题：

![DarkThemes](https://raw.githubusercontent.com/UN-GCPDS/qt-material/master/docs/source/notebooks/_images/dark.gif)

亮色主题：

![LightThemes](https://raw.githubusercontent.com/UN-GCPDS/qt-material/master/docs/source/notebooks/_images/light.gif)

使用方法参考[README](https://github.com/UN-GCPDS/qt-material/blob/master/README.md)

### PyQtDarkTheme

[5yutan5/PyQtDarkTheme](https://github.com/5yutan5/PyQtDarkTheme?tab=readme-ov-file) ——PySide和PyQt的黑色主题

暗色主题：

![DarkThemes](https://raw.githubusercontent.com/5yutan5/PyQtDarkTheme/main/images/widget_gallery_dark.png)

亮色主题：

![LightThemes](https://raw.githubusercontent.com/5yutan5/PyQtDarkTheme/main/images/widget_gallery_light.png)

使用方法参考[PyQtDarkTheme documentation](https://pyqtdarktheme.readthedocs.io/en/stable/)

### 飞扬青云-QSS

[feiyangqingyun/QWidgetDemo](https://github.com/feiyangqingyun/QWidgetDemo/tree/master) ——Qt编写的开源demo，包括大量控件设计，在[styledemo](https://github.com/feiyangqingyun/QWidgetDemo/tree/master/ui/styledemo)中包含几套QSS样式

[QSS目录链接](https://github.com/feiyangqingyun/QWidgetDemo/tree/master/ui/styledemo)

## Qt图标库

再也不用为了找图标而烦恼了
### QtAwesome

- C++ [gamecreature/QtAwesome](https://github.com/Gamecreature/qtawesome)
- Python [spyder-ide/qtawesome](https://github.com/spyder-ide/qtawesome?tab=readme-ov-file)

## QSS编辑器

用于设计自己的QSS

- QssStylesheetEditor [hustlei/QssStylesheetEditor](https://github.com/hustlei/QssStylesheetEditor)
- QSS Editor [HappySeaFox/qsseditor](https://github.com/HappySeaFox/qsseditor)




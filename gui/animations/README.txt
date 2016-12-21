本文件夹中实际是实现了6个Demo.简单的介绍一下6个Demo，每个Demo详细的流程以后分开来编写

简介： 文件夹中共有6个Demo分别实现了：
      1.bool.js -- bool.animation ： 窗口状态按周期2S改变
	  2.float.js -- float.animation : 窗口透明
	  3.colour.js -- colour.animation : 窗口字体颜色的改变
	  4.colourRect.js -- colourRect.animation : 窗口背景颜色的改变
	  5.zoom.js -- zoom.animation :窗口移动，产生和消失
	  6.destroy.js -- destroy.animation : 窗口透明与再现
         

详细介绍：
      1.bool.js -- bool.animation ： 窗口状态按周期2S改变，在disable和normal之间转变
      2.float.js -- float.animation : 改变窗口透明度，鼠标移到窗口区域时，降低透明度，移出区域，提高透明度
	  3.colour.js -- colour.animation : 随着时间的改变，字体颜色也随之改变
	  4.colourRect.js -- colourRect.animation : 随着时间的改变，窗口的背景颜色也随之改变
	  5.zoom.js -- zoom.animation :点击一个窗口，此窗口消失，产生另一个窗口，新产生的窗口进行位置平移以及放大
	  6.destroy.js -- destroy.animation : 窗口自动进行透明度的转变，在一个周期内从完全透明到不透明
	  
展示简介：
      1.包括两个窗口(zoom中有3个窗口)
      2.鼠标移动或点击产生效果

功能展示：
      1.通过脚本或者DOS命令，用spp.exe引擎运行start.js文件。
      2.待程序运行起来后，两个窗口
	  3.鼠标点击窗口或滑动到窗口位置，显示操作。
	  
重点实现：
      1.制作图片集:imageset文件
      2.配置外观：looknfeel文件
      3.数据配置：scheme
      4.界面布局：layout
	  5.动画设置: animation
	  
注意问题：
      1.文件的类型，名字，渲染方式，相关文件都在scheme定义，因此名字，渲染方式，类型等一定要准确。
      2.在widgetlook至少也要声明一下各个不同状态
      3.在设计背景widgetlook中，各section背景时，注意颜色合理使用
      4.layout中设计窗口排版时注意位置，要了解统一坐标系的概念
	  5.不同animation的属性及需求定义的内容不同
	 
动态模型：
       Demo制作流程：
	   1.制作图片集
	   2.在looknfeel中配置窗口的外观显示。
	   3.在scheme文件中进行数据配置，定义关联文件，渲染方式等。
	   4.在layout文件中设计窗口的排版样式，以及文字排版方式。
	   5.在animation中建立动画格式。
	   5.建立.js文件，订阅动画。
	   
	   looknfeel的动态模型：
	   1.每个widgetlook都有自己的名字，scheme中定义了具有相同名字的FalagardMapping
	   2.FalagardMapping中定义了渲染的方式，按照定义的渲染方式进行渲染
	   3.判断窗口的状态，例如如果是Hover状态，就在StateImagery中找到Hover状态
	   4.根据名字找Hover状态下渲染所需的ImagerySection，进行逐层的渲染
	   
	   
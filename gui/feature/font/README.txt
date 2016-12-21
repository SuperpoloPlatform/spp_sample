Font的初步README，以后还会逐步的完善和修改。

简介：该Demo实现了font的改变

详细介绍：
      1.在一个窗口中显示一个字符串
      2.在另一个窗口中用另一种font显示这个字符串
		 
展示简介：
      1.包括两个窗口
      2.两个窗口显示两种font

功能展示：
      1.通过脚本或者DOS命令，用spp.exe引擎运行start.js文件。
      2.待程序运行起来后，两个窗口
	  
	  
重点实现：
      1.制作图片集:font.imageset文件
      2.配置外观：font.looknfeel文件
      3.数据配置：font.scheme
      4.界面布局：font.layout
      5.字体转变: font.layout中 14行
	  
注意问题：
      1.文件的类型，名字，渲染方式，相关文件都在scheme定义，因此名字，渲染方式，类型等一定要准确。
      2.在widgetlook至少也要声明一下各个不同状态
      3.在设计背景widgetlook中，各section背景时，注意颜色合理使用
      4.layout中设计窗口排版时注意位置，要了解统一坐标系的概念
	 
动态模型：
       Demo制作流程：
	   1.制作图片集
	   2.在looknfeel中配置窗口的外观显示
	   3.在scheme文件中进行数据配置，定义关联文件，渲染方式等。
	   4.在layout文件中设计窗口的排版样式，以及文字排版方式。
	   5.建立font.js文件，用脚本初始化CEGUI。
	   
	   looknfeel的动态模型：
	   1.每个widgetlook都有自己的名字，scheme中定义了具有相同名字的FalagardMapping
	   2.FalagardMapping中定义了渲染的方式，按照定义的渲染方式进行渲染
	   3.判断窗口的状态，例如如果是Hover状态，就在StateImagery中找到Hover状态
	   4.根据名字找Hover状态下渲染所需的ImagerySection，进行逐层的渲染
	   
	   
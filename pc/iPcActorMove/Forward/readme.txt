
简介：
    该Demo实现了盒子的基本操作
	
详细介绍：
     1.绑定键位及鼠标操作与相应的动作
     2.前后的移动与停止
     3.利用鼠标和键盘进行视角的的调节
	 4.退出Demo
	 
展示简介： 
     1.该场景为无重力模式。
	 2.2个盒子，分比为player和monster。
	 
功能展示：
	1.通过脚本或者DOS命令，用spp.exe引擎运行start.js文件。
	2.待程序运行起来后，按“W”键，先前移动
	3.按“s”键，先前移动
	4.按“a”键，先前移动
	5.按“d”键，右平移移动
	6.按“a”键，左平移移动
	7.按“Tab”键，改变视角
	8.按“e”键，向上调节视角高度
	9.按“c”键，向下调节视角高度
	10.鼠标移动调节视角
	11.按“q”键，退出系统
	
重点实现代码：
	1.start.js中player键位的绑定  46-63行
	2.strat.js中消息的传送及其实现  65-166行    
	
注意问题：
	1、不能缺少的几个PC"pclinearmovement"“pcmeshselect”“pccommandinput”“pcactormove“”pcdefaultcamera“”pczonemanager“
	2、键位的按下和抬起是两个动作，需要两个消息函数。
	3、start中包含了效果和对象，是一个集合。由于没有request(库名.js)，所以先读取factory之后再创建对象。
		
		
	
	
注释：前后左右移动，调整视角都为基本操作，这里不加说明，详情请见simple 路径：...\tutorial\logic\simple

简介：
	该Demo实现了对象的自动按路径行走功能。(该功能存在部分BUG)

详细介绍：
	1、创建部分关键点，并且将这些点连接成path；
	2、指定起终点坐标信息；
	3、开始后该对象会自动按照路径行走。
	
展示简介：
	1、该场景为无重力模式
	2、一个player对象"女战士"
功能展示：
	1、通过脚本或者DOS命令，用spp.exe引擎运行start.js文件
	2、待程序运行起来后，按“K”键自动按照路径进行行走
	
重点实现代码：
	1、player.js中的事件触发，154---159行
	2、effect.js中的详细实现，100---139行
	
注意问题：
	1、创建节点，连成path路径。
	2、因为CEL库存在BUG，必须初始化其中某个变量(开发不需要关心)，seek就行，正常情况下不需要seek。
	3、三个PC不能缺少"pcpathfinder"，"pcsteer"及"pclinearmovement"，哪怕仅仅声明下
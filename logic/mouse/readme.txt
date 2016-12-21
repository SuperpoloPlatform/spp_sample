注释：前后左右移动，调整视角都为基本操作，这里不加说明，详情请见simple 路径：...\tutorial\logic\simple

简介：
	该Demo实现了camera的距离调节以鼠标控制视角。
	
详细介绍：
	1.可以利用鼠标滚轮调节camera的距离。
	2.保持鼠标左键按下状态，拖动时鼠标进行视角角度的控制。
	
展示简介：
	1.该场景为无重力模式。
	2.一个盒子。
	
功能展示：
    1.通过脚本或者DOS命令，用spp.exe引擎运行start.js文件。
	2.待程序运行起来后，利用鼠标滚轮调节camera的距离，这个距离是在定义的范围内有效。
	3.在debug中同时显示camera的distance的值。
	4.保持鼠标左键按下状态，鼠标图像消失，拖动鼠标可以控制视角角度。
	5.在debug中同时显示viewmove的值。
	
重点实现代码：
	1.player.js中对鼠标滚轮向前向后，以及鼠标左键点击操作的绑定  行181-202
	2.player.js中对鼠标操作消息的发送                      行263-304
	3.effect.js中的具体实现                              行102-127
	
注意问题：
	1.设置camera的调节范围，利用if语句。详情参照player.js行287。
	2.几个PC不能缺少"pccommandinput"，"pcmeshselect"及"pclinearmovement"。
	3.在player这个entity的property中添加mouseleft: false用来判定鼠标左键是否按下。
	4.在Debug中显示mouse的坐标以及camera的distance的值。

		
	
注释：前后左右移动，调整视角都为基本操作，这里不加说明，详情请见simple 路径：...\tutorial\logic\simple


简介：
	该Demo实现了动画的功能。

详细介绍：
	1、在world.xml文件的sequence标签中，操作的mesh为Cube1。
	2、为看到sequence的效果，将摄像机动态绑定到Cube1上。
	3、对sequence标签的内容进行RunSequence，Suspend，Resume等操作。
	4、动画的结束是meshobj的切换，即将摄像机动态绑定回初始的meshobj(Cube)。
	5、为了保证动画开始的初始位置不变，需要将Cube1移动回初始位置。
	
展示简介：
	1、该场景为无重力模式
	2、3个盒子cube，cube1，cube2
	3、切换视角后隐藏盒子

	
功能展示：
	1、通过脚本或者DOS命令，用spp.exe引擎运行start.js文件
	2、待程序运行起来后，按“C”和“E”键可以对视角进行调整
	3、按键"U"为移动加旋转动画的开始
    4、按键"I"为移动加旋转动画的暂停
    5、按键"O"为移动加旋转动画的继续
    6、按键"P"为移动加旋转动画的停止(快速完毕)
    7、按键"K"为开门动画的控制(js层创建)
    8、按键"L"为关门动画的控制(js层创建)
    9、按键"N"为开门动画的控制(读取xml)
    10、按键"M"关门动画的控制(读取xml)
    11、按键"B"执行测试旋转(读取xml)
	
重点实现代码：
	1、player.js中的键位输入绑定 164---191行
    2、player.js中的消息发送函数 196---231行
	3、effect.js中的详细实现    129---204行
	
注意问题：
	1、对sequence操作时，注意步骤
	2、没有隐藏效果，让物体运动起来更容易看到位置的移动以及方向的旋转
	

注释：摄像机前后左右移动，调整摄像机高度，上下移动(呈现45度角)，以及摄像机旋转，这里不加说明，详情请见simple 路径：...\sample\tutorial\logic\sandTable\

简介：
	该Demo实现了摄像机前后左右移动，调整摄像机高度，上下移动(呈现45度角)，以及摄像机旋转。

详细介绍：
	1、按住鼠标左键在屏幕上拖拽，平移摄像机。(上下左右)；
	2、按住鼠标右键在屏幕上拖拽，改变摄像机的朝向。(坐标轴线不变)；
	3、滚动鼠标滚轮，改变摄像机的高度。
	
展示简介：
	1、该场景一个由无数entity组成的场景沙盘
	2、利用鼠标完成对摄像机操作
	3、这些操作涉及到了摄像机移动、旋转、以及调整摄像机高度
	
功能展示：
	1、通过脚本或者DOS命令，用spp.exe引擎运行start.js文件
	2、待程序运行起来后，鼠标左键在屏幕上拖拽，上下左右平移摄像机
	3、按住鼠标右键在屏幕上拖拽，改变摄像机的朝向，即是摄像机旋转
	4、滚动鼠标滚轮，当向前滚动时，摄像机高度降低
	5、滚动鼠标滚轮，当向后滚动时，摄像机高度上升
	
重点实现代码：
	1、start_nologin.js中的场景加载，以及对象创建
	2、effect.js中的摄像机操作详细实现，61---190行
	
注意问题：
	1、这三个功能实现，之间没有什么联系，是互相独立的，不过，可能存在对象干扰
	2、在获取摄像机对象后，一定要指定sector对象，78行
	3、当在摄像机下拿到摄像机transform对象后，当这个对象数据发生变化，比如：用LookAt()等方法后，要把此时的transform重置给摄像机transform
	
动态模型：(见代码注释)
	/*   总体流程   */
		1、初始化需要的各PC
		2、绑定键盘事件和鼠标事件(函数)
		3、根据绑定发送消息事件
		4、接收事件
	/*   具体实现   */
		1、拿到摄像机transform
		2、通过LookAt()或Quaternion()对transform进行设置
		3、将此时transform用SetTransform()进行重置
		4、将重置后transform赋值给摄像机transform
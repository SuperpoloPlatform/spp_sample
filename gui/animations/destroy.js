//this is a test.

try {

Plugin.Load("spp.script.gui.cegui");
Event.Send("application.open",true);

if(1)
{
GUI.Initialize();

VFS.PushDir("/zoom");
var scheme = GUI.Schemes.Load("zoom.scheme");
GUI.System.SetDefaultMouseCursor("zoom", "MouseArrow");
GUI.Fonts.CreateFont("FangSong",18, "/fonts/SIMHEI.TTF",true);
win = GUI.Windows.LoadWindowLayout("zoom.layout");
GUI.System.root = win;

if(!GUI.Animations.LoadAnimations("destroy.animation"))
{
	alert("destroy.animation文件导入失败了!!");
}
	
var btn1 = GUI.Windows.Get("Demo7/Window1/Quit");

btn1.Subscribe(GUI.Windows.MouseEnters,function(){
	//播放xml中定义的动画
	var test1 = GUI.Animations.GetAnimation("test1");
	if(!test1)
	{
		alert("动画'test1'获取失败!!");
	}
	else
	{
		var instant = GUI.Animations.InstantiateAnimation(test1);
		instant.SetTargetWindow(btn1);
		instant.Start();
	}
});

btn1.Subscribe(GUI.Windows.MouseLeaves,function(){
	//播放js中定义的动画
	test2 = GUI.Animations.GetAnimation("test2");
	if(!test2)
	{
		//切记不要创建相同名称的动画
		var test2 = GUI.Animations.CreateAnimation("test2");
		//持续0.3秒
		test2.duration = 0.3;
		//循环播放
		test2.mode = 1;
		
		//创建动画的影响器，通过float的插值器来影响Alpha的值
		var effector2 = test2.CreateAffector(test2,"Alpha", "float");
		//0.0秒窗口的Alpha为1.0，0.3秒窗口的Alpha为0.2，动画前进类型为减速
		effector2.CreateKeyFrame(0.0, "1.0",2);
		effector2.CreateKeyFrame(0.3, "0.2",2);
	}
	if(test2)
	{
		var instant = GUI.Animations.InstantiateAnimation(test2);
		instant.SetTargetWindow(btn1);
		instant.Start();
	}
});


var btn2 = GUI.Windows.Get("Demo7/Window1/test2");

btn2.Subscribe(GUI.Windows.Clicked,function(){
	//如果删除Animation对象，必须重新定义动画方可使用，所以一般情况下删除Animation的实例即可
	//GUI.Animations.DestroyAnimation("test2");
	//GUI.Animations.DestroyAnimation("test1");
		
	//获取test2对象，将其实例化的所有instance全部销毁
	var test2 = GUI.Animations.GetAnimation("test2");
	if(test2)
	{
		GUI.Animations.DestroyAnimationInstance(test2);
	}	
	//获取instance的总数
	alert(GUI.Animations.GetNumAnimationInstances());
	//获取0下标处的instance，如果存在则销毁
	var instance1 = GUI.Animations.GetAnimationInstanceAtIdx(0);
	if(instance1)
	{
		GUI.Animations.DestroyAnimationInstance(instance1);
	}
});
	
VFS.PopDir ();
}

view = new iView(C3D.engine,C3D.g3d);
var count = Event.InstallHelper('3d',view,'frame');

}catch(e){
alert('error:',e);
}
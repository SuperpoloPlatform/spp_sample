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

if(!GUI.Animations.LoadAnimations("float.animation"))
{
	alert("animation文件导入失败了!!");
}

var anim1 = GUI.Animations.GetAnimation("test1");
if(!anim1)
{
	alert("动画获取失败了!!");
}
	
var anim2 = GUI.Animations.GetAnimation("test2");
if(!anim2)
{
	alert("动画获取失败了!!");
}
	
var btn1 = GUI.Windows.Get("Demo7/Window1/Quit");
btn1.Subscribe(GUI.Windows.MouseLeaves,function(){
	var instant = GUI.Animations.InstantiateAnimation(anim1);
	instant.SetTargetWindow(btn1);
	instant.Start();
	});
btn1.Subscribe(GUI.Windows.MouseEnters,function(){
	var instant = GUI.Animations.InstantiateAnimation(anim2);
	instant.SetTargetWindow(btn1);
	instant.Start();
	});

var anim3 = GUI.Animations.GetAnimation("test3");
if(!anim3)
{
	alert("动画获取失败了!!");
}
var btn2 = GUI.Windows.Get("Demo7/Window1/test2");
btn2.SetProperty("AutoRenderingSurface","True");
btn2.Subscribe(GUI.Windows.MouseEnters,function(){
	var instant = GUI.Animations.InstantiateAnimation(anim3);
	instant.SetTargetWindow(btn2);
	instant.Start();
	});
	
VFS.PopDir ();
}

view = new iView(C3D.engine,C3D.g3d);
var count = Event.InstallHelper('3d',view,'frame');

}catch(e){
alert('error:',e);
}
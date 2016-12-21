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
var font = GUI.Fonts.CreateFont("FangSong",16, "/fonts/SIMHEI.TTF",true);
win = GUI.Windows.LoadWindowLayout("zoom.layout");
GUI.System.root = win;

if(!GUI.Animations.LoadAnimations("bool.animation"))
{
	alert("animation文件导入失败了!!");
}

var anim = GUI.Animations.GetAnimation("test");
if(!anim)
{
	alert("动画获取失败了!!");
}

var btn = GUI.Windows.Get("Demo7/Window1/Quit");
btn.Subscribe(GUI.Windows.Clicked,function(){
	var instant = GUI.Animations.InstantiateAnimation(anim);
	instant.SetTargetWindow(btn);
	instant.Start();
	});


VFS.PopDir ();
}

view = new iView(C3D.engine,C3D.g3d);
var count = Event.InstallHelper('3d',view,'frame');

}catch(e){
alert('error:',e);
}
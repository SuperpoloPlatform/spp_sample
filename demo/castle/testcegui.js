//this is a test.

try {

Plugin.Load("spp.script.gui.cegui");
Event.Send("application.open",true);

if(1)
{
GUI.Initialize();
alert("GUI.Initialized="+GUI.Initialized);
//GUI.System.Subscribe(GUI.System.EventSingleClickTimeoutChanged,function(){alert('event changed');});
//GUI.System.singleClickTimeout = 1;
//GUI.System.FireEvent(GUI.System.EventSingleClickTimeoutChanged);
//pleae set breakpoint in C++ code,file ceguiWrapUtils.h :: EventSet_Callable::~EventSet_Callable(){}.
//this destructor will been called after the next statement finish.
//GUI.System.RemoveEvent(GUI.System.EventSingleClickTimeoutChanged);

VFS.PushDir("/cegui");
var scheme = GUI.Schemes.Load("ice.scheme");
alert("scheme="+scheme);
GUI.System.SetDefaultMouseCursor("ice", "MouseArrow");
var font = GUI.Fonts.CreateFont("FangSong",16, "/fonts/SIMHEI.TTF",true);
//var font = GUI.Fonts.CreateFont("FreeType","Vera", "/font/ttf/Vera.ttf");
alert("font="+font);
//e = font.SetProperty("PointSize", "16");
//e = font.SetProperty("AutoScaled", "true");
//alert(e);
//e = font.Load();
//alert(e);
win = GUI.Windows.LoadWindowLayout("ice.layout");
//alert("win.type="+win.type);
//alert("win.name="+win.name);
//alert("GUI.System.root="+GUI.System.root);
GUI.System.root = win;
alert("GUI.System.root="+GUI.System.root);

var win1 = GUI.Windows.Get("Demo7/Window1");
//animation test
var anim = GUI.Animations.CreateAnimation("test");
alert("animation="+anim);
anim.duration = 3.3;
anim.mode = 0;

//var effector1 = anim.CreateAffector(anim,"YRotation", "float");
//alert("effector1="+effector1);
//effector1.CreateKeyFrame(0.0, "1.0",1);
//effector1.CreateKeyFrame(0.3, "10.0",1);

var effector2 = anim.CreateAffector(anim,"Alpha", "float");
alert("effector2="+effector2);
effector2.CreateKeyFrame(0.0, "1.0",2);
effector2.CreateKeyFrame(0.3, "0.2",2);

var btn = GUI.Windows.Get("Demo7/Window1/Quit");
alert("btn="+btn);
btn.Subscribe(GUI.Windows.Clicked,function(){
	var instant = GUI.Animations.InstantiateAnimation(anim);
	//alert("instant="+instant);
	instant.SetTargetWindow(btn);
	instant.Start(false);

	//alert('button clicked!');
	});


VFS.PopDir ();
}

view = new iView(C3D.engine,C3D.g3d);
var count = Event.InstallHelper('3d',view,'frame');
alert(count);


}catch(e){
alert('error:',e);
}
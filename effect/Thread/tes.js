
// alert('sss');

try{

Plugin.Load("spp.script.cspace.core");
Event.Send("application.open",true);
require("ui.js");
engine = Registry.Get('iEngine');
engine.saveable = true;
// var ThreadReturn = Registry.Get('iThreadReturn');
// alert(ThreadReturn);
threadedloader = Registry.Get('iThreadedLoader');
alert(threadedloader);
g3d = Registry.Get('iGraphics3D');
vc = Registry.Get('iVirtualClock');
cd = Registry.Get('iCollideSystem');
var CONSOLE = Registry.Get("iConsole");
view = new iView(engine,g3d);

g3d.driver2d.native.SetTitle("test");

threadedloader.flags = 1;
var f = threadedloader.flags;
alert(f);

vfs = Registry.Get('iVFS');
alert(vfs.GetCwd());
var UpdateProgress = function (count) {
        CONSOLE.WriteLine("[Debug] <UI> UpdateProgress.........");
        Event.Send({
            name : "ui.progress.count.set",
            addCount : count
        });
    }
if(!load("progresslayout.js"))
{
	alert("加载 progresslayout.js 异常！");
}

if(!load("uischeme.js"))
{
	alert("加载 uischeme.js 异常！");
}
if(!load("weapon.js"))
{
	alert("加载 weapon.js 异常！");
}

if(!load("scenelayout.js"))
{
	alert("加载 scenelayout.js 异常！");
}
GUI.CreateObjectScheme(SCHEMEDATA,"/ui");
GUI.CreateObjectLayout(PROGRESS_LAYOUT,"/ui");  //UI进度条加载语句
UpdateProgress(1);
ThreadReturn1 = threadedloader.LoadMapFile(vfs.GetCwd(),'world.xml'); //,true,0);  '/'

if(ThreadReturn1.WasSuccessful())
{
	UpdateProgress(1);
	if(ThreadReturn1.IsFinished() == true)
	{
		UpdateProgress(1);alert('呵呵');
		// threadedloader.LoadMapFile('/','world.xml',true);
	}
}
var count = Event.InstallHelper('3d',view,'frame');
// a = threadedloader.LoadLibrary('/','world.xml');
// Vart = ThreadReturn1.IsFinished(); //.Wait(true)  // .WasSuccessful()  //.IsFinished()

// System.Sleep(10);
// UpdateProgress(1);
// System.Sleep(10);
// UpdateProgress(1);

var Var;
// if(ThreadReturn1)
// {// ThreadReturn1.Wait(true);
// if(!load("/zoom.js")) 
	// alert('加载异常！');
// else if(ThreadReturn1.WasSuccessful())
	// Vart = ThreadReturn1.IsFinished();
	// alert(Vart);
// }

var handler = { OnKeyboard : function(e){
	{//up
		if(e.keyCodeRaw == 113) //'q'
		{
			if(e.keyEventType == 1)
				System.Quit();
		}else if(e.keyCodeRaw == 114) //'r'
		{
			if(e.keyEventType == 1)
				// g3d.driver2d.fullscreen = !g3d.driver2d.fullscreen;
			{
				//	sleep(10000);
				alert('r触发');
				loader = Registry.Get('iLoader');
				Var = loader.LoadMapFile('world.xml',true); //,0,true,true);//倒数第二个为false时，旋转但色彩异常
				alert(Var);
				main();
			}			
		}else if(e.keyCodeRaw == 32) //'e'
		{
			if(e.keyEventType == 1)
			{
				g3d.driver2d.close = 1;
				load("/zoom.js");
			}
		}
	}
} };
var onkeyDownID = Event.Subscribe(handler,"crystalspace.input.keyboard");

// ThreadReturn1 = threadedloader.LoadImage('/','abc.png');
// alert("b:",ThreadReturn1.IsFinished());

if(ThreadReturn1)
{
	main();
	alert('camera true!');
}
function main()
{
	engine.setVFSCache("/cache");
	engine.Prepare();
	if(engine.camPositions.count)
	{
		var cp = engine.camPositions.Get(0);
		cp.Load(view.camera,engine);
	//	UpdateProgress(2);
	}else{
		room = engine.sectors.FindByName("room");
		if(room)
		{
			view.camera.sector = room;
		}
	}
	bVar = cd.InitializeCollision(engine);
	actor = new ColliderActor(cd,engine);
	actor.InitializeColliders(view.camera,[0.3,0.8,0.2],[0.4,1,0.3],[0,-1.5,0]);
	actor.gravity = 0;
	actor_inited = true;
}

}catch(e){
alert('error:',e);
}

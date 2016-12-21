//this is a test.

try {

Plugin.Load("spp.script.cspace.core");
Event.Send("application.open", true);

var handler = {
	OnKeyboard : function(e) {
		// 当键盘按键被按下的时候。
		if(e.keyEventType == 1)
		{
			if(e.keyCodeRaw == 113) //'q'
			{
				System.Quit();
			}
			else if(e.keyCodeRaw == 101)	//e
			{
				view.camera.Move([0, .1, 0]);
			}
			else if(e.keyCodeRaw == 97)		//a
			{
				view.camera.Move([-.1, 0, 0]);
			}
			else if(e.keyCodeRaw == 100)	//d
			{
				view.camera.Move([.1, 0, 0]);
			}
			else if(e.keyCodeRaw == 99)		//c
			{
				view.camera.Move([0, -.1, 0]);
			}
			else if(e.keyCodeRaw == 119)	//w
			{
				view.camera.Move([0, 0, .1]);
			}
			else if(e.keyCodeRaw == 115)	//s
			{
				view.camera.Move([0, 0, -.1]);
			}
		}
	}
};

var onkeyDownID = Event.Subscribe(handler, "crystalspace.input.keyboard");

engine = Registry.Get('iEngine');
g3d = Registry.Get('iGraphics3D');
view = new iView(engine, g3d);
Event.InstallHelper('3d', view, 'frame');

// 设置窗口标题栏显示文字。
g3d.driver2d.native.SetTitle("Only a Testing");

// 加载一个场景。
loader = Registry.Get('iLoader');
var bVar = loader.LoadMapFile('world.xml');

if(bVar)
{
	engine.setVFSCache("/cache");
	engine.Prepare();
	
	// 场景中是否有<start>节点来表示摄像机的初始位置。
	if(engine.camPositions.count)
	{
		var iCameraPosition = engine.camPositions.Get(0);
		iCameraPosition.Load(view.camera, engine);
	}
	else
	{
		var iSector = engine.sectors.FindByName("room");
		if(iSector)
		{
			view.camera.sector = iSector;
		}
	}
}



}catch(e){
alert('error:',e);
}
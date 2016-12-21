try {
Plugin.Load("spp.script.cspace.core");
Event.Send("application.open",true);
engine = Registry.Get('iEngine');
//mymesh = Registry.Get("iMesh");
g3d = Registry.Get('iGraphics3D');
vc = Registry.Get('iVirtualClock');
cd = Registry.Get('iCollideSystem');
view = new iView(engine,g3d);
var count = Event.InstallHelper('3d',view,'frame');
aeval(function()
{
loader = Registry.Get('iLoader');
var bVar = loader.LoadMapFile('world');
if(bVar)
{
	engine.setVFSCache("/cache");
	engine.Prepare();
	cam = view.camera;
	alert(cam);  //打印是否获取到camera对象
	var result= cam.center ;
	alert(result);    //打印出数组信息
	alert(result[0]);   //获得X轴的偏移量
	alert(result[1]);   //获得Y轴的偏移量
	
	
	if(engine.camPositions.count)
	{
		var cp = engine.camPositions.Get(0);
		cp.Load(view.camera,engine);
	}
	else
	{
		room = engine.sectors.FindByName("room");
		if(room)
		{
			view.camera.sector = room;
		}
	}
}
}
);
}catch(e){
alert('error:',e);
}
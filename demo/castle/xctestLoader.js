try {
Plugin.Load("spp.script.cspace.core");
Event.Send("application.open",true);
engine = Registry.Get('iEngine');

g3d = Registry.Get('iGraphics3D');
vc = Registry.Get('iVirtualClock');
cd = Registry.Get('iCollideSystem');
view = new iView(engine,g3d);
var count = Event.InstallHelper('3d',view,'frame');
aeval(function()
{
loader = Registry.Get('iLoader');
var bVar = loader.LoadShader('lightmaps');
if(bVar)
{
	engine.setVFSCache("/cache");
	engine.Prepare();
	alert(bVar)
	 iobj = engine.sectors  //取到sectorlist
	 alert(iobj);
	 sec = iobj.count   	 //得到sector个数，相同的名字当一个处理
	 alert(sec);
	for(var i=0;i<sec;i++)
	{
	secto = iobj.Get(i)    //按标签index取到对应的sector
	//alert(secto);
	obj = secto.object    // 取到sector的object
    //addChild(secto);
	//namelist = parent(obj);
	alert(obj.name);      //输出object的名字，对照world文件
       }

	 
	
    
   
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
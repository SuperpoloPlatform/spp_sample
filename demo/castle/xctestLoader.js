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
	 iobj = engine.sectors  //ȡ��sectorlist
	 alert(iobj);
	 sec = iobj.count   	 //�õ�sector��������ͬ�����ֵ�һ������
	 alert(sec);
	for(var i=0;i<sec;i++)
	{
	secto = iobj.Get(i)    //����ǩindexȡ����Ӧ��sector
	//alert(secto);
	obj = secto.object    // ȡ��sector��object
    //addChild(secto);
	//namelist = parent(obj);
	alert(obj.name);      //���object�����֣�����world�ļ�
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
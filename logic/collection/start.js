/**************************************************************************
 *
 *  This file is part of the UGE(Uniform Game Engine).
 *  Copyright (C) by SanPolo Co.Ltd. 
 *  All rights reserved.
 *
 *  See http://uge.spolo.org/ for more information.
 *
 *  SanPolo Co.Ltd
 *  http://uge.spolo.org/  sales@spolo.org uge-support@spolo.org
 *
**************************************************************************/

try {

Plugin.Load("spp.script.cspace.core");
Event.Send("application.open",true);

var frameCount = 0;

var velocity = [0,0,0];
var angle_velocity = [0,0,0];


var handler = { OnKeyboard : function(e){
	//if(e.keyEventType == 1)
	{//up
		if(e.keyCodeRaw == 113) //'q'
		{
			if(e.keyEventType == 1)
				System.Quit();
		}else if(e.keyCodeRaw == 114) //'r'
		{
			if(e.keyEventType == 1)
				g3d.driver2d.fullscreen = !g3d.driver2d.fullscreen;
		}else if(e.keyCodeRaw == 101) //e
		{
			if(e.keyEventType == 1)
			{
				angle_velocity[0] = 1;
				velocity[1] = 1;
			}else{
				angle_velocity[0] = 0;
				velocity[1] = 0;
			}
		}else if(e.keyCodeRaw == 97) //a
		{
			if(e.keyEventType == 1)
			{
				angle_velocity[1] = -0.5;
				velocity[0] = -0.5;
			}else{
				angle_velocity[1] = 0;
				velocity[0] = 0;
			}
		}else if(e.keyCodeRaw == 100) //d
		{
			if(e.keyEventType == 1)
			{
				velocity[0] = 0.5;
				angle_velocity[1] = 0.5;
			}else{
				angle_velocity[1] = 0;
				velocity[0] = 0;
			}
		}else if(e.keyCodeRaw == 99) //c
		{
			if(e.keyEventType == 1)
			{
				angle_velocity[0] = -1;
				velocity[1] = -0.5;
			}else{
				angle_velocity[0] = 0;
				velocity[1] = 0;
			}
			view.camera.Move([0,-.1,0]);
		}else if(e.keyCodeRaw == 119) //w
		{
			if(e.keyEventType == 1)
			{
				velocity[2] = 0.5;
			}else{
				velocity[2] = 0;
			}
			view.camera.Move([0,0,.1]);
		}else if(e.keyCodeRaw == 115) //s
		{
			if(e.keyEventType == 1)
			{
				velocity[2] = -0.5;
			}else{
				velocity[2] = 0;
			}
			view.camera.Move([0,0,-.1]);
		}else if(e.keyCodeRaw == 106) //j jump
		{
			if(e.keyEventType == 1)
			{
				if(actor.onGround)//only can jump when we are on ground!
					velocity[1] = 5;
			}else{
				velocity[1] = 0;
			}
			view.camera.Move([0,-.1,0]);
		}else if(e.keyCodeRaw == 112) //p
		{
			if(e.keyEventType == 1)
				alert("frameCount=",frameCount);
		}
	}
} };

var onkeyDownID = Event.Subscribe(handler,"crystalspace.input.keyboard");

var actor;
var view;
var vc;
var actor_inited = false;
var frameHandler = Event.Subscribe({
 genericName : "testFrame",
 phase : "3d",
 Frame : function(){
	frameCount++;
	if(actor_inited)
	{
		var delta = vc.elapsed / 1000.0;
		actor.Move(delta,6,velocity,angle_velocity);
	}
 }
},"frame");

vc = Registry.Get('iVirtualClock');
cd = Registry.Get('iCollideSystem');
view = new iView(C3D.engine, C3D.g3d);
var count = Event.InstallHelper('3d',view,'frame');
//alert(count);

//alert('System.thread=',System.thread);

C3D.g3d.driver2d.native.SetTitle("Only a Testing");

//next demo how to load context in another thread.
(function(){
var collection = C3D.engine.CreateCollection("test_collection");

var bVar = C3D.loader.LoadMapFile('world.xml', false, collection);
//collection.Remove();



{
	C3D.loader.LoadMeshObject("/monster.xml");
	C3D.loader.LoadLibrary("/meshgen.xml", collection);
	
	var meshwrapper = C3D.engine.FindMeshObject("monster");
	var obj = C3D.engine.FindMeshObject("obj");
	var player = C3D.engine.FindMeshObject("player");
	
	if( meshwrapper && player && obj )
	{
		// 给新添加的meshobj设定一个位置。
		// meshwrapper.movable.pos = [-5, 0, 0];
		/*meshwrapper.movable.Update(); //更新粒子效果的位置，让其跟随player显示
		var sectorlist = engine.sectors;
		var sec = sectorlist.Get(0);
		var meshlist = sec.meshes; //获取到sector的mesh列表
		EXIST_YANG = meshlist.Add(meshwrapper);   //将获取到的对象插入到列表中 attack_effect_index是一个它的index
		//alert("the index of yang is " + EXIST_YANG);*/
		
		collection.Add(meshwrapper.object);
		// 此时不需要再次添加，LoadLibraryFile的时候已经将xml文件中的meshobj添加到collection
		// collection.Add(monster.object);
		
		// 从collection中Find加载进来的meshobj
		var a = collection.FindMeshObject("player");
		var b = collection.FindMeshObject("obj");
		
		// 添加到sector中，然后进行显示
		C3D.engine.sectors.Get(0).meshes.Add(a);
		C3D.engine.sectors.Get(0).meshes.Add(b);
	}
	else
	{
		alert("failed to add mesh");
	}
}













//alert('loader.LoadMapFile() result=',bVar);
//alert('System.thread=',System.thread);
if(bVar)
{
	C3D.engine.setVFSCache("/cache");
	C3D.engine.Prepare();
	//alert('engine.camPositions.count=',engine.camPositions.count);
	if(C3D.engine.camPositions.count)
	{
		var cp = C3D.engine.camPositions.Get(0);
		cp.Load(view.camera, C3D.engine);
	}
	else
	{
		room = C3D.engine.sectors.FindByName("room");
		if(room)
		{
			view.camera.sector = room;
		}
	}
	bVar = cd.InitializeCollision(C3D.engine);
	//alert('cd.InitializeCollision(engine)=',bVar);
	actor = new ColliderActor(cd, C3D.engine);
	actor.InitializeColliders(view.camera,[0.3,0.8,0.2],[0.4,1,0.3],[0,-1.5,0]);
	actor_inited = true;
}
}
)();

}catch(e){
alert('error:',e);
}
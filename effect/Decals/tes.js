
try{
var fntserver = Registry.Get("iFontServer","crystalspace.font.server.default");
Plugin.Load("spp.script.cspace.core");
Event.Send("application.open",true);
engine = Registry.Get('iEngine');
engine.saveable = true;
threadedloader = Registry.Get('iThreadedLoader');
g3d = Registry.Get('iGraphics3D');
vc = Registry.Get('iVirtualClock');
cd = Registry.Get('iCollideSystem');
view = new iView(engine,g3d);
var count = Event.InstallHelper('3d',view,'frame');
g3d.driver2d.native.SetTitle("test");

loader = Registry.Get('iLoader');
Var = loader.LoadMapFile('world.xml',true);

var handler = { OnKeyboard : function(e){
	{//up
		if(e.keyCodeRaw == 113) //'q'
		{
			if(e.keyEventType == 1)
				System.Quit();
		}else if(e.keyCodeRaw == 114) //'r'   
		{
			if(e.keyEventType == 1)
			{
				iDecalManager = C3D.decalmgr;//Registry.Get('iDecalManager');
				alert(iDecalManager);
				
				mesh = engine.FindMeshObject('Cube');
				obj = mesh.meshObject;
				matWrap = obj.matWrap;	// Material wrapper for your decal.
				alert(matWrap);
				
				var texturemanager = g3d.texturemanager;
				var color = ('0','0','0');
				var itexturewrapper = engine.CreateTexture('kd.jpg', '/textures/kd.jpg',color, 'CS_TEXTURE_3D');//Texture的名称，图片的路径，后面两参数可缺省。spark.png
				itexturewrapper.Register(texturemanager);
				//create new material
				// var texturetemp = engine.FindTexture('BUMPHDZW_02N.TGA');
				var newmaterial = engine.CreateMaterial( 'material1', itexturewrapper);
				alert(newmaterial);
				
				// a = loader.LoadTexture("decal", "/textures/spark.png");
				// alert(a);
				// material = engine.materials.FindByName("decal");
				// alert(material);
				
				iDecalTemplate = iDecalManager.CreateDecalTemplate(newmaterial);//matWrap material
				iDecalTemplate.livetime = 2.0;
				alert(iDecalTemplate.livetime);
				mesh = engine.FindMeshObject('Plane');
				var v0 = new Math3.Vector3(0,2.73355e-006,-1);
				var v1 = new Math3.Vector3(0,0,2);
				var v2 = new Math3.Vector3(0,2,0);
				iDecal = iDecalManager.CreateDecal(iDecalTemplate,mesh,v0,v1,v2);//,0.5,0.5);//后面可以加三个参数 float width, float height, iDecal * oldDecal
																				//‘width’ The width of the decal. 贴花的宽度
                                                                                //‘height’ The height of the decal.高度
                                                                                //‘oldDecal’ This is an optional parameter. If you're recreating a decal (ie, moving/rotating an old decal) you can pass your old decal. 
																				//The decal manager will recycle this decal as much as possible so that supplying an old decal is more efficient than deleting the old decal manually and creating a new one from scratch. 
				alert(iDecalManager.GetDecalCount());
				
			}			
		}
		else if(e.keyCodeRaw == 115) //'s'   
		{
			if(e.keyEventType == 1)
			{
				
			}
		}
		else if(e.keyCodeRaw == 116)//'t' 通过替换material中的shadervar的texture来变换贴图
		{
			if(e.keyEventType == 1)
			{
				wrap = engine.FindMeshObject('WoodCube'); //根据名称取得iMeshWrapper对象
				obj = wrap.meshObject;//iMeshObject对象
				materialWrap = obj.matWrap;//iMaterialWrapper
				var material = materialWrap.material;//iMaterial
				var csShaderVarArray = material.Get();
				var shadervar  = new C3D.ShaderVariable();
				itexturewrapper = Registry.Get('iTextureWrapper');
				var texturemanager = g3d.texturemanager;
				var color = ('0','0','0');
				var itexturewrapper = engine.CreateTexture('kd.jpg', '/textures/kd.jpg',color, 'CS_TEXTURE_2D');//Texture的名称，图片的路径，后面两参数可缺省。box.jpg
				itexturewrapper.Register(texturemanager);
				if ( csShaderVarArray.length < 1 ) {
					alert('NULL');
				}else{
					for (i in csShaderVarArray){//tex diffuse
						if(csShaderVarArray[i].type == shadervar.TEXTURE)
						{						                                               
							csShaderVarArray[i].SetValue(itexturewrapper,shadervar.TEXTURE);
							// material.Replace(csShaderVarArray[i]);
							material.Add(csShaderVarArray[i]);
						}
					}
				}
			}
		}
	}
} };
var onkeyDownID = Event.Subscribe(handler,"crystalspace.input.keyboard");
if(Var)
{
	main();
}
function main()
{
	engine.setVFSCache("/cache");
	engine.Prepare();
	if(engine.camPositions.count)
	{
		var cp = engine.camPositions.Get(0);
		cp.Load(view.camera,engine);
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

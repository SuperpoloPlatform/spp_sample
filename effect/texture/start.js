
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
		}else if(e.keyCodeRaw == 114) //'r'   把指定名称的meshobj的材质替换为已有的Material（标签）
		{
			if(e.keyEventType == 1)
			{
				wrap = engine.FindMeshObject('WoodCube'); //根据名称取得iMeshWrapper对象
				obj = wrap.meshObject;//iMeshObject对象
				// factory = obj.GetFactory();//iMeshObjectFactory
				// iMeshFactoryWrapper = factory.meshFactoryWrapper; //
				// iShaderVariableContext = iMeshFactoryWrapper.context;
				// iMaterialList = engine.materials;
				// materialWrap = obj.matWrap;//iMaterialWrapper
				// material = materialWrap.material;//iMaterial
				// if (imaterial instanceof  Object);
				mat = engine.FindMaterial('Material4');
				obj.matWrap = mat;/*
				if(material)
				{
					var shadervar  = new C3D.ShaderVariable();//material.GetShader('tex normal');
					//按照type分开处理
					// mae = new variableStruct(material, 'tex normal', shadervar.TEXTURE, '/textures/box.jpg');
					// var itexturewrapper = engine.FindTexture('box.jpg');     
					var itexturewrapper = engine.CreateTexture('box.jpg', '/textures/box.jpg');
					shadervar.name = 'tex normal';//mae.shadervarName;
					shadervar.type = shadervar.TEXTURE;//mae.shadervarType;
					shadervar.SetValue(itexturewrapper);
					alert(shadervar.name,shadervar.type,shadervar.GetValue()); //测试赋值
					// var csShaderVariable = material.GetShader('tex normal');
					// if (csShaderVariable instanceof  Object)
						// iShaderVariableContext.Remove(csShaderVariable);
					alert(iShaderVariableContext);
					i = iShaderVariableContext.Add(shadervar);
					// j = iShaderVariableContext.Replace(shadervar);
					// iShaderVariableContext.Clear();
					// iMaterialList.Add(materialWrap);
					// iMaterialList.Remove();
					k = material.Add(shadervar);
					// j = material.SetValue(itexturewrapper);
					alert(i,k);
				}else {
					alert('material is null!');
				}
				*/
				// obj.SetMaterialWrapper(materialWrap);
				// loader.LoadMapFile('world.xml',true);
			}			
		}
		else if(e.keyCodeRaw == 115) //'s'   把meshobject的材质替换为一张图片
		{
			if(e.keyEventType == 1)
			{
				wrap = engine.FindMeshObject('WoodCube'); //根据名称取得iMeshWrapper对象
				obj = wrap.meshObject;//iMeshObject对象
			/*	factory = obj.GetFactory();//iMeshObjectFactory
				iMeshFactoryWrapper = factory.meshFactoryWrapper; //
				iShaderVariableContext = iMeshFactoryWrapper.context;
				// iShaderVariableContext.Add();
				// var shadervar  = C3D.ShaderVariable;//new C3D.ShaderVariable();
				// alert(shadervar);
				alert(iMeshFactoryWrapper.object);
				shadervar = iMeshFactoryWrapper.GetInstances();//未获得对象
				alert(shadervar.name);
				var itexturewrapper = engine.CreateTexture('box.jpg', '/textures/box.jpg');
				var iftrue = shadervar.SetValue(itexturewrapper); //ShaderVariable  C3D.
				alert(iftrue);
				*/
				// materialWrap = obj.matWrap;//iMaterialWrapper
				// var materialWrap = engine.FindMaterial('Material4');//Material_Wood 
				// var material = materialWrap.material;//iMaterial
				// var csShaderVariable = material.Get('tex diffuse',true);
				// itexturewrapper = Registry.Get('iTextureWrapper');
				var texturemanager = g3d.texturemanager;
				var color = ('0','0','0');
				var itexturewrapper = engine.CreateTexture('box.jpg', '/textures/box.jpg',color, 'CS_TEXTURE_2D');//Texture的名称，图片的路径，后面两参数可缺省。
				itexturewrapper.Register(texturemanager);
				//create new material
				// var texturetemp = engine.FindTexture('BUMPHDZW_02N.TGA');
				var newmaterial = engine.CreateMaterial( 'material1', itexturewrapper);
				obj.matWrap = newmaterial;
				// var itexturewrapper = engine.FindTexture('box.jpg');//获取已有的texture
				// bool = csShaderVariable.SetValue(itexturewrapper);//.handle
				// alert(bool,csShaderVariable.name);
				// bool1 = material.Replace(csShaderVariable); alert(bool1); //Replace  Add
				
				// material.Add(shadervar);
			}
		}
		else if(e.keyCodeRaw == 116)//'t' 通过替换material中的shadervar的texture来变换贴图，正解
		{
			if(e.keyEventType == 1)
			{
				wrap = engine.FindMeshObject('WoodCube'); //根据名称取得iMeshWrapper对象
				obj = wrap.meshObject;//iMeshObject对象
				materialWrap = obj.matWrap;//iMaterialWrapper
				var material = materialWrap.material;//iMaterial
				var csShaderVarArray = material.Get(); //继承iShaderVariableContext的Get()方法
				var shadervar  = new C3D.ShaderVariable(); //获取csShaderVariable对象
				//itexturewrapper = Registry.Get('iTextureWrapper');
				var texturemanager = g3d.texturemanager; 
				var color = ('0','0','0');
				var itexturewrapper = engine.CreateTexture('box.jpg', '/textures/box.jpg',color, 'CS_TEXTURE_2D');//Texture的名称，图片的路径，后面两参数可缺省。
				itexturewrapper.Register(texturemanager); //注册对象
				if ( csShaderVarArray.length < 1 ) {
					alert('NULL');
				}else{
					for (i in csShaderVarArray){//tex diffuse
						if(csShaderVarArray[i].type == shadervar.TEXTURE)
						{						                                               
							csShaderVarArray[i].SetValue(itexturewrapper,shadervar.TEXTURE);
							// material.Replace(csShaderVarArray[i]);
							//material.Add(csShaderVarArray[i]);
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

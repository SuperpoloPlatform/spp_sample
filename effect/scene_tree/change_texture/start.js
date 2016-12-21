/**************************************************************************
 *  This file is part of the UGE(Uniform Game Engine) of SPP.
 *  Copyright (C) by SanPolo Co.Ltd. 
 *  All rights reserved.
 *  See http://spp.spolo.org/ for more information.
 *
 *  SanPolo Co.Ltd
 *  http://spp.spolo.org/  sales@spolo.org spp-support@spolo.org
**************************************************************************/

/**
使用方法：
数字键（不是小键盘上的数字键）1，2，3分别控制替换三种贴图。
 */

try{

require("keydef.js");

var fntserver = Registry.Get("iFontServer","crystalspace.font.server.default");
Plugin.Load("spp.script.cspace.core");
Event.Send("application.open",true);
engine = Registry.Get('iEngine');
engine.saveable = true;
g3d = Registry.Get('iGraphics3D');
vc = Registry.Get('iVirtualClock');
cd = Registry.Get('iCollideSystem');
view = new iView(engine,g3d);
var count = Event.InstallHelper('3d',view,'frame');
g3d.driver2d.native.SetTitle("动态修改box的贴图");

loader = Registry.Get('iLoader');
Var = loader.LoadMapFile('world.xml',true);

var handler = { OnKeyboard : function(e){
	{//up
		if(e.keyCodeRaw == 113) //'q'
		{
			if(e.keyEventType == 1)
				System.Quit();
		}
		// 把指定名称的meshobj的材质替换为已有的Material（标签）
		else if(e.keyCodeRaw == Event.key.key1)
		{
			if(e.keyEventType == 1)
			{
				var meshObj = getMeshObject('WoodCube');
				var materialWrapper = engine.FindMaterial('Material4');
				meshObj.matWrap = materialWrapper;
			}
		}
		// 把meshobject的材质替换为一张图片
		else if(e.keyCodeRaw == Event.key.key2)
		{
			if(e.keyEventType == 1)
			{
				var obj = getMeshObject('WoodCube');
				var texturemanager = g3d.texturemanager;
				var color = ('0','0','0');
				var itexturewrapper = engine.CreateTexture('box.jpg', '/textures/box.jpg',color, 'CS_TEXTURE_2D');//Texture的名称，图片的路径，后面两参数可缺省。
				itexturewrapper.Register(texturemanager);
				//create new material
				var newmaterial = engine.CreateMaterial( 'material1', itexturewrapper);
				obj.matWrap = newmaterial;
			}
		}
		// 通过替换material中的shadervar的texture来变换贴图，正解
		else if(e.keyCodeRaw == Event.key.key3)
		{
			if(e.keyEventType == 1)
			{
				var obj = getMeshObject('WoodCube');
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

function getMeshObject(name)
{
	var sectorlist = engine.sectors;
	var sec = sectorlist.Get(0);
	var meshlist = sec.meshes;
	var meshWrapper = meshlist.FindByName(name);
	return meshWrapper.meshObject;
}

}catch(e){
alert('error:',e);
}

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
	require("keydef.js");
	var CONSOLE = Registry.Get("iConsole");

	var frameCount = 0;

	var velocity = [0,0,0];
	var angle_velocity = [0,0,0];
	var paused = false;

	var count = Event.InstallHelper('3d','frame');

	aeval(function(){
		loader = Registry.Get('iLoader');
		var bVar = loader.LoadMapFile('world.xml');
	});
	
	alert("数字键“1、2、3、4、5、6、7、8”触发事件,“H”为帮助文档")
	
	var handler = { OnKeyboard : function(e){
		//if(e.keyEvenatType == 1)
		{
			if ( e.keyCodeRaw == Event.key.value.q )
			{
				if ( e.keyEventType == Event.key.type.up )
					System.Quit();
			}
			else if ( e.keyCodeRaw == Event.key.value.numKey1 )
			{
				if ( e.keyEventType == Event.key.type.up )
				{
					sector = C3D.engine.sectors.Remove(10);
				}
			}
			else if ( e.keyCodeRaw == Event.key.value.numKey2 )
			{
				if ( e.keyEventType == Event.key.type.up )
				{
					camPosition = C3D.engine.camPositions.Remove(10);
				}
			}
			else if ( e.keyCodeRaw == Event.key.value.numKey3 )
			{
				if ( e.keyEventType == Event.key.type.up )
				{
					variable = C3D.engine.variables.Remove(10);
				}
			}
			else if ( e.keyCodeRaw == Event.key.value.numKey4 )
			{
				if ( e.keyEventType == Event.key.type.up )
				{
					meshe = C3D.engine.meshes.Remove(10);
				}
			}
			else if ( e.keyCodeRaw == Event.key.value.numKey5 )
			{
				if ( e.keyEventType == Event.key.type.up )
				{
					meshFactorie = C3D.engine.meshFactories.Remove(10);
				}
			}
			else if ( e.keyCodeRaw == Event.key.value.numKey6 )
			{
				if ( e.keyEventType == Event.key.type.up )
				{
					material = C3D.engine.materials.Remove(10);
				}
			}
			else if ( e.keyCodeRaw == Event.key.value.numKey7 )
			{
				if ( e.keyEventType == Event.key.type.up )
				{
					texture = C3D.engine.textures.Remove(10);
				}
			}
			else if ( e.keyCodeRaw == Event.key.value.numKey8 )
			{
				if ( e.keyEventType == Event.key.type.up )
				{
					sectorRight = C3D.engine.sectors.Get(0);
					light = sectorRight.lights.Remove(10);
				}
			}
			else if ( e.keyCodeRaw == Event.key.value.h )
			{
				if ( e.keyEventType == Event.key.type.up )
				{
					CONSOLE.WriteLine("\nQ键退出\n");
					CONSOLE.WriteLine("\n按数字键“1”：从iSectorList中删除iSector\n");
					CONSOLE.WriteLine("\n按数字键“2”：从iCameraPositionList中删除iCameraPosition\n");
					CONSOLE.WriteLine("\n按数字键“3”：从iSharedVariableList中删除iSharedVariable\n");
					CONSOLE.WriteLine("\n按数字键“4”：从iMeshList中删除iMeshWrapper\n");
					CONSOLE.WriteLine("\n按数字键“5”：从iMeshFactoryList中删除iMeshFactoryWrapper\n");
					CONSOLE.WriteLine("\n按数字键“6”：从iMaterialList中删除iMaterialWrapper\n");
					CONSOLE.WriteLine("\n按数字键“7”：从iTextureList中删除iTextureWrapper\n");
					CONSOLE.WriteLine("\n按数字键“8”：从iLightList中删除iLight\n");
				}
			}
		}
	} };

	var onkeyDownID = Event.Subscribe(handler,"crystalspace.input.keyboard");
	
}catch(e){
	alert('error:',e);
}
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
	Event.Send("application.open", true);

	alert("Load模型工厂");
	C3D.loader.LoadMeshObjectFactory("/genCube.xml");
	alert("Load实际模型");
	C3D.loader.LoadMeshObject("/cube.xml");

	var meshwrapper = C3D.engine.FindMeshObject("cube");

	alert("获得添加的meshobj的类型 ： " + meshwrapper);

}catch(e){
	alert('error:',e);
}
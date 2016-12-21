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
try{
	/********************************************************************
	*id:{
		name:"" 装备名称
		image:""ui图像
		mesh:""人物模型
	}
	********************************************************************/
	PERSONDATA = {
		"1":{
			name:"女同学",
			image:"set:weapon image:weapon1",
			mesh:"nan1"
		},
		"2":{
			name:"男同学",
			image:"set:weapon image:weapon2",
			mesh:"nvzhanshi2"
		},
		"3":{
			name:"无人模式",
			image:"nopicture",
			mesh:"Cube"
		}
	}
}catch(e)
{
	alert(e);
}
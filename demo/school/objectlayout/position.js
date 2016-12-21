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
	/*********************************************************************
	*id : "数据编号"
	{
		name : "地址名称"
		position_x : "x轴坐标"
		position_y : "y轴坐标"
		position_z : "z轴坐标"
	}
	**********************************************************************/
	POSITION = {
		"0" : {
			name : "east_gate" ,
			position_x : "368.9531" ,
			position_y : "-9.4825" ,
			position_z : "29.7082" 
		},
		"1" : {
			name : "restaurant" ,
			position_x : "-314.9255" ,
			position_y : "-9.4825" ,
			position_z : "242.7464" 
		},
		"2" : {
			name : "library" ,
			position_x : "-146.2777" ,
			position_y : "-9.4825" ,
			position_z : "-422.2508" 
		}
	}
}catch(e){
	alert(e);
}
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

(function(){
	// TODO 这个数据需要Web Tools来创建的。
	load("/objlayout/weapon.js");
	var layout = [
		"girl"
	];
	
	for ( idx in layout )
	{
		load("/objlayout/" + layout[idx] + ".js");
	}
	
	// TODO 暂时没有想到UI应该放在哪里。
	load("/objlayout/scenelayout.js");
})();

}
catch (e)
{
	alert(e);
}
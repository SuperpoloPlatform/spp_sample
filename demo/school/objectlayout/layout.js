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
	( function () {
		var layout = [
			"person",
			"position"
		];
		for (var index in layout )
		{
			if( !load ( "/objectlayout/" + layout[index] + ".js"))
				alert("Failed to load '/objectlayout/" + layout[index] + "'.js'");
		}
		if( ! load("/objectlayout/data.js"))
		{
			alert("Failed to load '/objectlayout/data.js'");
		}
	})();
} catch( e )
{
	alert( e );
}
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

    /************************************************************************/
    /*   SCHEMEDATA start	                                                    */
    /************************************************************************/


	SCHEMEDATA = {
		scheme : {
			filename : "ice.scheme",
			mourseImgSet : "ice",
			mourseImgName : "MouseArrow"
		},
		freeTypeFont : {
			"FangSong7" : {
			    filename : "/fonts/SIMFANG.TTF",
			    pointSize : "17",
				antiAliased : "true",
			    autoScaled : "true",
			    nativeHorzRes : 1440,
				nativeVertRes : 900
			}
		}
	};

}
catch (e)
{
	alert(e);
}
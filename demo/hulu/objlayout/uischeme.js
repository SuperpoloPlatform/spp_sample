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
			filename : "interface.scheme",
			mouseImgSet : "ice",
			mouseImgName : "MouseArrow"
		},
		freeTypeFont : {
		    "HeiTi" : {
			    filename : "/fonts/SIMHEI.TTF",
			    pointSize : "5",
				antiAliased : "true",
			    autoScaled : "true",
			    nativeHorzRes : 1440,
				nativeVertRes : 900
			},
			"FangSongTi" : {
			    filename : "/fonts/SIMFANG.TTF",
			    pointSize : "4",
				antiAliased : "true",
			    autoScaled : "true",
			    nativeHorzRes : 1440,
				nativeVertRes : 900
			},
			"KaiTi" : {
			    filename : "/fonts/SIMKAI.TTF",
			    pointSize : "5",
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
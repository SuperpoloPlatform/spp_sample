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
			filename : "ui.scheme",
			mourseImgSet : "ice",
			mourseImgName : "MouseArrow"
		},
		freeTypeFont : {
			"You8" : {
			    filename : "/art/fonts/SIMYOU.TTF",
			    pointSize : "8",
				antiAliased : "true",
			    autoScaled : "true",
			    nativeHorzRes : 800,
				nativeVertRes : 600
			},
		    "You10" : {
			    filename : "/art/fonts/SIMYOU.TTF",
			    pointSize : "10",
				antiAliased : "true",
			    autoScaled : "true",
			    nativeHorzRes : 800,
				nativeVertRes : 600
			},
			"You12" : {
			    filename : "/art/fonts/SIMYOU.TTF",
			    pointSize : "12",
				antiAliased : "true",
			    autoScaled : "true",
			    nativeHorzRes : 800,
				nativeVertRes : 600
			},
			"You14" : {
			    filename : "/art/fonts/SIMYOU.TTF",
			    pointSize : "14",
				antiAliased : "true",
			    autoScaled : "true",
			    nativeHorzRes : 800,
				nativeVertRes : 600
			}
		}
	};

}
catch (e)
{
	alert(e);
}
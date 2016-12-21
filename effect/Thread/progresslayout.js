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
    /*   PROGRESS_LAYOUT start	                                                    */
    /************************************************************************/
 
    PROGRESS_LAYOUT = {
		//layout文件的名称
	    name : "progress.layout",
		//这里定义的方法为UI事件的处理函数
	    method : {
	        "handerProgressDone" : function () {
	            CONSOLE.WriteLine("[Debug] <UI> handerProgressDone");
	            GUI.Windows.DestroyWindow(GUI.System.root);
	            GUI.CreateObjectLayout(SCENE_LAYOUT,"/ui");
	        }
	    },
	    window : {
	        "progressRoot" : {
	            property: {
                    "Image" : function (obj,propt_name) {
                        GUI.Imagesets.CreateImageset("progressRootBackground","loading.jpg");
	                    obj.SetProperty(propt_name,"set:progressRootBackground image:full_image");

                    }
                },
                event : {
                    
                },
                subscribe : {
                    
                }
	        },
	        "progressRoot/Loading" : {
	            property: {
                    "count" : function (obj,propt_name) {

	                   
                        obj[propt_name] = 3;
                    },
                    "curCount" : function (obj,propt_name) {
                        obj[propt_name] = 0;
                    },
                    "update" : function (obj,propt_name) {
                        //aeval(function () {
	                        CONSOLE.WriteLine("[Debug] <UI> update.........");
        	                Event.Subscribe(spp.hitch(obj,function (e) {
        	                    this.curCount = this.curCount + e.addCount;
        	                    CONSOLE.WriteLine("[Debug] <UI> this.curCount="+this.curCount+"");
                                CONSOLE.WriteLine("[Debug] <UI> this.count="+this.count+"");
        	                    this.SetProperty("CurrentProgress",this.curCount/this.count);
								alert("CurrentProgress="+this.GetProperty("CurrentProgress"));
        	                }),"ui.progress.count.set");
	                    //});
                    }
                },
                event : {
                    "ProgressDone" : "handerProgressDone"
                },
                subscribe : {
                    
                }
	        }
	    }   
	};

}
catch (e)
{
	alert(e);
}
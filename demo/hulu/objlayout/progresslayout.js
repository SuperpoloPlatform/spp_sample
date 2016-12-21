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
	            // alert("[Debug] <UI> handerProgressDone");
	            GUI.Windows.DestroyWindow(GUI.System.root);
	            GUI.CreateObjectLayout(SCENE_LAYOUT,"/ui");
				Event.Send({
					name : "ui.player.status.set",
					player : "玩家",
					cur_hp : player.life,
					max_hp : player.max_hp,
					cup_mp : 0,
					max_mp : player.max_mp,
					level : 1,
					hurt : 10,
					pack : player.pack,
					weapons : player.weapons
				});
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
			"login/animation" : {
	            property: {
                    "animation" : function (obj,propt_name) {
                        /*var anim = GUI.Animations.CreateAnimation("test");
						//持续10.0秒
						anim.duration = 10.0;
						//仅播放一次
						anim.mode = 1;

						//创建动画的影响器，通过float的插值器来影响Alpha的值
						var effector2 = anim.CreateAffector(anim,"Rect", "float");
						//0.0秒窗口的Alpha为1.0，0.3秒窗口的Alpha为0.2，动画前进类型为减速
						effector2.CreateKeyFrame(0.0, "{{0,0},{0,0},{0.1,0},{1,0}}",2);
						effector2.CreateKeyFrame(10.0, "{{1,0},{0,0},{1.1,0},{1,0}}",2);

						var instant = GUI.Animations.InstantiateAnimation(anim);
						instant.SetTargetWindow(obj);
						instant.Start();*/
                    }
                },
                event : {
                    
                },
                subscribe : {
                    
                }
	        },
	        "progressRoot/Loading" : {
	            property: {
                    "curCount" : function (obj,propt_name) {
                        obj[propt_name] = 0;
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
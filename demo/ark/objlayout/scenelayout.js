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
	/*   SCENE_LAYOUT start	                                                    */
	/************************************************************************/
 
	SCENE_LAYOUT = {
		//layout文件的名称
		name : "scene.layout",
		//这里定义的方法为UI事件的处理函数
		method : {
			//在处理函数中使用this可以对应到相应的window上
			setVisible : function () {
			},
			shortCutContainerSingleClicked : function () {
				
			},
			handleDropped : function () {
				
			},
			handleEnters : function () {

			},
			handleLeaves : function () {

			},
			PopConfirmMenu : function () {
				
			},
			handerConfirm : function () {
				
			},
			"handleWeaponChanged" : function () {
				
			},
			"loadPreWindow" : function () {
				
			}
		},
		window : {
			"root" :{
				//JS object的自定义属性
				property: {
					
				},
				//UI事件ID：事件处理函数的字串(事件处理的时候会调用method中的setVisible)
				event : {
					
				},
				//订阅全局事件，在处理函数中使用this可以对应到相应的window上
				subscribe : {
				
				}
			},
			"UI/TopNavBar" :{
				property: {
					"associatedWindow" : function (obj,propt_name) {
						
					}
				},
				event : {
					
				},
				subscribe : {
				
				}
			},
			"UI/BottomRightNav/Up" :{
				property: {
				},
				event : {
					"MouseButtonDown" : function() {
						Event.Send({
							name : "effect.forward1",
							self : girl
						});
					},
					"MouseButtonUp" : function() {
						Event.Send({
							name : "effect.forward0",
							self : girl
						});
					}
				},
				subscribe : {
				}
			},
			"UI/BottomRightNav/Left" :{
				property: {
				},
				event : {
					"MouseButtonDown" : function() {
						Event.Send({
							name : "effect.rotateleft1",
							self : girl
						});
					},
					"MouseButtonUp" : function() {
						Event.Send({
							name : "effect.rotateleft0",
							self : girl
						});
					}
				},
				subscribe : {
				}
			},
			"UI/BottomRightNav/Right" :{
				property: {
				},
				event : {
					"MouseButtonDown" : function() {
						Event.Send({
							name : "effect.rotateright1",
							self : girl
						});
					},
					"MouseButtonUp" : function() {
						Event.Send({
							name : "effect.rotateright0",
							self : girl
						});
					}
				},
				subscribe : {
				}
			},
			"UI/BottomRightNav/Center" :{
				property: {
				},
				event : {
					"MouseButtonDown" : function() {
						Event.Send({
							name : "effect.jump1",
							self : girl
						});
					},
					"MouseButtonUp" : function() {
						Event.Send({
							name : "effect.jump0",
							self : girl
						});
					}
				},
				subscribe : {
				}
			},
			"UI/BottomRightNav/Down" :{
				property: {
				},
				event : {
					"MouseButtonDown" : function() {
						Event.Send({
							name : "effect.backward1",
							self : girl
						});
					},
					"MouseButtonUp" : function() {
						Event.Send({
							name : "effect.backward0",
							self : girl
						});
					}
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
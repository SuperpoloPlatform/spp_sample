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
LAYOUTDATA = {
	name : "chat.layout",
	method : {
		//点击发送按钮触发的事件
		info_display1: function(){
			var enter_text = FUNCTION_DATA.get_windows("chat_window1/enter/word").GetProperty("Text");
			//alert("enter_text:"+enter_text);
			
			text1 = FUNCTION_DATA.get_windows("chat_window1/text").GetProperty("Text");
			
			text1+="\n\
			" + userName + " : " + enter_text;
			
			FUNCTION_DATA.get_windows("chat_window1/text").SetProperty("Text",text1);
			FUNCTION_DATA.get_windows("chat_window1/enter/word").SetProperty("Text", "");
			/**
				* 私聊
			*/
			// Event.Send({
				// name : "effect.say",
				// text : enter_text,
				// target : targetName,
				// self : userName				
			// });
			/**
				* 群聊
			*/
			Event.Send({
				name : "effect.tell",
				text : enter_text,
				target : targetName,
				self : userName				
			});
		},
		/**
			* 创建群组
		*/
		info_display2 : function(){
			FUNCTION_DATA.get_windows("chat_window3").SetProperty("Visible","True");
			
		},
		
		/**
			* 群组列表 add 
		*/
		info_display3 : function(){
			Event.Send({
				name : "effect.createGroup",
				self : userName				
			});
		},
		info_display4 : function(){
			var text3 = FUNCTION_DATA.get_windows("chat_window3/enter/word").GetProperty("Text");
			if(text3 == ""){
				text3 = "test";
			}
			Event.Send({
				name : "effect.createGroup",
				text : text3,
				self : userName				
			});
		},
	},
	window : {	
		"chat_window1/enter_ok":{
			property:{},
			event:{
				"MouseClick":"info_display1"
			},
			subscribe :{
				"effect.call": function(e){
					text2 = FUNCTION_DATA.get_windows("chat_window1/text").GetProperty("Text");
					text2 += "\n\
					" + e.nickName + " : " + e.text;
					FUNCTION_DATA.get_windows("chat_window1/text").SetProperty("Text",text2);
				},
			}
		},
		"chat_window1/enter_create":{
			property:{},
			event:{
				"MouseClick":"info_display2"
			},
			subscribe :{
				
			}
		},
		"chat_window2/enter_join":{
			property:{},
			event:{
				"MouseClick":"info_display3"
			},
			subscribe :{
				
			}
		},
		"chat_window3/enter_success":{
			property:{},
			event:{
				"MouseClick":"info_display4"
			},
			subscribe :{
				"effect.groupsucc": function(e){
					FUNCTION_DATA.get_windows("chat_window3").SetProperty("Visible","False");
					text2 = FUNCTION_DATA.get_windows("chat_window2/text").GetProperty("Text");
					text2 += "\n" + e.text;
					FUNCTION_DATA.get_windows("chat_window2/text").SetProperty("Text",text2);
				},
			}
		},
	}	
};
} catch( e )
{
alert( e );
}




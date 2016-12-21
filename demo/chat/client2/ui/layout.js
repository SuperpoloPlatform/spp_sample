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
			Event.Send({
				name : "effect.say",
				text : enter_text,
				target : targetName,
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
	}	
};
} catch( e )
{
alert( e );
}




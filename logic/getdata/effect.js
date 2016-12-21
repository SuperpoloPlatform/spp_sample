/**************************************************************************
 *  This file is part of the UGE(Uniform Game Engine) of SPP.
 *  Copyright (C) by SanPolo Co.Ltd. 
 *  All rights reserved.
 *  See http://spp.spolo.org/ for more information.
 *
 *  SanPolo Co.Ltd
 *  http://spp.spolo.org/  sales@spolo.org spp-support@spolo.org
**************************************************************************/
try{
	(function(){
		var nowrun = false;
		var nowturn = false;
		
		/*
		 *     前后行走及停止,匹配事件:effect.XXXX
		 */
		//forward
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].PerformAction('Forward', ['start', true]);
			actor.pcarray['pcmesh'].PerformAction('SetAnimation',['animation','run'],['cycle',true],['reset', false]);
			actor.state = "run";
			nowrun = false;
			nowturn = true;
		}, "effect.forward1");
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].PerformAction('Forward', ['start', false]);
			actor.pcarray['pcmesh'].PerformAction('SetAnimation',['animation','stand'],['cycle',true],['reset', true]);
			actor.state = "stand";
			nowrun = true;
			nowturn = false;
		}, "effect.forward0");
		
		//backward
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].PerformAction('Backward', ['start', true]);
			actor.pcarray['pcmesh'].PerformAction('SetAnimation',['animation','run'],['cycle',true],['reset', false]);
			actor.state = "run";
			nowrun = false;
			nowturn = true;
		}, "effect.backward1");
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].PerformAction('Backward', ['start', false]);
			actor.pcarray['pcmesh'].PerformAction('SetAnimation',['animation','stand'],['cycle',true],['reset', true]);
			actor.state = "stand";
			nowrun = true;
			nowturn = false;
		}, "effect.backward0");
		
		/*
		 *     左右转向及停止,匹配事件:effect.rotateXXXX
		 */
		//left
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].PerformAction('RotateLeft', ['start', true]);
			if(nowturn){
				actor.pcarray['pcmesh'].PerformAction('SetAnimation',['animation','run'],['cycle',true],['reset', false]);
			} else {
				actor.pcarray['pcmesh'].PerformAction('SetAnimation',['animation','stand'],['cycle',true],['reset', true]);
			}
		}, "effect.rotateleft1");
		Event.Subscribe(function(e){
			var actor = e.self;
			var pos = actor.pcarray['pcmesh'].GetProperty("position");
			CONSOLE.Write("player's position is : [" + pos.x + ", " + pos.y + ", " + pos.z + "]\n");
			actor.pcarray['pcactormove'].PerformAction('RotateLeft', ['start', false]);
			if(nowrun){
				actor.pcarray['pcmesh'].PerformAction('SetAnimation',['animation','stand'],['cycle',true],['reset', true]);
			} else {
				if(nowturn){
					actor.pcarray['pcmesh'].PerformAction('SetAnimation',['animation','run'],['cycle',true],['reset', false]);
				} else {
					actor.pcarray['pcmesh'].PerformAction('SetAnimation',['animation','stand'],['cycle',true],['reset', true]);
				}
			}
		}, "effect.rotateleft0");
		
		//right
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].PerformAction('RotateRight', ['start', true]);
			if(nowturn){
				actor.pcarray['pcmesh'].PerformAction('SetAnimation',['animation','run'],['cycle',true],['reset', false]);
			} else {
				actor.pcarray['pcmesh'].PerformAction('SetAnimation',['animation','stand'],['cycle',true],['reset', true]);
			}
		}, "effect.rotateright1");
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].PerformAction('RotateRight', ['start', false]);
			if(nowrun){
				actor.pcarray['pcmesh'].PerformAction('SetAnimation',['animation','stand'],['cycle',true],['reset', true]);
			} else {
				if(nowturn){
					actor.pcarray['pcmesh'].PerformAction('SetAnimation',['animation','run'],['cycle',true],['reset', false]);
				} else {
					actor.pcarray['pcmesh'].PerformAction('SetAnimation',['animation','stand'],['cycle',true],['reset', true]);
				}
			}
		}, "effect.rotateright0");
		
		Event.Subscribe(function(e){
			function handler() {
				if(this.readyState == this.OPENED)
					alert("in handler OPENED:\n");
			
				if(this.readyState == this.DONE){
					if(this.status==200)
					{
						/**
						 *    首先明确一点sling传过来的数据为字符串类型，也就是string
						 *    string_sling表示从 http://192.168.3.78:8086/content/Mkbackstage.ledjson.html获取到的字符串 
						 */
						//获取sling数据(字符串)
						string_sling = t.responseText;
						//打印sling数据
						alert(string_sling);
						//将获取到的sling数据转换成对象     eval的作用
						object_sling = eval("{" + string_sling + "}");
						//object_sling[0] 表示该对象的第一个JSON串
						//XXXX.ledContent     为sling数据中的一个键值
						alert(object_sling[0].ledContent);
						yang = object_sling[0].ledContent
						Event.Send({
							name : "ui.text.show",
							self : this,
							value : yang
						});
					}
					else alert("in handler DONE: status = " + this.status);
				}
			}
			var t = new XMLHttpRequest();
			t.onreadystatechange  = handler;
			t.open("GET", "http://192.168.3.78:8086/content/Mkbackstage.ledjson.html");
			t.send();
			if(t.status == 200)
				alert("sync request\n" + t.responseText);

			//alert(value_sling);
		
		}, "effect.select.down");
		
	})();

} catch(e){
	alert(e);
}
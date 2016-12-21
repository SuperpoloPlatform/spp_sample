try {
	require("corba.js");
	var console = Registry.Get("iConsole");
	console.log = console.WriteLine;
	if(!load("/lib/client.js")){
		console.log("Faild load client.js .");
	}
	userList = {
		zhang3 : "zhang3",
		li4 : "li4",
		lili : "lili",
		nana : "nana"
	}
	userName = userList.zhang3;
	targetName = userList.li4;
	// register
	var client = new Client(userName);   //创建客户端
	/**
		* get userMap
	*/
	Event.Subscribe(function(e) {   //接收客户端发来消息
		client.userMap = e.userMap;
	}, "effect.getUserMap");
	/**   
		* 与某用户单聊  
	*/
	Event.Subscribe(function(e) {
		var self = e.self;
		var target = e.target;
		var text = e.text;
		var targetObj = client.GetObject(target);   //通过客户端从服务端获取到另一个客户端对象
		targetObj.say(self, text);
	}, "effect.say");
	
	/**   
		* 群聊   
	*/
	Event.Subscribe(function(e) {     //接收客户端事件
		var self = e.self;   //发消息者
		var target = e.target;   //发送对象
		var text = e.text;   //发消息内容
		var userMap = client.userMap;
		console.log("userMap = " + JSON.stringify(userMap));
		for(var i in userMap){   
			if(userMap[i] != self){
				target = userMap[i];  //说话对象为所有在线用户
				var targetObj = client.GetObject(target);
				targetObj.say(self, text);
			}
			
		}
				
	}, "effect.tell" );
	
	/**
		* create group .
	*/
	Event.Subscribe(function(e) {
		var self = e.self;
		var text = e.text;
		console.log("create group is " + text + " !");
		Event.Send({
			name : "effect.groupsucc",
			text : text			
		});
	}, "effect.createGroup");
	
}catch(e){
	alert('error:',e);
}
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
	userName = userList.li4;
	targetName = userList.zhang3;
	// register
	var client = new Client(userName);
	var userMap = client.GetUserMap();   //user list
	
	/**
		* 私聊
	*/
	Event.Subscribe(function(e) {
		var self = e.self;
		var target = e.target;
		var text = e.text;
		/**
			* 在这里加通信
		*/
		var targetObj = client.GetObject(target);
		targetObj.say(self, text);
	}, "effect.say");
		
}catch(e){
	alert('error:',e);
}
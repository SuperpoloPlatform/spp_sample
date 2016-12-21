try {
	require("corba.js");
	var console = Registry.Get("iConsole");
	console.log = console.WriteLine;
	if(!load("/lib/objeca.js")){
		console.log("Faild load objeca.js .");
	}
	(function(){
		userList = {
			zhang3 : "zhang3",
			li4 : "li4",
			lili : "lili",
			nana : "nana"
		}
		userName = userList.lili;
		targetName = userList.zhang3;
		// register
		var client = new Client(userName);
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
		
		
		
		
	})();
}catch(e){
	alert('error:',e);
}
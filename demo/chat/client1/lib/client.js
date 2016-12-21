//ECA connection
var objeca = {
	enterNotify : function(who){
		console.log(who + " enter");
	},
	say : function(who,content){
		console.log(who + " say:" + content);
		Event.Send({
			name : "effect.call",
			nickName : who,
			text : content
		});
	},
	tell : function(who,content){
		console.log(who + " say:" + content);
		Event.Send({
			name : "effect.call",
			nickName : who,
			text : content
		});
	},
	setClientUserMap : function(who, userMap){
		var userMap = JSON.parse(userMap);
		Event.Send({
			name : "effect.getUserMap",
			self : who,
			userMap : userMap
		});
	}
};
function Client	(userName){
	//cofig必须在InitServer前执行
	//Corba.Config({"threadPerConnectionPolicy":"0","endPointPublish":"all(addr)"});
	Corba.InitClient();

	Corba.SetDefaultNameService("corbaloc:iiop:localhost/NameService");  //设置服务
	Corba.RegisterObject("#test.my_context/delivery.Object#" + userName,objeca);
	chatServer = Corba.GetObject("#chatserver");
	chatServer.enter(userName);
	chatServer.ative(userName);
};

Client.prototype.GetObject = function(target){
	return Corba.GetObject("#test.my_context/delivery.Object#" + target);
}

Client.prototype.GetService = function(service){
	return Corba.GetObject("#" + service);
}

/**
	* get userMap
*/
Event.Subscribe(function(e) {   //接收客户端发来消息
	userMap = e.userMap;
}, "effect.getUserMap");

Client.prototype.GetUserMap = function(){
	if(typeof(userMap) == "undefined"){
		return "List initializing……";
	}
	return userMap;
}
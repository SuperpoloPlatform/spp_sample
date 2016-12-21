//ECA connection
var objeca = {
	enterNotify : function(who){
		console.log(who + " enter");
	},
	say : function(who,content){
		console.log(who + " say1:" + content);
		Event.Send({
			name : "effect.call",
			nickName : who,
			text : content
		});
	},
	tell : function(who,content){
		console.log(who + " say2:" + content);
		Event.Send({
			name : "effect.call",
			nickName : who,
			text : content
		});
	},
	setClientUserMap : function(who, userMap){
		var userMap = JSON.parse(userMap);   //将Json串转化成Json对象
		Event.Send({   //向逻辑发送消息，通过name匹配
			name : "effect.getUserMap",
			self : who,
			userMap : userMap
		});
	}
};
	
function Client (userName) {
	this.userMap = {};
	//cofig必须在InitServer前执行
	//Corba.Config({"threadPerConnectionPolicy":"0","endPointPublish":"all(addr)"});
	Corba.InitClient();
	Corba.SetDefaultNameService("corbaloc:iiop:localhost/NameService");   //设置服务
	Corba.RegisterObject("#test.my_context/delivery.Object#" + userName, objeca);   //注册客户端
	chatServer = Corba.GetObject("#chatserver");
	chatServer.enter(userName);   //通知启动客户端
	chatServer.ative(userName);   
}


Client.prototype.GetObject = function(target){   //获取指定客户端对象
	return Corba.GetObject("#test.my_context/delivery.Object#" + target);
}

Client.prototype.GetService = function(service){   //获取指定服务
	return Corba.GetObject("#" + service);
}

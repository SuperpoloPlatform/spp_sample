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
	}
};
function Client	(userName){
	this.name = userName;
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


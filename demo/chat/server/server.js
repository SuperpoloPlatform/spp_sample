Event.Send("application.open",true);

require("corba.js");

var console = Registry.Get("iConsole");
console.log = console.WriteLine;

//cofig必须在InitServer前执行
//Corba.Config({"threadPerConnectionPolicy":"0","endPointPublish":"all(addr)"});
Corba.InitServer();

Corba.SetDefaultNameService("corbaloc:iiop:localhost/NameService");
var delivery = new Delivery("test.my_context/delivery.Object");

Corba.RegisterObject("#test.my_context/delivery.Object#chatserver",
{
	userMap : [],
	enter : function(sender){
		console.log(sender + " enter chatServer");
		// this.userMap.push(sender);
		this.userMap[sender] = sender;
		for(var i in this.userMap)
		{
			var target = this.userMap[i];
			delivery.userMap[target].apply(delivery, ["enterNotify", sender]);
			this.getUserMap(target);
		}
	},
	tellall : function(sender,content){
		for(var i in this.userMap)
		{
			var target = this.userMap[i];
			delivery.userMap[target].apply(delivery, ["say",sender,content]);
		}
	},
	roomlist: {},
	newroom : function(roomname,owner){
		roomlist[roomname] = delivery.RegisterObject("#" + roomname, {
		} );
	},
	ative : function(sender){   //通知sender有哪些人进入
		for(var i in this.userMap){
			var target = this.userMap[i];
			if(sender != target){
				delivery.userMap[sender].apply(delivery, ["enterNotify", target]);
			}
		}
		
	},
	getUserMap : function(sender){
		var userList = {};
		for(var i in this.userMap){
			userList[i] = this.userMap[i];
		}
		delivery.userMap[sender].apply(delivery, ["setClientUserMap", sender, JSON.stringify(userList)]);   //服务端调用客户端方法
	}
});


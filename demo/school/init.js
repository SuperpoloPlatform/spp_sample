

try{
	Event.Send({
		name : "monster.walk",
		self : this
	});
	
} catch(e){
	alert(e);
}
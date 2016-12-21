//this is a test.

try {

	Plugin.Load("spp.behaviourlayer.jscript");
	
	// 让窗口以最大化显示，并且返回最大化之后的窗口尺寸。
	size = System.Maximize();
	alert(
		"Width = " + size[0] + "\n",
		"Height = " + size[1]
	);
	
	Event.Send("application.open",true);
	
}catch(e){
	alert('error:',e);
}
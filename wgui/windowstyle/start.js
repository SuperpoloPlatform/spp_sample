//this is a test
try{

	var CONSOLE = Registry.Get("iConsole");
	//加载wxwidgets jslib
	require("wxui.js");
	System.Open();

	if(!load("/json.js"))
	{
		CONSOLE.WriteLine("Failed to load `json.js`");
	}
	if(!load("/frame.js"))
	{
	    CONSOLE.WriteLine("Failed to load `frame.js`");
	}
	WGUI.CreateObjectLayout(FRAME_DATA, "/xrc");
}
catch(e)
{
	alert("error:",e);
}
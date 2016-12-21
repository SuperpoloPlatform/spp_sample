//this is a test.

try {
Plugin.Load("spp.script.gui.cegui");
Event.Send("application.open",true);
require("ui.js");
	if(!load("/progressbar/layout.js"))
	{
	    alert("Failed to load `layout.js`");
	}
	if(!load("/schemedata/uischeme.js"))
	{
	    alert("Failed to load scheme.js`");
	}	
GUI.CreateObjectScheme(SCHEMEDATA,"/progressbar/progressbar");
GUI.CreateObjectLayout(LAYOUTDATA,"/progressbar/progressbar");	
view = new iView(C3D.engine,C3D.g3d);
var count = Event.InstallHelper('3d',view,'frame');

}catch(e){
alert('error:',e);
}
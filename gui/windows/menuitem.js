//this is a test.

try {
Plugin.Load("spp.script.gui.cegui");
Event.Send("application.open",true);
require("ui.js");
	if(!load("/menuitem/layout.js"))
	{
	    alert("Failed to load `layout.js`");
	}
	if(!load("/schemedata/uischeme.js"))
	{
	    alert("Failed to load scheme.js`");
	}	
GUI.CreateObjectScheme(SCHEMEDATA,"/menuitem/ui");
GUI.CreateObjectLayout(LAYOUTDATA,"/menuitem/ui");
	
var menubar= GUI.Menubar.Get("Demo/Window1/Menubar");	
alert(menubar.name);
var menuitem = new GUI.MenuItem("MenuItem","Demo/Window1/MenuItem2");
alert(menuitem.name);
alert(menuitem.type);
var a = GUI.Combobox.Get("Demo/Window2/Combobox");
var c = new GUI.ListboxTextItem("aavvcc",0);
alert(a.name);
alert(a.type);
if(a.AddItem(c)){alert(3123)};
if(menubar.AddItem(menuitem)){alert(0);};


view = new iView(C3D.engine,C3D.g3d);
var count = Event.InstallHelper('3d',view,'frame');
}catch(e){
alert('error:',e);
}
//this is a test.

try {

Plugin.Load("spp.script.gui.cegui");
Event.Send("application.open",true);

GUI.Initialize();

VFS.PushDir("/ui");
var scheme = GUI.Schemes.Load("zoom.scheme");
GUI.System.SetDefaultMouseCursor("zoom", "MouseArrow");
var font = GUI.Fonts.CreateFont("FangSong",18, "/fonts/SIMHEI.TTF",true);
win = GUI.Windows.LoadWindowLayout("zoom.layout");
GUI.System.root = win;

var hyperlink = GUI.GUISheet.Get("Demo7/Window1/hyperlink/text");
hyperlink.Subscribe("MouseClick",function(){
	alert(hyperlink.text);
	System.Open(hyperlink.text);
});

VFS.PopDir ();

view = new iView(C3D.engine,C3D.g3d);
var count = Event.InstallHelper('3d',view,'frame');

}catch(e){
alert('error:',e);
}
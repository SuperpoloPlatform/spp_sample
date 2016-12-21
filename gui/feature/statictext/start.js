//this is a test.

try {

Plugin.Load("spp.script.gui.cegui");
Event.Send("application.open",true);

GUI.Initialize();

VFS.PushDir("/zoom");
var scheme = GUI.Schemes.Load("zoom.scheme");
GUI.System.SetDefaultMouseCursor("zoom", "MouseArrow");
var font = GUI.Fonts.CreateFont("FangSong",18, "/fonts/SIMHEI.TTF",true);
win = GUI.Windows.LoadWindowLayout("zoom.layout");
GUI.System.root = win;





VFS.PopDir ();

view = new iView(C3D.engine,C3D.g3d);
var count = Event.InstallHelper('3d',view,'frame');

}catch(e){
alert('error:',e);
}
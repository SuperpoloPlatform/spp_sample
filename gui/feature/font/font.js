//this is a test.

try {

Plugin.Load("spp.script.gui.cegui");
Event.Send("application.open",true);

if(1)
{
GUI.Initialize();

VFS.PushDir("/ui");
var scheme = GUI.Schemes.Load("font.scheme");
GUI.System.SetDefaultMouseCursor("font", "MouseArrow");
var font = GUI.Fonts.CreateFont("FangSong",18, "/fonts/SIMHEI.TTF",true);
var font = GUI.Fonts.CreateFont("fangsong3",3, "/fonts/SIMHEI.TTF",true);
win = GUI.Windows.LoadWindowLayout("font.layout");
GUI.System.root = win;

var fangsong2 = GUI.Fonts.Get("FangSong");
GUI.System.defaultFont = fangsong2;


VFS.PopDir ();
}

view = new iView(C3D.engine,C3D.g3d);
var count = Event.InstallHelper('3d',view,'frame');

}catch(e){
alert('error:',e);
}
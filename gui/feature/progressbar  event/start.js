//this is a test.

try {
Plugin.Load("spp.script.gui.cegui");
Event.Send("application.open",true);

GUI.Initialize();

VFS.PushDir("/progressbar");
var scheme = GUI.Schemes.Load("progressbar.scheme");
GUI.System.SetDefaultMouseCursor("progressbar", "MouseArrow");
var font = GUI.Fonts.CreateFont("FangSong",18, "/fonts/SIMHEI.TTF",true);
win = GUI.Windows.LoadWindowLayout("progressbar.layout");
GUI.System.root = win;

var prog =  GUI.Windows.Get("Demo7/Window1/progressbar");

   prog.Subscribe("ProgressChanged",function(){	
	    var progcur = prog.GetProperty("CurrentProgress");
		if(progcur<1){		
	    setTimeout(test,1000);}
	    });
prog.Subscribe("ProgressDone",function(){	
	
	    alert("DONE");
	    });		
		
		
		
var ant = 0.01;
function test(){
	ant = ant + 0.01;
     prog.SetProperty("CurrentProgress",ant); 
	 
	}
    setTimeout(test,1000);
	


view = new iView(C3D.engine,C3D.g3d);
var count = Event.InstallHelper('3d',view,'frame');

}catch(e){
alert('error:',e);
}
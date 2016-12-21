//this is a test.

try {
	// 暂时把分辨率写死。
	//CmdLine.AddOption("fs", true);
	CmdLine.AddOption("mode", "1440x900");
	
	// 加载SPP支持的插件。
	Plugin.Load("spp.behaviourlayer.jscript");
	
	Event.Send("application.open",true);
	
	// 为了方便调试引入全局变量。
	var CONSOLE = Registry.Get("iConsole");
	CONSOLE.Write = function() {};
	CONSOLE.WriteLine = function() {};
	
	// 返回真实路径还有问题。
	//var realPath = VFS.GetRealPath("/data/shader-snippets");
	//CONSOLE.WriteLine(realPath);
	//VFS.Mount("/shader/snippets", realPath + "\\");
	VFS.Mount("/shader/snippets", System.InstallPath() + "/data/shader-snippets\\");
	
	// 加载SPP基本JS库
	require("objlayout.js");	// Object Layout Lib
	require("ui.js");			// UI Lib
	
	// 加载UI数据
	if(!load("/objlayout/uischeme.js"))
	{
	    alert("Failed to load `uischeme.js`");
	}
	if(!load("/objlayout/loginlayout.js"))
	{
	    alert("Failed to load `loginlayout.js`");
	}
	if(!load("/objlayout/rolechoicelayout.js"))
	{
	    alert("Failed to load `rolechoicelayout.js`");
	}
	if(!load("/objlayout/progresslayout.js"))
	{
	    alert("Failed to load `progresslayout.js`");
	}
	
	GUI.CreateObjectScheme(SCHEMEDATA,"/ui");

	// 初始化object layout中各个对象。
	// TODO 以后可能需要将每个对象保存在单个文件中。
	if(!load("/objlayout/layout.js"))
	{
	    alert("Failed to load `/objlayout/layout.js`");
	}
	if(!load("/effect.js"))
	{
	    alert("Failed to load `/effect.js`");
	}
	
	// 在js中动态加载一些XML Library，省得场景整合的时候将main world中的`<library>`标签都给替换了。
	var loader = Registry.Get('iLoader');
	loader.LoadLibrary("/lightmaps.cslib");
	loader.LoadLibrary("/art/models/objects/grass.xml");
	loader.LoadLibrary("/art/models/objects/clouds/clouds.xml");
	loader.LoadLibrary("/art/models/objects/gensky.xml");
	
	// 创建场景中唯一的entity，作为导游。
	girl = Entities.CreateEntity(GIRL);
	Entities.CreateAI(girl, AI_GIRL);
	
	// 创建主屏幕上的UI元素。
	GUI.CreateObjectLayout(SCENE_LAYOUT, "/ui");

	// 屏幕开始显示。
	Event.InstallHelper('3d','frame');

}catch(e){
	alert('error:',e);
}
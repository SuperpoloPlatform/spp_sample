//this is a test
try{

	var CONSOLE = Registry.Get("iConsole");
	
	Plugin.Load("spp.script.cspace.core");
	/*
	--加载视频相关的插件--
	*/
	Plugin.Load("spp.video.vlc");
	
	System.Open();
	
	load("/objlayout/uischeme.js");
	load("/objlayout/layout.js");
	require("ui.js");
	
	GUI.CreateObjectScheme(SCHEMEDATA,"/ui");
	GUI.CreateObjectLayout(LAYOUTDATA,"/ui");
	var win1 = GUI.Windows.Get("Demo7/Window1");
	var win2 = GUI.Windows.Get("Demo7/Window2");
	/*
	--准备使用或者测试的视频相关数据--
	*/
	if(0)
	{
		var video = {
			vcodec : "RV24",
			name : "e:\\test.avi",
			width : 640,
			height : 480
		}
	}
	if(0)
	{
		var video = {
			vcodec : "RV24",
			name : "e:\\test.mkv",
			width : 1280,
			height : 720
		}
	}
	//wmv目前播放会出现错误.
	if(0)
	{
		var video = {
			vcodec : "RV24",
			name : "e:\\test.wmv",
			width : 720,
			height : 704
		}
	}
	if(0)
	{
		var video = {
			vcodec : "RV24",
			name : "e:\\test.mpg",
			width : 720,
			height : 576
		}
	}
	if(0)
	{
		var video = {
			vcodec : "RV24",
			name : "e:\\test2.flv",
			width : 608,
			height : 240
		}
	}
	if(1)
	{
		var video1 = {
			vcodec : "RV24",
			name : "e:\\test3.mkv",
			width : 480,
			height : 320
		}
	}
	if(1)
	{
		var video2 = {
			vcodec : "RV24",
			name : "e:\\test.mp4",
			width : 512,
			height : 288
		}
	}
	/*
	--初始化VLC--
	*/
	var stream1 = Vlc.CreateStream("vcodec="+video1.vcodec);
	var stream2 = Vlc.CreateStream("vcodec="+video2.vcodec);
	/*
	--初始化播放环境并创建一个播放器--
	*/
	var mp1 = Vlc.CreateMediaPlayer(stream1, video1.name);
	var mp2 = Vlc.CreateMediaPlayer(stream2, video2.name);
	/*
	--创建一些UI控件，用来控制视频并获取视频信息--
	*/
	var stop_button = GUI.Windows.Get("Demo7/stop_button");
	var play_button = GUI.Windows.Get("Demo7/play_button");
	var pause_button = GUI.Windows.Get("Demo7/pause_button");
	var show_info_button = GUI.Windows.Get("Demo7/show_info_button");
	var speed_button = GUI.Windows.Get("Demo7/speed_button");
	var fast_backward_button = GUI.Windows.Get("Demo7/fast_backward_button");
	stop_button.Subscribe("Clicked", function(){
		CONSOLE.WriteLine("\n[SPP-VIDEO]--StopMediaPlayer--");
		mp1.Stop();
	});
	play_button.Subscribe("Clicked", function(){
		CONSOLE.WriteLine("\n[SPP-VIDEO]--PlayMediaPlayer--");
		mp1.Play();
	});
	pause_button.Subscribe("Clicked", function(){
		CONSOLE.WriteLine("\n[SPP-VIDEO]--PauseMediaPlayer--");
		mp1.Pause();
	});
	show_info_button.Subscribe("Clicked", function(){
		var video_info = GUI.Windows.Get("Demo7/video_info");
		var info = "position : "+mp1.position+"\n\
		time : "+mp1.time+"\n\
		length : "+mp1.length+"\n\
		rate : "+mp1.rate+"\n\
		state : "+mp1.state+"\n\
		fps : "+mp1.fps+"\n\
		height : "+mp1.height+"\n\
		width : "+mp1.width+"\n\
		scale : "+mp1.scale+"\n\
		"
		video_info.SetProperty("frame_text", info);
	});
	speed_button.Subscribe("Clicked", function(){
		mp1.time = mp1.time + 2000;
	});
	fast_backward_button.Subscribe("Clicked", function(){
		mp1.time = mp1.time - 2000;
	});
	/*
	--将创建Proctexture的过程包装到一个函数中--
	*/
	var CreateProctexture = function(stream, video, width, height)
	{
		engine = Registry.Get('iEngine');
		g3d = Registry.Get('iGraphics3D');
		var tmgr = g3d.texturemanager;
		var pTexure;
		/*
		--动画显示这张贴图--
		检查是否有视频数据缓冲，如果有，通过GetVideoData获取数据，并将该数据作为blit的参数传输到显卡中
		*/
		var Animate = function(current_time){
			if(stream.HasVideoData())
			{
				CONSOLE.WriteLine("\n[SPP-VIDEO]GetVideoData--");
				var data = stream.GetVideoData();
				var th = pTexure.textureHandle;
				th.Blit(0, 0, video.width, video.height, data);
			}
			else
				return;
		}
		/*
		--创建程序贴图--
		Animate：实现动画贴图的回调函数
		AlwaysAnimate：决定是否执行Animate
		注意请根据视频大小酌情设定ProcTexture的宽高
		*/
		pTexure = new ProcTexture(Animate, width, height);
		pTexure.Initialize(engine, tmgr, "VideoTexture");
		
		return pTexure;
	}
	
	var pTexture1 = CreateProctexture(stream1, video1, 512, 512);
	var pTexture2 = CreateProctexture(stream2, video2, 512, 512);
	
	var titlebar1 = win1.GetChild("Demo7/Window1__auto_titlebar__");
	win1.absoluteWidth = video1.width;
	win1.absoluteHeight = video1.height+titlebar1.absoluteHeight;
	
	var titlebar2 = win2.GetChild("Demo7/Window2__auto_titlebar__");
	win2.absoluteWidth = video2.width;
	win2.absoluteHeight = video2.height+titlebar2.absoluteHeight;
	/*
	--将程序贴图贴到CEGUI的窗口上，然后通过设置AlwaysAnimate为true开始向贴图传输数据--
	*/
	var th1 = pTexture1.textureHandle;
	var imageset1 = GUI.Imagesets.CreateImageset("video_image1",th1);
	imageset1.DefineImage("full_image", [0,0,win1.absoluteWidth,video1.height], [0,0]);
	win1.SetProperty("with_title_frame_img", "set:video_image1 image:full_image");
	pTexture1.AlwaysAnimate = true;
	
	var th2 = pTexture2.textureHandle;
	var imageset2 = GUI.Imagesets.CreateImageset("video_image2",th2);
	imageset2.DefineImage("full_image", [0,0,win2.absoluteWidth,video2.height], [0,0]);
	win2.SetProperty("with_title_frame_img", "set:video_image2 image:full_image");
	pTexture2.AlwaysAnimate = true;
	/*
	--开始播放视频，此时可以通过GetVideoData获取每帧的数据--
	*/
	var result1 = mp1.Play();
	var result2 = mp2.Play();
	if(result1 != 0)
	{
		alert("playback of mp1 does't started");
	}
	if(result2 != 0)
	{
		alert("playback of mp2 does't started");
	}
	
	/*
	************************************
	* NOTE：需要在js层手动销毁视频相关的对象 *
	************************************
	CONSOLE.WriteLine("\n[SPP-VIDEO]--DestroyMediaPlayer--");
	mp.Stop();
	mp.DestroyMediaPlayer();
	Vlc.Destroy(stream);
	*/
	view = new iView(engine,g3d);
	var count = Event.InstallHelper('3d',view,'frame');

}
catch(e)
{
	alert("error:",e);
}
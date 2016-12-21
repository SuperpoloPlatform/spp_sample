//this is a test
try{
	var CONSOLE = Registry.Get("iConsole");
	
	Plugin.Load("spp.video.vlc");
	
	System.Open();

	/*
	--初始化VLC--
	如果只播放音乐的话不需要指定参数
	*/
	var stream = Vlc.CreateStream();
	/*
	--初始化播放环境并创建一个播放器--
	*/
	var mp = Vlc.CreateMediaPlayer(stream, "e:\\audiotest.mp3");
	
	mp.Play();
}
catch(e)
{
	alert("error:",e);
}
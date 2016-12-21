1 world.xml作为主文件使用
2 world1.xml和world2.xml添加新盒子
3 加载代码简化如下：
	loader = Registry.Get('iLoader');
	var bVar = loader.LoadMapFile('world1.xml',false)
	var bVar1 = loader.LoadMapFile('world2.xml',false)
	var bVar2 = loader.LoadMapFile('world3.xml',false)
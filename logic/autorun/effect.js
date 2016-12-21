/**************************************************************************
 *  This file is part of the UGE(Uniform Game Engine) of SPP.
 *  Copyright (C) by SanPolo Co.Ltd. 
 *  All rights reserved.
 *  See http://spp.spolo.org/ for more information.
 *
 *  SanPolo Co.Ltd
 *  http://spp.spolo.org/  sales@spolo.org spp-support@spolo.org
**************************************************************************/
try{
	(function(){
		var nowrun = false;
		var nowturn = false;
		//W键按下，前走
		Event.Subscribe(function(e) {
			var actor = e.self;
			actor.pcarray['pcactormove'].PerformAction('Forward', ['start', true]);
			actor.pcarray['pcmesh'].PerformAction('SetAnimation', ['animation','run'], ['cycle', true], ['reset', false]);
			actor.state = "run";
			nowrun = false;
			nowturn = true;
		}, "effect.forward1");
		//W键抬起，前停
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].PerformAction('Forward', ['start', false]);
			actor.pcarray['pcmesh'].PerformAction('SetAnimation', ['animation', 'stand'], ['cycle', true],['reset', true]);
			actor.state = "stand";
			nowrun = true;
			nowturn = false;
		}, "effect.forward0");
		
		//S键按下，后走
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].PerformAction('Backward', ['start', true]);
			actor.pcarray['pcmesh'].PerformAction('SetAnimation',['animation','run'],['cycle',true],['reset', false]);
			actor.state = "run";
			nowrun = false;
			nowturn = true;
		}, "effect.backward1");
		//S键抬起，后停
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].PerformAction('Backward', ['start', false]);
			actor.pcarray['pcmesh'].PerformAction('SetAnimation',['animation','stand'],['cycle',true],['reset', true]);
			actor.state = "stand";
			nowrun = true;
			nowturn = false;
		}, "effect.backward0");
		
		//A键按下，左转
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].PerformAction('RotateLeft', ['start', true]);
			if(nowturn){
				actor.pcarray['pcmesh'].PerformAction('SetAnimation',['animation','run'],['cycle',true],['reset', false]);
			} else {
				actor.pcarray['pcmesh'].PerformAction('SetAnimation',['animation','stand'],['cycle',true],['reset', true]);
			}
		}, "effect.rotateleft1");
		//A键抬起，转停
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].PerformAction('RotateLeft', ['start', false]);
			if(nowrun){
				actor.pcarray['pcmesh'].PerformAction('SetAnimation',['animation','stand'],['cycle',true],['reset', true]);
			} else {
				if(nowturn){
					actor.pcarray['pcmesh'].PerformAction('SetAnimation',['animation','run'],['cycle',true],['reset', false]);
				} else {
					actor.pcarray['pcmesh'].PerformAction('SetAnimation',['animation','stand'],['cycle',true],['reset', true]);
				}
			}
		}, "effect.rotateleft0");
		
		//D键按下，右转
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].PerformAction('RotateRight', ['start', true]);
			if(nowturn){
				actor.pcarray['pcmesh'].PerformAction('SetAnimation',['animation','run'],['cycle',true],['reset', false]);
			} else {
				actor.pcarray['pcmesh'].PerformAction('SetAnimation',['animation','stand'],['cycle',true],['reset', true]);
			}
		}, "effect.rotateright1");
		//D键抬起，转停
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].PerformAction('RotateRight', ['start', false]);
			if(nowrun){
				actor.pcarray['pcmesh'].PerformAction('SetAnimation',['animation','stand'],['cycle',true],['reset', true]);
			} else {
				if(nowturn){
					actor.pcarray['pcmesh'].PerformAction('SetAnimation',['animation','run'],['cycle',true],['reset', false]);
				} else {
					actor.pcarray['pcmesh'].PerformAction('SetAnimation',['animation','stand'],['cycle',true],['reset', true]);
				}
			}
		}, "effect.rotateright0");
		
		//E键按下，视角向上
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcdefaultcamera'].SetProperty('pitchvelocity',1.0);
		}, "effect.rotateup1");
		//E键抬起，视角向上停止
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcdefaultcamera'].SetProperty('pitchvelocity',0.0);
		}, "effect.rotateup0");
		
		//C键按下，视角向下
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcdefaultcamera'].SetProperty('pitchvelocity',-1.0);
		}, "effect.rotatedown1");
		//C键抬起，视角向下停止
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcdefaultcamera'].SetProperty('pitchvelocity',0.0);
		}, "effect.rotatedown0");

		//获得当时的点的坐标
		Event.Subscribe(function(e){
			var actor = e.self;
			var guidespos = guides.pcarray['pcmesh'].GetProperty("position");
			var playerpos = player.pcarray['pcmesh'].GetProperty("position");
			CONSOLE.Write("guides's position : x = " + guidespos.x + "   y = " + guidespos.y + "   z = " + guidespos.z + ".\n");
			CONSOLE.Write("player's position : x = " + playerpos.x + "   y = " + playerpos.y + "   z = " + playerpos.z + ".\n");
		}, "effect.getpos");
		
		//初始化
		Event.Subscribe(function(e){
			var actor = e.self;
			//获得iPcPathFinder和iPcSteer对象
			this.iPcPathFinder = actor.pcarray['pcpathfinder'].QueryInterface("iPcPathFinder");
			this.iPcSteer = actor.pcarray['pcsteer'].QueryInterface("iPcSteer");
			//获得world.xml文件中的setctor
			var engine = Registry.Get('iEngine');
			var sectorlist = engine.sectors;
			this.setctor = sectorlist.Get(0);
			
			this.iPcPathFinder.SetGraph(celgraph);
			//seek的添加是因为CEL库存在BUG，正常情况下是没有必要添加的
			//seek的点即为初始点的一个临近点
			this.iPcPathFinder.Seek(this.setctor, [3,10,2.9]);
			//设置起始点A的位置信息
			this.pos_start_num = [-2, 10, 0];
		}, "effect.graph");

		//测试第一次autorun
		Event.Subscribe(function(e){
			var actor = e.self;
			if( !this.iPcSteer || !this.iPcPathFinder )
			{
				alert("请先按“p”键，初始化自动寻路的环境！");
				return;
			}
			this.iPcSteer.CheckArrivalOn(1); 
			//设置终点B的位置信息
			var pos_end_num = [0, 10, 16];
			//获得距离起始点和终点的Path上的最近点位置
			var pos_start = celgraph.GetClosest(this.pos_start_num);
			var pos_end = celgraph.GetClosest(pos_end_num);
			//将该终点赋值给下一个起点
			this.end_pos = pos_end_num;
			//获得A和B之间的ShortestPath
			var fa = celgraph.ShortestPath(pos_start, pos_end, celpath);
			var id = C3D.engine.SubscribeFrame(function(){
				//获得meshWrapperWoman
				var meshWrapperWoman = C3D.engine.FindMeshObject('woman');
				//获得meshWrapperGuides
				var meshWrapperGuides = C3D.engine.FindMeshObject("guides");
				//获取iPcActorMove
				var ipam = actor.pcarray['pcactormove'].QueryInterface('iPcActorMove');
				var yang = ipam.IsMoving();
				if( yang && meshWrapperWoman && meshWrapperGuides )
				{
					//将meshWrapperWoman的移动信息赋给meshWrapperGuides
					var mt = meshWrapperWoman.movable.GetTransform();
					meshWrapperGuides.movable.SetTransform(mt);
					//保持一定的距离，获取人物的位置
					var pos = actor.pcarray['pcmesh'].GetProperty("position");
					//将盒子指定到人物的位置
					meshWrapperGuides.movable.pos = [pos.x + 1, pos.y, pos.z];
					//使位置调整生效
					meshWrapperGuides.movable.Update();
					//此时两者为run
					actor.pcarray['pcmesh'].PerformAction('SetAnimation',['animation','run'],['cycle',true],['reset', false]);
					guides.pcarray['pcmesh'].PerformAction('SetAnimation',['animation','run'],['cycle',true],['reset', false]);
				} else{
					//此时两者为stand
					CONSOLE.Write(ipam.IsRotating() + "\n");
					if(ipam.IsRotating())
					{
						CONSOLE.Write("login rotating\n")
						actor.pcarray['pclinearmovement'].SetAngularVelocity([0, 0, 0]);
					}
					actor.pcarray['pcmesh'].PerformAction('SetAnimation',['animation','stand'],['cycle',true],['reset', false]);
					guides.pcarray['pcmesh'].PerformAction('SetAnimation',['animation','stand'],['cycle',true],['reset', false]);
					C3D.engine.UnsubscribeFrame(id);
				}
			});
			//开始行走
			this.iPcPathFinder.FollowOneWayPath(celpath);
		}, "effect.test_one");

		////测试第二次autorun
		Event.Subscribe(function(e){
			var actor = e.self;
			if( !this.iPcSteer || !this.iPcPathFinder )
			{
				alert("请先按“p”键，初始化自动寻路的环境！");
				return;
			}
			this.iPcSteer.CheckArrivalOn(1); 
			//将上次移动的位置作为这次移动的其实位置
			
			if(typeof( this.end_pos ) == "undefined")
			{
				alert("请先按“L”键，进行第一次自动寻路！");
				return;
			}
			this.pos_start_num = this.end_pos;
			var pos_end_num = [0, 10, 1];
			var pos_start = celgraph.GetClosest(this.pos_start_num);
			var pos_end = celgraph.GetClosest(pos_end_num);
			var fa = celgraph.ShortestPath(pos_start, pos_end, celpath);
			this.iPcPathFinder.FollowOneWayPath(celpath);
			var id = C3D.engine.SubscribeFrame(function(){
				/**
					注意：此时关于meshWrapper的获取可以放在初始化的时候，变为player的全局变量
					而transform的设置需要实时进行，及应该放在SubscribeFrame中执行
				*/
				//获得meshWrapperWoman
				var meshWrapperWoman = C3D.engine.FindMeshObject('woman');
				//获得meshWrapperGuides
				var meshWrapperGuides = C3D.engine.FindMeshObject("guides");
				//获取iPcActorMove
				var ipam = actor.pcarray['pcactormove'].QueryInterface('iPcActorMove');
				var yang = ipam.IsMoving();
				if( yang && meshWrapperWoman && meshWrapperGuides )
				{
					//将meshWrapperWoman的移动信息赋给meshWrapperGuides
					var mt = meshWrapperWoman.movable.GetTransform();
					meshWrapperGuides.movable.SetTransform(mt);
					//保持一定的距离，获取人物的位置
					var pos = actor.pcarray['pcmesh'].GetProperty("position");
					//将盒子指定到人物的位置
					meshWrapperGuides.movable.pos = [pos.x + 1, pos.y, pos.z];
					//使位置调整生效
					meshWrapperGuides.movable.Update();
			        //此时两者为run
			        actor.pcarray['pcmesh'].PerformAction('SetAnimation',['animation','run'],['cycle',true],['reset', false]);
					guides.pcarray['pcmesh'].PerformAction('SetAnimation',['animation','run'],['cycle',true],['reset', false]);
				} else{
					//此时两者为stand
					CONSOLE.Write(ipam.IsRotating() + "\n");
					if(ipam.IsRotating())
					{
						CONSOLE.Write("login rotating\n")
						actor.pcarray['pclinearmovement'].SetAngularVelocity([0, 0, 0]);
					}
					actor.pcarray['pcmesh'].PerformAction('SetAnimation',['animation','stand'],['cycle',true],['reset', false]);
					guides.pcarray['pcmesh'].PerformAction('SetAnimation',['animation','stand'],['cycle',true],['reset', false]);
					C3D.engine.UnsubscribeFrame(id);
				}
			});
		}, "effect.test_two");
		
		Event.Subscribe(function(e){
			var actor = e.self;
			//暂停和停止事件
			actor.pcarray['pcsteer'].Interrupt();
			guides.pcarray['pcmesh'].MoveMesh([10, 10, 10]);
			var pos = actor.pcarray['pcmesh'].GetProperty("position");
			var position = guides.pcarray['pcmesh'].GetProperty("position");
			this.pos_start_num = [pos.x, pos.y, pos.z];
			CONSOLE.Write("x = " + position.x + "   y = " + position.y + "   z = " + position.z + ".\n");
			CONSOLE.Write("x = " + pos.x + "   y = " + pos.y + "   z = " + pos.z + ".\n");
			CONSOLE.Write("I Interrupt \n");
		}, "effect.Interrupt");
			
	})();

} catch(e){
	alert(e);
}

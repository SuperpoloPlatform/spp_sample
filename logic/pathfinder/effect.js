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
		
		//PcPathFinder的测试代码
		Event.Subscribe(function(e){
			var actor = e.self;
			//获得坐标
			var pos = actor.pcarray['pcmesh'].GetProperty("position");
			//获得world.xml文件中的setctor
			var engine = Registry.Get('iEngine');
			var sectorlist = engine.sectors;
			var setctor = sectorlist.Get(0);
			yang = setctor.object.name;
			//获得iPcPathFinder和iPcSteer对象
			var iPcPathFinder = actor.pcarray['pcpathfinder'].QueryInterface("iPcPathFinder");
			var iPcSteer = actor.pcarray['pcsteer'].QueryInterface("iPcSteer");//pcsteer
			iPcSteer.CheckArrivalOn(0.1); 
			//获得celgraph和celpath
			var celgraph_base = Registry.Create("cel.celgraph");
			var celgraph = celgraph_base.QueryInterface("iCelGraph");
			var celpath_base = Registry.Create("cel.celpath");
			var celpath = celpath_base.QueryInterface("iCelPath");
			//创建节点
			var v0 = [0, 10, 0];
			var gn0 = celgraph.CreateNode("n0",v0);
			var v1 = [0, 10, 13];
			var gn1 = celgraph.CreateNode("n1",v1);
			var v2 = [23, 10, 13];
			var gn2 = celgraph.CreateNode("n2",v2);
			var v3 = [0, 10, 0];
			var gn3 = celgraph.CreateNode("n3",v3);
			//将节点连接成path
			celpath.AddNode(gn0.GetMapNode());
			celpath.AddNode(gn1.GetMapNode());
			celpath.AddNode(gn2.GetMapNode());
			celpath.AddNode(gn3.GetMapNode());

			iPcPathFinder.SetGraph(celgraph);
			//seek的添加是因为CEL库存在BUG，正常情况下是没有必要添加的
			iPcPathFinder.Seek(setctor, [0,10,0]);
			//按照celpath的路径进行运动
			iPcPathFinder.FollowOneWayPath(celpath);
		}, "effect.test");
	})();

} catch(e){
	alert(e);
}
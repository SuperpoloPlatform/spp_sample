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
		
		//获得当时的点的坐标
		Event.Subscribe(function(e){
			var actor = e.self;
			var pos = actor.pcarray['pcmesh'].GetProperty("position");
			CONSOLE.Write("x = " + pos.x + "   y = " + pos.y + "   z = " + pos.z + ".\n");
		}, "effect.getpos");
		
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
		
		/**
			关于漫游的效果可以采用两种方式进行操作，仅仅写了Run的代码：
			1、CS提供的sequence标签；
			2、通过读取XML文件，用MoveMesh实现。
			
			PS:因为sequence标签的数据导出已经修正，第二套方案已经被取消，仅仅记录一下而已
		 */
				
		//1、CS提供的sequence
		// 开始sequence的测试代码
		Event.Subscribe(function(e){
			var actor = e.self;
			// 漫游开始的时候需要记录当前的位置信息
			var pos = actor.pcarray['pcmesh'].position;
			var rot = actor.pcarray['pcmesh'].rotation;
			// 保存成全局的属性
			actor.mX = pos.x;
			actor.mY = pos.y;
			actor.mZ = pos.z;
			actor.rX = rot.x;
			actor.rY = rot.y;
			actor.rZ = rot.z;
			
			var meshWrapperCube = engine.FindMeshObject('Cube');
			var defcam = actor.pcarray['pcdefaultcamera'].QueryInterface('iPcCamera').GetCamera();
			var i = 0;
			//将sequence控制的mesh的transform赋给camera
			actor.id = C3D.engine.SubscribeFrame(function(){
				i++;
				var mt = meshWrapperCube.movable.GetTransform(); 
				//  将mesh的变换设置给cam对象
				defcam.SetTransform(mt);
				// CONSOLE.WriteLine(actor.seq.GetFirstSequence().sequence_id);
				//此时需要一个判断停止的时间，并将摄像机的控制权交还。
				if(i > 30000){
					C3D.engine.UnsubscribeFrame(actor.id);
					actor.pcarray['pcmesh'].MoveMesh([actor.mX, actor.mY, actor.mZ], [actor.rX, actor.rY, actor.rZ]);
				}
			});
			// 关于开始运行Sequence有两种方案			
			/**第一种：*/
			//获取iSequenceWrapper，名字来源于world.xml文件的sequence标签中
			var seqwrap = enseq.FindSequenceByName('movemesh');
			//获取iSequence，sequence属性封装了Set和Get
			var seq = seqwrap.sequence;
			//RunSequence可以有缺省值
			seqm.RunSequence(1, seq);
			/**第二种：*/
			enseq.RunSequenceByName("movemesh", 0);
		}, "effect.move.start");
		
		//2、通过读取XML文件，用MoveMesh实现。
		// 开始sequence的测试代码
		Event.Subscribe(function(e){
			var actor = e.self;
			// actor.pcarray['pcmech'].MoveMesh([], []);
			actor.pcarray['pcmesh'].MoveMesh([1.70884, 6.14624, -82.8725], [0.0785461, 2.19033, 0]);
			var meshWrapperCube = engine.FindMeshObject('woman');
			var defcam = actor.pcarray['pcdefaultcamera'].QueryInterface('iPcCamera').GetCamera();
			/**先得打开一个需要我读取的sequences文件*/
			var sequenceXML = new xmlDocument();
			var sequenceFile = VFS.Open("art/sequences.xml");   // sequences.xml暂时先放在art/sequences.xml
			var flag = sequenceXML.Parse(sequenceFile);
			if(!flag){
				alert("文件没有打开，请检查路径是否正确！");
			}
			var seqS = sequenceXML.root.GetChild("sequences");
			var seq = seqS.GetChild("sequence");
			// alert("获得的当前的sequence的name   " +  seq.GetAttribute("name").value);
			var seqChildren = seq.GetChildren();

			var timerStart = new Date();
			var startTime = timerStart.getTime(); //保存了一个seq的启动时间。

			C3D.engine.SubscribeFrame(function(){
				
				var timerCurrent = new Date();
				var currentTime = timerCurrent.getTime(); //保存每帧执行的之间
				var diff = currentTime - startTime; //diff保存了离开本序列开始所过去的时间。

				startTime = currentTime; // 需要将startTime更新

				// var duration = currentSeq.GetDuration(); //伪代码，获取当前seq的持续时间。
				// duration为xml中的一个节点

				var bEnd = false;
				while(diff >= 60)   // 100ms     20ms
				{
					diff -= 60;  //插值减去持续时间，是还剩下多少时间。
					// 读取xml中的move和rotate
					seqChild = seqChildren.Next(); // 指向sequence标签中下一帧
					if(!seqChild)
					{//没有更多seq.终止！
						bEnd = true;
						break;
					}
					var Mx = seqChild.GetAttribute("Mx").value;
					var My = seqChild.GetAttribute("My").value;
					var Mz = seqChild.GetAttribute("Mz").value;
					var Rx = seqChild.GetAttribute("Rx").value;
					var Ry = seqChild.GetAttribute("Ry").value;
					var Rz = seqChild.GetAttribute("Rz").value;
					
					var mt = meshWrapperCube.movable.GetTransform();
					//  将mesh的变换设置给cam对象
					defcam.SetTransform(mt);
					
					actor.pcarray['pcmesh'].MoveMesh([Mx, My, Mz], [Rx, Ry, Rz]);
					
					CONSOLE.WriteLine("\n\n");
					// updatePosition();  //本序列结束，无条件更新到本序列的终止位置。
					// currentSeq = currentSeq.next(); // 指向sequence标签中下一帧

					// duration = currentSeq.GetDuration(); //更新值。
					// startTime = currentTime - diff; //更新startTime。计算出其起点时间来。
				}

				if(!bEnd)
				{
					// 计算插值。
					// alert(diff);
					
					var mt = meshWrapperCube.movable.GetTransform();
					//  将mesh的变换设置给cam对象
					defcam.SetTransform(mt);
					
					var pos = actor.pcarray['pcmesh'].position;  //获得当前的坐标，或者记录上一帧的坐标信息
					var rot = actor.pcarray['pcmesh'].rotation;  //获得当前的坐标，或者记录上一帧的坐标信息
					CONSOLE.WriteLine(pos.x + "  " + pos.y + "  " + pos.z);
					// CONSOLE.WriteLine(pos.x + "  " + pos.y + "  " + pos.z + "  " + rot.x + "  " + rot.y + "  " + rot.z);

					// 读取该帧的值，
					seqChild = seqChildren.Next(); // 指向sequence标签中下一帧
					if(!seqChild)
					{//没有更多seq.终止！
						// bEnd = true;
						// break;
					}

					var Mx = seqChild.GetAttribute("Mx").value;
					var My = seqChild.GetAttribute("My").value;
					var Mz = seqChild.GetAttribute("Mz").value;
					var Rx = seqChild.GetAttribute("Rx").value;
					var Ry = seqChild.GetAttribute("Ry").value;
					var Rz = seqChild.GetAttribute("Rz").value;
					CONSOLE.WriteLine(Mx + "  " + My + "  " + Mz);
					// CONSOLE.WriteLine(Mx + "  " + My + "  " + Mz + "  " + Rx + "  " + Ry + "  " + Rz);
					// actor.pcarray['pcmesh'].MoveMesh([Mx, My, Mz], [Rx, Ry, Rz]);

					//并算出距离朝向差值jc
					var yangxiuwu = 60 - diff;  //20-9ms
					var i = 1;
					// while((Mx > pos.x) && (Mx > pos.x) && (Mx > pos.x)/*jc.x.y.z*/){
					while(yangxiuwu >= 0/*jc.x.y.z*/){

						// pos = actor.pcarray['pcmesh'].position;  //获得当前的坐标，或者记录上一帧的坐标信息
						// rot = actor.pcarray['pcmesh'].rotation;  //获得当前的坐标，或者记录上一帧的坐标信息
						
						// 保存position的差值
						var posDiffX = Mx - pos.x;
						var posDiffY = My - pos.y;
						var posDiffZ = Mz - pos.z;
						var rotDiffX = Rx - rot.x;
						var rotDiffY = Ry - rot.y;
						var rotDiffZ = Rz - rot.z;

						// var jc = /* 读取的值-pos.x.y.z */0;
						// 读取的值 + jc / duration * diff;
						pos.x = pos.x + posDiffX / 60 * diff;
						pos.y = pos.y + posDiffY / 60 * diff;
						pos.z = pos.z + posDiffZ / 60 * diff;
						rot.x = rot.x + rotDiffX / 60 * diff;
						rot.y = rot.y + rotDiffY / 60 * diff;
						rot.z = rot.z + rotDiffZ / 60 * diff;
						
						i++;
						yangxiuwu = 60-(i*diff)
						// posDiffX = posDiffX - posDiffX / 20 * diff;
						// posDiffY = posDiffY - posDiffY / 20 * diff;
						// posDiffZ = posDiffZ - posDiffZ / 20 * diff;
						// rotDiffX = rotDiffX - rotDiffX / 20 * diff;
						// rotDiffY = rotDiffY - rotDiffY / 20 * diff;
						// rotDiffZ = rotDiffZ - rotDiffZ / 20 * diff;
						actor.pcarray['pcmesh'].MoveMesh([pos.x, pos.y, pos.z], [rot.x, rot.y, rot.z]);
					}
					actor.pcarray['pcmesh'].MoveMesh([Mx, My, Mz], [Rx, Ry, Rz]);
					
					
					/* jx = Mx - pos.x;
					jy = My - pos.y;
					jz = Mz - pos.z; */

					// var jc = /* 读取的值-pos.x.y.z */0;
					// 读取的值 + jc / duration * diff;
					/* Mx = pos.x + jx / 20 * diff;
					My = pos.y + jy / 20 * diff;
					Mz = pos.z + jz / 20 * diff;

					jx = jx - jx / 20 * diff;
					jy = jy - jy / 20 * diff;
					jz = jz - jz / 20 * diff; */
					// 移动到当前位置，此时就是所谓的插值
					// while((posDiffX > 0) || (posDiffY > 0) || (posDiffZ > 0) 
						// || (rotDiffX > 0) || (rotDiffY > 0) || (rotDiffZ > 0)/*jc.x.y.z*/){
						// actor.pcarray['pcmesh'].MoveMesh([Mx, My, Mz], [Rx, Ry, Rz]);
						// 此时应该对rotation进行矫正
						// 根据当前位置信息更新jc的值，读取到的该帧的值-移动之后的值.x.y.z
					// }
					// var factor = diff / duration;
					// seq开始状态＋ 变化 * factor就是当前状态。计算并更新。
				}else{
					//可选的，这里发一个消息。例如恢复之类的。
				}
			});
		}, "effect.test.XXXXXXXXXX");
		
		
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcmesh'].SetVisible(false);
			// actor.pcarray['pcmech'].MoveMesh([], []);
			actor.pcarray['pcmesh'].MoveMesh([1.70884, 6.14624, -82.8725], [0.0785461, 2.19033, 0]);
			var meshWrapperCube = engine.FindMeshObject('woman');
			var defcam = actor.pcarray['pcdefaultcamera'].QueryInterface('iPcCamera').GetCamera();
			/**先得打开一个需要我读取的sequences文件*/
			var sequenceXML = new xmlDocument();
			var sequenceFile = VFS.Open("art/sequences.xml");   // sequences.xml暂时先放在art/sequences.xml
			var flag = sequenceXML.Parse(sequenceFile);
			if(!flag){
				alert("文件没有打开，请检查路径是否正确！");
			}
			var seqS = sequenceXML.root.GetChild("sequences");
			var seq = seqS.GetChild("sequence");
			// alert("获得的当前的sequence的name   " +  seq.GetAttribute("name").value);
			// var seqChildren = seq.GetChildren();

			var timerStart = new Date();
			var startTime = timerStart.getTime(); //保存了一个seq的启动时间。
			var yangTime = startTime;

			var i = 0;
			C3D.engine.SubscribeFrame(function(){
				var mt = meshWrapperCube.movable.GetTransform();
				//  将mesh的变换设置给cam对象
				defcam.SetTransform(mt);
				i ++;
				var timerCurrent = new Date();
				var currentTime = timerCurrent.getTime(); //保存每帧执行的之间
				var diff = currentTime - startTime; //diff保存了离开本序列开始所过去的时间。
				// N 节点s
				var nextID = Math.ceil(diff/20);
				var prevID = nextID - 1;
				var seqChild = seq.GetChild("seq" + nextID);
				// CONSOLE.WriteLine("seq" + Math.ceil(diff/20));
				if(Math.ceil(diff/20) > 1000){
					alert(00);
				}
				var Mx = Number(seqChild.GetAttribute("Mx").value);
				var My = Number(seqChild.GetAttribute("My").value);
				var Mz = Number(seqChild.GetAttribute("Mz").value);
				var Rx = Number(seqChild.GetAttribute("Rx").value);
				var Ry = Number(seqChild.GetAttribute("Ry").value);
				var Rz = Number(seqChild.GetAttribute("Rz").value);
				
				// N 的前一个节点
				var seqChild = seq.GetChild("seq" + prevID);
				var posx = Number(seqChild.GetAttribute("Mx").value);
				var posy = Number(seqChild.GetAttribute("My").value);
				var posz = Number(seqChild.GetAttribute("Mz").value);
				var rotx = Number(seqChild.GetAttribute("Rx").value);
				var roty = Number(seqChild.GetAttribute("Ry").value);
				var rotz = Number(seqChild.GetAttribute("Rz").value);
				// 保存position的差值
				var posDiffX = Mx - posx;
				var posDiffY = My - posy;
				var posDiffZ = Mz - posz;
				var rotDiffX = Rx - rotx;
				var rotDiffY = Ry - roty;
				var rotDiffZ = Rz - rotz;
				// var jc = /* 读取的值-pos.x.y.z */0;
				// 读取的值 + jc / duration * diff;
				var factor = (diff % 20 )/ 20;
				posx = posx + posDiffX * factor; //1-(Math.ceil(diff/20) - diff/20));
				posy = posy + posDiffY * factor;
				posz = posz + posDiffZ * factor;
				rotx = rotx + rotDiffX * factor;
				roty = roty + rotDiffY * factor;
				rotz = rotz + rotDiffZ * factor;
				if(diff%20 != 0){
					CONSOLE.WriteLine(" " + posx + "\t\t    " + posy + "\t\t    " + posz + "  " + nextID + "  " + diff/* + "    " + rotx + "    " + roty + "    " + rotz*/);
					actor.pcarray['pcmesh'].MoveMesh([posx, posy, posz], [rotx, roty, rotz]);
					//startTime = currentTime; // 需要将startTime更新
				}else {
					CONSOLE.WriteLine("\n\nDiff  " + diff + "   " + Mx + "\t\t  " + My + "\t\t  " + Mz);
					actor.pcarray['pcmesh'].MoveMesh([Mx, My, Mz], [rotx, roty, rotz]);
				}
			});
		}, "effect.XXXXXXXXXXXX");
		
				
		//暂停sequence的测试代码
		Event.Subscribe(function(e){
			//暂停sequence
			seqm.Suspend();
		}, "effect.move.suspend");
		
		//继续sequence的测试代码
		Event.Subscribe(function(e){
			//继续sequence
			seqm.Resume();
		}, "effect.move.resume");
		
		//还原一个状态而已，模拟成停止sequence
		Event.Subscribe(function(e){
			//快速执行完毕
			var actor = e.self;
			// 停止漫游，此时的数值取决于sequence标签的时间    time = duration * 帧数
			seqm.TimeWarp(2000,true);
			// 将摄像机和移动的mesh分开，还原
			C3D.engine.UnsubscribeFrame(actor.id);
			// 恢复原来的位置和朝向信息
			actor.pcarray['pcmesh'].MoveMesh([actor.mX, actor.mY, actor.mZ], [actor.rX, actor.rY, actor.rZ]);
			
		}, "effect.move.over");
		
		/**
			添加开关门的控制
			开关门不需要暂停及停止等动作，故只需要开始即可。
		*/
		
		/**
			从world.xml中读取sequence标签，实现开门关门的动作。
		 */
		//开门
		Event.Subscribe(function(e){
			//获取iSequenceWrapper，名字来源于world.xml文件的sequence标签中
			var seqwrap = enseq.FindSequenceByName('open_xml_door');
			//获取iSequence，sequence属性封装了Set和Get
			var seq = seqwrap.sequence;
			//RunSequence可以有缺省值
			seqm.RunSequence(1, seq);
		}, "effect.xml.open");
		
		//关门
		Event.Subscribe(function(e){
			//获取iSequenceWrapper，名字来源于world.xml文件的sequence标签中
			var seqwrap = enseq.FindSequenceByName('close_xml_door');
			//获取iSequence，sequence属性封装了Set和Get
			var seq = seqwrap.sequence;
			//RunSequence可以有缺省值
			seqm.RunSequence(1, seq);
		}, "effect.xml.close");
		
		
		/**
			从JS层创建sequence对象，实现开门关门的动作。
		 */
		 //开门
		Event.Subscribe(function(e){
			var actor = e.self;
			var iSequenceWrapper_open = enseq.CreateSequence("open_js_door");     //iSequenceWrapper
			iSequenceWrapper_open.AddOperationRotateDuration(1, iParameterESM, -1,-1, 1, 1.57, -1, -1, v0, 2000,true);
			var seq = iSequenceWrapper_open.sequence;
			seqm.RunSequence(1, seq);
		}, "effect.js.open");
		
		//关门
		Event.Subscribe(function(e){
			var actor = e.self;
			var iSequenceWrapper_close = enseq.CreateSequence("close_js_door");     //iSequenceWrapper
			iSequenceWrapper_close.AddOperationRotateDuration(1, iParameterESM, -1,-1, 1, -1.57, -1, -1, v0, 2000,true);
			var seq = iSequenceWrapper_close.sequence;
			seqm.RunSequence(1, seq);
		}, "effect.js.close");
		
		/*Event.Subscribe(function(e){
			var actor = e.self;
			actor.defcam.onupdate = null;
		}, "effect.js.closeyang");*/
		
		
		Event.Subscribe(function(e){
			var actor = e.self;
			// 漫游开始的时候需要记录当前的位置信息
			var pos = actor.pcarray['pcmesh'].position;
			var rot = actor.pcarray['pcmesh'].rotation;
			// 保存成全局的属性
			actor.mX = pos.x;
			actor.mY = pos.y;
			actor.mZ = pos.z;
			actor.rX = rot.x;
			actor.rY = rot.y;
			actor.rZ = rot.z;
			var meshWrapperCube = engine.FindMeshObject('Cube');
			actor.defcam = actor.pcarray['pcdefaultcamera'].QueryInterface('iPcDefaultCamera');
			var i = 1;
			// onupdate接口准备废弃，请采用"effect.move.start"事件中的操作
			
			// 拿到摄像机的控制权
			actor.defcam.onupdate = function(cam,view){
				i ++;
				//  获得mesh的变换，transfrom
				var mt = meshWrapperCube.movable.GetTransform(); 
				//  将mesh的变换设置给cam对象
				cam.SetTransform(mt);
				//此时需要一个判断停止的时间，并将摄像机的控制权交还。
				if(i == 3000)
				{
					// 直接调用停止事件
					Event.Send({
						name : "effect.move.over",
						self : actor
					});
				}
				return false;
			};
			//获取iSequence，sequence属性封装了Set和Get
			var seqwrap = enseq.FindSequenceByName('movemesh');
			var seq = seqwrap.sequence;
			//RunSequence可以有缺省值
			seqm.RunSequence(1, seq);
			
		}, "effect.test.rotate");
		
	})();

} catch(e){
	alert(e);
}

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
                Event.Subscribe(function(e) {
                        var actor = e.self;
						pos = actor.pcarray['pcmesh'].GetProperty('position');
                        CONSOLE.WriteLine("[Debug] effect.forword1 : '" + pos.x + " " + pos.y + " " + pos.z + "' begin");
                        actor.pcarray['pcactormove'].Forward(true);
                        actor.pcarray['pcmesh'].SetAnimation('run', true, false);
                }, "effect.forward1");
               
                Event.Subscribe(function(e){
                        var actor = e.self;
                        actor.pcarray['pcactormove'].Forward(false);
                        actor.pcarray['pcmesh'].SetAnimation('stand', true, true);
                }, "effect.forward0");
               
                Event.Subscribe(function(e){
                        var actor = e.self;
                        actor.pcarray['pcactormove'].Backward(true);
                        actor.pcarray['pcmesh'].SetAnimation('run', true, false);
                }, "effect.backward1");
               
                Event.Subscribe(function(e){
                        var actor = e.self;
                        actor.pcarray['pcactormove'].Backward(false);
                        actor.pcarray['pcmesh'].SetAnimation('stand', true, true);
                }, "effect.backward0");
               
                Event.Subscribe(function(e){
                        var actor = e.self;
                        actor.pcarray['pcactormove'].RotateLeft(true);
                        actor.pcarray['pcmesh'].SetAnimation('run', true, true);
                }, "effect.rotateleft1");
               
                Event.Subscribe(function(e){
                        var actor = e.self;
                        actor.pcarray['pcactormove'].RotateLeft(false);
                        actor.pcarray['pcmesh'].SetAnimation('stand', true, true);
                }, "effect.rotateleft0");
               
                Event.Subscribe(function(e){
                        var actor = e.self;
                        actor.pcarray['pcactormove'].RotateRight(true);
                        actor.pcarray['pcmesh'].SetAnimation('run', true, true);
                }, "effect.rotateright1");
               
                Event.Subscribe(function(e){
                        var actor = e.self;
                        actor.pcarray['pcactormove'].RotateRight(false);
                        actor.pcarray['pcmesh'].SetAnimation('stand', true, true);
                }, "effect.rotateright0");
				global_x = 0;   //记录鼠标前一次坐标
				global_y = 0;   //同上   
				index = 0;   //记录摄像机旋转角度
				/**
					鼠标移动
				*/
				Event.Subscribe(function(e){   
                    var actor = e.self;
					if(actor.click){   //判断鼠标是否点下
						if(actor.type == "left"){   
							/**
								鼠标左键拖动
							*/
							var x = actor.x;
							var y = actor.y;   //鼠标当前位置坐标
							var pos = actor.pcarray['pcmesh'].GetProperty('position');   //mesh box 坐标
							var cameraObj = view.camera;   //摄像机对象
							cameraObj.sector = engine.sectors.FindByName("Scene");   //设置摄像机sector对象
							var trans = cameraObj.GetTransform().GetTransform();   //摄像机transform
							var or = trans.GetOrigin();   //摄像机原点坐标
							/**
								设置摄像机观看角度
							*/
							var loc = new Math3.Vector3(6 - or.x, -0.09 - or.y, -3 - or.z);   //设置摄像机LookAt观看角度坐标
							var roty = new Math3.Vector3(0, 1, 0);   //设置摄像机坐标轴
							trans.LookAt(loc, roty);   //设置摄像机LookAt观看角度
							trans.SetTransform(trans);   //重置transform
							cameraObj.SetTransform(trans);   //重置摄像机transform
							/**
								设置摄像机高度
							*/
							if(or.y == 0){  
								cameraObj.MoveWorld([0, 10, 0]);
							}
							
							/**
								摄像机移动
							*/
							if(y >= global_y && y - global_y > x - global_x){   //鼠标向下拖动(这个判断条件不是太严密，可以自主修改)
								global_y = y;   //记录上一次鼠标纵坐标
								cameraObj.MoveWorld([0, 0, 0.05]);   //摄像机在世界坐标系下移动
							} else if (y <= global_y && -(y - global_y) > x - global_x){   //鼠标向上拖动
								global_y = y;   //记录上一次鼠标纵坐标
								cameraObj.MoveWorld([0, 0, -0.05]);   //摄像机在世界坐标系下移动
							}
							if(x >= global_x && x - global_x > y - global_y){   //鼠标向左拖动
								global_x = x;   //记录上一次鼠标横坐标
								cameraObj.MoveWorld([-0.05, 0, 0]);   //摄像机在世界坐标系下移动
							} else if (x <= global_x && -(x - global_x) > y - global_y){   //鼠标向右拖动
								global_x = x;   //记录上一次鼠标横坐标
								cameraObj.MoveWorld([0.05, 0, 0]);   //摄像机在世界坐标系下移动
							}
						} else if (actor.type == "right"){
							/**
								鼠标右键拖动
							*/
							var cameraObj = view.camera;   //摄像机对象
							cameraObj.sector = engine.sectors.FindByName("Scene");   //设置摄像机sector对象
							var trans = cameraObj.GetTransform().GetTransform();   //摄像机transform
							var or = trans.GetOrigin();   //摄像机原点坐标
							/**
								计算摄像机摄像机旋转角度以及效果设置
							*/
							var quater = new Math3.Quaternion(trans.GetO2T());   //获取四元对象
							if(index >= 0 && index <= 360){   //判断摄像机旋转角度，范围在0～360
								var roty = new Math3.Vector3(0, -1, 0);   //设置坐标轴，即摄像机绕着哪个轴旋转，此为逆时针旋转，当为(0, 1, 0)
								var angle = 3.1415926 / 180;   //计算弧度
								quater.SetAxisAngle(roty, index * angle);   //设置摄像机旋转弧度
								index++;   //角度累计
							} 
							
							if (index == 360){   //设置旋转角度
								index = 0;
							}
							/**
								将摄像机旋转矩阵给摄像机transform矩阵
							*/
							var matrix = quater.GetMatrix();   //获取四元组矩阵
							trans.SetO2T(matrix);   //将获取到矩阵设置到transform
							trans.SetTransform(trans);
							cameraObj.SetTransform(trans);
							
						} 	
						
					}
					
                }, "effect.mouseMove");
				
				/**
					判断点击是否是鼠标左键
				*/
				Event.Subscribe(function(e){
					var actor = e.self;
					actor.click = true;	
					actor.type = "left";
						
                }, "effect.move");
				
				/**
					判断鼠标左键是否弹起
				*/
				Event.Subscribe(function(e){  
					var actor = e.self;
					actor.click = false;
						
				}, "effect.moveStop");
				
				/**
					判断点击是否是鼠标右键
				*/
				Event.Subscribe(function(e){  
					var actor = e.self;
					actor.click = true;
					actor.type = "right";
						
				}, "effect.turn");
				
				/**
					判断鼠标右键是否弹起
				*/
				Event.Subscribe(function(e){ 
					var actor = e.self;
					actor.click = false;
					actor.type = "left";
						
				}, "effect.turnStop");
				
				/**
					鼠标滚轮 --- 前滚动
				*/
				Event.Subscribe(function(e){
					var actor = e.self;
					var cameraObj = view.camera;
					cameraObj.sector = engine.sectors.FindByName("Scene");
					var trans1 = cameraObj.transform.GetTransform();
					var or = trans1.GetOrigin();	
					/**
						设置摄像机高度，以及观看角度
					*/
					var loc = new Math3.Vector3(6 - or.x, -0.09 - or.y, -3 - or.z);
					var roty = new Math3.Vector3(0, 1, 0);
					trans1.LookAt(loc, roty);
					trans1.SetTransform(trans1);
					cameraObj.transform = trans1;	
					or = trans1.GetOrigin();
					/**
						设置条件，当高度在最低限制时，不能再调整高度
					*/
					if(or.y == 0){
						cameraObj.MoveWorld([0, 10, 0]);
					} else if (or.x <= 6 && or.z >= -3 && or.y > 1){
						cameraObj.MoveWorld([0.6, -1, -0.3]);
					}					
					
				}, "effect.middleForward");
				
				/**
					鼠标滚轮 --- 后滚动
				*/
				Event.Subscribe(function(e){
					var actor = e.self;
					var cameraObj = view.camera;
					cameraObj.sector = engine.sectors.FindByName("Scene");
					trans1 = cameraObj.transform.GetTransform();
					var or = trans1.GetOrigin();	
					/**
						设置摄像机高度，以及观看角度
					*/
					var loc = new Math3.Vector3(6 - or.x, -0.09 - or.y, -3 - or.z);
					var roty = new Math3.Vector3(0, 1, 0);
					trans1.LookAt(loc, roty);
					trans1.SetTransform(trans1);
					cameraObj.transform = trans1;	
					or = trans1.GetOrigin();	
					/**
						设置条件，当高度在最高限制时，不能再调整高度
					*/					
					if(or.y == 0){
						cameraObj.MoveWorld([6, 10, -3]);
					} else if (or.x >= 0 && or.z <= 0 && or.y < 10){
						cameraObj.MoveWorld([-0.6, 1, 0.3]);
					}				
						
				}, "effect.middleBackward");
        })();
} catch(e){
        alert(e);
}

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
                        CONSOLE.WriteLine("[Debug] effect.forword1 : '" + actor.name + "' begin");
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
				
				Event.Subscribe(function(e){
                        var actor = e.self;
                        var pccam = actor.pcarray['pcdefaultcamera'].QueryInterface("iPcDefaultCamera");
						var iPcCamera = pccam.QueryInterface('iPcCamera');
						var cameraObj_cur = iPcCamera.GetCamera();
						var transform_cur = cameraObj_cur.GetTransform();
						
						var pos = transform_cur.GetOrigin();
	
						cameraObj = view.camera;
						var transform = cameraObj.GetTransform();
						var vector3 = new Math3.Vector3(pos.x, pos.y, pos.z);
						origin = transform.GetOrigin();
						if(origin.x== 0 && origin.z == 0){
							transform.SetOrigin(vector3);
						}
						// origin = transform.GetOrigin();
						// CONSOLE.Write("[debug] [Transform] i=" + origin.x + "; " + origin.y + "; " + origin.z + " .\n");
						//var move = new Math3.Vector3(pos.x, 0.5, pos.z);
						//alert(cameraObj.sector);
						origin = transform.GetOrigin();
						cameraObj.sector = engine.sectors.FindByName("Scene");
						if(origin.x > 0 && origin.z > 0){
							var move = new Math3.Vector3(6, 1, 6);
							cameraObj.MoveWorld(move);
							CONSOLE.Write("[debug] [Transform] ii= >> .\n");
						} else if (origin.x < 0 && origin.z > 0){
							var move = new Math3.Vector3(-6, 1, 6);
							cameraObj.MoveWorld(move);
							CONSOLE.Write("[debug] [Transform] ii= <> .\n");
						} else if (origin.x > 0 && origin.z < 0){
							var move = new Math3.Vector3(6, 1, -6);
							cameraObj.MoveWorld(move);
							CONSOLE.Write("[debug] [Transform] ii= >< .\n");
						} else if (origin.x < 0 && origin.z < 0){
							var move = new Math3.Vector3(-6, 1, -6);
							cameraObj.MoveWorld(move);
							CONSOLE.Write("[debug] [Transform] ii= << .\n");
						}
						// cameraObj.MoveWorld(vector3);
						origin = transform.GetOrigin();
						CONSOLE.Write("[debug] [Transform] i1=" + origin.x + "; " + origin.y + "; " + origin.z + " .\n");
						
						
                }, "effect.aimMode");
        })();
} catch(e){
        alert(e);
}

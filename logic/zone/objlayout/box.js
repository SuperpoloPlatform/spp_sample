/**************************************************************************
 *
 *  This file is part of the UGE(Uniform Game Engine).
 *  Copyright (C) by SanPolo Co.Ltd.
 *  All rights reserved.
 *
 *  See http://uge.spolo.org/ for more information.
 *
 *  SanPolo Co.Ltd
 *  http://uge.spolo.org/   sales@spolo.org uge-support@spolo.org
 *
**************************************************************************/
try {
        BOX = {
                name : "box",
                pc : {
						"pcmover" : {},
                        "pcmesh" : {
							action : [
								{
									name : "SetMesh",
									param : [
											['name','box']
									]
								},
								{
									name : "SetAnimation",
									param : [
											['animation','stand'],
											['cycle',true]
									]
								}
							]
                        },
                        "pclinearmovement" : {
							action : [
								{
									name : "InitCD",
									param : [
											['offset',[0, 0.0, 0]],
											['body',[0.5,0.5,0.5]],
											['legs',[0.5,0.9,0.5]]
									]
								}
							]
                        },
                        "pcactormove" : {
							action : [
								{
									name : "SetSpeed",
									param : [
											['movement',4],
											['running',2],
											['rotation',2],
											['jumping',3]
									]
								}
							],
							property : [
								{
									name : "mousemove",
									value : false
								}       
							]
                        },
						"pccommandinput" : {
							action : [
								{
									name : "Bind",
									param : [
											['trigger','ESC'],
											['command','quit']
									]
								},
								{
									name : "Bind",
									param : [
											['trigger', 'w'],
											['command', 'forward']
									]
								},
								{
									name : "Bind",
									param : [
											['trigger', 's'],
											['command', 'backward']
									]
								},
								{
									name : "Bind",
									param : [
											['trigger', 'a'],
											['command', 'rotateleft']
									]
								},
								{
									name : "Bind",
									param : [
											['trigger', 'd'],
											['command', 'rotateright']
									]
								},
								
							]
						}
                },
               
                event : {
					"pccommandinput_quit0" : function(){
							System.Quit();
					},
					"pccommandinput_forward1" : function(){
							Event.Send({
									name : "effect.forward1",
									self : this
							});
					},
					"pccommandinput_forward0" : function(){
							Event.Send({
									name : "effect.forward0",
									self : this
							});
					},
					"pccommandinput_backward1" : function(){
							Event.Send({
									name : "effect.backward1",
									self : this
							});
					},
					"pccommandinput_backward0" : function(){
							Event.Send({
									name : "effect.backward0",
									self : this
							});
					},
					"pccommandinput_rotateleft1" : function(){
							Event.Send({
									name : "effect.rotateleft1",
									self : this
							});
					},
					"pccommandinput_rotateleft0" : function(){
							Event.Send({
									name : "effect.rotateleft0",
									self : this
							});
					},
					"pccommandinput_rotateright1" : function(){
							Event.Send({
									name : "effect.rotateright1",
									self : this
							});
					},
					"pccommandinput_rotateright0" : function(){
							Event.Send({
									name : "effect.rotateright0",
									self : this
							});
					},
                },
                property : {
                       
                },

                subscribe : {
                       
                }
        };
}
catch (e)
{
        alert(e);
}
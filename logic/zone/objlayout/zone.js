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
        ZONE = {
                name : "zone",
                pc : {
					"pczonemanager" : {
						action : [
							{
								name : "Load",
								param : [
										['path', '.'],
										['file', 'level.xml']
								]
							}
						]
					},
					"pcdefaultcamera" : {
						action : [
							{
								name : "SetCamera",
								param : [
										['modename', 'firstperson']
								]
							},
							{
								name : "SetZoneManager",
								param : [
										['entity', 'zone'], 
										['region', 'main'],
										['start', 'Camera']
								]
							}
						],
						property : [
							{
								name : "distance",
								value : 3
							}
						]
					},
					"pcsimplecamera" : {
						action : [
							{
								name : "SetPosition",
								param : [
										['campos', [0, 1, 3]],
										['lookat', [0, 1, 0]]
								]
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
										['trigger', 'up'],
										['command', 'up']
								]
							},
							{
								name : "Bind",
								param : [
										['trigger', 'down'],
										['command', 'down']
								]
							},
							{
								name : "Bind",
								param : [
										['trigger','left'],
										['command','left']
								]
							},
							{
								name : "Bind",
								param : [
										['trigger','right'],
										['command','right']
								]
							},
							{
								name : "Bind",
								param : [
										['trigger','c'],
										['command','camera']
								]
							},
							{
								name : "Bind",
								param : [
										['trigger','z'],
										['command','split']
								]
							},
							{
								name : "Bind",
								param : [
										['trigger','0MouseButton1'],
										['command','mouseright']
								]
							},
							{
								name : "Bind",
								param : [
										['trigger','0MouseAxis1'],
										['command','mousemove']
								]
							},
							
						]
					}

                },
               
                event : {
                    "pccommandinput_quit0" : function(){
							System.Quit();
					},
					
					"pccommandinput_camera1" : function(){
							Event.Send({
									name : "effect.camera1",
									self : this
							});
					},
					
					"pccommandinput_split1" : function(){
							Event.Send({
									name : "effect.split1",
									self : this
							});
					},
					
					"pccommandinput_up1" : function(){
							Event.Send({
									name : "effect.up1",
									self : this
							});
					},
					
					"pccommandinput_down1" : function(){
							Event.Send({
									name : "effect.down1",
									self : this
							});
					},
					
					"pccommandinput_left1" : function(){
							Event.Send({
									name : "effect.left1",
									self : this
							});
					},
					
					"pccommandinput_right1" : function(){
							Event.Send({
									name : "effect.right1",
									self : this
							});
					},
					
					"pccommandinput_mousemove" : function (msgid, x, y){
						this.x = x[1];
						this.y = y[1];
						Event.Send({
							name : "effect.mouseMove",
							self : this
						});
					},
					
					"pccommandinput_mouseright1" : function (){   //鼠标左键
						Event.Send({
							name : "effect.mouseDown",
							self : this
						});
					},
					
					"pccommandinput_mouseright0" : function (){   //鼠标左键
						Event.Send({
							name : "effect.mouseUp",
							self : this
						});
					},
   
                },
                property : {
                    click : false 
                },

                subscribe : {
                       
                }
        };
}
catch (e)
{
        alert(e);
}
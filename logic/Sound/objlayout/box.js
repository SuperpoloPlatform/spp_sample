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
							['modename', 'thirdperson']
						]
					},
					{
						name : "SetZoneManager",
						param : [
							['entity', 'box'], 
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
			"pcsoundsource" : {},
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
							['trigger', 'left'],
							['command', 'playwav']
						]
					},
					{
						name : "Bind",
						param : [
							['trigger', 'w'],
							['command', 'playogg']
						]
					},
					{
						name : "Bind",
						param : [
							['trigger', 'right'],
							['command', 'stop']
						]
					},
					{
						name : "Bind",
						param : [
							['trigger', 'up'],
							['command', 'upsound']
						]
					},
					{
						name : "Bind",
						param : [
							['trigger', 'down'],
							['command', 'downsound']
						]
					},
					{
						name : "Bind",
						param : [
							['trigger', 'r'],
							['command', 'reset']
						]
					}
				]
			}
		},
	   
		event : {
			"pccommandinput_quit0" : function(){
					System.Quit();
			},
			"pccommandinput_playwav1" : function(){
				if(this.state != "play") {
					this.state = "play";
					this.pcarray['pcsoundsource'].SetProperty('mode', 'relative');
					this.pcarray['pcsoundsource'].SetProperty('soundname', 'loopbzzt.wav');
					this.pcarray['pcsoundsource'].SetProperty('volume', 1.5);
					this.pcarray['pcsoundsource'].Play();
				}
			},
			"pccommandinput_playogg1" : function(){
				if(this.state != "play") {
					this.state = "play";
					this.pcarray['pcsoundsource'].SetProperty('mode', 'relative');
					this.pcarray['pcsoundsource'].SetProperty('soundname', 'loopbzzt.ogg');
					this.pcarray['pcsoundsource'].SetProperty('volume', 1.5);
					this.pcarray['pcsoundsource'].Play();
				}
			},
			"pccommandinput_stop1" : function(){
				if(this.state == "play"){
				this.pcarray['pcsoundsource'].SetProperty('soundname', 'loopbzzt.ogg');
					this.state = "stop";
					this.pcarray['pcsoundsource'].Stop();
				}   
			},
			"pccommandinput_upsound1" : function(){
				if(this.state == "play"){
					var volume = this.pcarray['pcsoundsource'].GetProperty('volume');
					volume = volume + 0.5;
					this.pcarray['pcsoundsource'].SetProperty('volume', volume);
				}
			},
			"pccommandinput_downsound1" : function(){
				if(this.state == "play"){
					var volume = this.pcarray['pcsoundsource'].GetProperty('volume');
					volume = volume - 0.5;
					if(volume > 0){
						this.pcarray['pcsoundsource'].SetProperty('volume', volume);
					} else {
						this.pcarray['pcsoundsource'].SetProperty('volume', 0.0);
					}
				}
			},
			"pccommandinput_reset1" : function(){
				if(this.state == "play"){
					var reset = this.pcarray['pcsoundsource'].GetProperty('loop');
					if(reset){
						this.state = "close";
						this.pcarray['pcsoundsource'].SetProperty('loop', false);
					} else {
						this.pcarray['pcsoundsource'].SetProperty('loop', true);
					}
				}
			},
		},
		property : {
			state : "close"  //²¥·Å×´Ì¬
		},

		subscribe : {
			   
		}
	};
}
catch (e)
{
        alert(e);
}
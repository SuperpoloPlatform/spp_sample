/************************************************************************
* this is a data.js
**************************************************************************/
try{
	//ui .scheme load
	UIDATA = {
		scheme : {
			filename : "3dSchool.scheme",
			mouseImgSet : "ice",
			mouseImgName : "MouseArrow"
		},
		freeTypeFont : {
			"FangSong" : {
			    filename : "/fonts/SIMHEI.TTF",
			    pointSize : "12",
				antiAliased : "true",
			    autoScaled : "false",
			    nativeHorzRes : 800,
				nativeVertRes : 600
			}
		}
	};
	// ui .layout load
	UILAYOUT = {
		name : "3dSchool.layout",
		method :{
			//显示和隐藏窗口
			setVisibles : function(){
				var associatedWindow = this.associatedWindow;
	            for(var index in associatedWindow)
	            {
					CONSOLE.WriteLine("associatedWindow[index]         "+associatedWindow[index]);
	                if (associatedWindow[index] == "this") {
	                    this.SetProperty("Visible","False");
	                }
	                else
	                {
	                    var show_window = GUI.Windows.Get(associatedWindow[index]);//获取窗口
                        var isVisible = show_window.GetProperty("Visible");

                        if (isVisible == "True") {
                            show_window.SetProperty("Visible","False");//设置成不可见
                        }
                        else
                        {
                            show_window.SetProperty("Visible","True");
                        }
	                }
	            }
			},
			//视角控制模块
			setViewDirection : function(){
				if(this.associatedWindow != "undefined"){
					var associatedWindow = this.associatedWindow;
					for(var index in associatedWindow)
					{
						CONSOLE.WriteLine("associatedWindow[index]         "+associatedWindow[index]);
						if (associatedWindow[index] == "this") {
							this.SetProperty("Visible","False");
						}
						else
						{
							var show_window = GUI.Windows.Get(associatedWindow[index]);
							var isVisible = show_window.GetProperty("Visible");

							if (isVisible == "True") {
								show_window.SetProperty("Visible","False");
							}
							else
							{
								show_window.SetProperty("Visible","True");
							}
						}
					}
				}
				switch(this.effect)
				{
					case "view_nobody":
						var prompt = GUI.Windows.Get(this.associatedPrompt);
						prompt.SetProperty("Text",this.statictext);
						break;
					case "view_ok":
						Event.Send({
							name:"effect.change",
							self:player,
							id: this.weapon
						});
							CONSOLE.WriteLine("\n weapon is "+this.weapon);
						break;
					case "view_cancel":
						break;
					case "view_up"://视角向上
						Event.Send({
							name : "effect.stop",
							self : player
						});
						Event.Send({
							name : "effect.rotateup1",
							self : player
						});
						CONSOLE.WriteLine("\n the view or direction is "+this.effect);
						break;
					case "view_down"://视角向下
						Event.Send({
							name : "effect.stop",
							self : player
						});
						Event.Send({
							name : "effect.rotatedown1",
							self : player
						});
						CONSOLE.WriteLine("\n the view or direction is "+this.effect);
						break;
					case "view_left"://视角向左
						Event.Send({
							name : "effect.stop",
							self : player
						});
						Event.Send({
							name : "effect.rotateleft1",
							self : player
						});
						CONSOLE.WriteLine("\n the view or direction is "+this.effect);
						break;
					case "view_right"://视角向右
						Event.Send({
							name : "effect.stop",
							self : player
						});
						Event.Send({
							name : "effect.rotateright1",
							self : player
						});
						CONSOLE.WriteLine("\n the view or direction is "+this.effect);
						break;
					case "dir_front"://方向向上行
						Event.Send({
							name:"effect.line.up1",
							self:player
						});
						CONSOLE.WriteLine("\n the view or direction is "+this.effect);
						break;
					case "dir_back"://方向向下行
						Event.Send({
							name:"effect.line.down1",
							self:player
						});
						CONSOLE.WriteLine("\n the view or direction is "+this.effect);
						break;
					case "dir_left"://方向向左行
						Event.Send({
							name:"effect.line.left1",
							self:player
						});
						CONSOLE.WriteLine("\n the view or direction is "+this.effect);
						break;
					case "dir_right"://方向向右行
						Event.Send({
							name:"effect.line.right1",
							self:player
						});
						CONSOLE.WriteLine("\n the view or direction is "+this.effect);
						break;
					case "go_front"://方向向前行
						Event.Send({
							name : "effect.forward1",
							self : player
						});
						CONSOLE.WriteLine("\n the view or direction is "+this.effect);
						break;
					case "go_back"://方向向后行
						Event.Send({
							name : "effect.backward1",
							self : player
						});
						CONSOLE.WriteLine("\n the view or direction is "+this.effect);
						break;
					case "stop_effect"://停止所有动作
						Event.Send({
							name : "effect.stop",
							self : player
						});
						CONSOLE.WriteLine("\n the view or direction is "+ this.effect);
						break;
					case "restore"://退回进入视角控制以前的模式
						Event.Send({
							name:"effect.restore",
							self:player
						});
							CONSOLE.WriteLine("\n the view or direction is "+ this.effect);
						break;
					default:
						break;
				}
			},
				//快速定位
			setLocation : function(){
				
				for ( var index in POSITION )
				{
					if(this.location == POSITION[index].name)
					{
						Event.Send ({
							name : "effect.quick.to.position",
							self : player,
							id : index
						});
						break;
					}
				}

				if(this.associatedWindow != "undefined")
				{
					associatedWindow = this.associatedWindow;
					for(var index in associatedWindow)
					{
						var show_window = GUI.Windows.Get(this.associatedWindow[index]);
						var isVisible = show_window.GetProperty("Visible");
						CONSOLE.WriteLine("\n 2 widget        "+show_window.name +"visible          "+isVisible+ "!");
						if(isVisible == "True")
						{
							show_window.SetProperty("Visible","False");
						}else
						{
							show_window.SetProperty("Visible","True");
						}
					}
				}
			},
				//预览换装
			setPreview : function(){
				var show_image=GUI.Windows.Get(this.associatedImage[0]);
				show_image.SetProperty("Image",PERSONDATA[this.weapon].image);
				CONSOLE.WriteLine("\n 2 widget        "+show_image.name +"image          "+PERSONDATA[this.weapon].image+ "!");
			},
			//沙盘高空模式
			setHightMode : function(){
				var sand_table = GUI.Windows.Get(this.sand_table);
				var isVisible = sand_table.GetProperty("Visible");
				if( isVisible == "False" )
				{
					sand_table.SetProperty( "Visible" , "True" );
				}
				var show_window=GUI.Windows.Get(this.associatedWindow);
				var isVisible = show_window.GetProperty("Visible");

                        if (isVisible == "True") {
                            show_window.SetProperty("Visible","False");//设置成不可见
                        }
                        else
                        {
                            show_window.SetProperty("Visible","True");
                        }
				Event.Send({
					name : "effect.move.high_mode",
					self : player,
					id : this.weapon
				});
			},
			//换装函数
			setReloading:function(){
				switch(this.reloadingState)
				{
					case "initreloading"://初始化换装界面
						var show_window = GUI.Windows.Get(this.associatedWindow[0]);
						var isVisible = show_window.GetProperty("Visible");
						CONSOLE.WriteLine("\n 2 widget        "+show_window.name +"visible          "+isVisible+ "!");
						if(isVisible == "True")
						{
							show_window.SetProperty("Visible","False");
						}else
						{
							show_window.SetProperty("Visible","True");
						}
						var show_image = GUI.Windows.Get(this.associatedImage);
						show_image.SetProperty("Image",PERSONDATA[this.weapon].image);
						break;
					case "Reloading": //对应确认换装按钮的各种状况
						var show_image = GUI.Windows.Get(this.associatedImage[0]);
						for(var id in PERSONDATA)
						{
							if(show_image.GetProperty("Image")==PERSONDATA[id].image)
							{
								this["weapon"]=id;
								var associatedWindow = this.associatedWindow;
								for(var index in associatedWindow)
								{
									CONSOLE.WriteLine("associatedWindow[index]         "+associatedWindow[index]);
									if (associatedWindow[index] == "this") {
										this.SetProperty("Visible","False");
									}
									else
									{
										var show_window = GUI.Windows.Get(associatedWindow[index]);
										var isVisible = show_window.GetProperty("Visible");

										if (isVisible == "True") {
											show_window.SetProperty("Visible","False");
										}
										else
										{
											show_window.SetProperty("Visible","True");
										}
									}
								}
								Event.Send({
									name :"effect.change",
									self : player,
									id : this["weapon"]
								});
								break;
							}
							 //当图片不存在的时候，发出警告内容
							if(show_image.GetProperty("Image")=="")
							{
								var associatedDisable = this.associatedDisable;
								for( var id in associatedDisable){
									disable_window = GUI.Windows.Get(associatedDisable[id]);
									disable_window.SetProperty("Disabled","True");
									
								}
								var prompt_window = GUI.Windows.Get(this.associatedPrompt[0]);
								prompt_window.SetProperty("Visible","True");
								
								var statictex = GUI.Windows.Get(this.associatedPrompt[1]);
								statictex.SetProperty("Text",this.statictext[0]);
								
							}
						}
						break;
					case "NoReloading"://对应同意警告内容的各种状况 进入无人模式
						associatedWindow =this.associatedWindow;
						for(var id in associatedWindow){
							var show_window = GUI.Windows.Get(associatedWindow[id]);
							var visible=show_window.GetProperty("Visible");
							if(visible=="True"){
								show_window.SetProperty("Visible","False");
							}else{
								show_window.SetProperty("Visible","True");
							}
						}
						//换装界面按钮可用状态
						associatedDisable=this.associatedDisable;
						for (var id in associatedDisable )
						{
							disable_window = GUI.Windows.Get(associatedDisable[id]);
							disable = disable_window.GetProperty("Disabled");
							if(disable == "True"){
								disable_window.SetProperty("Disabled","False");
							}else{
								disable_window.SetProperty("Disabled","True");
							}
						}
						Event.Send({
							name :"effect.change",
							self : player,
							id : this.weapon
						});
						break;
					case "CancelPrompt"://不同意警告内容返回换装界面
						associatedWindow =this.associatedWindow;
						for(var id in associatedWindow){
							var show_window = GUI.Windows.Get(associatedWindow[id]);
							var visible=show_window.GetProperty("Visible");
							if(visible=="True"){
								show_window.SetProperty("Visible","False");
							}else{
								show_window.SetProperty("Visible","True");
							}
						}
						//换装界面按钮可用状态
						associatedDisable=this.associatedDisable;
						for (var id in associatedDisable )
						{
							disable_window = GUI.Windows.Get(associatedDisable[id]);
							disable = disable_window.GetProperty("Disabled");
							if(disable == "True"){
								disable_window.SetProperty("Disabled","False");
							}else{
								disable_window.SetProperty("Disabled","True");
							}
						}
						break;
					case "CancelReloading"://对应取消换装的状况，进入无人模式或者保留当前换装
						var associatedDisable = this.associatedDisable;
						for( var id in associatedDisable){
							disable_window = GUI.Windows.Get(associatedDisable[id]);
							disable_window.SetProperty("Disabled","True");
							
						}
						var prompt_window = GUI.Windows.Get(this.associatedPrompt[0]);
						prompt_window.SetProperty("Visible","True");
						
						var statictex = GUI.Windows.Get(this.associatedPrompt[1]);
						statictex.SetProperty("Text",this.statictext[0]);
						//进入无人模式
						if(this.weapon!="undefined"){
							Event.Send({
								name :"effect.change",
								self : player,
								id : this.weapon
							});}
						break;
					default:
						break;
				}
			}
		},
		window: {
			"3dSchool/help_button":{
				property:{
					associatedWindow : function (obj,propt_name) {
                        obj[propt_name] = ["3dSchool/help_window"];
                    }
                },
				event: {
					"Clicked":"setVisibles"},
				subscribe:{}
			},
			"3dSchool/help_close_button":{
				property:{
					associatedWindow : function (obj,propt_name) {
                        obj[propt_name] = ["3dSchool/help_window"];
                    }
				},
				event : {
					"Clicked":"setVisibles"
				},
				subscribe : {}
			},
				//快速定位按钮
			"3dSchool/fastlocation":{
				property:{
					associatedWindow:function (obj,propt_name) {
                        obj[propt_name] = "3dSchool/navigation";
                    },
					weapon:function(obj,propt_name){
						obj[propt_name]="3";
					},
					sand_table : function (obj , propt_name){
						obj[propt_name] = "3dSchool/sand_table";
					}
                },
				event:{
					"Clicked":"setHightMode"},
				subscribe:{}
			},
				//校园导航按钮
			"3dSchool/daohang_button":{
				property:{
					associatedWindow:function (obj,propt_name) {
                        obj[propt_name] = ["3dSchool/navigation"];
                    }
                },
				event:{
					"Clicked":"setVisibles"},
				subscribe:{}
			},
				//视角控制按钮
			"3dSchool/shijiao_button":{
				property:{
					associatedWindow:function (obj,propt_name) {
                        obj[propt_name] = ["3dSchool/view_prompt"];
                    },
					statictext:function(obj,propt_name){
						obj[propt_name] = ["您确定要进入无人模式，\n 确认：进入无人模式，进行视角转换 \n 取消： 返会主界面，不进行视角转换"];
					},
					effect:function(obj,propt_name){
						obj[propt_name]="view_nobody";
					},
					associatedPrompt:function(obj,propt_name){
						obj[propt_name]="3dSchool/view_prompt_content";
					}
                },
				event:{
					"Clicked":"setViewDirection"},
				subscribe:{}
			},
				//关闭视角控制按钮并退回进入视角控制以前的模式
			"3dSchool/view_close_button":{
				property:{
					associatedWindow:function (obj,propt_name) {
                        obj[propt_name] = ["3dSchool/view_veil"];
                    },
					effect:function (obj,propt_name) {
                        obj[propt_name] = "restore";
                    }
                },
				event:{
					"Clicked":"setViewDirection"},
				subscribe:{}
			},
			"3dSchool/view_prompt_ok":{
				property:{
					associatedWindow:function(obj,propt_name){
						obj[propt_name]=["3dSchool/view_prompt","3dSchool/view_veil"];
					},
					effect:function(obj,propt_name){
						obj[propt_name]="view_ok";
					},
					weapon:function(obj,propt_name){
						obj[propt_name] = "3";
					}
				},
				event:{
					"Clicked":"setViewDirection"},
				subscribe:{}
			},
			"3dSchool/view_prompt_cancel":{
				property:{
					associatedWindow:function(obj,propt_name){
						obj[propt_name]=["3dSchool/view_prompt"];
					},
					effect:function(obj,propt_name){
						obj[propt_name]="view_cancel";
					}
				},
				event:{
					"Clicked":"setViewDirection"},
				subscribe:{}
			},
			//视角向上
			"3dSchool/view_ctrlUp_p" : {
				property:{
					effect:function (obj,propt_name) {
                        obj[propt_name] = "view_up";
                    }
				},
				event:{
					"Clicked":"setViewDirection"
				},
				subscribe:{
				}
			},
			//视角向下
			"3dSchool/view_ctrlDown_p":{
				property:{
					effect:function (obj,propt_name) {
                        obj[propt_name] = "view_down";
                    }
                },
				event:{
					"Clicked":"setViewDirection"},
				subscribe:{}
			},
			//视角向左
			"3dSchool/view_ctrlLeft_p" : {
				property:{
					effect : function (obj,propt_name) {
                        obj[propt_name] = "view_left";
                    }},
				event:{
					"Clicked":"setViewDirection"},
				subscribe:{}
			},
			//视角向右
			"3dSchool/view_ctrlRight_p" : {
				property:{
					effect : function (obj,propt_name) {
                        obj[propt_name] = "view_right";
                    }
                },
				event:{
					"Clicked":"setViewDirection"},
				subscribe:{}
			},
			//方向向上行
			"3dSchool/view_ctrlUp_m" : {
				property:{
					effect : function (obj,propt_name) {
                        obj[propt_name] = "dir_front";
                    }
                },
				event:{
					"Clicked":"setViewDirection"},
				subscribe:{}
			},
			//方向向下行
			"3dSchool/view_ctrlDown_m" : {
				property:{
					effect : function (obj,propt_name) {
                        obj[propt_name] = "dir_back";
                    }
                },
				event:{
					"Clicked":"setViewDirection"},
				subscribe:{}
			},
			//方向向左行
			"3dSchool/view_ctrlLeft_m" : {
				property:{
					effect : function (obj,propt_name) {
                        obj[propt_name] = "dir_left";
                    }
                },
				event:{
					"Clicked":"setViewDirection"},
				subscribe:{}
			},
			//方向向右行
			"3dSchool/view_ctrlRight_m" : {
				property:{
					effect : function (obj,propt_name) {
                        obj[propt_name] = "dir_right";
                    }
                },
				event:{
					"Clicked":"setViewDirection"},
				subscribe:{}
			},
			//向前进
			"3dSchool/view_ctrlCentreUp" : {
				property:{
					effect : function (obj,propt_name) {
                        obj[propt_name] = "go_front";
                    }
                },
				event:{
					"Clicked":"setViewDirection"},
				subscribe:{}
			},
			//向后退
			"3dSchool/view_ctrlCentreDown" : {
				property:{
					effect : function (obj,propt_name) {
                        obj[propt_name] = "go_back";
                    }
                },
				event:{
					"Clicked":"setViewDirection"},
				subscribe:{}
			},
			//停止运动或者转换
			"3dSchool/stop_effect_button":{
				property:{
					effect:function (obj,propt_name) {
                        obj[propt_name] = "stop_effect";
                    }
				},
				event:{
					"Clicked":"setViewDirection"
				},
				subscribe:{}
			},
			//换装一
			"3dSchool/dress_one":{
				property:{
					associatedImage:function (obj,propt_name) {
                        obj[propt_name] = ["3dSchool/preview_image"];
                    },
					weapon:function(obj,propt_name){
						obj[propt_name]="1";
						obj.SetProperty("ButtonBg",PERSONDATA[obj.weapon].image);
					}
				},
				event:{
					"Clicked":"setPreview"
				},
				subscribe:{}
			},
			//换装二
			"3dSchool/dress_two":{
				property:{associatedImage:function(obj,propt_name){
					obj[propt_name] = ["3dSchool/preview_image"];
				},
				weapon:function(obj,propt_name){
						obj[propt_name]="2";
						obj.SetProperty("ButtonBg",PERSONDATA[obj.weapon].image);
					}	
				},
				event:{
					"Clicked":"setPreview"
				},
				subscribe:{}
			},
			//关闭我要换装
			"3dSchool/reloading":{
				property:{
					associatedWindow:function(obj,propt_name){
						obj[propt_name]=["this"];
					},
					associatedImage:function(obj,propt_name){
						obj[propt_name]=["3dSchool/preview_image"];
					}
				},
				event:{
					"CloseClicked":"setVisibles"
				},
				subscribe:{}
			},
				//换装按钮 初始化换装界面
			"3dSchool/reloading_button":{
				property:{
					associatedWindow:function(obj,propt_name){
						obj[propt_name]=["3dSchool/reloading"];
					},
					associatedImage:function(obj,propt_name){
						obj[propt_name]=["3dSchool/preview_image"];
					},
					weapon:function(obj,propt_name){
						obj[propt_name]=["3"];
					},
					reloadingState:function(obj,propt_name){
						obj[propt_name]="initreloading";
					}
				},
				event:{
					"Clicked":"setReloading"
				},
				subscribe:{}
			},
			//确认，换装。
			"3dSchool/dress_ok":{
				property:{
					associatedWindow:function(obj,propt_name){
						obj[propt_name]=["3dSchool/reloading"];
					},
					associatedImage:function(obj,propt_name){
						obj[propt_name]=["3dSchool/preview_image"];
					},
					associatedPrompt:function(obj,propt_name){
						obj[propt_name]=["3dSchool/dress_prompt","3dSchool/dress_prompt_content"];
					},
					associatedDisable:function(obj,propt_name){
						obj[propt_name]=["3dSchool/dress_one","3dSchool/dress_two","3dSchool/dress_ok","3dSchool/dress_cancel"];
					},
					statictext:function(obj,propt_name){
						obj[propt_name]=["您确定不选择换装，进入无人模式！\n 确定：进入无人模式，\n取消：返回换装界面。"];
					},
					reloadingState:function(obj,propt_name){
						obj[propt_name]="Reloading";
					}
				},
				event:{
					"Clicked":"setReloading"
				},
				subscribe:{}
			},
				//q取消换装 进入警告页面
			"3dSchool/dress_cancel":{
				property:{
					associatedPrompt:function(obj,propt_name){
						obj[propt_name]=["3dSchool/dress_prompt","3dSchool/dress_prompt_content"];
					},
					statictext:function(obj,propt_name){
						obj[propt_name]=["您确定取消换装，保留当前换装！\n 确定：保留当前换装，\n取消：返回换装界面。"];
					},
					associatedDisable:function(obj,propt_name){
						obj[propt_name]=["3dSchool/dress_one","3dSchool/dress_two","3dSchool/dress_ok","3dSchool/dress_cancel"];
					},
					reloadingState:function(obj,propt_name){
						obj[propt_name]="CancelReloading";
					}
				},
				event:{
					"Clicked":"setReloading"},
				subscribe:{}
			},
				//同意警告内容 进入无人模式
			"3dSchool/dress_prompt_ok":{
				property:{
					associatedWindow:function(obj,propt_name){
						obj[propt_name]=["3dSchool/dress_prompt","3dSchool/reloading"];
					},
					reloadingState:function(obj,propt_name){
						obj[propt_name]="NoReloading";
					},
					associatedDisable:function(obj,propt_name){
						obj[propt_name]=["3dSchool/dress_one","3dSchool/dress_two","3dSchool/dress_ok","3dSchool/dress_cancel"];
					},
					weapon:function(obj,propt_name){
						obj[propt_name] = "3";
					}
				},
				event:{
					"Clicked":"setReloading"
				},
				subscribe:{}
			},
				//不同意警告内容 返回换装页面
			"3dSchool/dress_prompt_cancel":{
				property:{
					associatedWindow:function(obj,propt_name){
						obj[propt_name]=["3dSchool/dress_prompt"];
					},
					associatedDisable:function(obj,propt_name){
						obj[propt_name]=["3dSchool/dress_one","3dSchool/dress_two","3dSchool/dress_ok","3dSchool/dress_cancel"];
					},
					reloadingState:function(obj,propt_name){
						obj[propt_name]="CancelPrompt";
					}
				},
				event:{
					"Clicked":"setReloading"
				},
				subscribe:{}
			},
			//初始化换装 装备一
			"3dSchool/start_dress_one":{
				property:{
					associatedImage:function(obj,propt_name){
					obj[propt_name]=["3dSchool/start_preview_image"];
					},
					weapon:function(obj,propt_name){
						obj[propt_name]="1";
						obj.SetProperty("ButtonBg",PERSONDATA[obj.weapon].image);
					}
				},
				event:{
					"Clicked":"setPreview"
				},
				subscribe:{}
			},
				//装备二
			"3dSchool/start_dress_two":{
				property:{
					associatedImage:function(obj,propt_name){
						obj[propt_name]=["3dSchool/start_preview_image"];
					},
					weapon:function(obj,propt_name){
						obj[propt_name]="2";
						obj.SetProperty("ButtonBg",PERSONDATA[obj.weapon].image);
					}
				},
				event:{
					"Clicked":"setPreview"
				},
				subscribe:{}
			},
				//确认，换装。
			"3dSchool/start_dress_ok":{
				property:{
					associatedWindow:function(obj,propt_name){
						obj[propt_name]=["3dSchool/start_window","3dSchool/menu_bar"];
					},
					associatedImage:function(obj,propt_name){
						obj[propt_name]=["3dSchool/start_preview_image"];
					},
					associatedPrompt:function(obj,propt_name){
						obj[propt_name]=["3dSchool/Start_prompt","3dSchool/Start_prompt_content"];
					},
					associatedDisable:function(obj,propt_name){
						obj[propt_name]=["3dSchool/start_dress_one","3dSchool/start_dress_two","3dSchool/start_dress_ok","3dSchool/start_dress_cancel"];
					},
					statictext:function(obj,propt_name){
						obj[propt_name]=["您确定不选择换装，进入无人模式！\n 确定：进入无人模式，\n取消：返回换装界面。"];
					},
					reloadingState:function(obj,propt_name){
						obj[propt_name]="Reloading";
					}
				},
				event:{
					"Clicked":"setReloading"
				},
				subscribe:{}
			},
				//同意警告内容 进入无人模式
			"3dSchool/Start_prompt_ok":{
				property:{
					associatedWindow:function(obj,propt_name){
						obj[propt_name]=["3dSchool/Start_prompt","3dSchool/start_window","3dSchool/menu_bar"];
					},
					reloadingState:function(obj,propt_name){
						obj[propt_name]="NoReloading";
					},
					associatedDisable:function(obj,propt_name){
						obj[propt_name]=["3dSchool/start_dress_one","3dSchool/start_dress_two","3dSchool/start_dress_ok","3dSchool/start_dress_cancel"];
					},
					weapon:function(obj,propt_name){
						obj[propt_name] = "3";
					}
				},
				event:{
					"Clicked":"setReloading"
				},
				subscribe:{}
			},
				//不同意警告内容 返回换装页面
			"3dSchool/Start_prompt_cancel":{
				property:{
					associatedWindow:function(obj,propt_name){
						obj[propt_name]=["3dSchool/Start_prompt"];
					},
					associatedDisable:function(obj,propt_name){
						obj[propt_name]=["3dSchool/start_dress_one","3dSchool/start_dress_two","3dSchool/start_dress_ok","3dSchool/start_dress_cancel"];
					},
					reloadingState:function(obj,propt_name){
						obj[propt_name]="CancelPrompt";
					}
				},
				event:{
					"Clicked":"setReloading"
				},
				subscribe:{}
			},
				//取消换装进入无人模式
			"3dSchool/start_dress_cancel":{
				property:{
					associatedPrompt:function(obj,propt_name){
						obj[propt_name]=["3dSchool/Start_prompt","3dSchool/Start_prompt_content"];
					},
					statictext:function(obj,propt_name){
						obj[propt_name]=["您确定取消换装，进入无人模式！\n 确定：进入无人模式，\n取消：返回换装界面。"];
					},
					associatedDisable:function(obj,propt_name){
						obj[propt_name]=["3dSchool/start_dress_one","3dSchool/start_dress_two","3dSchool/start_dress_ok","3dSchool/start_dress_cancel"];
					},
					reloadingState:function(obj,propt_name){
						obj[propt_name]="CancelReloading";
					},
					weapon:function(obj,propt_name){
						obj[propt_name] = "3";
					}
				},
				event:{
					"Clicked":"setReloading"},
				subscribe:{}
			},
				//东校门
			"3dSchool/sand_table/east_geat":{
				property:{
					
					location:function (obj,propt_name) {
                        obj[propt_name] = "east_gate";
                    }
                },
				event:{
					"Clicked":"setLocation"},
				subscribe:{}
			},
				//惠园餐厅
			"3dSchool/sand_table/huiyuan":{
				property:{
					location:function (obj,propt_name) {
                        obj[propt_name] = "restaurant";
                    }
			    },
				event:{
					"Clicked":"setLocation"},
				subscribe:{}
			},
				//图书馆
			"3dSchool/sand_table/library":{
				property:{
					location:function(obj,propt_name){
						obj[propt_name] = "library";
					}
				},
				event:{
					"Clicked":"setLocation"},
				subscribe:{}
			},
				//隐藏沙盘模式退回沙盘模式以前的状态
			"3dSchool/sand_table/hide":{
				property:{
					associatedWindow:function(obj , propt_name){
						obj[propt_name] = ["3dSchool/sand_table"];
					},
					effect:function (obj,propt_name) {
                        obj[propt_name] = "restore";
                    }
                },
				event:{
					"Clicked":"setViewDirection"},
				subscribe:{}
			}
		}
	};
}catch(e){
	alert(e);
}
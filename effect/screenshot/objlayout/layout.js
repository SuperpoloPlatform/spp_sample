/**************************************************************************
 *
 *  This file is part of the UGE(Uniform Game Engine).
 *  Copyright (C) by SanPolo Co.Ltd. 
 *  All rights reserved.
 *
 *  See http://uge.spolo.org/ for more information.q
 *
 *  SanPolo Co.Ltd
 *  http://uge.spolo.org/  sales@spolo.org uge-support@spolo.org
 *
**************************************************************************/
try {
	var ListUpdate = function(listname,path)
	{
		//获取列表控件
		var list = GUI.Listbox.Get(listname);
		//删除列表中的所有项
		list.ResetList();
		list.itemMap = [];
		System.Report("list.itemMap="+list.itemMap+"",1,"itemMap clear");
		//获取当前路径下的所有文件的绝对路径名，返回值为一个数组，数组中每个元素由一个文件的绝对路径名组成
		var files = VFS.FindFiles("./");
		//System.Report("files.="+files+"",0,"files");
		//设置一个flag,如果存在..目录，就将..目录的下标设为0,然后flag设为1,作为下一个列表项的下标，这样保证列表中所有列表项的下标是顺序的
		var flag = 0;
		//获取编辑路径的窗口
		var pathWin = GUI.Windows.Get("Demo7/Window1/EditPath");
		if(VFS.GetCwd() != pathWin.drive)
		{
			System.Report("create '..' directory",0,"create");
			//创建一个目录名为".."，可以返回到上级目录下
			var item = new GUI.ListboxTextItem("..",0);
			//设置文本颜色以及选中时的颜色
			var c0 = new Math3.Color4(255.0, 0.0, 0.0, 1.0);
			var c1 = new Math3.Color4(255.0, 255.0, 0.0, 1.0);
			item.SetTextColours(c0);
			item.SetSelectionColours(c1);
			item.SetSelectionBrushImage("ice", "TextSelectionBrush");
			//计算上级目录的路径名
			var array = path.split("/");
			path = path.split("/",array.length - 2);
			var prePath = path.join("/").toString();
			//为列表项对象添加一个属性，存储该列表项指向的绝对路径
			list.itemMap[item.id] = prePath+"/";
			//将列表项添加到列表中
			list.AddItem(item);
			flag = 1;
		}
		
		for(var index = 0; index < files.length; index++)
		{
			//获取下标index中存储的绝对路径
			var absolutePath = files[index];
			//System.Report("absolutePath.="+absolutePath+"",0,"GUI");
			//绝对路径由'/'符号将目录分隔开，例如：/source/spp/trunk/ --> ,source,spp,trunk,
			var array = absolutePath.split("/");
			//System.Report("absolutePath.array="+array+"",0,"GUI");
			//文件名或者目录名有可能存储在数组的最后一个元素或者倒数第二个元素中，如果是一个目录，通过array[array.length - 2]获取，如果是一个文件，通过array[array.length - 1]获取。
			var filename = array[array.length - 1];
			if(filename == "")
			{
				filename = array[array.length - 2];
			}
			
			//创建一个列表项，列表项显示的文本为filename
			var item = new GUI.ListboxTextItem(filename,index+flag);
			//设置文本颜色以及选中时的颜色
			var c0 = new Math3.Color4(255.0, 0.0, 0.0, 1.0);
			var c1 = new Math3.Color4(255.0, 255.0, 0.0, 1.0);
			item.SetTextColours(c0);
			item.SetSelectionColours(c1);
			item.SetSelectionBrushImage("ice", "TextSelectionBrush");
			//为列表项对象添加一个属性，存储该列表项指向的绝对路径
			list.itemMap[item.id] = absolutePath;
			//将列表项添加到列表中
			list.AddItem(item);
		}
		for(var i in list.itemMap)
		{
			System.Report(""+ i + " : "  + list.itemMap[i] +"",0,"itemMap added");
		}
	}
	LAYOUTDATA = {
		name : "ice.layout",
		method : {
			//ItemSelectionChanged事件的处理函数
			"DirSelect" : function(){
				//获取列表控件
				var list = GUI.Listbox.Get("Demo7/Window1/DirList");
				//获取第一个被选中的列表项，当列表项支持多选的情况下可以有多个被选中
				var item = list.GetFirstSelectedItem();
				//获取选中的列表项所指定的路径
				var path = list.itemMap[item.id];
				if(!VFS.Exists(path))
				{
					System.Report("The file does't exists",0,"DirSelect");
					return false;
				}
				//如果是文件而不是目录，就直接返回
				var array = path.split("/");
				if(array[array.length - 1] != "")
				{
					System.Report("This is a file",0,"DirSelect");
					return false;
				}
				System.Report("ChDir to "+path+"",0,"DirSelect");
				//切换到列表项所指定的路径下然后更新列表
				if(VFS.ChDir(path))
				{
					var pathWin = GUI.Windows.Get("Demo7/Window1/EditPath");
					pathWin.SetProperty("Text",path);
					ListUpdate("Demo7/Window1/DirList",path);
				}

			},
			//在目录编辑框内输入路径名称，回车后执行DirChanged，注意输入的路径名称要以'\'符号结尾
			"DirChanged" : function(){
				var path = this.GetProperty("Text");
				System.Report("path = "+path+"",0,"DirChanged");
				if(!VFS.Exists(path))
				{
					System.Report("The file does't exists",0,"DirChanged");
					return false;
				}
				//如果是文件而不是目录，就直接返回
				var array = path.split("/");
				if(array[array.length - 1] != "")
				{
					System.Report("This is a file",0,"DirChanged");
					return false;
				}
				System.Report("ChDir to "+path+"",0,"DirChanged");
				//切换到列表项所指定的路径下然后更新列表
				if(VFS.ChDir(path))
				{
					var pathWin = GUI.Windows.Get("Demo7/Window1/EditPath");
					pathWin.SetProperty("Text",path);
					ListUpdate("Demo7/Window1/DirList",path);
				}
			},
			//将图片保存到指定的路径，这里会将路径以参数的形式发送到effect模块，由effect完成保存操作
			"Save" : function(){
				var pathWin = GUI.Windows.Get("Demo7/Window1/EditPath");
				var text = pathWin.GetProperty("Text");
				Event.Send({
					name : "effect.screenshot",
					path : text
				});
			},
			"Cancle" : function(){
				var win = GUI.Windows.Get("Demo7/Window1");
				win.SetProperty("Visible","False");
			}
		},
		window : {
			"Demo7/Window1/EditPath" :{
				property: {
					"drive" : function (obj,propt_name) {
						obj[propt_name] = "/e:/";
					}
                },
                event : {
					"TextAccepted" : "DirChanged"
                },
                subscribe : {
                    
                }
			},
			"Demo7/Window1/DirList" :{
				property: {
					//初始化列表
                    "init" : function (obj,propt_name) {
						//获取编辑路径的窗口
						var pathWin = GUI.Windows.Get("Demo7/Window1/EditPath");
						//获取编辑框内的文本
						var path = pathWin.GetProperty("Text");
						//将文本中指定的路径挂载到pathWin.drive下
						if(VFS.Mount(pathWin.drive,path+"\\"))
						{
							//切换到pathWin.drive目录下然后更新列表
							if(VFS.ChDir(pathWin.drive))
							{
								pathWin.SetProperty("Text",pathWin.drive);
								ListUpdate("Demo7/Window1/DirList");
							}
						}
						else
						{
							System.Report("Mount from "+path+"\\ to "+pathWin.drive+" failed",0,"Error!");
						}
                    }
                },
                event : {
					"ItemSelectionChanged" : "DirSelect"
                },
                subscribe : {
                    
                }
			},
			"Demo7/Window1/Save" : {
				property: {
					
                },
                event : {
					"Clicked" : "Save"
                },
                subscribe : {
                    
                }
			},
			"Demo7/Window1/Cancle" : {
				property: {
					
                },
                event : {
					"Clicked" : "Cancle"
                },
                subscribe : {
                    
                }
			},
			"Demo7/Window1" : {
				property: {
					
                },
                event : {
					
                },
                subscribe : {
                    "ui.show" : function(e){
						if(this.GetProperty("Visible") == "True")
						{
							this.SetProperty("Visible","False");
						}
						else
						{
							this.SetProperty("Visible","True");
						}
					}
                }
			}
		}
	}	
} catch( e )
{
	alert( e );
}
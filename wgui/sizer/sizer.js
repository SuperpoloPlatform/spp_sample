//this is a test
try{

	FRAME_DATA = {
		xrc : "sizer.xrc",
		method : {
			Clicked : function(){
				this.frame.visible = !this.frame.visible;
			},
			FlagSelected : function(){
				var winFlag = WGUI.Window.Get("FlagList");
				var flagArray = [];
				var ConfigArray = function(win,array){
					var arrayIdx = 0;
					for(var index = 0; index < win.count; index++)
					{
						if(win.IsChecked(index))
						{
							array[arrayIdx] = win.GetString(index);
							arrayIdx++;
						}
					}
				}
				
				ConfigArray(winFlag, flagArray);

				var ArrayOperatOr = function(json, idx, array)
				{
					if(typeof(array) == "undefined")
						return "undefined";
					var ret;
					if(idx < (array.length - 1))
					{
						ret = json[array[idx]] | ArrayOperatOr(json, idx + 1, array);
					}
					else
					{
						return json[array[idx]];
					}
					return ret;
				}
				var UpdateFlag = function(name, flag, array){
					var SetFlag = function(items, ret){
						for(var index in items)
						{
							if(items[index].IsSizer())
							{
								SetFlag(items[index].sizer.children, ret);
							}
							else
							{
								items[index].flag = ret;
							}
						}
					}
					var ret = ArrayOperatOr(flag, 0, array);
					var win = WGUI.Window.Get(name);
					var items = win.sizer.children;
					SetFlag(items, ret);
					win.sizer.Layout();
				}
				UpdateFlag("BoxSizerFrame", SizerFlag, flagArray);
				UpdateFlag("StaticBoxSizerFrame", SizerFlag, flagArray);
				UpdateFlag("GridSizerFrame", SizerFlag, flagArray);
				UpdateFlag("FlexGridSizerFrame", SizerFlag, flagArray);
				UpdateFlag("StdDialogButtonSizerFrame", SizerFlag, flagArray);
			},
			SpinctrlUpdated : function(){
				var type = this.name;
				var value = this.value;
				var UpdateBorderOrProportion = function(name, value){
					CONSOLE.WriteLine("name="+name+", value="+value);
					var SetBorderOrProportion = function(items, value){
						for(var index in items)
						{
							if(items[index].IsSizer())
							{
								SetBorderOrProportion(items[index].sizer.children, value);
							}
							else
							{
								CONSOLE.WriteLine("type="+type);
								if(type == "proportionText")
								{
									items[index].proportion = value;
								}
								else if(type == "borderText")
								{
									items[index].border = value;
								}
							}
						}
					}
					var win = WGUI.Window.Get(name);
					var items = win.sizer.children;
					SetBorderOrProportion(items, value);
					win.sizer.Layout();
				}
				UpdateBorderOrProportion("BoxSizerFrame", value);
				UpdateBorderOrProportion("StaticBoxSizerFrame", value);
				UpdateBorderOrProportion("GridSizerFrame", value);
				UpdateBorderOrProportion("FlexGridSizerFrame", value);
				UpdateBorderOrProportion("StdDialogButtonSizerFrame", value);
			}
		},
		tlw : {
			"MyFrame": {
				type: "frame",
				isVisible : true,
				isRoot : true,
				window : {
					"BoxSizer" : {
						property : {
							"frame" : function(obj, propt_name){
								var boxSizer = new WGUI.BoxSizer(WGUI.Orientation.VERTICAL);
								var frame = new WGUI.Frame(0, "BoxSizerFrame", "BoxSizer", [0,0]);
								frame.name = "BoxSizerFrame";
								boxSizer.Add(new WGUI.Button(frame, -1, "A Really Really Big Button"), 0,0,0);
								boxSizer.Add(new WGUI.Button(frame, -1, "Tiny Button"), 0,0,0);
								boxSizer.Add(new WGUI.Button(frame, -1, "A Really Really Really Big Button"), 0,0,0);
								boxSizer.Add(new WGUI.Button(frame, -1, "Tiny Button"), 0,0,0);
								boxSizer.SetSizeHints(frame);
								frame.sizer = boxSizer;
								obj[propt_name] = frame;
							}
						},
						event : {
							"onCommandButtonClicked" : "Clicked"
						}
					},
					"StaticBoxSizer" : {
						property : {
							"frame" : function(obj, propt_name){
								var frame = new WGUI.Frame(0, "StaticBoxSizerFrame", "StaticBoxSizer", [0,200]);
								frame.name = "StaticBoxSizerFrame";
								var boxSizer = new WGUI.BoxSizer(WGUI.Orientation.VERTICAL);
								var staticBox = new WGUI.StaticBox(frame, 0, "StaticBoxSizer");
								var staticBoxSizer = new WGUI.StaticBoxSizer(staticBox,WGUI.Orientation.VERTICAL);
								staticBoxSizer.Add(new WGUI.Button(frame, -1, "A Really Really Big Button"), 0,0,0);
								staticBoxSizer.Add(new WGUI.Button(frame, -1, "Tiny Button"), 0,0,0);
								staticBoxSizer.Add(new WGUI.Button(frame, -1, "A Really Really Really Big Button"), 0,0,0);
								staticBoxSizer.Add(new WGUI.Button(frame, -1, "Tiny Button"), 0,0,0);
								staticBoxSizer.SetSizeHints(frame);
								boxSizer.Add(staticBoxSizer, 0, WGUI.SizerFlag.ALL | WGUI.SizerFlag.EXPAND,0);
								frame.sizer = boxSizer;
								obj[propt_name] = frame;
							}
						},
						event : {
							"onCommandButtonClicked" : "Clicked"
						}
					},
					"GridSizer" : {
						property : {
							"frame" : function(obj, propt_name){
								gridSizer = new WGUI.GridSizer(2, [5, 5]);
								var frame = new WGUI.Frame(0, "GridSizerFrame", "GridSizer", [0,400]);
								frame.name = "GridSizerFrame";
								gridSizer.Add(new WGUI.Button(frame, -1, "A Really Really Big Button"), 0,0,0);
								gridSizer.Add(new WGUI.Button(frame, -1, "Tiny Button"), 0,0,0);
								gridSizer.Add(new WGUI.Button(frame, -1, "Tiny Button"), 0,0,0);
								gridSizer.Add(new WGUI.Button(frame, -1, "A Really Really Really Big Button"), 0,0,0);
								gridSizer.SetSizeHints(frame);
								frame.sizer = gridSizer;
								obj[propt_name] = frame;
							}
						},
						event : {
							"onCommandButtonClicked" : "Clicked"
						}
					},
					"FlexGridSizer" : {
						property : {
							"frame" : function(obj, propt_name){
								flexGridSizer = new WGUI.GridSizer(2, [5, 5]);
								var frame = new WGUI.Frame(0, "FlexGridSizerFrame", "FlexGridSizer", [0,600]);
								frame.name = "FlexGridSizerFrame";
								flexGridSizer.Add(new WGUI.Button(frame, -1, "A Really Really Big Button"), 0,0,0);
								flexGridSizer.Add(new WGUI.Button(frame, -1, "Tiny Button"), 0,0,0);
								flexGridSizer.Add(new WGUI.Button(frame, -1, "Tiny Button"), 0,0,0);
								flexGridSizer.Add(new WGUI.Button(frame, -1, "A Really Really Really Big Button"), 0,0,0);
								flexGridSizer.SetSizeHints(frame);
								frame.sizer = flexGridSizer;
								obj[propt_name] = frame;
							}
						},
						event : {
							"onCommandButtonClicked" : "Clicked"
						}
					},
					"GridBagSizer" : {
						property : {
							"frame" : function(obj, propt_name){
								CONSOLE.WriteLine("GridBagSizer current does't support");
							}
						},
						event : {
							//"onCommandButtonClicked" : "Clicked"
						}
					},
					"StdDialogButtonSizer" : {
						property : {
							"frame" : function(obj, propt_name){
								stdDialogButtonSizer = new WGUI.StdDialogButtonSizer();
								var frame = new WGUI.Frame(0, "StdDialogButtonSizerFrame", "StdDialogButtonSizer", [300,0]);
								frame.name = "StdDialogButtonSizerFrame";
								stdDialogButtonSizer.Add(new WGUI.Button(frame, WGUI.WinID.OK), 0,0,0);
								stdDialogButtonSizer.Add(new WGUI.Button(frame, WGUI.WinID.YES), 0,0,0);
								stdDialogButtonSizer.Add(new WGUI.Button(frame, WGUI.WinID.APPLY), 0,0,0);
								stdDialogButtonSizer.Add(new WGUI.Button(frame, WGUI.WinID.CANCEL), 0,0,0);
								stdDialogButtonSizer.Add(new WGUI.Button(frame, WGUI.WinID.HELP), 0,0,0);
								stdDialogButtonSizer.SetSizeHints(frame);
								frame.sizer = stdDialogButtonSizer;
								obj[propt_name] = frame;
							}
						},
						event : {
							"onCommandButtonClicked" : "Clicked"
						}
					},
					"FlagList" : {
						property : {
							"init" : function(obj, propt_name){
								for(var topic in SizerFlag)
								{
									obj.Append(topic);
								}
							}
						},
						event : {
							"onCommandChecklistboxToggled" : "FlagSelected"
						}
					},
					"proportionText" : {
						event : {
							"onCommandSpinctrlUpdated" : "SpinctrlUpdated"
						}
					},
					"borderText" : {
						event : {
							"onCommandSpinctrlUpdated" : "SpinctrlUpdated"
						}
					}
				}
			}
		}
	}
}
catch(e)
{
	alert("error:",e);
}
//this is a test
try{

	FRAME_DATA = {
		xrc : "style.xrc",
		method : {
			WindowSelected : function(){
				var win = WGUI.Window.Get("ChildStyle");
				
				switch(this.value)
				{
					case "Frame" :
						if(!WGUI.Window.Get("frame"))
						{
							win.Clear();
							var frame = new WGUI.Frame(this.parent, "frame", "Frame Window");
							frame.visible = true;
							for(var topic in FrameStyle)
							{
								win.Append(topic);
							}
						}
						break;
				}
			},
			StyleSelected : function(){
				var winList = WGUI.Window.Get("WindowList");
				var winStyle = WGUI.Window.Get("WindowStyle");
				var childStyle = WGUI.Window.Get("ChildStyle");
				var winStyleArray = [];
				var childStyleArray = [];
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
				
				ConfigArray(winStyle, winStyleArray);
				ConfigArray(childStyle, childStyleArray);
				//CONSOLE.WriteLine("winStyleArray elements = "+winStyleArray);
				//CONSOLE.WriteLine("childStyleArray elements = "+childStyleArray);
				var ArrayOperatOr = function(json, idx, array)
				{
					if(typeof(array) == "undefined")
						return "undefined";
					var ret;
					if(idx < (array.length - 1))
					{
						ret = json[array[idx]] | ArrayOperatOr(json, idx + 1, array);
						//CONSOLE.WriteLine("array length = "+array.length);
						//CONSOLE.WriteLine("array elements = "+array[idx]+", value = "+json[array[idx]]);
					}
					else
					{
						return json[array[idx]];
					}
					return ret;
				}
				switch(winList.value)
				{
					case "Frame" :
						var frame = WGUI.Window.Get("frame");
						var style1 = ArrayOperatOr(FrameStyle, 0, childStyleArray);
						var style2 = ArrayOperatOr(WindowStyle, 0, winStyleArray);
						if(typeof(style2) == "undefined" && typeof(style1) == "undefined")
						{
							frame.style = WGUI.FrameStyle.DEFAULT;
						}
						else if(typeof(style1) == "undefined")
						{
							frame.style = style2;
						}
						else if(typeof(style2) == "undefined")
						{
							frame.style = style1;
						}
						else
						{
							frame.style = style1 | style2;
						}
						break;
				}
			}
		},
		tlw : {
			"MyFrame2": {
				type: "frame",
				isVisible : true,
				isRoot : true,
				window : {
					"WindowList" : {
						property : {
							"init" : function(obj, propt_name){
								obj.Append("Frame");
							}
						},
						event : {
							"onCommandComboboxSelected" : "WindowSelected"
						}
					},
					"WindowStyle" : {
						property : {
							"init" : function(obj, propt_name){
								for(var topic in WindowStyle)
								{
									obj.Append(topic);
								}
							}
						},
						event : {
							"onCommandChecklistboxToggled" : "StyleSelected"
						}
					},
					"ChildStyle" : {
						event : {
							"onCommandChecklistboxToggled" : "StyleSelected"
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
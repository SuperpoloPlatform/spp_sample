//this is a test
try{

	FRAME_DATA = {
		xrc : "font.xrc",
		method : {
			makeBold : function(){
				var win = WGUI.Window.Get("m_textCtrl4");
				win.font = win.font.MakeBold();
				var propList = WGUI.Window.Get("PropertyList");
				if(propList.dlg)
				{
					propList.dlg.update(propList.dlg);
				}
			},
			makeItalic : function(){
				var win = WGUI.Window.Get("m_textCtrl4");
				win.font = win.font.MakeItalic();
				var propList = WGUI.Window.Get("PropertyList");
				if(propList.dlg)
				{
					propList.dlg.update(propList.dlg);
				}
			},
			makeSmaller : function(){
				var win = WGUI.Window.Get("m_textCtrl4");
				win.font = win.font.MakeSmaller();
				var propList = WGUI.Window.Get("PropertyList");
				if(propList.dlg)
				{
					propList.dlg.update(propList.dlg);
				}
			},
			makeLarger : function(){
				var win = WGUI.Window.Get("m_textCtrl4");
				win.font = win.font.MakeLarger();
				var propList = WGUI.Window.Get("PropertyList");
				if(propList.dlg)
				{
					propList.dlg.update(propList.dlg);
				}
			},
			scaled : function(){
				var ScaledText = WGUI.Window.Get("ScaledText");
				ScaledText.label = ScaledText.GetLineText(0);
				var win = WGUI.Window.Get("m_textCtrl4");
				win.font = win.font.Scaled(ScaledText.label);
				var propList = WGUI.Window.Get("PropertyList");
				if(propList.dlg)
				{
					propList.dlg.update(propList.dlg);
				}
			},
			OpenPropertyList : function(){
				CONSOLE.WriteLine("dlgIsLoad = "+this.dlg);
				if(!this.dlg)
				{
					WGUI.CreateObjectLayout(DIALOG_DATA, "/xrc");
					this.dlg = WGUI.Window.Get("MyDialog1");
				}
				this.dlg.visible = !this.dlg.visible;
				this.dlg.update(this.dlg);
			},
			RadiobuttonSelected : function(){
				var win = WGUI.Window.Get("m_textCtrl4");
				var font = win.font;
				CONSOLE.WriteLine("Radiobutton Selected = "+this.label);
				switch(this.label)
				{
					case "True" :
						font.underlined = true;
						win.font = font;
						break;
					case "False" :
						font.underlined = false;
						win.font = font;
						break;
				}
			},
			enumSelected : function(){
				var win = WGUI.Window.Get("value");
				var text = WGUI.Window.Get("m_textCtrl4");
				switch(this.value)
				{
					case "FontFamily" :
						win.Set(["DEFAULT","DECORATIVE","ROMAN","SCRIPT","SWISS","MODERN","TELETYPE","MAX","UNKNOWN"]);
						break;
					case "FontStyle" :
						win.Set(["NORMAL","ITALIC","SLANT","MAX"]);
						break;
					case "FontWeight" :
						win.Set(["NORMAL","ITALIC","SLANT","MAX"]);
						break;
					case "FontFlag" :
						win.Clear();
						break;
					case "FontEncoding" :
						win.Clear();
						break;
				}
			},
			valueSelected : function(){
				var win = WGUI.Window.Get("enum");
				var text = WGUI.Window.Get("m_textCtrl4");
				var font = text.font;
				switch(win.value)
				{
					case "FontFamily" :
						font.family = FontFamily[this.value];
						text.font = font;
						break;
					case "FontStyle" :
						font.style = FontStyle[this.value];
						text.font = font;
						break;
					case "FontWeight" :
						font.wdight = FontWeight[this.value];
						text.font = font;
						break;
					case "FontFlag" :
						break;
					case "FontEncoding" :
						break;
				}
				var propList = WGUI.Window.Get("PropertyList");
				if(propList.dlg)
				{
					propList.dlg.update(propList.dlg);
				}
			},
			SynPosition : function(){
				var propList = WGUI.Window.Get("PropertyList");
				if(propList.dlg)
				{
					propList.dlg.synPosition(propList.dlg);
				}
			}
		},
		tlw : {
			"MyFrame2": {
				type: "frame",
				isVisible : true,
				isRoot : true,
				window : {
					"MyFrame2" : {
						event : {
							"onMoving" : "SynPosition"
						}
					},
					"m_textCtrl4" : {
						property : {
							"font" : function(obj, propt_name){
								obj[propt_name] = new WGUI.Font(12, WGUI.FontFamily.DEFAULT, WGUI.FontStyle.NORMAL, WGUI.FontWeight.NORMAL, true, "test");
							}
						}
					},
					"MakeBold" : {
						event : {
							"onCommandButtonClicked" : "makeBold"
						}
					},
					"MakeItalic" : {
						event : {
							"onCommandButtonClicked" : "makeItalic"
						}
					},
					"MakeSmaller" : {
						event : {
							"onCommandButtonClicked" : "makeSmaller"
						}
					},
					"MakeLarger" : {
						event : {
							"onCommandButtonClicked" : "makeLarger"
						}
					},
					"Scaled" : {
						event : {
							"onCommandButtonClicked" : "scaled"
						}
					},
					"PropertyList" : {
						property : {
							"dlg" : function(obj, propt_name){
								obj[propt_name] = 0;
							}
						},
						event : {
							"onCommandButtonClicked" : "OpenPropertyList"
						}
					},
					"Underlined_true" : {
						event : {
							"onCommandRadiobuttonSelected" : "RadiobuttonSelected"
						}
					},
					"Underlined_False" : {
						event : {
							"onCommandRadiobuttonSelected" : "RadiobuttonSelected"
						}
					},
					"enum" : {
						event : {
							"onCommandComboboxSelected" : "enumSelected"
						}
					},
					"value" : {
						event : {
							"onCommandComboboxSelected" : "valueSelected"
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
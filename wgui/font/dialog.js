//this is a test
try{

	DIALOG_DATA = {
		method : {

		},
		tlw : {
			"MyDialog1": {
				type: "dialog",
				isVisible : false,
				isRoot : false,
				parent : "MyFrame2",
				window : {
					"MyDialog1" : {
						property : {
							"synPosition" : function(obj, propt_name){
								obj[propt_name] = function(dlg){
									dlg.position = [dlg.parent.position[0]+dlg.parent.size[0], dlg.parent.position[1]];
									CONSOLE.WriteLine("dlg.position = "+dlg.position);
								}
							},
							"queryKey" : function(obj, propt_name){
								obj[propt_name] = function(json, value){
									for(var key in json)
									{
										if(json[key] == value)
										{
											return key;
										}
									}
								}
							},
							"update" : function(obj, propt_name){
								obj[propt_name] = function(dlg){
									var win = WGUI.Window.Get("m_textCtrl4");
									var EncodingText = dlg.GetChild("EncodingText");
									EncodingText.label = win.font.encoding;
									
									var FamilyText = dlg.GetChild("FamilyText");
									FamilyText.label = dlg.queryKey(FontFamily, win.font.family);
									
									var WeightText = dlg.GetChild("WeightText");
									WeightText.label = dlg.queryKey(FontWeight, win.font.weight);
									
									var StyleText = dlg.GetChild("StyleText");
									StyleText.label = dlg.queryKey(FontStyle, win.font.style);
									
									var FaceNameText = dlg.GetChild("FaceNameText");
									FaceNameText.label = win.font.faceName;
									
									var PointSizeText = dlg.GetChild("PointSizeText");
									PointSizeText.label = win.font.pointSize;
									
									var FixedWidthText = dlg.GetChild("FixedWidthText");
									FixedWidthText.label = win.font.fixedWidth;
									
									var UnderlinedText = dlg.GetChild("UnderlinedText");
									UnderlinedText.label = win.font.underlined;
								}
							}
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
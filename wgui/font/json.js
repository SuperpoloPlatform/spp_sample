//this is a test
try{
	FontFamily = {
		"DEFAULT" : WGUI.FontFamily.DEFAULT,
		"DECORATIVE" : WGUI.FontFamily.DECORATIVE,
		"ROMAN" : WGUI.FontFamily.ROMAN,
		"SCRIPT" : WGUI.FontFamily.SCRIPT,
		"SWISS" : WGUI.FontFamily.SWISS,
		"MODERN" : WGUI.FontFamily.MODERN,
		"TELETYPE" : WGUI.FontFamily.TELETYPE,
		"MAX" : WGUI.FontFamily.MAX,
		"UNKNOWN" : WGUI.FontFamily.UNKNOWN
	}
	FontStyle = {
		"NORMAL" : WGUI.FontStyle.NORMAL,
		"ITALIC" : WGUI.FontStyle.ITALIC,
		"SLANT" : WGUI.FontStyle.SLANT,
		"MAX" : WGUI.FontStyle.MAX
	}
	FontWeight = {
		"NORMAL" : WGUI.FontWeight.NORMAL,
		"ITALIC" : WGUI.FontWeight.ITALIC,
		"SLANT" : WGUI.FontWeight.SLANT,
		"MAX" : WGUI.FontWeight.MAX
	}
}
catch(e)
{
	alert("error:",e);
}
statictext的初步README，以后还会逐步的完善和修改。

简介：该Demo实现了在statictext中进行图文混排

详细介绍：
      1.在窗口中显示一个statictext
	  2.statictext中显示了7种文字排版功能：
	     Font Colours 
		 Font Formatting 
		 Embedding Images
		 Image Size 
		 Vertical Alignment 
		 Padding 
		 Window 
		 
展示简介：
      1.包括两个窗口：默认窗口，和statictext窗口
      2.在layout中实现图文的排版和窗口布局

功能展示：
      1.通过脚本或者DOS命令，用spp.exe引擎运行start.js文件。
	  2.待程序运行起来后，直接显示statictext窗口
	  3.statictext显示7中文字排版功能
	  
	  
重点实现：
	  1.文字排版: zoom.layout中7-18行
	  
	  
	  2.Font Colours ：把[colour='FFFF0000']放在要改变字体的前面
	          
			  例 ：This is just some text that shows how nicely [colour='FFFF0000']
					   CEGUI can format strings.[colour='FF00FF00'] and this is just colour 
					  [colour='FF0000FF'] formatting
					  
					  
	  3.Font Formatting ： 每种字体必须有'font'xml文件的定义，如Demo中的Arial-BoldItalic-10.font
	  在scheme文件中也要定义font 例如：<Font Filename="Arial-Italic-10.font" />，这样在layout中可以
	  把[font='Arial-BoldItalic-10'] 放在要改变字体的前面	  
	  
	           例  ：You can also do [font='Arial-Bold-10']bold text, [font='Arial-Italic-10']
			   italic text, [font='Arial-BoldItalic-10']bold AND italic text.[font='Arial-10']
					 
					 
	  4.Embedding Images：把[image='set:zoom image:MouseArrow'] 放在要展示图片的位置
	                      其中zoom是图文集的名字，MouseArrow是选取图片的名字
	  
	           例：Nice, I can even embed images like this 
				  [image='set:zoom image:MouseArrow'] into my text.
					 
					 
      5.Image Size ：把[image-size='w:32 h:64'] [image='set:zoom image:MouseArrow']放在要展示
	                图片的位置，其中zoom是图文集的名字，MouseArrow是选取图片的名字	  
	  
	           例：Nice, I can even embed images like this [image-size='w:32 h:64']
                  [image='set:zoom image:MouseArrow'] into my text.

				  
      6.Vertical Alignment ：有4个排版方式：top bottom centre stretch
	  
	          例 ：Text can also be vertically aligned. It can be aligned to
			  [vert-alignment='top']top, [vert-alignment='bottom']bottom,
			  [vert-alignment='centre']centre and [vert-alignment='stretch
	   
	   7.Padding ：与Vertical Alignment联系在一起
	   
	           例 ：[padding='l:5 t:10 r:5 b:10']THIS IS PADDED.[padding='l:0 t:0 
                    r:0 b:0'] 
					其中l:left padding t:top padding r:right padding b:bottmo padding
		
	   8.Window ： 增加一个window标签，这个window要被定义过。
	      
		       例 ：[window='name']　 name代表要添加的窗口的名字
	   
					
					
					
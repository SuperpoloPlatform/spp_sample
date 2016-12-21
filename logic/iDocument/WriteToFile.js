/**************************************************************************
 *
 *  This file is part of the UGE(Uniform Game Engine).
 *  Copyright (C) by SanPolo Co.Ltd. 
 *  All rights reserved.
 *
 *  See http://uge.spolo.org/ for more information.
 *
 *  SanPolo Co.Ltd
 *  http://uge.spolo.org/  sales@spolo.org uge-support@spolo.org
 *
**************************************************************************/

try {

	alert("此时将生成WriteToFile.xml文件，并且有“<world />”节点");
	// 需要写入的文件
	var filename = "WriteToFile.xml";
	
	// 构建一个简单的xml tree
	var doc = new xmlDocument();
	var root = doc.CreateRoot();
	var rootnode = root.CreateChild(xmlDocument.NODE_ELEMENT);
	rootnode.value = "world";
	
	// 打开文件并写入。
	var file = VFS.Open(filename, VFS.WRITE);
	doc.WritetoFile(file);
	
	alert("Finish");

}catch(e){
	alert('error:',e);
}
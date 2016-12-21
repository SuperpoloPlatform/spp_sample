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

	alert("将解析GetTextNode.xml文件，并打印其中节点");
	// 需要解析的文件
	var fileName = "GetTextNode.xml";

	if(!VFS.Exists(fileName))
	{
		alert("File not exist!");
		exit(1);
	}
	
	var doc = new xmlDocument();
	var file = VFS.Open(fileName);

	if(!file)
	{
		alert("Failed to open file");
		exit(2);
	}

	if(!doc.Parse(file))
	{
		alert("Failed to parse XML file");
		exit(3);
	}

	var rootNode = doc.root.GetChild("librarys");
	
	if(!rootNode)
	{
		alert("Failed to get root of XML file");
		exit(4);
	}
	
	// 遍历每个<library>节点
	var nodeItr = rootNode.GetChildren("library");
	while(nodeItr.HasNext())
	{
		var node = nodeItr.Next();
		// 遍历每个NODE_TEXT类型节点。
		///@fixme 每个NODE_ELEMENT类型节点下会有多个NODE_TEXT类型节点吗，为什么要遍历呢？
		var nodeChildrenItr = node.GetChildren();
		while(nodeChildrenItr.HasNext())
		{
			var nodeChild = nodeChildrenItr.Next();
			alert(nodeChild.value);
		}
	}

}catch(e){
	alert('error:',e);
}
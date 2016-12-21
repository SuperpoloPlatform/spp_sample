try {
//alert(1);
//load("key_data.js");
load("basic.js");
zent = Entities.CreateEntity();
load("ma.js");
//load("biology.js");
var x;
var y;
var yrot = 0;
nowturn=false;
nowrun=false;


//kd=new Dic();

b=new monster();
b2=new monster2();
p=new player();
//kd.put("person1",p);
p.init();
b.init();
b2.init();
//p.dailog(b);

//kd.put("person2",b);
//alert(b.life);
//alert(p.experience);
//alert(p.rank);

}catch(e){
	alert('error:',e);
}
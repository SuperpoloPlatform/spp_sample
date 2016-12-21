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

    /************************************************************************/
    /*   WEAPONDATA start	                                                    
    /*   	                                                     
    /*     id : {
    /*        name : "",         物品名称
    /*        type : [],         物品类型
    /*        durability : "",         物品耐久度
    /*        reqLevel : "",         等级需求
    /*        attribute : {      物品属性
    /*            stamina : ,    耐力
    /*            power : ,      力量
    /*            agility : ,    敏捷
    /*            wit : ,        智力
    /*            damage : ,     攻击力
    /*            armor :        护甲
    /*        },
    /*        price : {          物品价格
    /*            gold : ,       金
    /*            silver : ,     银
    /*            copper :       铜
    /*        }
    /*        image : "",        物品图片
    /*        info : ""          物品显示信息
    /*    }
    /*
    /*        物品类型:
    /*        头部--head
    /*        颈部--neck
    /*        护肩--shoulder
    /*        胸部--chest
    /*        衬衣--shirt
    /*        背部--backside
    /*        徽章--badges
    /*        护腕--wristbands
    /*        护手--armguard
    /*        腰带--belt
    /*        腿部--legs
    /*        鞋子--shoes
    /*        戒指--ring
    /*        饰品--adornArticle
    /*
    /*        布甲--Cloth
    /*        皮甲--Leather 
    /*        锁甲--Mail
    /*        板甲--Plate
    /************************************************************************/

    WEAPONDATA = {
        "1" : {
            name : "不堪回首垂饰",
            type : "neck",
            armorType : "",
            durability : 20,
            reqLevel : 5,
            attribute : {
                stamina : 0,
                power : 0,
                agility : 0,
                wit : 0,
                damage : 0
            },
            price : {
                gold : 0,
                silver : 5,
                copper : 6
            },
            image : "set:ico image:xianglian001",
            info :         "不堪回首垂饰\n\
							拾取后绑定\n\
							颈部\n\
							+306 敏捷\n\
							+459 耐力\n\
							需要等级 85\n\
							物品等级410\n\
							装备： 使你的急速等级提高207。\n\
							装备： 使你的命中等级提高199。\n\
							出售价格 5金34银34铜"
        },
        "2" : {
            name : "染血的鳞片罩帽",
            type : "head",
            armorType : "Mail",
            durability : 20,
            reqLevel : 5,
            attribute : {
                stamina : 0,
                power : 0,
                agility : 0,
                wit : 0,
                damage : 0
            },
            price : {
                gold : 0,
                silver : 5,
                copper : 6
            },
            image : "set:ico image:toukui006",
            info :         "染血的鳞片罩帽\n\
							装备后绑定\n\
							头部锁甲\n\
							1843点护甲\n\
							+425 耐力\n\
							+283 智力\n\
							需要等级 85\n\
							物品等级339\n\
							装备： 使你的韧性等级提高200。\n\
							装备： 使你的急速等级提高170。\n\
							出售价格 2金3银3铜"
        },
        "3" : {
            name : "染血的蟒皮护手",
            type : "armguard",
            armorType : "Leather",
            durability : 20,
            reqLevel : 5,
            attribute : {
                stamina : 0,
                power : 0,
                agility : 0,
                wit : 0,
                damage : 0
            },
            price : {
                gold : 0,
                silver : 5,
                copper : 6
            },
            image : "set:ico image:hushou006",
            info :         "染血的蟒皮护手\n\
							装备后绑定\n\
							手皮甲\n\
							967点护甲\n\
							+316 耐力\n\
							+210 智力\n\
							+156 精神\n\
							需要等级 85\n\
							物品等级339\n\
							装备： 使你的韧性等级提高113。\n\
							出售价格 1金10银"
        },
        "4" : {
            name : "双子披风",
            type : "backside",
            armorType : "",
            durability : 20,
            reqLevel : 5,
            attribute : {
                stamina : 0,
                power : 0,
                agility : 0,
                wit : 0,
                damage : 0
            },
            price : {
                gold : 0,
                silver : 5,
                copper : 6
            },
            image : "set:ico image:pifeng005",
            info :         "双子披风\n\
							拾取后绑定\n\
							背部\n\
							673点护甲\n\
							+322 耐力\n\
							+215 智力\n\
							+143 精神\n\
							需要等级 85\n\
							物品等级372\n\
							装备： 使你的急速等级提高143。\n\
							出售价格 10金69银94铜"
        },
        "5" : {
            name : "黑龙之牙项圈",
            type : "neck",
            armorType : "",
            durability : 20,
            reqLevel : 5,
            attribute : {
                stamina : 0,
                power : 0,
                agility : 0,
                wit : 0,
                damage : 0
            },
            price : {
                gold : 0,
                silver : 5,
                copper : 6
            },
            image : "set:ico image:xianglian004",
            info :         "黑龙之牙项圈\n\
							拾取后绑定\n\
							颈部\n\
							+306 力量\n\
							+459 耐力\n\
							需要等级 85\n\
							物品等级410\n\
							装备： 使你的命中等级提高213。\n\
							装备： 使你的爆击等级提高189。\n\
							出售价格 5金34银34铜"
        },
        "6" : {
            name : "剔骨者面甲",
            type : "head",
            armorType : "Leather",
            durability : 20,
            reqLevel : 5,
            attribute : {
                stamina : 0,
                power : 0,
                agility : 0,
                wit : 0,
                damage : 0
            },
            price : {
                gold : 0,
                silver : 5,
                copper : 6
            },
            image : "set:ico image:toukui004",
            info :         "剔骨者面甲\n\
							拾取后绑定\n\
							剔骨者面甲\n\
							装备后绑定\n\
							头部皮甲\n\
							826点护甲\n\
							+69 敏捷\n\
							+104 耐力\n\
							需要等级 78\n\
							物品等级187\n\
							装备： 使你的韧性等级提高46。\n\
							装备： 使你的爆击等级提高46。\n\
							出售价格 15金4银34铜"
        },
        "7" : {
            name : "骑士之难甲胄",
            type : "chest",
            armorType : "Leather",
            durability : 20,
            reqLevel : 5,
            attribute : {
                stamina : 0,
                power : 0,
                agility : 0,
                wit : 0,
                damage : 0
            },
            price : {
                gold : 0,
                silver : 5,
                copper : 6
            },
            image : "set:ico image:kuijia002",
            info :         "骑士之难甲胄\n\
							装备后绑定\n\
							胸部皮甲\n\
							1282点护甲\n\
							+112 敏捷\n\
							+204 耐力\n\
							需要等级 80\n\
							物品等级245\n\
							装备： 使你的爆击等级提高74。\n\
							装备： 使你的命中等级提高82。\n\
							物品等级85\n\
							出售价格 2金50银"
        },
        "8" : {
            name : "染血的鳞片护手",
            type : "armguard",
            armorType : "Mail",
            durability : 20,
            reqLevel : 5,
            attribute : {
                stamina : 0,
                power : 0,
                agility : 0,
                wit : 0,
                damage : 0
            },
            price : {
                gold : 0,
                silver : 5,
                copper : 6
            },
            image : "set:ico image:hushou005",
            info :         "染血的鳞片护手\n\
							装备后绑定\n\
							手锁甲\n\
							1418点护甲\n\
							+316 耐力\n\
							+210 智力\n\
							需要等级 85\n\
							物品等级339\n\
							装备： 使你的韧性等级提高156。\n\
							装备： 使你的急速等级提高113。\n\
							出售价格 9金94银34铜"
        },
        "9" : {
            name : "无尽哀痛披风",
            type : "backside",
            armorType : "",
            durability : 20,
            reqLevel : 5,
            attribute : {
                stamina : 0,
                power : 0,
                agility : 0,
                wit : 0,
                damage : 0
            },
            price : {
                gold : 0,
                silver : 5,
                copper : 6
            },
            image : "set:ico image:pifeng001",
            info :         "无尽哀痛披风\n\
							拾取后绑定\n\
							背部\n\
							699点护甲\n\
							+344 耐力\n\
							+209 智力\n\
							需要等级 85\n\
							物品等级379\n\
							装备： 使你的精通等级提高153。\n\
							装备： 使你的急速等级提高133。\n\
							出售价格 10金72银85铜"
        },
        "10" : {
            name : "粗布罩帽",
            type : "head",
            armorType : "Mail",
            durability : 20,
            reqLevel : 5,
            attribute : {
                stamina : 0,
                power : 0,
                agility : 0,
                wit : 0,
                damage : 0
            },
            price : {
                gold : 0,
                silver : 5,
                copper : 6
            },
            image : "set:ico image:toukui002",
            info :         "粗布罩帽\n\
							装备后绑定\n\
							头部锁甲\n\
							13点护甲\n\
							+4 耐力\n\
							+2 智力\n\
							需要等级 1\n\
							物品等级10\n\
							出售价格 10铜"
        },
        "11" : {
            name : "染血的鳞片护胸",
            type : "chest",
            armorType : "Mail",
            durability : 20,
            reqLevel : 5,
            attribute : {
                stamina : 0,
                power : 0,
                agility : 0,
                wit : 0,
                damage : 0
            },
            price : {
                gold : 0,
                silver : 5,
                copper : 6
            },
            image : "set:ico image:kuijia004",
            info :         "染血的鳞片护胸\n\
							装备后绑定\n\
							胸部锁甲\n\
							2269点护甲\n\
							+425 耐力\n\
							+283 智力\n\
							需要等级 85\n\
							物品等级339\n\
							装备： 使你的爆击等级提高215。\n\
							装备： 使你的韧性等级提高144。\n\
							出售价格 1金34银54铜"
        }
    };
		

}
catch (e)
{
	alert(e);
}
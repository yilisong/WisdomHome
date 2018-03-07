var PAGE_ALL_PUBLIC = 'all_public';
var PAGE_ALL_PRIVATE = 'all_private';
var PAGE_SINGLE = 'single';

var PAGE_TYPE_CC = 'cc';
var PAGE_TYPE_WAF = 'waf';
var PAGE_TYPE_DDOS = 'ddos';

var TYPE_WORLD = 'world';
var TYPE_CHINA = 'china';

var DATA_LOADING_MSG = '数据正在读取中...';
var DATA_EMPTY_MSG = '暂无数据';

/*获取URL中的参数*/
function QueryString(item)
{
   var sValue = location.search.match(new RegExp("[\?\&]"+item+"=([^\&]*)(\&?)","i"))
   return sValue?sValue[1]:sValue
}
var userId = QueryString("id");
var tokenMessage = QueryString("token");
userId = userId ? userId : ""
tokenMessage = tokenMessage ? tokenMessage : ""

function getCookie(name) {
    var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
    var arr = document.cookie.match(reg);
    return arr ? unescape(arr[2]) : null;
}

function setCookie(name, value) {
    var days = 10;
    var exp = new Date();
    exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = escape(name) + '=' + escape(value) + ';expires=' + exp.toGMTString();
}

function getMapCookieName(prefix, type) {
    return prefix + '_mapreport_' + type;
}

var mapCookieName = getMapCookieName(currentPrefix, currentPageType);
var mapCookieValue = getCookie(mapCookieName);
var currentMapType = mapCookieValue ? mapCookieValue : TYPE_WORLD;
var currentFirewallType = null;

//截取url参数
function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return (r[2]);
    return null;
};

var cunrrentDomain = getQueryString('domain');

if (null !== cunrrentDomain) {
    cunrrentDomain = cunrrentDomain.replace(/([a-z]+)(.*?)([A-Z]*)/g, function(m, m1, m2, m3) {
        return m1.toLowerCase() + m2 + m3.toLowerCase();
    });
}

/******************** socket & data formatting *************************************/
var countryMap = {
    '阿富汗': 'afghanistan',
    '阿尔巴尼亚': 'albania',
    '阿尔及利亚': 'algeria',
    '安道尔': 'andorra',
    '巴勒斯坦': 'palestine-state-of',
    '安哥拉': 'angola',
    '安提瓜和巴布达': 'antigua-and-barbuda',
    '阿根廷': 'argentina',
    '亚美尼亚': 'armenia',
    '阿鲁巴': 'aruba',
    '澳大利亚': 'australia',
    '奥地利': 'austria',
    '阿塞拜疆': 'azerbaijan',
    '巴哈马': 'bahamas',
    '巴林': 'bahrain',
    '孟加拉': 'bangladesh',
    '巴巴多斯': 'barbados',
    '白俄罗斯': 'belarus',
    '比利时': 'belgium',
    '伯利兹': 'belize',
    '百慕大': 'bermuda',
    '不丹': 'bhutan',
    '玻利维亚': 'bolivia',
    '波黑': 'bosnia-and-herzegovina',
    '博茨瓦纳': 'botswana',
    '巴西': 'brazil',
    '文莱': 'brunei',
    '保加利亚': 'bulgaria',
    '布隆迪': 'burundi',
    '柬埔寨': 'cambodia',
    '喀麦隆': 'cameroon',
    '加拿大': 'canada',
    '佛得角': 'cape-verde',
    '开曼群岛': 'cayman-islands',
    '中非': 'central-african-republic',
    '乍得': 'chad',
    '智利': 'chile',
    '哥伦比亚': 'colombia',
    '科摩罗': 'comoros',
    '哥斯达黎加': 'costa-rica',
    '克罗地亚': 'croatia',
    '古巴': 'cuba',
    '塞浦路斯': 'cyprus',
    '捷克': 'czech-republic',
    '丹麦': 'denmark',
    '吉布提': 'djibouti',
    '多米尼克': 'dominica',
    '多米尼加': 'dominican-republic',
    '厄瓜多尔': 'ecuador',
    '埃及': 'egypt',
    '萨尔瓦多': 'el-salvador',
    '赤道几内亚': 'equatorial-guinea',
    '厄立特里亚': 'eritrea',
    '爱沙尼亚': 'estonia',
    '埃塞俄比亚': 'ethiopia',
    '斐济': 'fiji',
    '芬兰': 'finland',
    '法国': 'france',
    '冈比亚': 'gambia',
    '格鲁吉亚': 'georgia',
    '德国': 'germany',
    '加纳': 'ghana',
    '希腊': 'greece',
    '格林纳达': 'grenada',
    '危地马拉': 'guatemala',
    '几内亚': 'guinea',
    '几内亚比绍': 'guinea-bissau',
    '圭亚那': 'guyana',
    '海地': 'haiti',
    '洪都拉斯': 'honduras',
    '匈牙利': 'hungary',
    '冰岛': 'iceland',
    '印度': 'india',
    '印度尼西亚': 'indonesia',
    '伊朗': 'iran',
    '伊拉克': 'iraq',
    '爱尔兰': 'ireland',
    '马恩岛': 'isle-of-man',
    '以色列': 'isreal',
    '意大利': 'italy',
    '牙买加': 'jamaica',
    '日本': 'japan',
    '泽西岛': 'jersey',
    '约旦': 'jordan',
    '哈萨克斯坦': 'kazakhstan',
    '肯尼亚': 'kenya',
    '基里巴斯': 'kiribati',
    '朝鲜': 'korea-north',
    '韩国': 'korea-south',
    '科威特': 'kuwait',
    '吉尔吉斯斯坦': 'kyrgyzstan',
    '老挝': 'laos',
    '拉脱维亚': 'latvia',
    '黎巴嫩': 'lebanon',
    '莱索托': 'lesotho',
    '利比里亚': 'liberia',
    '利比亚': 'libya',
    '列支敦士登': 'liechtenstein',
    '立陶宛': 'lithuania',
    '卢森堡': 'luxembourg',
    '马其顿': 'macedonia',
    '马达加斯加': 'madagascar',
    '马拉维': 'malawi',
    '马来西亚': 'malaysia',
    '马尔代夫': 'maldives',
    '马里': 'mali',
    '马耳他': 'malta',
    '马绍尔群岛': 'marshall-islands',
    '毛里塔尼亚': 'mauritania',
    '毛里求斯': 'mauritius',
    '墨西哥': 'mexico',
    '密克罗尼西亚联邦': 'micronesia',
    '摩尔多瓦': 'moldova',
    '摩纳哥': 'monaco',
    '蒙古': 'mongolia',
    '黑山': 'montenegro',
    '摩洛哥': 'morocco',
    '莫桑比克': 'mozambique',
    '缅甸': 'myanmar',
    '纳米比亚': 'namibia',
    '瑙鲁': 'nauru',
    '尼泊尔': 'nepal',
    '荷兰': 'netherlands',
    '新西兰': 'newzealand',
    '尼加拉瓜': 'nicaragua',
    '尼日尔': 'niger',
    '尼日利亚': 'nigeria',
    '挪威': 'norway',
    '阿曼': 'oman',
    '巴基斯坦': 'pakistan',
    '帕劳': 'palau',
    '巴拿马': 'panama',
    '巴布亚新几内亚': 'papua-new-guinea',
    '巴拉圭': 'paraguay',
    '秘鲁': 'peru',
    '菲律宾': 'philippines',
    '波兰': 'poland',
    '葡萄牙': 'portugal',
    '卡塔尔': 'qatar',
    '罗马尼亚': 'romania',
    '俄罗斯': 'russia',
    '卢旺达': 'rwanda',
    '圣基茨和尼维斯': 'saint-kitts-and-nevis',
    '圣卢西亚': 'saint-lucia',
    '圣文森特和格林纳丁斯': 'saint-vincent-and-the-grenadines',
    '萨摩亚': 'samoa',
    '圣马力诺': 'san-marino',
    '圣多美和普林西比': 'sao-tome-and-principe',
    '沙特阿拉伯': 'saudi-arabia',
    '塞内加尔': 'senegal',
    '塞尔维亚': 'serbia',
    '塞舌尔': 'seychelles',
    '塞拉利昂': 'sierra-leone',
    '新加坡': 'singapore',
    '斯洛伐克': 'slovakia',
    '斯洛文尼亚': 'slovenia',
    '所罗门群岛': 'solomon-islands',
    '索马里': 'somalia',
    '南非': 'south-africa',
    '南苏丹': 'south-sudan',
    '西班牙': 'spain',
    '苏丹': 'sudan',
    '苏里南': 'suriname',
    '斯威士兰': 'swaziland',
    '瑞典': 'sweden',
    '瑞士': 'switzerland',
    '叙利亚': 'syria',
    '台湾': 'taiwan',
    '塔吉克斯坦': 'tajikistan',
    '坦桑尼亚': 'tanzania',
    '泰国': 'thailand',
    '多哥': 'togo',
    '汤加': 'tonga',
    '特立尼达和多巴哥': 'trinidad-and-tobago',
    '突尼斯': 'tunisia',
    '土耳其': 'turkey',
    '土库曼斯坦': 'turkmenistan',
    '图瓦卢': 'tuvalu',
    '乌干达': 'uganda',
    '乌克兰': 'ukraine',
    '阿联酋': 'uae',
    '英国': 'uk',
    '美国': 'usa',
    '乌拉圭': 'uruguay',
    '乌兹别克斯坦': 'uzbekistan',
    '瓦努阿图': 'vanuatu',
    '委内瑞拉': 'venezuela',
    '越南': 'viet-nam',
    '也门': 'yemen',
    '赞比亚': 'zambia',
    '津巴布韦': 'zimbabwe',
    '中国': 'china'
};

var agents = ['Mozilla/5.0 Macintosh',
    'Mozilla/5.0 Windows',
    'Mozilla/5.0 compatible',
    'Mozilla/4.0 compatible',
    'Mozilla/5.0 Windows NT 6.1',
    'Opera/9.80 Macintosh',
    'Opera/9.80 Windows NT 6.1',
    'Opera/9.80 Android 2.3.4',
    'MQQBrowser/26 Mozilla/5.0 Linux',
    'Mozilla/5.0 iPad',
    'Openwave/ UCWEB7.0.2.37/28/999'
];

function formatData(data) {
    switch (currentPrefix) {
        case PAGE_TYPE_CC:
            return formatDataCC(data);
        case PAGE_TYPE_WAF:
            return formatDataWAF(data);
        case PAGE_TYPE_DDOS:
            return formatDataDDOS(data);
    }
}

function formatDataCC(data) {
    switch (data.cmd) {
        case 'countryTenTop':
            $.each(data.data, function(i, v) {
                v.flagnick = countryMap[v.city];
            });
            break;
        case 'provinceTenTop':
            break;
        case 'ccDomainTop':
            $.each(data.data, function(i, v) {
                v.domain = v._id.replace(/([a-z]+)(.*?)([A-Z]*)/g, function(m, m1, m2, m3) {
                    return m1.toUpperCase() + m2 + m3.toLowerCase();
                });
            });
            break;
        case 'realList':
            $.each(data.data, function(i, v) {
                var index = Math.floor(Math.random() * 10 + 1);
                var tmp = v.useragent.split(';');
                if (tmp != '') {
                    var str = tmp[0].replace('(', '');
                }
                v.useragent = v.attack_type == 'CC' ? agents[index] : str;
                data.attack_ip = v.attack_ip;
                data.city = v.city;
                data.url = v.url;
                data.useragent = v.useragent;
                data.attack_type = v.attack_type;
                data.attack_time = v.attack_time;
                data.request_type = v.method;
            });
            break;
        case 'ccIpTop':
            $.each(data.data, function(i, v) {
                v.city = v.city.replace('中国', '').replace('省', '').replace('市', '');
                v.sub_city = v.city.trim().length === 0 ? '未知' : v.city.trim();
                if (v.sub_city.length > 5) {
                    v.sub_city = v.sub_city.substring(0, 5) + '...';
                }
            });
            break;
    }
    return data;
}

function formatDataWAF(data) {
    switch (data.cmd) {
        case 'countryTenTop':
            $.each(data.data, function(i, v) {
                v.flagnick = countryMap[v.city];
            });
            break;
        case 'provinceTenTop':
            break;
        case 'wafDomainTop':
            $.each(data.data, function(i, v) {
                v.domain = v._id.replace(/([a-z]+)(.*?)([A-Z]*)/g, function(m, m1, m2, m3) {
                    return m1.toUpperCase() + m2 + m3.toLowerCase();
                });
            });
            break;
        case 'todayAttackCountAndIPLine':
            data.data = data.data.total_line;
            break;
        case 'realList':
            $.each(data.data, function(i, v) {
                var index = Math.floor(Math.random() * 10 + 1);
                var tmp = v.useragent.split(';');
                if (tmp != '') {
                    var str = tmp[0].replace('(', '');
                }
                v.useragent = v.attack_type == 'CC' ? agents[index] : str;
                data.attack_ip = v.attack_ip;
                data.city = v.city;
                data.url = v.url;
                data.useragent = v.useragent;
                data.attack_type = v.attack_type;
                data.attack_time = v.attack_time;
                data.request_type = v.method;
            });
            break;
        case 'wafIpTop':
            $.each(data.data, function(i, v) {
                v.city = v.city.replace('中国', '').replace('省', '').replace('市', '');
                v.sub_city = v.city.trim().length === 0 ? '未知' : v.city.trim();
                if (v.sub_city.length > 5) {
                    v.sub_city = v.sub_city.substring(0, 5) + '...';
                }
            });
            break;
    }
    return data;
}

function formatDataDDOS(data) {
    return data;
}

function sendRequest(requestType) {
    switch (currentPrefix) {
        case PAGE_TYPE_CC:
            sendRequestCC(requestType);
            break;
        case PAGE_TYPE_WAF:
            sendRequestWAF(requestType);
            break;
        case PAGE_TYPE_DDOS:
            sendRequestDDOS(requestType);
            break;
    }
}

function sendRequestCC(requestType) {
    switch (currentPageType) {
        case PAGE_ALL_PUBLIC:
            if (requestType === 'init') {
                var messages = [{
                    "cmd": "all",
                    "is_internal": isInternal(currentMapType),
                    "type": "whole_net",
                    "source": "new_cc",
                    "token": tokenMessage,
                    "user_id": userId
                }];
                sendConnectInit(messages);
            } else if (requestType === 'map_switch') {
                var messages = [{
                    "cmd": "realList",
                    "is_internal": isInternal(currentMapType),
                    "type": "whole_net",
                    "source": "new_cc",
                    "token": tokenMessage,
                    "user_id": userId
                }, {
                    "cmd": "mapList",
                    "is_internal": isInternal(currentMapType),
                    "type": "whole_net",
                    "source": "new_cc",
                    "token": tokenMessage,
                    "user_id": userId
                }];
                sendMapSwitch(messages);
            }
            break;
        case PAGE_ALL_PRIVATE:
            if (requestType === 'init') {
                var messages = [{
                    "cmd": "all",
                    "is_internal": isInternal(currentMapType),
                    "type": "whole_net",
                    "flag": "private",
                    "source": "new_cc",
                    "token": tokenMessage,
                    "user_id": userId
                }];
                sendConnectInit(messages);
            } else if (requestType === 'map_switch') {
                var messages = [{
                    "cmd": "realList",
                    "is_internal": isInternal(currentMapType),
                    "type": "whole_net",
                    "source": "new_cc",
                    "token": tokenMessage,
                    "user_id": userId
                }, {
                    "cmd": "mapList",
                    "is_internal": isInternal(currentMapType),
                    "type": "whole_net",
                    "flag": "private",
                    "source": "new_cc",
                    "token": tokenMessage,
                    "user_id": userId
                }];
                sendMapSwitch(messages);
            }
            break;
        case PAGE_SINGLE:
            if (requestType === 'init') {
                var messages = [{
                    "cmd": "all",
                    "is_internal": isInternal(currentMapType),
                    "type": "single_net",
                    "domain": cunrrentDomain,
                    "source": "new_cc",
                    "token": tokenMessage,
                    "user_id": userId
                }];
                sendConnectInit(messages);
            } else if (requestType === 'map_switch') {
                var messages = [{
                    "cmd": "realList",
                    "is_internal": isInternal(currentMapType),
                    "type": "whole_net",
                    "domain": cunrrentDomain,
                    "source": "new_cc",
                    "token": tokenMessage,
                    "user_id": userId
                }, {
                    "cmd": "mapList",
                    "is_internal": isInternal(currentMapType),
                    "type": "single_net",
                    "domain": cunrrentDomain,
                    "source": "new_cc",
                    "token": tokenMessage,
                    "user_id": userId
                }];
                sendMapSwitch(messages);
            }
            break;
    }
}

function sendRequestWAF(requestType) {
    switch (currentPageType) {
        case PAGE_ALL_PUBLIC:
            if (requestType === 'init') {
                var messages = [{
                    "cmd": "all",
                    "is_internal": isInternal(currentMapType),
                    "type": "whole_net",
                    "source": "new_waf",
                    "token": tokenMessage,
                    "user_id": userId
                }];
                sendConnectInit(messages);
            } else if (requestType === 'map_switch') {
                var messages = [{
                    "cmd": "realList",
                    "is_internal": isInternal(currentMapType),
                    "type": "whole_net",
                    "source": "new_waf",
                    "token": tokenMessage,
                    "user_id": userId
                }, {
                    "cmd": "mapList",
                    "is_internal": isInternal(currentMapType),
                    "type": "whole_net",
                    "source": "new_waf",
                    "token": tokenMessage,
                    "user_id": userId
                }];
                sendMapSwitch(messages);
            }
            break;
        case PAGE_ALL_PRIVATE:
            if (requestType === 'init') {
                var messages = [{
                    "cmd": "all",
                    "is_internal": isInternal(currentMapType),
                    "type": "whole_net",
                    "flag": "private",
                    "source": "new_waf",
                    "token": tokenMessage,
                    "user_id": userId
                }];
                sendConnectInit(messages);
            } else if (requestType === 'map_switch') {
                var messages = [{
                    "cmd": "realList",
                    "is_internal": isInternal(currentMapType),
                    "type": "whole_net",
                    "source": "new_waf",
                    "token": tokenMessage,
                    "user_id": userId
                }, {
                    "cmd": "mapList",
                    "is_internal": isInternal(currentMapType),
                    "type": "whole_net",
                    "flag": "private",
                    "source": "new_waf",
                    "token": tokenMessage,
                    "user_id": userId
                }];
                sendMapSwitch(messages);
            }
            break;
        case PAGE_SINGLE:
            if (requestType === 'init') {
                var messages = [{
                    "cmd": "all",
                    "is_internal": isInternal(currentMapType),
                    "type": "single_net",
                    "domain": cunrrentDomain,
                    "source": "new_waf",
                    "token": tokenMessage,
                    "user_id": userId
                }];
                sendConnectInit(messages);
            } else if (requestType === 'map_switch') {
                var messages = [{
                    "cmd": "realList",
                    "is_internal": isInternal(currentMapType),
                    "type": "whole_net",
                    "domain": cunrrentDomain,
                    "source": "new_waf",
                    "token": tokenMessage,
                    "user_id": userId
                }, {
                    "cmd": "mapList",
                    "is_internal": isInternal(currentMapType),
                    "type": "single_net",
                    "domain": cunrrentDomain,
                    "source": "new_waf",
                    "token": tokenMessage,
                    "user_id": userId
                }];
                sendMapSwitch(messages);
            }
            break;
    }
}

function sendRequestDDOS(requestType) {
    var reqMsg = {
        //今日峰值流量
        msg1: {
            action: 'getAllWidthMax',
            task_return: false,
            params: {
                addTimer: 10000,
                limit: 1,
                source: "new_ddos",
                token: tokenMessage,
                user_id: userId
            },
            actionClose: 0
        },

        //今日受攻击IP数
        msg2: {
            action: 'getTodayHostIpCount',
            task_return: false,
            params: {
                addTimer: 10000,
                limit: 1,
                source: "new_ddos",
                token: tokenMessage,
                user_id: userId
            },
            actionClose: 0
        },

        //攻击城市TOP
        msg3: {
            action: 'getTopAttackCity',
            task_return: false,
            params: {
                addTimer: 10000,
                limit: 10,
                source: "new_ddos",
                token: tokenMessage,
                user_id: userId
            },
            actionClose: 0
        },

        //攻击IP TOP
        msg4: {
            action: 'getTopAttackIp',
            task_return: false,
            params: {
                addTimer: 10000,
                limit: 10,
                source: "new_ddos",
                token: tokenMessage,
                user_id: userId
            },
            actionClose: 0
        },

        //防护IP受攻击流量 TOP
        msg5: {
            action: 'getTopProtectIp',
            task_return: false,
            params: {
                addTimer: 10000,
                limit: 10,
                source: "new_ddos",
                token: tokenMessage,
                user_id: userId
            },
            actionClose: 0
        },

        //防护IP受攻击次数 TOP
        msg6: {
            action: 'getTopProtectIpCount',
            task_return: false,
            params: {
                addTimer: 10000,
                limit: 10,
                source: "new_ddos",
                token: tokenMessage,
                user_id: userId
            },
            actionClose: 0
        },

        //实时攻击信息
        msg7: {
            action: 'getTopTrafficin',
            task_return: false,
            params: {
                addTimer: 3000,
                limit: 10,
                country: getCountry(currentMapType),
                source: "new_ddos",
                token: tokenMessage,
                user_id: userId
            },
            actionClose: 0
        },

        //攻击地图信息查询
        msg8: {
            action: 'getMapAttack',
            task_return: false,
            params: {
                addTimer: 8000,
                limit: 30,
                country: getCountry(currentMapType),
                source: "new_ddos",
                token: tokenMessage,
                user_id: userId
            },
            actionClose: 0
        },

        //今日总攻击次数查询
        msg9: {
            action: 'getDayTotalAttatck',
            task_return: false,
            params: {
                addTimer: 10000,
                limit: 1,
                source: "new_ddos",
                token: tokenMessage,
                user_id: userId
            },
            actionClose: 0
        },

        //实时DDoS总流量曲线
        msg10: {
            action: 'getCurrentAllWidth',
            task_return: false,
            params: {
                addTimer: 5000,
                limit: 1,
                source: "new_ddos",
                token: tokenMessage,
                user_id: userId
            },
            actionClose: 0
        },

        //DDoS攻击趋势
        msg11: {
            action: 'getHistoryWidthLine',
            task_return: false,
            params: {
                type: 0,
                addTimer: 1000000,
                limit: 1,
                source: "new_ddos",
                token: tokenMessage,
                user_id: userId
            },
            actionClose: 0
        },

        //攻击国家 TOP
        msg12: {
            action: 'getTopAttackCountry',
            task_return: false,
            params: {
                addTimer: 5000,
                limit: 10,
                source: "new_ddos",
                token: tokenMessage,
                user_id: userId
            },
            actionClose: 0
        }
    };

    var messages = [];
    switch (currentPageType) {
        case PAGE_ALL_PUBLIC:
            if (requestType === 'init') {
                reqMsg.msg5.params.pub = true;
                reqMsg.msg6.params.pub = true;
                reqMsg.msg7.params.pub = true;

                for (var i = 1; i <= 12; i++) {
                    messages.push(reqMsg['msg' + i]);
                }
                sendConnectInit(messages);
            } else if (requestType === 'map_switch') {
                reqMsg.msg7.params.pub = true;

                messages.push(reqMsg.msg7);
                messages.push(reqMsg.msg8);
                sendMapSwitch(messages);
            }
            break;
        case PAGE_ALL_PRIVATE:
            if (requestType === 'init') {
                for (var i = 1; i <= 12; i++) {
                    reqMsg['msg' + i].params.firewall = currentFirewallType;
                    messages.push(reqMsg['msg' + i]);
                }
                sendConnectInit(messages);
            } else if (requestType === 'map_switch') {
                reqMsg.msg7.params.firewall = currentFirewallType;
                reqMsg.msg8.params.firewall = currentFirewallType;

                messages.push(reqMsg.msg7);
                messages.push(reqMsg.msg8);
                sendMapSwitch(messages);
            } else if (requestType === 'firewall_switch') {
                for (var i = 1; i <= 12; i++) {
                    reqMsg['msg' + i].params.firewall = currentFirewallType;
                    messages.push(reqMsg['msg' + i]);
                }
                sendMapSwitch(messages);
            }
            break;
        case PAGE_SINGLE:
            if (requestType === 'init') {
                for (var i = 1; i <= 12; i++) {
                    reqMsg['msg' + i].params.domain = cunrrentDomain;
                    messages.push(reqMsg['msg' + i]);
                }
                sendConnectInit(messages);
            } else if (requestType === 'map_switch') {
                reqMsg.msg7.params.domain = cunrrentDomain;
                reqMsg.msg8.params.domain = cunrrentDomain;

                messages.push(reqMsg.msg7);
                messages.push(reqMsg.msg8);
                sendMapSwitch(messages);
            }
            break;
    }
}

function isInternal(mapType) {
    return mapType === TYPE_CHINA ? 'true' : 'false';
}

function getCountry(mapType) {
    return mapType === TYPE_CHINA ? 'china' : 'foreign';
}

function sendConnectInit(messages) {
    if (null === socket) {
        socketInit(messages);
    }
}

function sendMapSwitch(messages) {
    if (null === socket) {
        return;
    }

    for (var i = 0; i < messages.length; i++) {
        socket.send(JSON.stringify(messages[i]));
    }
}

var socket = null;

function socketInit(messages) {
    if (typeof(WebSocket) !== 'undefined') {
        socket = new WebSocket(getSocketURL());
    } else if (typeof(MozWebSocket) !== 'undefined') {
        socket = new MozWebSocket(getSocketURL());
    }

    socket.onopen = function(event) {
        for (var i = 0; i < messages.length; i++) {
            socket.send(JSON.stringify(messages[i]));
        }
    };

    socket.onmessage = function(event) {
        if (event && event.data) {
            var data = JSON.parse(event.data);
            var formattedData = formatData(data);
            refresh(formattedData);
        }
    };

    function getSocketURL() {
        var scheme = 'https:' === document.location.protocol ? 'wss://' : 'ws://';
        var addr;
        switch (currentPrefix) {
            case PAGE_TYPE_CC:
                addr = 'ws.yundun.com/cc_report_service';
                // addr = 'yd.websocket.vm/cc_report_service';
                break;
            case PAGE_TYPE_WAF:
                addr = 'ws.yundun.com/waf_report_service';
                // addr = 'yd.websocket.vm/waf_report_service';
                break;
            case PAGE_TYPE_DDOS:
                addr = 'ws.yundun.com/ddos_report_service';
                // addr = 'yd.websocket.vm/ddos_report_service';
                // addr = 'yd.websocket.vm/tsgz_map_service';
                break;
        }
        return scheme + addr;
    }
}
/************************* 公共方法 *************************/
//格式化大数据
function formatNumbers(num) {
    if (!isNaN(num)) {
        var len = num.toString().length;
        if (len > 8) {
            return (num / 100000000).toFixed(2) + '亿';
        } else if (len > 4) {
            return (num / 10000).toFixed(2) + '万';
        } else {
            return num;
        }
    } else {
        return 0;
    }
}
//格式化带宽大数据
function formatBandwidth(num) {
    if (!isNaN(num)) {
        var len = num.toString().length;
        if (len > 8) {
            return (num / 1024 / 1024).toFixed(2) + '<span style="color:#fff;font-size:12px;">Tbps</span>';
        } else if (len > 4) {
            return (num / 1024).toFixed(2) + '<span style="color:#fff;font-size:12px;">Gbps</span>';
        } else {
            return num + '<span style="color:#fff;font-size:12px;">Mbps</span>';
        }
    } else {
        return 0;
    }
}
//格式化UserAgent为数组
function formatUserAgent(userAgent) {
    if (userAgent) {
        var tmpArr = userAgent.split('(');
        return tmpArr[0].trim();
    } else {
        return userAgent;
    }
}

function stringCut(url, len) {
    len = len || 20;
    if (url && url.length > len) {
        return url.substr(0, len - 3) + '...';
    } else {
        return url;
    }
}

function attackStringCut(url, len) {
    len = len || 10;
    if (url && url.length > len) {
        return url.substr(0, len - 3) + '...';
    } else {
        return url;
    }
}

function chartsValueFormatter(origin, digit) {
    var UNITS = ['', '十', '百', '千', '万', '十万', '百万', '千万', '亿', '十亿', '百亿', '千亿'];
    var unitLength = origin.toString().length - digit;
    var value = origin;
    var unit = '';
    if (unitLength >= 0) {
        value = Math.round(origin / Math.pow(10, unitLength) * 100) / 100;
        unit = UNITS[unitLength];
    }
    return {
        'value': value,
        'unit': unit
    };
}

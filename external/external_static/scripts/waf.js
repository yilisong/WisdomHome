/**
 * @team Yundun FET
 * @author yilisong@yundun.com
 * @latest 2017-9-12
 * @operator yilisong@yundun.com
 */

/********************* 初始化 ************/
var todayAttackCountTrendLineOption = {
    grid: {
        height: 85
    },
    tooltip: {
        trigger: 'axis',
        formatter: function(params) {
            var day = params[0].dataIndex > zeroMarkIndex ? '今日 ' : '昨日 ';
            return day + params[0].name + '<br/>' + params[0].seriesName + "：" + (params[0].data).toFixed(2);
        }
    },
    xAxis: [{
        name: '时间',
        type: 'category',
        scale: true,
        boundaryGap: false,
        splitLine: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: '#fff'
            }
        },
        axisLabel: {
            rotate: 45,
            textStyle: {
                color: '#fff',
                fontSize: 10
            }
        },
        data: []
    }],
    yAxis: [{
        name: '万次',
        type: 'value',
        scale: true,
        splitNumber: 3,
        splitLine: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: '#fff'
            }
        },
        axisLabel: {
            rotate: 45,
            textStyle: {
                color: '#fff',
                fontSize: 10
            }
        }
    }],
    series: [{
        name: '总攻击次数',
        type: 'line',
        itemStyle: {
            normal: {
                color: '#83530e',
                lineStyle:{ color:'#83530e' },
                areaStyle: {
                    type: 'default',
                    color: ['rgba(131, 83, 14, 0.2)']
                }
            }
        },
        data: []
    }]
};
var realTimeAttackCountTrendLineOption = {
    grid: {
        height: 85
    },
    tooltip: {
        trigger: 'axis',
        formatter: function(params) {
            return params[0].name + '<br/>' + params[0].seriesName + "：" + (params[0].data).toFixed(2);
        }
    },
    xAxis: [{
        name: '时间',
        type: 'category',
        scale: true,
        boundaryGap: false,
        axisLabel: {
            rotate: 45,
            textStyle: {
                color: '#fff',
                fontSize: 10
            }
        },
        axisLine: {
            lineStyle: {
                color: '#fff'
            }
        },
        splitLine: {
            show: false
        },
        data: []
    }],
    yAxis: [{
        name: '次',
        type: 'value',
        scale: true,
        splitNumber: 3,
        axisLabel: {
            rotate: 45,
            textStyle: {
                color: '#fff',
                fontSize: 10
            }
        },
        axisLine: {
            lineStyle: {
                color: '#fff'
            }
        },
        splitLine: {
            show: false
        }
    }],
    series: [{
        name: '攻击次数',
        type: 'line',
        itemStyle: {
            normal: {
                color: '#83530e',
                lineStyle:{ color:'#83530e' },
                areaStyle: {
                    type: 'default',
                    color: ['rgba(131, 83, 14, 0.2)']
                }
            }
        },
        data: []
    }]
};

var $scenes = $('.scene');
var $topCenterScene = $('.top-center-scene');
var $topLeftScene = $('.top-left-scene');
var $topRightScene = $('.top-right-scene');
var $bottomLeftScene = $('.bottom-left-scene');
var $bottomRightScene = $('.bottom-right-scene');

var $iptSearch = $('#iptSearch');
var $btnSearch = $('#btnSearch');
var $msgSearch = $('#msgSearch');
var $mapSwitchBtn = $('#mapSwitchBtn');

var $worldMap = $('#worldMap');
var $chinaMap = $('#chinaMap');
var worldMap = echarts.init($worldMap[0]);
var chinaMap = echarts.init($chinaMap[0]);
var worldMapOptions = null;
var chinaMapOptions = null;
var currentWorldMapOptions = null;
var currentChinaMapOptions = null;

var mapConfigs = [
    {
        'name': '恶意扫描',
        'color': '#d51b03'
    }, {
        'name': '代码执行',
        'color': '#f1831d'
    }, {
        'name': 'SQL注入',
        'color': '#f3d409'
    }, {
        'name': '跨站脚本',
        'color': '#ea48a3'
    }, {
        'name': '特殊攻击',
        'color': '#f2b7d0'
    }, {
        'name': '敏感文件访问',
        'color': '#00a5e6'
    }, {
        'name': '文件上传',
        'color': '#9adbfb'
    }, {
        'name': 'WebShell',
        'color': '#800d7f'
    }, {
        'name': 'Apache漏洞',
        'color': '#029c4c'
    }, {
        'name': 'Nginx漏洞',
        'color': '#2a4aeb'
    }, {
        'name': 'FCKeditor漏洞',
        'color': '#79a33a'
    }, {
        'name': 'struts2远程命令执行漏洞',
        'color': '#00a4af'
    }, {
        'name': 'DDOS拒绝服务攻击',
        'color': '#ff8186'
    }, {
        'name': '微软IIS漏洞',
        'color': '#e535e4'
    }, {
        'name': '本地文件包含漏洞',
        'color': '#f16451'
    }
];

var seriesIndexMap = {
    '恶意扫描': 1,
    '代码执行': 2,
    'SQL注入': 3,
    '跨站脚本': 4,
    '特殊攻击': 5,
    '敏感文件访问': 6,
    '文件上传': 7,
    'WebShell': 8,
    'Apache漏洞': 9,
    'nginx漏洞': 10,
    'Nginx漏洞': 10,
    'FCKeditor漏洞': 11,
    'struts2远程命令执行漏洞': 12,
    'DDOS拒绝服务攻击': 13,
    '微软IIS漏洞': 14,
    '本地文件包含漏洞': 15
};

function initWorldMapOptions(worldGeoList) {
    var color = [];

    var legend = {
        orient: 'vertical',
        itemGap: 5,
        x: 'left',
        y: 'center',
        data: [],
        selectedMode: 'multiple',
        selected: {},
        textStyle: {
            color: 'auto'
        }
    };

    var series = [{
        name: '世界',
        type: 'map',
        mapType: 'world',
        mapLocation: {
            y: 60
        },
        geoCoord: {},
        nameMap: worldGeoList.nameMap,
        itemStyle: {
            normal: {
                borderColor: 'rgba(100,149,237,0.7)',
                borderWidth: 1,
                areaStyle: {
                    color: '#001C32'
                }
            }
        },
        data: [],
        markLine: {
            smooth: true,
            symbol: ['none', 'circle'],
            symbolSize: 1,
            itemStyle: {
                normal: {
                    color: '#fff',
                    borderWidth: 1,
                    borderColor: 'rgba(30,144,255,1)'
                }
            },
            data: []
        }
    }];

    var config;
    for (var i = 0; i < mapConfigs.length; i++) {
        config = mapConfigs[i];

        color.push(config.color);

        legend.data.push({
            name: config.name,
            textStyle: {
                color: config.color
            }
        });

        legend.selected[config.name] = true;

        series.push({
            name: config.name,
            type: 'map',
            mapType: 'world',
            data: [],
            markLine: {
                smooth: true,
                symbolSize: 0,
                effect: {
                    show: true,
                    scaleSize: 3,
                    period: 10,
                    color: config.color,
                    shadowBlur: 10
                },
                itemStyle: {
                    normal: {
                        borderWidth: 1,
                        lineStyle: {
                            type: 'solid',
                            shadowBlur: 2,
                            color: 'rgba(0,0,0,0)'
                        }
                    }
                },
                data: []
            },
            markPoint: {
                symbol: 'emptyCircle',
                symbolSize: function(v) {
                    return 6
                },
                effect: {
                    show: true,
                    color: config.color,
                    shadowBlur: 1
                },
                itemStyle: {
                    normal: {
                        label: {
                            show: false
                        }
                    },
                    emphasis: {
                        label: {
                            position: 'top'
                        }
                    }
                },
                data: []
            }
        });
    }

    worldMapOptions = {
        color: color,
        tooltip: {
            trigger: 'item',
            formatter: '{b}'
        },
        legend: legend,
        series: series
    };
}

function initChinaMapOptions(chinaGeoList) {
    var color = [];

    var legend = {
        orient: 'vertical',
        itemGap: 5,
        x: 'left',
        y: 'center',
        data: [],
        selectedMode: 'multiple',
        selected: {},
        textStyle: {
            color: 'auto'
        }
    };

    var series = [{
        name: '中国',
        type: 'map',
        mapType: 'china',
        mapLocation: {
            y: 60
        },
        geoCoord: {},
        nameMap: chinaGeoList.nameMap,
        itemStyle: {
            normal: {
                borderColor: 'rgba(100,149,237,0.7)',
                borderWidth: 1,
                areaStyle: {
                    color: '#001C32'
                }
            }
        },
        data: [],
        markLine: {
            smooth: true,
            symbol: ['none', 'circle'],
            symbolSize: 1,
            itemStyle: {
                normal: {
                    color: '#fff',
                    borderWidth: 1,
                    borderColor: 'rgba(30,144,255,1)'
                }
            },
            data: []
        }
    }];

    var config;
    for (var i = 0; i < mapConfigs.length; i++) {
        config = mapConfigs[i];

        color.push(config.color);

        legend.data.push({
            name: config.name,
            textStyle: {
                color: config.color
            }
        });

        legend.selected[config.name] = true;

        series.push({
            name: config.name,
            type: 'map',
            mapType: 'china',
            data: [],
            markLine: {
                smooth: true,
                symbolSize: 0,
                effect: {
                    show: true,
                    scaleSize: 3,
                    period: 10,
                    color: config.color,
                    shadowBlur: 10
                },
                itemStyle: {
                    normal: {
                        borderWidth: 1,
                        lineStyle: {
                            type: 'solid',
                            shadowBlur: 2,
                            color: 'rgba(0,0,0,0)'
                        }
                    }
                },
                data: []
            },
            markPoint: {
                symbol: 'emptyCircle',
                symbolSize: function(v) {
                    return 6
                },
                effect: {
                    show: true,
                    color: config.color,
                    shadowBlur: 1
                },
                itemStyle: {
                    normal: {
                        label: {
                            show: false
                        }
                    },
                    emphasis: {
                        label: {
                            position: 'top'
                        }
                    }
                },
                data: []
            }
        });
    }

    chinaMapOptions = {
        color: color,
        tooltip: {
            trigger: 'item',
            formatter: '{b}'
        },
        legend: legend,
        series: series
    };
}

function init() {
    if (currentPageType === PAGE_SINGLE) {
        $('#subTitle').removeClass('hide').html(cunrrentDomain);
        $('#domainAttackRankingBox').hide();
        $topLeftScene.addClass('top-left-scene-smaller');
    } else {
        $('#subTitle').addClass('hide');
    }

    if (currentPageType === PAGE_ALL_PRIVATE) {
        $('#searchBar').removeClass('hide');
    } else {
        $('#searchBar').addClass('hide');
    }

    // todayAttackCountTrendLine.showLoading({
    //     text: DATA_LOADING_MSG
    // });
    // realTimeAttackCountTrendLine.showLoading({
    //     text: DATA_LOADING_MSG
    // });
    // todayAttackCountTrendLine.setOption(todayAttackCountTrendLineOption, true);
    // realTimeAttackCountTrendLine.setOption(realTimeAttackCountTrendLineOption, true);

    if (currentMapType === TYPE_WORLD) {
        $mapSwitchBtn.removeClass('btn-world').addClass('btn-china');
        $chinaMap.hide();
        $worldMap.show();
        $chinaSeries.hide();
        $worldSeries.show();
        // worldMap.showLoading({
        //     text: DATA_LOADING_MSG
        // });
    } else {
        $mapSwitchBtn.removeClass('btn-china').addClass('btn-world');
        $worldMap.hide();
        $chinaMap.show();
        $chinaSeries.show();
        $worldSeries.hide();
        // chinaMap.showLoading({
        //     text: DATA_LOADING_MSG
        // });
    }



    $.getJSON('external_static/json/map_shijie.json', {}, initWorldMapOptions).done(function() {
        worldMap.setOption(worldMapOptions, true);
        isWorldMapOptionsInitComplete = true;
        sendRequestInit();
    });
    $.getJSON('external_static/json/map_shengshi.json', {}, initChinaMapOptions).done(function() {
        chinaMap.setOption(chinaMapOptions, true);
        isChinaMapOptionsInitComplete = true;
        sendRequestInit();
    });

    var isWorldMapOptionsInitComplete = false;
    var isChinaMapOptionsInitComplete = false;

    function sendRequestInit() {
        if (isWorldMapOptionsInitComplete && isChinaMapOptionsInitComplete) {
            sendRequest('init');
        }
    }
}

function refresh(formattedData) {
    switch (formattedData.cmd) {
        case 'countryTenTop':
            globalCountriesAttackRankingRefresh(formattedData);
            break;
        case 'provinceTenTop':
            chinaProvincesAttackRankingRefresh(formattedData);
            break;
        case 'wafDomainTop':
            domainAttackRankingRefresh(formattedData);
            break;
        case 'typeTop':
            typeAttackRankingRefresh(formattedData);
            break;
        case 'todayAttackCountAndIPLine':
            todayAttackCountTrendLineRefresh(formattedData);
            break;
        case 'realAttackLine':
            realTimeAttackCountTrendLineRefresh(formattedData);
            break;
        case 'realList':
            realTimeAttackDefenseDetailsRefresh(formattedData);
            break;
        case 'wafIpTop':
            iPAttackCountRankingRefresh(formattedData);
            break;
        case 'sumCount':
            dashboardRefresh(formattedData);
            break;
        case 'mapList':
            mapRefresh(formattedData);
            break;
    }
}

/********************** 数据填充 *******************/
var $globalCountriesAttackRanking = $('#globalCountriesAttackRanking ul');
var $chinaProvincesAttackRanking = $('#chinaProvincesAttackRanking ul');
var $domainAttackRanking = $('#domainAttackRanking ul');
var $typeAttackRanking = $('#typeAttackRanking ul');
var $chinaSeries = $('#chinaProvincesAttackRanking');
var $worldSeries = $('#globalCountriesAttackRanking');
var $iPAttackCountRanking = $('#iPAttackCountRanking');
var $realTimeAttackDefenseDetails = $('#realTimeAttackDefenseDetails');

/*************top-left-scene-data*************/
//攻击国家 Top5
function globalCountriesAttackRankingRefresh(formattedData) {
    var content = '<ol class="loading-height-100-without-title text-center">' + DATA_LOADING_MSG + '</ol>';
    $globalCountriesAttackRanking.html(content);
    if (formattedData.data.length) {
        content = '';
        $.each(formattedData.data, function(index, item) {
            content += '<ol title="' + item.city + '\r\n' + item.total + '次">';
            content += '<span><span class="flag ' + item.flagnick + '"></span>' + stringCut(item.city, 4) + '</span>';
            content += '<span class="float-right margin-left-n5">' + formatNumbers(item.total) + '次</span>';
            content += '</ol>';
        });
        $globalCountriesAttackRanking.html(content);
    } else {
        content = '<ol class="loading-height-100-without-title text-center">' + DATA_EMPTY_MSG + '</ol>';
        $globalCountriesAttackRanking.html(content);
    }
}
//攻击省份 Top5
function chinaProvincesAttackRankingRefresh(formattedData) {
    var content = '<ol class="loading-height-100-without-title text-center">' + DATA_LOADING_MSG + '</ol>';
    $chinaProvincesAttackRanking.html(content);
    if (formattedData.data.length) {
        content = '';
        $.each(formattedData.data, function(index, item) {
            content += '<ol title="' + item.city + '\r\n' + item.total + '次">';
            content += '<span>' + stringCut(item.city, 4) + '</span>';
            content += '<span class="float-right margin-left-n5">' + formatNumbers(item.total) + '次</span>';
            content += '</ol>';
        });
        $chinaProvincesAttackRanking.html(content);
    } else {
        content = '<ol class="loading-height-100-without-title text-center">' + DATA_EMPTY_MSG + '</ol>';
        $chinaProvincesAttackRanking.html(content);
    }
}
//被攻击域名 Top10
function domainAttackRankingRefresh(formattedData) {
    var content = '<ol class="loading-height-200-without-title text-center">' + DATA_LOADING_MSG + '</ol>';
    $domainAttackRanking.html(content);
    if (formattedData.data.length) {
        content = '';
        $.each(formattedData.data, function(index, item) {
            content += '<ol title="' + item.domain + '\r\n' + item.total + '次">';
            content += '<span>' + stringCut(item.domain, 20) + '</span>';
            content += '<span class="float-right">' + formatNumbers(item.total) + '次</span>';
            content += '</ol>';
        });
        $domainAttackRanking.html(content);
    } else {
        content = '<ol class="loading-height-200-without-title text-center">' + DATA_EMPTY_MSG + '</ol>';
        $domainAttackRanking.html(content);
    }
}
//攻击类型 Top5
function typeAttackRankingRefresh(formattedData) {
    var content = '<ol class="loading-height-100-without-title text-center">' + DATA_LOADING_MSG + '</ol>';
    $typeAttackRanking.html(content);
    if (formattedData.data.length) {
        content = '';
        $.each(formattedData.data, function(index, item) {
            content += '<ol title="' + item.type + '\r\n' + item.total + '次">';
            content += '<span>' + stringCut(item.type, 20) + '</span>';
            content += '<span class="float-right">' + formatNumbers(item.total) + '次</span>';
            content += '</ol>';
        });
        $typeAttackRanking.html(content);
    } else {
        content = '<ol class="loading-height-100-without-title text-center">' + DATA_EMPTY_MSG + '</ol>';
        $typeAttackRanking.html(content);
    }
}

/*************top-right-scene-data*************/
//IP攻击次数 Top10
function iPAttackCountRankingRefresh(formattedData) {
    var content = '<ol><div class="loading-height-400-with-title text-center">' + DATA_LOADING_MSG + '</div></ol>';
    $iPAttackCountRanking.html(content);
    if (formattedData.data.length) {
        content = '';
        if (formattedData.data.length > 10) {
            for (var i = 0; i < 10; i++) {
                content += '<ol title="' + formattedData.data[i].ip + '\r\n' + formattedData.data[i].city + '\r\n' + formattedData.data[i].total + '次">';
                content += '<div class="ipAttack-width">' + formattedData.data[i].ip + '</div>';
                content += '<div class="float-right ipAttack-times">' + formatNumbers(formattedData.data[i].total) + '次</div>';
                content += '<div class="ipAttack-city">' + formattedData.data[i].sub_city + '</div>';
                content += '</ol>';
            }
        } else {
            $.each(formattedData.data, function(index, item) {
                content += '<ol title="' + item.ip + '\r\n' + item.city + '\r\n' + item.total + '次">';
                content += '<div class="ipAttack-width">' + item.ip + '</div>';
                content += '<div class="float-right ipAttack-times">' + formatNumbers(item.total) + '次</div>';
                content += '<div class="ipAttack-city">' + item.sub_city + '</div>';
                content += '</ol>';
            });
        }
        $iPAttackCountRanking.html(content);
    } else {
        content = '<ol><div class="loading-height-400-with-title text-center">' + DATA_EMPTY_MSG + '</div></ol>';
        $iPAttackCountRanking.html(content);
    }
}
/*************top-center-scene-data*************/
//Dashboard（总攻击次数、总攻击IP）
function dashboardRefresh(formattedData) {
    var chartsValueFormatterResult = chartsValueFormatter(formattedData.data.sum_total, 1);
    $('#totalAttackCountGauge').html(chartsValueFormatterResult.value);
    $('#totalAttackCountGaugeUnit').html(chartsValueFormatterResult.unit + '次');
    var totalAttackVal = (Number(chartsValueFormatterResult.value) * 1.65) /10 + '%'
    $("#totalAttack").css('margin-left', totalAttackVal)
    if (((Number(chartsValueFormatterResult.value) * 1.65) /10) > 100) {
        $("#totalAttack").css('margin-left', '194px')
    } else {
        $("#totalAttack").css('margin-left', totalAttackVal)
    }

    var chartsIPValueFormatterResult = chartsValueFormatter(formattedData.data.sum_ip, 1);
    console.log(chartsIPValueFormatterResult)
    $('#totalAttackIpGauge').html(chartsIPValueFormatterResult.value);
    $('#totalAttackIpGaugeUnit').html(chartsIPValueFormatterResult.unit + '个');
    var totalAttackIpVal = (Number(chartsIPValueFormatterResult.value) * 1.90) /10 + '%' 
    if (((Number(chartsIPValueFormatterResult.value) * 1.90) /10) > 100) {
        $("#totalAttackIp").css('margin-left', '194px')
    } else {
        $("#totalAttackIp").css('margin-left', totalAttackIpVal)
    }
}

/*************bottom-left-scene-data*************/
//todayAttackCountTrendLineRefresh
//24h攻击趋势
var todayAttackCountTrendLine = echarts.init($('#todayAttackCountTrendLine')[0]);
var zeroMarkIndex = -1;

function todayAttackCountTrendLineRefresh(formattedData) {
    if (formattedData.status === 1 && formattedData !== null && (formattedData.data.length > 0)) {
        if (todayAttackCountTrendLineOption.xAxis[0].data.length > 0) {
            $.each(formattedData.data, function(key, value) {
                todayAttackCountTrendLineOption.xAxis[0].data.shift();
                todayAttackCountTrendLineOption.series[0].data.shift();
            });
        }
        $.each(formattedData.data, function(key, value) {
            if (value[0].slice(11, 16) == '00:00') {
                zeroMarkIndex = key;
            }
            todayAttackCountTrendLineOption.xAxis[0].data.push(value[0].slice(11, 16));
            todayAttackCountTrendLineOption.series[0].data.push(value[1] / 10000);
        });
        todayAttackCountTrendLine.hideLoading();
        todayAttackCountTrendLine.setOption(todayAttackCountTrendLineOption, true);
    } else {
        // todayAttackCountTrendLine.showLoading({
        //     text: DATA_EMPTY_MSG
        // });
    }
}
//realTimeAttackCountTrendLine
//实时攻击趋势
var TREND_LINE_COUNT_LIMIT = 10;
var realTimeAttackCountTrendLine = echarts.init($('#realTimeAttackCountTrendLine')[0]);
//实时攻击次数趋势
function realTimeAttackCountTrendLineRefresh(formattedData) {
    if (formattedData.status === 1 && formattedData !== null) {
        $.each(formattedData.data, function(key, value) {
            if (realTimeAttackCountTrendLineOption.xAxis[0].data.length >= TREND_LINE_COUNT_LIMIT) {
                realTimeAttackCountTrendLineOption.xAxis[0].data.shift();
                realTimeAttackCountTrendLineOption.series[0].data.shift();
            }

            realTimeAttackCountTrendLineOption.xAxis[0].data.push(formattedData.data.time);
            realTimeAttackCountTrendLineOption.series[0].data.push(formattedData.data.point);
        });

        realTimeAttackCountTrendLine.hideLoading();
        realTimeAttackCountTrendLine.setOption(realTimeAttackCountTrendLineOption);
    } else {
        // realTimeAttackCountTrendLine.showLoading({
        //     text: DATA_EMPTY_MSG
        // });
    }
}

/*************bottom-right-scene-data*************/
//实时攻防详情
var realTimeAttackDefenseDetailsCache = [];
var cacheIndex = 0;
var intervalId = setInterval(startpush, 500);
//替换缓存数据
function realTimeAttackDefenseDetailsRefresh(formattedData) {
    realTimeAttackDefenseDetailsCache = [];
    if (formattedData.data.length) {
        cacheIndex = 0;
        realTimeAttackDefenseDetailsCache = formattedData.data.reverse();
    } else {
        var content = '<ol colspan="5" class="loading-height-100-with-title text-center">' + DATA_EMPTY_MSG + '</ol>';
        $realTimeAttackDefenseDetails.html(content);
    }
}

function startpush() {
    if (realTimeAttackDefenseDetailsCache.length) {
        if (cacheIndex < realTimeAttackDefenseDetailsCache.length) {
            var item = realTimeAttackDefenseDetailsCache[cacheIndex];
            var titleMsg = item.attack_time + '\t' + item.city + '\t' + item.attack_ip +
                '\r\n' + item.attack_type + '\t' + escape(item.useragent) + '\r\n' + formatUrlFn(item.url);
            var content = '<ol title="' + titleMsg + '">';
            content += '<div>' + item.attack_time + '</div>';
            content += '<div>' + stringCut(item.attack_ip + '(' + item.city + ')') + '</div>';
            content += '<div>' + attackStringCut(item.attack_type) + '</div>';
            content += '<div>' + stringCut(formatUrlFn(item.url)) + '</div>';            
            content += '<div>' + stringCut(escape(item.useragent)) + '</div>';
            content += '</ol>';
            $realTimeAttackDefenseDetails.prepend(content);
            cacheIndex++;
        } else {
            cacheIndex = 0;
        }
        if ($realTimeAttackDefenseDetails.children().length > 10) {
            $realTimeAttackDefenseDetails.find('ol:nth-child(11)').remove();
        }
    }
};

function formatUrlFn(url) {
    if(!url) return url;
    var urlArr = url.split(':');
    var prefix = urlArr[0];
    urlArr = urlArr.slice(1);
    return prefix + escape(urlArr.join(''));
}

$realTimeAttackDefenseDetails.mouseenter(function() {
    clearInterval(intervalId);
}).mouseleave(function() {
    intervalId = setInterval(startpush, 500);
});

/*************main-scene-data*************/

//单域名查询
$btnSearch.click(function() {
    $msgSearch.empty();
    var searchStr = $iptSearch.val().trim().toLowerCase();
    if (searchStr.length === 0) {
        $msgSearch.empty('域名不能为空');
        return;
    }
    $.post("/nginx/checkDomainMap", {
        domain: searchStr
    }, function(res) {
        if (res.data.check) {
            window.open("/report/waf/" + res.data.dashboard_id + "?domain=" + searchStr + "&dash_id=" + res.data.dashboard_id, "_blank");
        } else {
            $msgSearch.html(res.data.err_msg).stop().hide().fadeIn().delay(3000).fadeOut('slow');
        }
    }, 'json');
});


$mapSwitchBtn.on('click', onMapSwitchBtnClick);

function onMapSwitchBtnClick(event) {
    //清空实时列表缓存
    realTimeAttackDefenseDetailsCache = [];
    clearInterval(intervalId);
    intervalId = setInterval(startpush, 500);

    //TODO 实时攻防详情的状态变化
    if (currentMapType === TYPE_WORLD) {
        currentMapType = TYPE_CHINA;

        $mapSwitchBtn.removeClass('btn-china').addClass('btn-world');
        $worldMap.hide();
        $chinaMap.show();
        $chinaSeries.show();
        $worldSeries.hide();
        chinaMap.clear();
        chinaMap.setOption(chinaMapOptions, true);
        // chinaMap.showLoading({
        //     text: DATA_LOADING_MSG
        // });
    } else {
        currentMapType = TYPE_WORLD;

        $mapSwitchBtn.removeClass('btn-world').addClass('btn-china');
        $chinaMap.hide();
        $worldMap.show();
        $chinaSeries.hide();
        $worldSeries.show();
        worldMap.clear();
        worldMap.setOption(worldMapOptions, true);
        // worldMap.showLoading({
        //     text: DATA_LOADING_MSG
        // });
    }

    setCookie(mapCookieName, currentMapType);
    sendRequest('map_switch');
}

function mapRefresh(formattedData) {
    if (currentMapType === TYPE_WORLD) {
        refreshWorldMap(formattedData);
    } else {
        refreshChinaMap(formattedData);
    }
}

function refreshWorldMap(data) {
    currentWorldMapOptions = $.extend(true, {}, worldMapOptions);

    if (typeof(data) !== 'undefined' && data !== null && data.data.length > 0) {
        var arr = data.data
        $.each(data.data,function (index, keyValue) {
            if (keyValue.china === 0 && keyValue.from !== '' && keyValue.to !== '') {
                arr[index].to_x = keyValue.to_x
                arr[index].to_y = keyValue.to_y
                arr[index].to = keyValue.to
            }
        })
        $.each(arr, function(i, v) {
            if (v.china === 0 && v.from !== '' && v.to !== '') {
                currentWorldMapOptions.series[0].geoCoord[v.from] = [Math.floor(v.from_x * 10000) / 10000, Math.floor(v.from_y * 10000) / 10000];
                currentWorldMapOptions.series[0].geoCoord[v.to] = [Math.floor(v.to_x * 10000) / 10000, Math.floor(v.to_y * 10000) / 10000];

                var seriesIndex = seriesIndexMap[v.attack_type];
                if (seriesIndex) {
                    currentWorldMapOptions.series[seriesIndex].markLine.data.push([{
                        'name': v.from
                    }, {
                        'name': v.to
                    }]);
                    currentWorldMapOptions.series[seriesIndex].markPoint.data.push({
                        'name': v.to
                    });
                }
            }
        });

        worldMap.clear();
        worldMap.hideLoading();
        worldMap.setOption(currentWorldMapOptions, true);
    } else {
        worldMap.clear();
        worldMap.setOption(worldMapOptions, true);
        // worldMap.showLoading({
        //     text: DATA_EMPTY_MSG
        // });
    }
};

function refreshWorldMapByLegend(x, y) {
    worldMapOptions.legend.x = x;
    worldMapOptions.legend.y = y;
    chinaMapOptions.legend.x = x;
    chinaMapOptions.legend.y = y;

    if (currentWorldMapOptions) {
        currentWorldMapOptions.legend.x = worldMapOptions.legend.x;
        currentWorldMapOptions.legend.y = worldMapOptions.legend.y;
        worldMap.setOption(currentWorldMapOptions, true);
    } else {
        worldMap.setOption(worldMapOptions, true);
    }
}

function refreshChinaMap(data) {
    currentChinaMapOptions = $.extend(true, {}, chinaMapOptions);

    if (typeof(data) !== 'undefined' && data !== null && data.data.length > 0) {
        var arr_china = data.data
        $.each(arr_china,function (iv, ikey) {
            if (ikey.china === 1 && ikey.from !== '' && ikey.to !== '') {
                arr_china[iv].to_x = ikey.to_x
                arr_china[iv].to_y = ikey.to_y
                arr_china[iv].to = ikey.to
            }
        })
        $.each(arr_china, function(i, v) {
            if (v.china === 1 && v.from !== '' && v.to !== '') {
                currentChinaMapOptions.series[0].geoCoord[v.from] = [Math.floor(v.from_x * 10000) / 10000, Math.floor(v.from_y * 10000) / 10000];
                currentChinaMapOptions.series[0].geoCoord[v.to] = [Math.floor(v.to_x * 10000) / 10000, Math.floor(v.to_y * 10000) / 10000];

                var seriesIndex = seriesIndexMap[v.attack_type];
                if (seriesIndex) {
                    currentChinaMapOptions.series[seriesIndex].markLine.data.push([{
                        'name': v.from
                    }, {
                        'name': v.to
                    }]);
                    currentChinaMapOptions.series[seriesIndex].markPoint.data.push({
                        'name': v.to
                    });
                }
            }
        });

        chinaMap.clear();
        chinaMap.hideLoading();
        chinaMap.setOption(currentChinaMapOptions, true);
    } else {
        chinaMap.clear();
        chinaMap.setOption(chinaMapOptions, true);
        // chinaMap.showLoading({
        //     text: DATA_EMPTY_MSG
        // });
    }
};

function refreshChinaMapByLegend(x, y) {
    worldMapOptions.legend.x = x;
    worldMapOptions.legend.y = y;
    chinaMapOptions.legend.x = x;
    chinaMapOptions.legend.y = y;

    if (currentChinaMapOptions) {
        currentChinaMapOptions.legend.x = chinaMapOptions.legend.x;
        currentChinaMapOptions.legend.y = chinaMapOptions.legend.y;
        chinaMap.setOption(currentChinaMapOptions, true);
    } else {
        chinaMap.setOption(chinaMapOptions, true);
    }
}

init();
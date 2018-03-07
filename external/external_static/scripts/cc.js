/**
 * @team Yundun FET
 * @author yilisong@yundun.com
 * @latest 2017-9-11
 * @operator yilisong@yundun.com
 */

/**************************************** 初始化 ****************************************/
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
        fill: 'red',
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
                color: '#3093c2',
                lineStyle:{ color:'#3093c2' },
                areaStyle: {
                    type: 'default',
                    color: ['rgba(30, 79, 75,0.2)']
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
                color: '#3093c2',
                lineStyle:{ color:'#3093c2' },
                areaStyle: {
                    type: 'default',
                    color: ['rgba(30, 79, 75,0.2)']
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
        case 'ccDomainTop':
            domainAttackRankingRefresh(formattedData);
            break;
        case 'typeTop':
            userAgentAttackRankingRefresh(formattedData);
            break;
        case 'todayAttackCountLine':
            todayAttackCountTrendLineRefresh(formattedData);
            break;
        case 'realAttackLine':
            realTimeAttackCountTrendLineRefresh(formattedData);
            break;
        case 'realList':
            realTimeAttackDefenseDetailsRefresh(formattedData);
            break;
        case 'ccIpTop':
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
/**************************************** 数据填充 ****************************************/

var $globalCountriesAttackRanking = $('#globalCountriesAttackRanking ul');
var $chinaProvincesAttackRanking = $('#chinaProvincesAttackRanking ul');
var $domainAttackRanking = $('#domainAttackRanking ul');
var $userAgentAttackRanking = $('#userAgentAttackRanking ul');

var $iPAttackCountRanking = $('#iPAttackCountRanking');
var $realTimeAttackDefenseDetails = $('#realTimeAttackDefenseDetails');

/*************top-left-scene-data*************/
//攻击国家 Top10
function globalCountriesAttackRankingRefresh(formattedData) {
    var content = '<ol class="loading-height-100-without-title text-center">' + DATA_LOADING_MSG + '</ol>';
    $globalCountriesAttackRanking.html(content);
    if (formattedData.data.length) {
        content = '';
        $.each(formattedData.data, function(index, item) {
            content += '<ol title="' + item.city + '\r\n' + item.total + '次">';
            content += '<span class="margin-left-2"><span class="flag ' + item.flagnick + '"></span>' + stringCut(item.city, 4) + '</span>';
            content += '<span class="float-right margin-left-n5">' + formatNumbers(item.total) + '次</span>';
            content += '</ol>';
        });
        $globalCountriesAttackRanking.html(content);
    } else {
        content = '<ol class="loading-height-100-without-title text-center">' + DATA_EMPTY_MSG + '</ol>';
        $globalCountriesAttackRanking.html(content);
    }
}
//攻击省份 Top10
function chinaProvincesAttackRankingRefresh(formattedData) {
    var content = '<ol class="loading-height-100-without-title text-center">' + DATA_LOADING_MSG + '</ol>';
    $chinaProvincesAttackRanking.html(content);
    if (formattedData.data.length) {
        content = '';
        $.each(formattedData.data, function(index, item) {
            content += '<ol title="' + item.city + '\r\n' + item.total + '次">';
            content += '<span class="margin-left-2">' + stringCut(item.city, 4) + '</span>';
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
//攻击UserAgent Top5
function userAgentAttackRankingRefresh(formattedData) {
    var content = '<ol class="loading-height-100-without-title text-center">' + DATA_LOADING_MSG + '</ol>';
    $userAgentAttackRanking.html(content);
    if (formattedData.data.length) {
        content = '';
        $.each(formattedData.data, function(index, item) {
            content += '<ol title="' + item.city + '\r\n' + item.total + '次">';
            content += '<span>' + stringCut(formatUserAgent(item.city), 24) + '</span>';
            content += '<span class="float-right">' + formatNumbers(item.total) + '次</span>';
            content += '</ol>';
        });
        $userAgentAttackRanking.html(content);
    } else {
        content = '<ol class="loading-height-100-without-title text-center">' + DATA_EMPTY_MSG + '</ol>';
        $userAgentAttackRanking.html(content);
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
    var totalAttackVal = (Number(chartsValueFormatterResult.value) * 1.96) /10 + '%'
    $("#totalAttack").css('margin-left', totalAttackVal)
    if ((Number(chartsValueFormatterResult.value) * 1.96) /10 > 100) {
        $("#totalAttack").css('margin-left', '185px')
    } else {
        $("#totalAttack").css('margin-left', totalAttackVal)
    }

    var chartsIPValueFormatterResult = chartsValueFormatter(formattedData.data.sum_ip, 1);
    $('#totalAttackIpGauge').html(chartsIPValueFormatterResult.value);
    $('#totalAttackIpGaugeUnit').html(chartsIPValueFormatterResult.unit + '个');
    var totalAttackIpVal = (Number(chartsIPValueFormatterResult.value) * 1.96) /10 + '%' 
    if ((Number(chartsIPValueFormatterResult) * 1.96) /10 > 100) {
        $("#totalAttackIp").css('margin-left', '185px')
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
            $.each(formattedData.data, function(index, value) {
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
var indext = 0;
var indexp = 0;
var TREND_LINE_COUNT_LIMIT = 10;
var realTimeAttackCountTrendLine = echarts.init($('#realTimeAttackCountTrendLine')[0]);
//实时攻击次数趋势
function realTimeAttackCountTrendLineRefresh(formattedData) {
    if (formattedData.status === 1 && formattedData !== null) {
        $.each(formattedData.data, function(i, v) {
            if (i === 'time') {
                if (indext < TREND_LINE_COUNT_LIMIT) {
                    realTimeAttackCountTrendLineOption.xAxis[0].data.push(v);
                    indext++;
                } else if (indext >= TREND_LINE_COUNT_LIMIT) {
                    realTimeAttackCountTrendLineOption.xAxis[0].data.shift();
                    realTimeAttackCountTrendLineOption.xAxis[0].data.push(v);
                }
            }

            if (i === 'point') {
                if (indexp < TREND_LINE_COUNT_LIMIT) {
                    realTimeAttackCountTrendLineOption.series[0].data.push(v);
                    indexp++;
                } else if (indexp >= TREND_LINE_COUNT_LIMIT) {
                    realTimeAttackCountTrendLineOption.series[0].data.shift();
                    realTimeAttackCountTrendLineOption.series[0].data.push(v);
                }
            }
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
var intervalId = setInterval(startpush, 150);
//替换缓存数据
function realTimeAttackDefenseDetailsRefresh(formattedData) {
    realTimeAttackDefenseDetailsCache = [];
    if (formattedData.data.length) {
        cacheIndex = 0;
        realTimeAttackDefenseDetailsCache = formattedData.data.reverse();
    } else {
        var content = '<div class="loading-height-100-with-title text-center">' + DATA_EMPTY_MSG + '</div>';
        $realTimeAttackDefenseDetails.html(content);
    }
}

function startpush() {
    if (realTimeAttackDefenseDetailsCache.length) {
        if (cacheIndex < realTimeAttackDefenseDetailsCache.length) {
            var item = realTimeAttackDefenseDetailsCache[cacheIndex];
            var titleMsg = item.attack_time + '\t' + item.city + '\t' + item.attack_ip + '\r\n' + item.method + '\t' + item.useragent + '\r\n' + item.url;
            var content = '<ol title="' + titleMsg + '">';
            content += '<div>' + item.attack_time + '</div>';
            content += '<div>' + stringCut(item.attack_ip + '(' + item.city + ')') + '</div>';
            content += '<div>' + item.method + '</div>';
            content += '<div>' + stringCut(item.url) + '</div>';
            content += '<div>' + stringCut(item.useragent) + '</div>';
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

$realTimeAttackDefenseDetails.mouseenter(function() {
    clearInterval(intervalId);
}).mouseleave(function() {
    intervalId = setInterval(startpush, 150);
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
            window.open("/report/cc/" + res.data.dashboard_id + "?domain=" + searchStr + "&dash_id=" + res.data.dashboard_id, "_blank");
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
    intervalId = setInterval(startpush, 150);

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

var $worldMap = $('#worldMap');
var $chinaMap = $('#chinaMap');
var $chinaSeries = $('#chinaProvincesAttackRanking');
var $worldSeries = $('#globalCountriesAttackRanking');
var worldMap = echarts.init($worldMap[0]);
var chinaMap = echarts.init($chinaMap[0]);
var worldMapOptions = null;
var chinaMapOptions = null;
var currentWorldMapOptions = null;
var currentChinaMapOptions = null;

function initWorldMapOptions(worldGeoList) {
    worldMapOptions = {
        tooltip: {
            trigger: 'item',
            formatter: '{b}'
        },
        series: [{
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
        }, {
            name: 'CC攻击',
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
                    color: '#0249c6',
                    shadowBlur: 10
                },
                itemStyle: {
                    normal: {
                        borderWidth: 1,
                        lineStyle: {
                            type: 'solid',
                            shadowBlur: 0,
                            color: 'rgba(0,0,0,0)'
                        }
                    }
                },
                data: []
            },
            markPoint: {
                symbol: 'emptyCircle',
                symbolSize: function(v) {
                    return 3
                },
                effect: {
                    show: true,
                    shadowBlur: 0.1,
                    color: '#0249c6'
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
        }]
    };
}
function initChinaMapOptions(chinaGeoList) {
    chinaMapOptions = {
        tooltip: {
            trigger: 'item',
            formatter: '{b}'
        },
        series: [{
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
        }, {
            name: 'CC攻击',
            type: 'map',
            mapType: 'china',
            data: [],
            markLine: {
                smooth: true,
                symbolSize: 0,
                effect: {
                    show: true,
                    scaleSize: 3,
                    period: 30,
                    color: '#0249c6',
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
                    shadowBlur: 1,
                    color: '#0249c6'
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
        }]
    };
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
                currentWorldMapOptions.series[1].markLine.data.push([{
                    "name": v.from
                }, {
                    "name": v.to
                }]);
                currentWorldMapOptions.series[1].markPoint.data.push({
                    "name": v.to
                });
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

                currentChinaMapOptions.series[1].markLine.data.push([{
                    "name": v.from
                }, {
                    "name": v.to
                }]);
                currentChinaMapOptions.series[1].markPoint.data.push({
                    "name": v.to
                });
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

init();
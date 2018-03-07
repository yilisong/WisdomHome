/**
 * @team Yundun FET
 * @author yilisong@yundun.com
 * @latest 2017-8-02
 * @operator yilisong@yundun.com
 */

/**************************************** 初始化 ****************************************/
var ddosAttackBandwidthTrendLineOption = {
    grid: {
        height: 85
    },
    tooltip: {
        trigger: 'axis',
        formatter: function(params) {
            var day = params[0].dataIndex > zeroMarkIndex ? '今日 ' : '昨日 ';
            return day + params[0].name + '<br/>' + params[0].seriesName + "：" + (params[0].data).toFixed(2) + 'Gbps';
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
        name: 'Gbps',
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
        name: '带宽',
        type: 'line',
        data: [],
        itemStyle: {
            normal: {
                color: '#008bc1',
                lineStyle:{ color:'#008bc1' },
                areaStyle: {
                    type: 'default',
                    color: ['rgba(34, 70, 77, 0.2)']
                }
            }
        }
    }]

};
var realTimeDdosAttackBandwidthTrendLineOption = {
    grid: {
        height: 85
    },
    tooltip: {
        trigger: 'axis',
        formatter: function(params) {
            return params[0].name + '<br/>' + params[0].seriesName + "：" + (params[0].data).toFixed(2) + 'Gbps';
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
        name: 'Gbps',
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
        name: '带宽',
        type: 'line',
        itemStyle: {
            normal: {
                color: '#008bc1',
                lineStyle:{ color:'#008bc1' },
                areaStyle: {
                    type: 'default',
                    color: ['rgba(34, 70, 77, 0.2)']
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
var $btnLocaltion = $('#btnLocaltion');
var $selectedLocaltion = $('#selectedLocaltion');
var $chinaSeries = $('#chinaProvincesAttackRanking');
var $worldSeries = $('#globalCountriesAttackRanking');
var $mapSwitchBtn = $('#mapSwitchBtn');

function init() {
    if (currentPageType === PAGE_SINGLE) {
        $('#subTitle').removeClass('hide').html(cunrrentDomain);
        $topLeftScene.addClass('top-left-scene-smaller');
    } else {
        $('#subTitle').addClass('hide');
    }

    if (currentPageType === PAGE_ALL_PRIVATE) {
        $('#searchBar').removeClass('hide');
        $('.group-menu').show();
    } else {
        $('#searchBar').addClass('hide');
        $('.group-menu').hide();
    }

    // ddosAttackBandwidthTrendLine.showLoading({
    //     text: DATA_LOADING_MSG
    // });
    // realTimeDdosAttackBandwidthTrendLine.showLoading({
    //     text: DATA_LOADING_MSG
    // });
    // ddosAttackBandwidthTrendLine.setOption(ddosAttackBandwidthTrendLineOption);
    // realTimeDdosAttackBandwidthTrendLine.setOption(realTimeDdosAttackBandwidthTrendLineOption);

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
    switch (formattedData.action.name) {
        case 'getAllWidthMax':
            totalPeakInfoGaugeRefresh(formattedData);
            break;
        case 'getTodayHostIpCount':
            totalAttackIpGaugeRefresh(formattedData);
            break;
        case 'getDayTotalAttatck':
            totalAttackCountGaugeRefresh(formattedData);
            break;
        case 'getMapAttack':
            mapRefresh(formattedData);
            break;

        case 'getTopAttackCountry':
            globalCountriesAttackRankingRefresh(formattedData);
            break;
        case 'getTopAttackCity':
            chinaProvincesAttackRankingRefresh(formattedData);
            break;
        case 'getTopAttackIp':
            iPAttackCountRankingRefresh(formattedData);
            break;

        case 'getHistoryWidthLine':
            ddosAttackBandwidthTrendLineRefresh(formattedData);
            break;
        case 'getCurrentAllWidth':
            realTimeDdosAttackBandwidthTrendLineRefresh(formattedData);
            break;

        case 'getTopTrafficin':
            realTimeDdosAttackDetailsRefresh(formattedData);
            break;

        case 'getTopProtectIpCount':
            defenseIpAttackCountRankingRefresh(formattedData);
            break;
        case 'getTopProtectIp':
            defenseIpAttackBandwidthPeakRankingRefresh(formattedData);
            break;
    }
}
/**************************************** 数据填充 ****************************************/

var $globalCountriesAttackRanking = $('#globalCountriesAttackRanking ul');
var $chinaProvincesAttackRanking = $('#chinaProvincesAttackRanking ul');
var $iPAttackCountRanking = $('#iPAttackCountRanking');

var $totalPeakInfoGauge = $('#totalPeakInfoGauge');
var $totalAttackIpGauge = $('#totalAttackIpGauge');
var $totalAttackCountGauge = $('#totalAttackCountGauge');

var $ddosAttackBandwidthTrendLine = $('#ddosAttackBandwidthTrendLine');
var $realTimeDdosAttackBandwidthTrendLine = $('#realTimeDdosAttackBandwidthTrendLine');

var $defenseIpAttackCountRanking = $('#defenseIpAttackCountRanking ul');
var $defenseIpAttackBandwidthPeakRanking = $('#defenseIpAttackBandwidthPeakRanking tbody');

var $realTimeDdosAttackDetails = $('#realTimeDdosAttackDetails');

/*************top-left-scene-data*************/
//攻击国家 Top10
function globalCountriesAttackRankingRefresh(formattedData) {
    var content = '<ol class="loading-height-222-without-title text-center">' + DATA_LOADING_MSG + '</ol>';
    $globalCountriesAttackRanking.html(content);
    if (formattedData.data.length) {
        content = '';
        $.each(formattedData.data, function(index, item) {
            content += '<ol title="' + item.country + '\r\n' + item.sum + '次">';
            content += '<span><span class="flag ' + item.flag + '"></span>' + stringCut(item.country, 4) + '</span>';
            content += '<span class="float-right margin-left-n5">' + formatNumbers(item.sum) + '次</span>';
            content += '</ol>';
        });
        $globalCountriesAttackRanking.html(content);
    } else {
        content = '<ol class="loading-height-222-without-title text-center">' + DATA_EMPTY_MSG + '</ol>';
        $globalCountriesAttackRanking.html(content);
    }
}
//攻击城市 Top10
function chinaProvincesAttackRankingRefresh(formattedData) {
    var content = '<ol class="loading-height-222-without-title text-center">' + DATA_LOADING_MSG + '</ol>';
    $chinaProvincesAttackRanking.html(content);
    if (formattedData.data.length) {
        content = '';
        $.each(formattedData.data, function(index, item) {
            content += '<ol title="' + item.city + '\r\n' + item.sum + '次">';
            content += '<span>' + stringCut(item.city, 4) + '</span>';
            content += '<span class="float-right margin-left-n5">' + formatNumbers(item.sum) + '次</span>';
            content += '</ol>';
        });
        $chinaProvincesAttackRanking.html(content);
    } else {
        content = '<ol class="loading-height-222-without-title text-center">' + DATA_EMPTY_MSG + '</ol>';
        $chinaProvincesAttackRanking.html(content);
    }
}
//IP攻击次数 Top10
function iPAttackCountRankingRefresh(formattedData) {
    var content = '<ol><li colspan="3" class="loading-height-200-with-title text-center">' + DATA_LOADING_MSG + '</li></ol>';
    $iPAttackCountRanking.html(content);
    if (formattedData.data.length) {
        content = '';
        $.each(formattedData.data, function(index, item) {
            var city = (item.city && item.city.trim().length > 0) ? item.city.trim() : '未知';
            content += '<ol title="' + item.ip + '\r\n' + city + '\r\n' + item.sum + '次">';
            content += '<li class="iPAttackCountRankingLi1">' + item.ip + '</li>';
            content += '<li class="iPAttackCountRankingLi2">' + stringCut(city, 6) + '</li>';
            content += '<li class="iPAttackCountRankingLi3">' + formatNumbers(item.sum) + '次</li>';
            content += '</ol>';
        });
        $iPAttackCountRanking.html(content);
    } else {
        content = '<ol><li colspan="3" class="loading-height-200-with-title text-center">' + DATA_EMPTY_MSG + '</li></ol>';
        $iPAttackCountRanking.html(content);
    }
}

/*************top-right-scene-data*************/
//防护IP被攻击次数 Top10
function defenseIpAttackCountRankingRefresh(formattedData) {
    var content = '<tr><td colspan="3" class="loading-height-200-with-title text-center">' + DATA_LOADING_MSG + '</td></tr>';
    $defenseIpAttackCountRanking.html(content);
    if (formattedData.data.length) {
        var arr_pIp = formattedData.data
        $.each(arr_pIp, function (i, v) {
            arr_pIp[i].city = v.city
            arr_pIp[i].ip = v.ip
        })
        content = '';
        $.each(arr_pIp, function(index, item) {
            var city = (item.city && item.city.trim().length > 0) ? item.city.trim() : '未知';
            content += '<ol title="' + item.ip + '\r\n' + city + '\r\n' + item.sum + '次">';
            content += '<li class="iPAttackCountRankingLi1">' + item.ip + '</li>';
            content += '<li class="iPAttackCountRankingLi2">' + stringCut(city, 6) + '</li>';
            content += '<li class="iPAttackCountRankingLi3">' + formatNumbers(item.sum) + '次</li>';
            content += '</ol>';
        });
        $defenseIpAttackCountRanking.html(content);
    } else {
        content = '<ol><li colspan="3" class="loading-height-200-with-title text-center">' + DATA_EMPTY_MSG + '</li></ol>';
        $defenseIpAttackCountRanking.html(content);
    }
}
//防护IP被攻击带宽峰值 Top10
function defenseIpAttackBandwidthPeakRankingRefresh(formattedData) {
    var content = '<tr><td colspan="3" class="loading-height-200-with-title text-center">' + DATA_LOADING_MSG + '</td></tr>';
    $defenseIpAttackBandwidthPeakRanking.html(content);
    if (formattedData.data.length) {
        var arr_pIp_daikuan = formattedData.data
        $.each(arr_pIp_daikuan, function (i, v) {
            arr_pIp_daikuan[i].city = v.city
            arr_pIp_daikuan[i].ip = v.ip
        })
        content = '';
        $.each(arr_pIp_daikuan, function(index, item) {
            var city = (item.city && item.city.trim().length > 0) ? item.city.trim() : '未知';
            content += '<tr title="' + item.ip + '\r\n' + city + '\r\n' + item.sum + 'Mbps">';
            content += '<td class="text-left">' + item.ip + '</td>';
            content += '<td>' + stringCut(city, 6) + '</td>';
            content += '<td class="text-right">' + formatBandwidth(item.sum) + '</td>';
            content += '</tr>';
        });
        $defenseIpAttackBandwidthPeakRanking.html(content);
    } else {
        content = '<tr><td colspan="3" class="loading-height-200-with-title text-center">' + DATA_EMPTY_MSG + '</td></tr>';
        $defenseIpAttackBandwidthPeakRanking.html(content);
    }
}

/*************top-center-scene-data*************/
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
            window.open("/report/ddos/" + res.data.dashboard_id + "?domain=" + searchStr + "&dash_id=" + res.data.dashboard_id, "_blank");
        } else {
            $msgSearch.html(res.data.err_msg).stop().hide().fadeIn().delay(3000).fadeOut('slow');
        }
    }, 'json');
});

//机房选择
$btnLocaltion.click(function(event) {
    if (event.target.nodeName === 'LI') {
        var $target = $(event.target);
        currentFirewallType = $target.attr("data-localtion");
        sendRequest('firewall_switch');
        $selectedLocaltion.html($target.html());
    }
});

// Dashboard（今日峰值带宽）
function totalPeakInfoGaugeRefresh(formattedData) {
    if (formattedData.data) {
        var chartsPeakValueFormatterResult = formattedData.data.max_trafficin;
        var num = chartsPeakValueFormatterResult.replace(/[^0-9.]/ig,"");
        $('#totalPeakInfoGauge').html(chartsPeakValueFormatterResult + '<span style="color:#fff;font-size:12px;">Gbps</span>');
        var totalAttackVal = (Number(num) * 1.96) / 10 + 'px'
        if (((Number(num) * 1.96) / 10) > 100) {
            $("#totalAttackPeak").css('margin-left', '185px')
        } else {
            $("#totalAttackPeak").css('margin-left', totalAttackVal)
        }
    }
}

// Dashboard（今日受攻击IP数）
function totalAttackIpGaugeRefresh(formattedData) {
    if (formattedData.data) {
        var chartsIPValueFormatterResult = formatNumbers(formattedData.data.count, 2);
        $('#totalAttackIpGauge').html(chartsIPValueFormatterResult);
        $('#totalAttackIpGaugeUnit').html('个');
        var totalAttackIpVal = (Number(chartsIPValueFormatterResult) * 1.96) / 10 + 'px' 
        if (((Number(chartsIPValueFormatterResult) * 1.96) / 10) > 100) {
            $("#totalAttackIp").css('margin-left', '185px')
        } else {
            $("#totalAttackIp").css('margin-left', totalAttackIpVal)
        }
    }
}

// Dashboard（今日攻击次数）
function totalAttackCountGaugeRefresh(formattedData) {
    if (formattedData.data) {
        $('#totalAttackCountGauge').html(formattedData.data.total);
        $('#totalAttackCountGaugeUnit').html(formattedData.data.unit);
        var totalAttackVal = (Number(formattedData.data.total) * 1.96) / 10 + 'px'
        if (((Number(formattedData.data.total) * 1.96) / 10) > 100) {
            $("#totalAttack").css('margin-left', '185px')
        } else {
            $("#totalAttack").css('margin-left', totalAttackVal)
        }
    }
}

/*************bottom-left-scene-data*************/
var ddosAttackBandwidthTrendLine = echarts.init($ddosAttackBandwidthTrendLine[0]);
var zeroMarkIndex = -1;
// DDoS攻击带宽
function ddosAttackBandwidthTrendLineRefresh(formattedData) {
    if (formattedData !== null && (formattedData.data.length > 0)) {
        if (ddosAttackBandwidthTrendLineOption.xAxis[0].data.length > 0) {
            $.each(formattedData.data, function(key, value) {
                ddosAttackBandwidthTrendLineOption.xAxis[0].data.shift();
                ddosAttackBandwidthTrendLineOption.series[0].data.shift();
            });
        }
        $.each(formattedData.data, function(key, value) {
            if (value.current_time.slice(11, 16) == '00:00') {
                zeroMarkIndex = key;
            }
            ddosAttackBandwidthTrendLineOption.xAxis[0].data.push(value.current_time.slice(11, 16));
            ddosAttackBandwidthTrendLineOption.series[0].data.push(value.sum / 1024);
        });
        ddosAttackBandwidthTrendLine.hideLoading();
        ddosAttackBandwidthTrendLine.setOption(ddosAttackBandwidthTrendLineOption, true);
    } else {
        // ddosAttackBandwidthTrendLine.showLoading({
        //     text: DATA_EMPTY_MSG
        // });
    }
}

var TREND_LINE_COUNT_LIMIT = 10;
var realTimeDdosAttackBandwidthTrendLine = echarts.init($realTimeDdosAttackBandwidthTrendLine[0]);
// 实时DDoS攻击带宽曲线
function realTimeDdosAttackBandwidthTrendLineRefresh(formattedData) {
    if (formattedData.status === 1 && formattedData !== null) {
        $.each(formattedData.data, function(key, value) {

            if (realTimeDdosAttackBandwidthTrendLineOption.xAxis[0].data.length >= TREND_LINE_COUNT_LIMIT) {
                realTimeDdosAttackBandwidthTrendLineOption.xAxis[0].data.shift();
                realTimeDdosAttackBandwidthTrendLineOption.series[0].data.shift();
            }

            realTimeDdosAttackBandwidthTrendLineOption.xAxis[0].data.push(formattedData.data.current_time.slice(11, 19));
            realTimeDdosAttackBandwidthTrendLineOption.series[0].data.push(formattedData.data.total / 1024);
        });
        realTimeDdosAttackBandwidthTrendLine.hideLoading();
        realTimeDdosAttackBandwidthTrendLine.setOption(realTimeDdosAttackBandwidthTrendLineOption);
    } else {
        // realTimeDdosAttackBandwidthTrendLine.showLoading({
        //     text: DATA_EMPTY_MSG
        // });
    }
}

/*************bottom-right-scene-data*************/
//实时攻防详情
var realTimeDdosAttackDetailsCache = [];
var cacheIndex = 0;
var intervalId = setInterval(startpush, 150);
//替换缓存数据
function realTimeDdosAttackDetailsRefresh(formattedData) {
    realTimeDdosAttackDetailsCache = [];
    var reverse_arr = formattedData.data.reverse()
    $.each(reverse_arr,function (i, v) {
        reverse_arr[i].host_city = v.host_city
        reverse_arr[i].host = v.host
    })
    if (formattedData.data.length) {
        cacheIndex = 0;
        realTimeDdosAttackDetailsCache = reverse_arr;
    } else {
        var content = '<ol class="loading-height-100-with-title text-center">' + DATA_EMPTY_MSG + '</ol>';
        $realTimeDdosAttackDetails.html(content);
    }
}

function startpush() {
    if (realTimeDdosAttackDetailsCache.length) {
        if (cacheIndex < realTimeDdosAttackDetailsCache.length) {
            var item = realTimeDdosAttackDetailsCache[cacheIndex];
            var titleMsg = item.current_time + '\t' + item.trafficin + 'Mbps\t' + item.attacktype + '\r\n' + item.src + '\t' + item.src_city + '\r\n' + item.host + '\t' + item.host_city;
            var content = '<ol title="' + titleMsg + '">';
            content += '<li>' + item.current_time + '</li>';
            content += '<li>' + stringCut(item.src + '(' + item.src_city + ')') + '</li>';
            content += '<li>' + stringCut(item.host + '(' + item.host_city + ')') + '</li>';
            content += '<li>' + stringCut(item.trafficin) + 'Mbps</li>';
            content += '<li>' + stringCut(item.attacktype) + '</li>';
            content += '</ol>';
            $realTimeDdosAttackDetails.prepend(content);
            cacheIndex++;
        } else {
            cacheIndex = 0;
        }
        if ($realTimeDdosAttackDetails.children().length > 10) {
            $realTimeDdosAttackDetails.find('ol:nth-child(11)').remove();
        }
    }
};

$realTimeDdosAttackDetails.mouseenter(function() {
    clearInterval(intervalId);
}).mouseleave(function() {
    intervalId = setInterval(startpush, 150);
});

/*************main-scene-data*************/
$mapSwitchBtn.on('click', onMapSwitchBtnClick);

function onMapSwitchBtnClick(event) {
    //清空实时列表缓存
    realTimeDdosAttackDetailsCache = [];
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


/*********************地图参数*************************/

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
        'name': 'SYN',
        'color': '#ff0000'
    }, {
        'name': 'HTTP',
        'color': '#eb7852'
    }, {
        'name': 'TCP',
        'color': '#b59cd9'
    }, {
        'name': 'UDP',
        'color': '#c8215d'
    }, {
        'name': 'App',
        'color': '#73d692'
    }, {
        'name': 'ACK',
        'color': '#c7e5d2'
    }, {
        'name': 'Icmp',
        'color': '#1c61da'
    }, {
        'name': 'DNS',
        'color': '#fddc89'
    }, {
        'name': 'Frag',
        'color': '#f3859b'
    }
];

var seriesIndexMap = {
    'SYN': 1,
    'HTTP': 2,
    'TCP': 3,
    'UDP': 4,
    'App': 5,
    'ACK': 6,
    'Icmp': 7,
    'DNS': 8,
    'Frag': 9
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
                    shadowBlur: 1,
                    color: config.color
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
                    shadowBlur: 1,
                    color: config.color
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
    };

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

function mapRefresh(data) {
    if (currentMapType === TYPE_WORLD) {
        refreshWorldMap(data);
    } else {
        refreshChinaMap(data);
    }
}

function refreshWorldMap(data) {
    currentWorldMapOptions = $.extend(true, {}, worldMapOptions);
    if (data.data.length > 0) {
        var arr_china = data.data
        $.each(arr_china,function (iv, ikey) {
            if (!(ikey.src_country === 0 && ikey.host_country === 0) && (ikey.src_city !== '未知' && ikey.host_city !== '未知')) {
                arr_china[iv].to_x = ikey.to_x
                arr_china[iv].to_y = ikey.to_y
                arr_china[iv].to = ikey.to
            }
        })
        $.each(arr_china, function(i, v) {
            if (!(v.src_country === 0 && v.host_country === 0) && (v.src_city !== '未知' && v.host_city !== '未知')) {

                currentWorldMapOptions.series[0].geoCoord[v.from] = [Math.floor(v.from_x * 10000) / 10000, Math.floor(v.from_y * 10000) / 10000];
                currentWorldMapOptions.series[0].geoCoord[v.to] = [Math.floor(v.to_x * 10000) / 10000, Math.floor(v.to_y * 10000) / 10000];

                var seriesIndex = seriesIndexMap[v.attacktype.split('&')[0]];
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
}

function refreshWorldMapByLegend(x, y) {
    if (worldMapOptions) {
        worldMapOptions.legend.x = x;
        worldMapOptions.legend.y = y;
    }
    if (chinaMapOptions) {
        chinaMapOptions.legend.x = x;
        chinaMapOptions.legend.y = y;
    }
    if (currentWorldMapOptions) {
        currentWorldMapOptions.legend.x = worldMapOptions.legend.x;
        currentWorldMapOptions.legend.y = worldMapOptions.legend.y;
        worldMap.setOption(currentWorldMapOptions, true);
    } else {
        if (worldMapOptions) {
            worldMap.setOption(worldMapOptions, true);
        }
    }
}

function refreshChinaMap(data) {
    currentChinaMapOptions = $.extend(true, {}, chinaMapOptions);

    if (data.data.length > 0) {
        var arr = data.data
        $.each(data.data,function (index, keyValue) {
            if (keyValue.src_country === 0 && keyValue.host_country === 0 && (keyValue.src_city !== '未知' && keyValue.host_city !== '未知')) {
                arr[index].to_x = keyValue.to_x
                arr[index].to_y = keyValue.to_y
                arr[index].to = keyValue.to
            }
        })
        $.each(arr, function(i, v) {
            if (v.src_country === 0 && v.host_country === 0 && (v.src_city !== '未知' && v.host_city !== '未知')) {
                currentChinaMapOptions.series[0].geoCoord[v.from] = [Math.floor(v.from_x * 10000) / 10000, Math.floor(v.from_y * 10000) / 10000];
                currentChinaMapOptions.series[0].geoCoord[v.to] = [Math.floor(v.to_x * 10000) / 10000, Math.floor(v.to_y * 10000) / 10000];

                var seriesIndex = seriesIndexMap[v.attacktype.split('&')[0]];
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
}

function refreshChinaMapByLegend(x, y) {
    if (worldMapOptions) {
        worldMapOptions.legend.x = x;
        worldMapOptions.legend.y = y;
    }
    if (chinaMapOptions) {
        chinaMapOptions.legend.x = x;
        chinaMapOptions.legend.y = y;
    }

    if (currentChinaMapOptions) {
        currentChinaMapOptions.legend.x = chinaMapOptions.legend.x;
        currentChinaMapOptions.legend.y = chinaMapOptions.legend.y;
        chinaMap.setOption(currentChinaMapOptions, true);
    } else {
        if (chinaMapOptions) {
            chinaMap.setOption(chinaMapOptions, true);
        }
    }
}

init();
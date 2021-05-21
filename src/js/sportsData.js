// 引入sportsData私用css样式
require("../css/sportsData.less");

// 引入echarts
const echarts = require("echarts");
// 引入echarts-gl
const echartsgl= require("echarts-gl");


// 兼容写法
document.ready(function () {

    // 获取所有元素
    let backDom=document.querySelector("#back");
    let myheadDom=document.querySelector("#myhead");
    let timesDom=document.querySelector("#times");
    let calorieDom=document.querySelector("#calorie");


    // 获取本地存储的数据，渲染页面
    let user = JSON.parse(localStorage.getItem("user"));

    // 注册点击事件跳转
    backDom.addEventListener("click",function(){
        location.href="./my.html";
    })

    // 请求数据渲染页面
    function changeInfor() {
        // 请求接口获取头像的src地址
        $http.get("/users/accountinfo?userId=" + user.userId, function (res) {
            console.log(res);
            // 渲染数据
            // 判断是否有头像信息
            if (res.data.imgurl) {
                myheadDom.src = res.data.imgurl;
            };
        })
    };
    // 调用函数更新一下个人信息
    changeInfor();


    
    // 请求接口，渲染运动数据
    $http.get("/users/mysportsBadge?userId=" + user.userId, function (res) {
        // 渲染
        timesDom.textContent = res.data.sports.times;

        calorieDom.textContent = res.data.sports.calorie;

    })

    var chartDom = document.getElementById('barChart');
    var myChart = echarts.init(chartDom);
    var option;
    
    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: ['11-5', '11-6', '11-7', '11-8', '11-9', '11-10', '11-11'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '直接访问',
                type: 'bar',
                barWidth: '60%',
                data: [30, 52, 30, 120, 90, 90, 60]
            }
        ]
    };
    
    option && myChart.setOption(option);




var ROOT_PATH = 'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples';

var chartDom = document.getElementById('main');
var myChart = echarts.init(chartDom);
var option;

option = {
    backgroundColor: '#000',
    globe: {
        baseTexture: ROOT_PATH + '/data-gl/asset/earth.jpg',

        shading: 'lambert',

        environment: ROOT_PATH + '/data-gl/asset/starfield.jpg',

        atmosphere: {
            show: true
        },

        light: {
            ambient: {
                intensity: 0.1
            },
            main: {
                intensity: 1.5
            }
        }
    },
    series: []
};

option && myChart.setOption(option);
    
})
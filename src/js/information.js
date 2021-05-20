// 引入私有css
require("../css/information.less");
// 兼容写法
document.ready(function () {

    // 获取所有元素
    let getBackDom = document.querySelector("#getBack");

    let nicknameDom = document.querySelector(".nickname");

    let genderDom = document.querySelector("#gender");
    let genderValDom = document.querySelector("#genderVal");
    let birthdayDom = document.querySelector("#birthday");
    let birthdayValDom = document.querySelector("#birthdayVal");

    let provinceDom = document.querySelector("#province");
    let provinceValDom = document.querySelector("#provinceVal");
    let cityDom = document.querySelector("#city");
    let cityValDom = document.querySelector("#cityVal");

    let signDom = document.querySelector(".sign");
    
    let saveDom = document.querySelector("#save");


     // 获取用户userId
     let user=JSON.parse(localStorage.getItem("user"));

    // 请求接口获取数据渲染页面
     // 将从后端拿获取数据修改个性信息封装为函数
     function changeInfor() {
        // 请求接口获取头像的src地址
        $http.get("/users/accountinfo?userId=" + user.userId, function (res) {
            console.log(res);
            // 渲染数据
            // 判断用户名
            if (res.data.nickname) {
                nicknameDom.value = res.data.nickname;
            };
            // 性别
            if(res.data.gender){
                genderValDom.textContent=res.data.gender;
            }
             // 生日
             if(res.data.birthday){
                 let birthdayVal=new Date(res.data.birthday);
                //  console.log(birthdayVal);
                let birthday= utils.standardTime(birthdayVal);
                birthdayValDom.textContent=birthday;
            }
             // 省份 市级
             if(res.data.address){
                //  将字符串切割成数组
                let arr=res.data.address.split(",");
                console.log(arr);
                provinceValDom.textContent=arr[0];
                cityValDom.textContent=arr[1];
            }

            // 判断个性签名
            if (res.data.sign) {
                signDom.textContent = res.data.sign;
            };
        })
    };
    // 调用函数更新一下个人信息
    changeInfor();

    // 注册点击事件返回上一级
    getBackDom.addEventListener("click", function (event) {

            //  history.back();
           location.href="./my.html";
    })

   

    // 定义一个对象存储发送到后端的数据
    let data = {
        userId:user.userId,
        nickname: "",
        gender: "",
        birthday: "",
        province: "",
        city: "",
        address:[],
        sign:""
    };
    // 注册事件
    // 性别
    genderDom.addEventListener("click", function (event) {
        weui.picker([{
            label: '男',
            value: 0
        }, {
            label: '女',
            value: 1
        }], {
            onConfirm: function (result) {
                // 渲染到页面
                genderValDom.textContent = result[0].label;

                // 储存到data中
                data.gender = result[0].label;
            },
            title: '选择性别'
        });

    });

    // 生日
    birthdayDom.addEventListener("click", function (event) {
        weui.datePicker({
            start: 1960,
            end: new Date().getFullYear(),
            onChange: function (result) {
                // console.log(result);
            },
            onConfirm: function (result) {
                // console.log(result);
                // 渲染到页面
                birthdayValDom.textContent = result[0].label + '' + result[1].label + '' + result[2].label;

                // 存储到data
                data.birthday = result[0].value + '-' + result[1].value + '-' + result[2].value;
            },
            title: '选择出生日期'
        });
    });


    // 省市
    provinceDom.addEventListener("click", function (event) {




        // 拿到后台的数据 
        $http.get("/address/province", function (res) {
            // console.log(res);
            // 使用map方法将数据重新处理一下
            let arr = res.data.map(function (item) {
                return {
                    label: item.name,
                    value: item.addressId
                };
            });

            // 生成选择框
            weui.picker(arr, {
                onConfirm: function (result) {

                    // 渲染到页面
                    provinceValDom.textContent = result[0].label;

                    // 将数据储存到data中
                    data.province = result[0];

                    // 先将城市置空
                    cityValDom.textContent = "请选择城市";
                    // 将data里边的city数据清空
                    data.city = {};
                },
                title: '选择省份'
            });
        })

    });

    // 封装调用城市列表函数
    // function getCity(){

    // }

    // 选择城市
    cityDom.addEventListener("click", function (event) {

        let int = data.province.value;
        console.log(int);

        // 判断int的值
        if (int == undefined) {
            utils.hint(1, "请先选择省级");
            //禁用点击事件
            cityDom.disabled = true;

            // 两秒后将按钮设置为可以点击
            setTimeout(function () {
                cityDom.disabled = false;
            }, 2000);
        } else {
            // 调用城市的接口
            $http.get("/address/city/" + int, function (ev) {
                console.log(ev);
                // 使用map方法将数据重新处理一下
                let arr1 = ev.data.map(function (item) {
                    return {
                        label: item.name,
                        value: item.addressId
                    };
                });

                // 生成选择
                weui.picker(arr1, {
                    onConfirm: function (result) {

                        // 渲染到页面
                        cityValDom.textContent = result[0].label;

                        // 将数据储存到data中
                        data.city = result[0];

                    },
                    title: '选择城市'
                });

            })
        }

    })



    // 保存信息
    saveDom.addEventListener("click", function (event) {
        //完善拼接data
        // 昵称
        data.nickname=nicknameDom.value;
        // 个性签名
        data.sign=signDom.value;

        // 生日
        // 将时间转化为13位的时间戳
        data.birthday=new Date(data.birthday).getTime();

        //省市address
        data.address[0]=data.province.label;
        data.address[1]=data.city.label;
        
        console.log(data);
        // 请求接口发送数据
        $http.post("/users/userEdit",data,function(res){
            // 提示
            utils.hint(0,"信息修改成功");
        })
    })


})
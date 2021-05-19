// 引入私有css
require("../css/information.less");
// 兼容写法
document.ready(function(){

    // 获取所有元素
    let getBackDom=document.querySelector("#getBack");

    let nicknameDom=document.querySelector(".nickname");
    
    let genderDom=document.querySelector("#gender");
    let genderValDom=document.querySelector("#genderVal");
    let birthdayDom=document.querySelector("#birthday");
    let birthdayValDom=document.querySelector("#birthdayVal");

    let provinceDom=document.querySelector("#province");
    let provinceValDom=document.querySelector("#provinceVal");
    let cityDom=document.querySelector("#city");
    let cityValDom=document.querySelector("#cityVal");
    let saveDom=document.querySelector("#save");

    // 注册点击事件返回上一级
   getBackDom.addEventListener("click",function(event){
       history.back();
    //    location.href="./my.html";
   })
   

    // 定义一个对象存储发送到后端的数据
    let data={
        nickname:"",
        gender:"",
        birthday:"",
        province:"",
        city:"",
    };

    data.nickname=nicknameDom.text;
    // 注册事件
    // 性别
    genderDom.addEventListener("click",function(event){
        weui.picker([{
            label: '男',
            value: 0
        }, {
            label: '女',
            value: 1
        }], {
            onConfirm: function (result) {
                // 渲染到页面
                genderValDom.textContent=result[0].label;

                // 储存到data中
                data.gender=result[0].label;
            },
            title: '选择性别'
        });

    });

    // 生日
    birthdayDom.addEventListener("click",function(event){
        weui.datePicker({
            start: 1960,
            end: new Date().getFullYear(),
            onChange: function (result) {
                // console.log(result);
            },
            onConfirm: function (result) {
                // console.log(result);
                // 渲染到页面
                birthdayValDom.textContent=result[0].label+''+result[1].label+''+result[2].label;

                // 存储到data
                data.birthday=result[0].value+'-'+result[1].value+'-'+result[2].value;
            },
            title: '选择出生日期'
        });
    });
    

    // 省市
    provinceDom.addEventListener("click",function(event){
        // 拿到后台的数据 
        $http.get("/address/province",function(res){
            // console.log(res);
            // 使用map方法将数据重新处理一下
            let arr=res.data.map(function(item){
                return {
                    label: item.name,
                    value: item.addressId
                };
            });
            weui.picker(arr, {
                onConfirm: function (result) {
                   
                    // 渲染到页面
                    provinceValDom.textContent=result[0].label;
    
                    // 将数据储存到data中
                    data.province=result[0];
                   
                },
                title: '选择省份'
            });   
        })
          
    });
    
    let int=data.province.value;
    if(int==undefined){
         // 渲染到页面
         cityValDom.textContent="";
    }
     // 选择城市
     cityDom.addEventListener("click",function(event){

       let int=data.province.value;
        // console.log(int);
          // 调用城市的接口
          $http.get("/address/city/"+int,function(ev){
            console.log(ev);
             // 使用map方法将数据重新处理一下
             let arr1=ev.data.map(function(item){
                return {
                    label: item.name,
                    value: item.addressId
                };
            });
            weui.picker(arr1, {
                onConfirm: function (result) {
                   
                    // 渲染到页面
                    cityValDom.textContent=result[0].label;
    
                    // 将数据储存到data中
                    data.city=result[0];
                   
                },
                title: '选择城市'
            });   

        })
     })
           


    // 保存信息
    saveDom.addEventListener("click",function(event){
        console.log(data);
    })


})
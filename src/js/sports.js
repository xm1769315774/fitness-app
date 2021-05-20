// 引入对应的css
require("../css/sports.less");

document.ready(function(){
    // 获取所有元素
    let newDom=document.querySelector(".new");
    let listDom=document.querySelector(".list");

    // 获取用户的课程信息

    // 先获取用户的userId
    let user=JSON.parse(localStorage.getItem("user"));

    // 请求接口数据
    $http.get("/sports/courseList?id="+user.userId,function(res){
       
        // 查找出最后一个添加到后端的课程视频放在第一个位置
      let lastObj=res.data.find(function(item){
        return item.latest===1;
        });
        // 渲染到页面中
        let lastHtml=`  
        <a href="./courseDes.html?id=${lastObj.courseId}">
            <li>
             <img src="${utils.BASE_URL+lastObj.imgurl}" alt="">
             <h5> ${lastObj.name}</h5>
            <p>
              ${lastObj.desc}
             </p>
             </li>
             </a> 
        `;
        // 渲染页面
        newDom.innerHTML=lastHtml;

        // 
        let listHtml="";
        // 遍历数组拿到列表的数据
        res.data.forEach(function(item){
            console.log(item);
            listHtml+=`
            <a href="./courseDes.html?id=${item.courseId}">
                <li>
                  <img src="${utils.BASE_URL+item.imgurl}" alt="">
                    <div>
                        <h3>${item.name}</h3>
                        <p>
                        ${item.desc}
                     </p>
                 </div>

                </li>
            </a>
            `;
            // 渲染数据到页面
            listDom.innerHTML=listHtml;

        })

    })














    
    // 引入公共页脚
    utils.addFooter("sports");


})
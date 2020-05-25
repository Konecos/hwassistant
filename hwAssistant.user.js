// ==UserScript==
// @name         hwAssistant
// @namespace    Konecos
// @version      0.1
// @description  目前功能: 自动查询未做题的数量
// @author       You
// @match        http://hw-neusoft-edu-cn.portal.neutech.com.cn/hw/course/courselist.do
// @match        http://hw.neusoft.edu.cn/hw/course/courselist.do
// @grant        none
// ==/UserScript==

$("a.btn.btn-success:odd").each(function(){
    var b = document.createElement("a");
    b.innerHTML = "查询中...";
    this.offsetParent.appendChild(b);
    $.ajax({
        url:this.href.replace("course/course.do","exercise/exerciselist.do"),
        async:true,
        success:function(result){
            var num_OK = result.match(/作业已提交或截止/g).length-1;
            var num_unOK = result.match(/作业进行中/g).length-1;
            var num_all = num_OK + num_unOK;
            b.innerHTML = "未做数量: "+num_unOK+"/"+num_all;
        },
		error:function(){
            b.innerHTML = "查询失败";
        }
    })
})

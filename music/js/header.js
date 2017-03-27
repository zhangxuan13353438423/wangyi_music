/*
 * 头部header模块
 * 
 * 
 * */

//加载头部模块
(function header(){
	var shair=$("#shair");
	var header=$("#tou").html();
	$(header).appendTo(shair);
	
})()

//导航的点击事件
function navclick(){
	
	$("#nav").find(".item").click(function(){
		
		var href=$(this).attr("href");//1.先获取当前点击的href值
		jiequ(href);
		console.log(111)
	})

}
//2.再截取a.href #后面的字符串
function jiequ(href){
	var url=href.slice(1,href.length)
    route(url);//然后调用app.js里面的route()，实现页面跳转
}


$(function(){
	
	navclick();
})

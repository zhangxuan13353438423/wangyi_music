$(function() {
	route("header", $("#shair"));
	route("home");
//	route("detail");
	route("foot",$("#foot"));
});
//判断访问的次数
$(function(){
	if(!localStorage.count){
		localStorage.count=0
	}
	localStorage.count++;
	
	if(localStorage.count==1){
		route("hello");
	}else{
		route("home");
	}
	
})

	
//加载页面
function route(m, contariner) {
	contariner = contariner || $("#content");
	$.ajax({

		url: "views/" + m + ".html",
		success: function(data) {
			contariner.html(data);
			lodeJs(m);
		}
	});

};

//加载js
function lodeJs(m) {
	$.ajax({
		url: "js/" + m + ".js",
		dataType: "script"
	});

}


function getUrlParams(){
	var params = {};
	var url = window.location.href;
	
	var p = url.split("#");
	if (p.length == 2)
		p = p[1];
	else 
		p = url;
	
	p = p.split("?");
	if(p.length < 2){
		params.anchor = p[0];
		return params;
	}
	
	params.anchor = p[0];
	p = p[1].split("&");
	
	for(var i=0; i<p.length; i++){
		var kv = p[i].split("=");
		params[kv[0]] = kv[1];
	}
	return params;
}
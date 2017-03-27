/*
 * 中间模块
 * class=content
 * 
 * */

$(function() {

	lodebanner();    /*加载轮播图*/
	banner();
	slide();
	lodemusiclist();

});
//加载轮播图
function lodebanner() {

	var content = $("#content");
	var lunbo = $("#lunbo").html();
	$(lunbo).appendTo(content);

};

function lodemusiclist() {

	var content = $("#content");
	var music = $("#music");
	$(music).appendTo(content);
	loadImgAnimate();

}

//添加轮播图的按钮
function banner() {
	// 获取图片的数量
	var imgnum = $("#pic").find("img");
	
	//创建4个but圆形按钮
	for(var i = 0; i < imgnum.length; i++) {
		$("<span class='bot'>").appendTo("#icon");
	}
}

//轮播图的按钮点击事件
function slide() {
	var imgs = $("#pic").find("img"); //找到所有的图片
	var but = $("#icon").find("span"); //找到所有的按钮
	but.eq(0).addClass("ac"); //初始化第一个按钮被选中的样式

	but.click(function() { //绑定按钮的点击事件
		$(this).addClass("ac").siblings().removeClass("ac"); //给当前选中的按钮添加样式，兄弟元素删除样式
		imgs.css({ //图片位移（当前点击的按钮的索引*一张图片的宽度）
			"transform": "translateX(" + ($(this).index() * -imgs.width()) + "px)"
		})
	})
}

var server = "http://musicapi.duapp.com/api.php?";
//var server = "json/topPlayList.json";

//获取json的数据（歌曲列表）
function getPlayList(limit, cb) {
	limit = limit || 6;

	if(checkCache()) {   
		cb(JSON.parse(localStorage.playlists));
	} else {
		$.ajax({
			type: "get",
		   url: server + "type=topPlayList&cat=%E5%85%A8%E9%83%A8&offset=0&limit=" + limit,
//			url: server,
			async: true,
			success: function(data) {

				if(data.code == 200) {
					$("#songList").html("");
					//缓存
					localStorage.playlists = JSON.stringify(data.playlistes);
					localStorage.cacheTime = new Date().getTime();//缓存的当前的时间
					cb(data.playlists);
				}
			} 
		});
	}

	console.log("访问网络！")
}

function checkCache() {
	//判断是否有缓存
	if(!localStorage.playlists) {
		return false;
		
	} else if(new Date().getTime() - localStorage.cacheTime >= 1 * 60 * 1000) {//判断是否超时
		return false;
	}

	return true;//没有缓存
}

//页面未加载出来，先显示一张图片
function loadImgAnimate() {
	$.ajax({
		url: "views/hello.html",
		success: function(data) {
			$(data).appendTo('#songList');
		}
	});
}

(function() {

	getPlayList(9, function(data) {
		createSongList(data);
	});
})();

function createSongList(data) {
	var songList = $("#songList");
	var page = $("#page").html();

	for(var i = 0; i < data.length; i++) { //循环加载6个div

		var $song = $(page);
		$song.find(".pic>img").attr("src", data[i].coverImgUrl);
		$song.find(".pic .positions").html(data[i].playCount);
		$song.find("p").html(data[i].name);
		$song.appendTo(songList);
	}
}
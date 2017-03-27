var server = "http://musicapi.duapp.com/api.php";
//var server = "json/topPlayList.json";

//获取json的数据（歌曲列表）
function getPlayList(limit, cb) {
	limit = limit || 6;
	var songItems=server + '?type=topPlayList&cat=%E5%85%A8%E9%83%A8&offset=0&limit=' + limit;
	$.ajax({
		type: "get",
		url: songItems,
		async: true,
		success: function(data) {

			if(data.code == 200) {
				$("#songList").html("");

				cb(data.playlists);
			}
		}
	});

}

$(function(){
	getPlayList(12,function(data){
		
		createSongList(data);
		
		var $song1=$('a.song1');
		$song1.click(function(){
			route('detail');
		})
		
	})

})


function createSongList(data) {
	var songList = $("#songList");
	var page = $("#page").html();
//	console.log(data[0].id);
	
	for(var i = 0; i < data.length; i++) { //循环加载6个div

		var $song = $(page);
		$song.attr("href","#detail?id=" +data[i].id );
		$song.find(".pic>img").attr("src", data[i].coverImgUrl);
		$song.find(".pic .positions").html(data[i].playCount);
		$song.find("p").html(data[i].name);
		$song.appendTo(songList);
	}

}

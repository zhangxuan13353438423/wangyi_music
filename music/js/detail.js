
(function(){
	function getPlaylist(id,callback){
//		var server="json/playlist.json";
		var server="https://api.imjad.cn/cloudmusic/?type=playlist&id=" + id;
		$.ajax({

			url:server,
			success:function(data){
				if(data.code==200)
				callback(data.playlist);
				
			}
		});
	}
	
	var page = getUrlParams();
	
	getPlaylist(page.id,function(data){
		
		var detail=$(".detail");
		var template=$(".m_list").html();
	
        for(var i=0;i<data.tracks.length;i++){
        	var  music=data.tracks[i]; //歌曲列表
        	var $template=$(template);
        	$template.find(".num").html(i+1);
        	$template.find(".music").html(music.name);
        	$template.find(".artist").html(music.ar[0].name);
        	$template.appendTo(detail);
        }
		
	})
	
	
})()




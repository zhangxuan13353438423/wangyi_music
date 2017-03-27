$(function(){
	
	play();
	
})

function play(){
	var aa="true";
	
	$("#play").click(function(){
		var imgsrc=$(this).find("img");
		if(aa){
			
			imgsrc.attr("src","img/playbar_btn_play.png");
			aa="false";
		
		}else{
			
			imgsrc.attr("src","img/playbar_btn_pause.png");
			aa="true";
		}
		
		console.log(aa);
		
	})
	
}

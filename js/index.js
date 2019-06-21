! function () {
    //加载首页数据
    $.ajax({
        url: "http://120.78.64.17:8080/TTMS_bs1.0/in/showmovie",
        type: 'get',
        dataType: 'json',
        success: function (datas) {
            var tbhtml = "";
            for (var i = 0; i < datas.length; i++) {
                tbhtml += "<dd><div class='movie-item'><a href='./html/films.html?movieTitle=" + datas[i].movieTitle + "' target='_blank' data-act='movie-click' data-val='{movieid:" + datas[i].movieId + "}'><div class='movie-poster'><img class='poster-default' src='./images/error.png' alt='加载出错'/><img src='" + datas[i].moviePoster + "' alt='影片封面'/></div></a></div><div class='channel-detail movie-item-title' title=" + datas[i].movieTitle + "><a href='./html/films.html?movieTitle=" + datas[i].movieTitle + "' target='_blank' data-act='movie-click' data-val='{movieId:" + datas[i].movieId + "}'>" + datas[i].movieTitle + "</a></div></dd>"
            }
            $('dl:eq(0)').html(tbhtml);
        }
    });
	//获取当前登陆用户
	$.ajax({
		url:"http://120.78.64.17:8080/TTMS_bs1.0/up/loginuserlog",
		type:"get",
		dataType:"json",
		async: true,
        contentType: 'application/json',
		xhrFields:{
			withCredentials: true
		},
		success: function(data){
			if(data.userState == true){
				var html = "<a href='./html/userCenter.html' title='个人中心'>" + data.userName + "</a>";
				$("#headerLinks").html(html)
			}
		}
	});
}();
var allMoviePlotSimple = "";
var newmoviePlotSimple = "";
//获取到当前的Url地址
	var loc = location.href;
	//地址的总长度
	var n1 = loc.length;
	//取得?号的位置
	var n2 = loc.indexOf("?");
	//获取到url所传递的所有的参数字符
	var data = decodeURI(loc.substr(n2 + 1, n1 - n2));
	//获取到第一个=号的位置
	var n3 = data.indexOf("=");

	var movieTitle = decodeURI(data.substr(n3 + 1, n1 - n3 - 1));
$(function () {
	
	var json = {
		"movieTitle": movieTitle
	};
	$.ajax({
		url: "http://120.78.64.17:8080/TTMS_bs1.0/in/showonemovie",
		type: 'POST',
		data: JSON.stringify(json),
		dataType: 'json',
		async: true,
		contentType: 'application/json',
		success: function (data) {
			if (data.moviePlotSimple.length > 130) {
				newmoviePlotSimple = data.moviePlotSimple.substring(0, 127) + "...(查看更多)";
			} else {
				newmoviePlotSimple = data.moviePlotSimple;
			}
			allMoviePlotSimple = data.moviePlotSimple;
			var tbhtml = "<header><div class='profilePhoto'><img src= '" + data.moviePoster + "' alt='sample'></div><section class='profileHeader'><h1>" + data.movieTitle + "</h1><h3>" + data.movieAlsoKnownAs + "</h3><hr><p id='demo'>" + newmoviePlotSimple + "</p></section></header><hr><div class='detail-more'><p class='newP'><span>创作者 :</span>" + data.movieWriters + "</p><p class='newP'><span>导演 :</span>" + data.movieDirectors + "</p><p class='newP'><span>主演 :</span>" + data.movieActors + "</p><p class='newP'><span>地区 :</span>" + data.movieCountry + "</p><p class='newP'><span>时长 :</span>" + data.movieRuntime + "</p><p class='newP'><span>类型 :</span>" + data.movieGenres + "</p><p class='newP'><span>评分 :</span>" + data.movieRating + "</p></div><hr>";
			$("#details").html(tbhtml);
		},
		error: function () {
		}
	});

});

	$("#logo").click(function () {
		window.location = "../index.html";
	});
	$(document).on('mouseover', "#demo", function () {
		$(this).html(allMoviePlotSimple);
	});

	$(document).on('mouseleave', "#demo", function () {
		$(this).html(newmoviePlotSimple);
	});

	$("#chooseSeat").click(function () {
		chooseSeat();
	});

	function chooseSeat() {
		$("#sessionList").show();
		$("#chooseSeat").hide();
		var json = {
			"movieTitle":movieTitle
		}
		$.ajax({
			url: "http://120.78.64.17:8080/TTMS_bs1.0/in/jingli/selectBymovieTitle",
			type: "POST",
			data: JSON.stringify(json),
			dataType: "json",
			async: true,
			contentType: 'application/json',
			xhrFields:{
				withCredentials: true
			},
			success: function (datas) {
				if(datas.State == true){
					var tbhtml = "";
					for (var i = 0; i < datas.count; i++) {
						tbhtml += "<tr><td><span class='begin-time'>" + toDate(datas.data[i].scheduleStartTime) + "</span> <br/><span class='end-time'>" + toDate(datas.data[i].scheduleEndTime) + "散场</span></td><td><span class='hall'>" + datas.data[i].hallId + "</span></td><td><span class='sell-price'>" + datas.data[i].scheduleTicketPrice + "</span></td><td><a href='./buy.html?playId=" + datas.data[i].scheduleId + "' class='buy-btn normal'>选座购票</a></td></tr>"
					}
					$("tbody:eq(0)").html(tbhtml);
				}
				
			}
		});
	}

	function toDate(number){
		var date = new Date(number);
		var Y = date.getFullYear() + '-';
		var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
		var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
		var h = date.getHours() + ':';
		if(h.length === 2){
			h ="0" + h;
		}	
		var m = date.getMinutes();
		if(m === 0){
			m ="00";
		}
		return (Y + M + D + " " + h + m);
	}
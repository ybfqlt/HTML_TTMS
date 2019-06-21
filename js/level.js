$.ajax({
	url: "http://120.78.64.17:8080/TTMS_bs1.0/up/loginuserlog",
	type: "get",
	dataType: "json",
	async: true,
	contentType: 'application/json',
	xhrFields: {
		withCredentials: true
	},
	success: function (data) {
		if (data.userState != true && (data.userType != 'g' || data.userType != 'j')) {
			$("body").html("<h1>无权查看此页面</h1>")
		}
	}
});

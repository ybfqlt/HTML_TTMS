$.ajax({
	url: "http://120.78.64.17:8080/TTMS_bs1.0/in/person/getperorder",
	type: "get",
	dataType: "json",
	async: true,
	contentType: 'application/json',
	xhrFields: {
		withCredentials: true
	},
	success: function (data) {
		var html = "";
		for (var i = 0; i < data.orderCount; i++) {
			html += "<tr><td>" + data.order[i].id + "</td><td>" + data.order[i].amount + "</td><td>" + toDate(data.order[i].time) + "</td><td>"
			for (var j = 0; j < data.order[i].ticket.count; j++) {
				html += "<button class='button button-highlight button-box button-giant button-longshadow-right button-longshadow-expand' onclick='xadmin.open(&quot票&quot,&quot./ticket.html?id=" + data.order[i].ticket.ticket[j].id + "&quot,495,700)'>" + data.order[i].ticket.ticket[j].id + "</button>";
			}
			html += "</td></tr>";
		}
		$('tbody:eq(0)').html(html);
	},
	error: function () {

	}
});

function toDate(number) {
	var date = new Date(number);
	var Y = date.getFullYear() + '-';
	var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
	var h = date.getHours() + ':';
	if (h.length === 2) {
		h = "0" + h;
	}
	var m = date.getMinutes();
	if (m < 10) {
		m = "0" + m;
	}
	return (Y + M + D + " " + h + m);
}
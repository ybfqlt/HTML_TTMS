//鼠标点击特效
    var txt = "<span class='txt'></span>";
    $('body').append(txt);
    var txted = $(".txt");
    txted.css({
        position: "absolute",
        weight: "bold",
        color: "#ff6651"
    });
    var Animated = function (x) {
        x.stop().animate({
            top: "-=150px",
            opacity: '1'
        }, 750, function () {
            $(this).animate({
                top: "y - 180",
                opacity: "0"
            }, 1500);
        });
    };
    $(document).on("click", function (e) {
        var attr = new Array("富强", "民主", "文明", "和谐", "自由", "平等", "公正", "法治", "爱国", "敬业", "诚信", "友善")
        var mathText = attr[Math.floor(Math.random() * attr.length)];
        //获取鼠标的位置
        var x = e.pageX - 32 + "px";
        var y = e.pageY - 18 + "px";
        txted.text(mathText);
        txted.css({
            "left": x,
            "top": y
        });
        Animated(txted);
    });
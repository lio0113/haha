class goodsList {
    constructor() {
        this.url = "/shuju.json";
        this.id = window.location.href;
        // this.carList = [];
        this.load();
        this.magniFier();
    }
    load() {
        var that = this
        this.d = this.id.split("?")[1];
        ajaxGet(this.url, function (res) {
            that.res = JSON.parse(res)
            // console.log(that.res);
            that.display();
        })
        this.addEvent();
    }

    display() {
        for (var i in this.res) {
            if (this.res[i].goodsId == this.d) {
                this.img = this.res[i].img;
                this.h3 = this.res[i].name;
                this.price = this.res[i].price;
            }
        }
        this.num = $(".number").find("#buyCount").val();
        $(".big-img-box").find("img").attr("src", this.img);
        $(".right-panel").find("h3").html(this.h3);
        $(".right-panel").find("#price").html(this.price)
        $(".rent-price").find("#sumPrice").html("￥" + this.price * this.num)

    }

    addEvent() {
        var that = this

        $(".number").on("click.a", "#btn-right", function () {
            that.nowP = $(".number").find("#buyCount").val();
            $(".number").find("#buyCount").val(parseInt(that.nowP) + 1)
            that.display();
        })
        $(".number").on("click.b", "#btn-left", function () {
            that.nowP = $(".number").find("#buyCount").val();
            if (that.nowP > 1) {
                $(".number").find("#buyCount").val(parseInt(that.nowP) - 1)
                that.display();
            }
        })
        $(".number").on("input.c", ".num", function () {
            $(".number").find("#buyCount").val()
            that.display()
        })

        $(".big-img").hover(function () {
            $(".img-left").css("display", "block")
            $(".img-right").css("display", "block")
            that.magniFier();
        }, function () {
            $(".img-left").css("display", "none")
            $(".img-right").css("display", "none")
        })

        $(".right-panel").on("click.aa", ".add-to-cart-btn", function () {
            that.setLocalStorage();
        })
    }

    magniFier() {
        var that = this
        $('.big-img').mousemove(function (e) {
            var pageX = e.pageX - $(".big-img").offset().left;
            var pageY = e.pageY - $(".big-img").offset().top;
            var eWidth = parseInt($(".img-left").css("width"));
            $(".img-left").css({
                top: pageY - eWidth / 2,
                left: pageX - eWidth / 2
            })
            // console.log(parseInt($(".img-left").css("top")));
            if (parseInt($(".img-left").css("top")) <= 0) {
                $(".img-left").css("top", "0");
            }

            if (parseInt($(".img-left").css("left")) <= 0) {
                $(".img-left").css("left", "0");
            }

            var maxWidth = parseInt($(".big-img").css("width")) -
                parseInt($(".img-left").css("width"));

            var imgLeft = parseInt($(".img-left").css("width"));

            if (parseInt($(".img-left").css("left")) + imgLeft >= parseInt($(".big-img").css("width"))) {
                $(".img-left").css("left", maxWidth);
            }

            if (parseInt($(".img-left").css("top")) + imgLeft >= parseInt($(".big-img").css("height"))) {
                $(".img-left").css("top", maxWidth);
            }

            that.biLi = parseInt($(".img-left").css("top")) / maxWidth;

            that.biLi2 = parseInt($(".img-left").css("left")) / maxWidth;
            that.bImg = parseInt($(".img-right").outerWidth()) -
                parseInt($(".img-right").children("img").outerWidth())

            that.hbImg = parseFloat($(".img-right").outerHeight()) - parseFloat($(".img-right").children("img").outerHeight())
            // console.log(that.bImg, that.hbImg);
            $(".img-right").children("img").css({
                top: that.biLi * that.hbImg,
                left: that.biLi2 * that.bImg
            })
        })
    }

    setLocalStorage() {
        this.carList = localStorage.getItem("carMsg") ? JSON.parse(localStorage.getItem("carMsg")) : [];

        if (this.carList.length < 1) {
            this.carList.push({
                id: this.d,
                num: this.num
            })
        } else {
            var onoff = 0;
            for (var i = 0; i < this.carList.length; i++) {
                if (this.carList[i].id === this.d) {
                    this.carList[i].num = parseInt(this.carList[i].num) + parseInt(this.num)
                    onoff = 1;
                }
            }
            if (onoff == 0) {
                this.carList.push({
                    id: this.d,
                    num: this.num
                })
            }
        }
        localStorage.setItem("carMsg", JSON.stringify(this.carList))
    }

    // localStorage.setItem("carMsg", JSON.stringify(this.carList))

    // console.log(JSON.parse(localStorage.getItem("carMsg")));


}


new goodsList();










































































function ajaxGet(url, cb, data) {
    data = data || {};
    var str = "";
    for (var i in data) {
        str += `${i}=${data[i]}&`;
    }
    var d = new Date();
    url = url + "?" + str + "__qft=" + d.getTime();
    var xhr = new XMLHttpRequest();
    xhr.open("get", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            cb(xhr.responseText)
        }
    }
    xhr.send();
}
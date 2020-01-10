class register {
    constructor() {
        this.user = $(".nav-list").find("li").eq(0).children("input");
        this.pass = $(".nav-list").find("li").eq(2).children("input");
        // console.log(this.user, this.pass);
        // this.user=$(".nav-list")..find("li").eq(4).val();
        this.url = "http://localhost:83/api";
        this.sum = 0;
        this.a = 0;
        this.b = 0;
        this.c = 0;
        this.yanzheng();
    }

    yanzheng() {
        var that = this;

        $("body").on("blur.a", "#user", function () {
            var reg = /^\d{6,12}$/;
            if (!reg.test(this.value)) {
                $(this).parent().next("li").css("opacity", "1");
            } else {
                $(this).parent().next("li").css("opacity", "0");
                that.a = 1;
                console.log(that.a, that.b, that.c);
                // that.addEvent();

            }
        })

        $("body").on("blur.a", "#pass", function () {
            var reg = /^\w{4,12}$/;
            var li = $(this).parent().parent().find("li").eq(4).children("input").val();

            if (this.value != li) {
                if (li != "") {
                    $(this).parent().parent().find("li").eq(5).css("opacity", "1")
                }
            } else {
                $(this).parent().parent().find("li").eq(5).css("opacity", "0")
                that.b = 1;
                // that.addEvent();

            }
            if (!reg.test(this.value)) {
                $(this).parent().next("li").css("opacity", "1")
            } else {
                $(this).parent().next("li").css("opacity", "0");
                that.b = 1;
                // that.addEvent();
            }
            // console.log(that.a, that.b, that.c);

        })

        $("body").on("blur.a", "#pass2", function () {
            var li = $(this).parent().parent().find("li").eq(2).children("input").val()
            if (this.value != li || this.value == "") {
                $(this).parent().next("li").css("opacity", "1")
            } else {
                $(this).parent().next("li").css("opacity", "0");
                that.c = 1;
                console.log(that.a, that.b, that.c);
                // that.addEvent();
            }
            that.addEvent();


        })
        // console.log(this.a, this.b, this.c);

        // this.addEvent();
    }

    addEvent() {
        var that = this;
        this.sum = this.a + this.b + this.c;
        $(".nav-list").on("click", "#submitBtn", function () {
            console.log(that.sum);
            // console.log(this.a, this.b, this.c);
            if (that.sum === 3) {
                that.u = that.user.val();
                that.p = that.pass.val();
                that.setDate();
            }
        })


        $(".mengban").on("click", ".icon", function () {
            if (that.code == 0) {
                $(".mengban").fadeOut()
                setTimeout(() => {
                    location.href = "/shouye.html";
                }, 300);
            } else {
                $(".mengban").fadeOut()
            }
        })

        $(".mengban").on("click", ".ok-btn", function () {
            if (that.code == 0) {
                $(".mengban").fadeOut()
                setTimeout(() => {
                    location.href = "/shouye.html";
                }, 300);
            } else {
                $(".mengban").fadeOut()
            }
        })
    }

    setDate() {
        this.msg = localStorage.getItem("userMsg") ? JSON.parse(localStorage.getItem("userMsg")) : [];
        // console.log(this.sum);

        var b = this.msg.some((val) => {
            return val.user === this.u;
        })
        if (b) {
            this.code = 1;
            this.display();
            console.log(b);
            $(".nav-list").find("input").val("")

        } else {
            console.log(b);

            this.msg.push({
                user: this.u,
                pass: this.p,
                onoff: 0
            })
            localStorage.setItem("userMsg", JSON.stringify(this.msg))

            this.code = 0;
            this.display()
            // setInterval(() => {
            //     location.href = "http://localhost:83/shouye.html"
            // }, 3000);
            $(".nav-list").find("input").val("")
        }
    }


    display() {
        // 1.成功
        // 2.密码失败
        // 3.账号不存在
        // console.log(this.code);
        if (this.code == 1) {
            $(".mengban").fadeIn()
            $("div[class=bounced-text]").html("注册失败，用户名重复")
        } else if (this.code == 0) {
            $(".mengban").fadeIn()
            $("div[class=bounced-text]").html("注册成功")
        }
    }
}



new register();



























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

// addEvent() {
//     var that = this;
//     this.btn.onclick = function () {
//         that.sum = that.a + that.b + that.c
//         console.log(that.sum);
//         if (that.sum == 3) {
//             ajaxGet(that.url, function (res) {
//                 that.res = JSON.parse(res)
//                 that.tip();
//             }, {
//                 user: that.user.value,
//                 pass: that.pass.value,
//                 type: "register"
//             })
//             that.a = that.b = that.c = 0;
//         }
//     }
// }
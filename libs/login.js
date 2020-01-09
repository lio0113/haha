class Login {
    constructor() {
        this.user = document.getElementById("user");
        this.pass = document.getElementById("pass");
        this.btn = document.querySelector(".nav-a");
        this.span = document.querySelector("span");
        this.code = 0;
        this.addEvent();
    }
    addEvent() {
        var that = this;
        this.btn.onclick = function () {
            that.u = that.user.value;
            that.p = that.pass.value;
            that.getData();
        }

        $(".mengban").on("click", ".icon", function () {
            $(".mengban").fadeOut()
            setTimeout(() => {
                location.href = "/shouye.html";
            }, 300);
        })

        $(".mengban").on("click", ".ok-btn", function () {
            $(".mengban").fadeOut()
            setTimeout(() => {
                location.href = "/shouye.html";
            }, 300);
        })


    }
    getData() {
        this.msg = localStorage.getItem("userMsg") ? JSON.parse(localStorage.getItem("userMsg")) : [];

        var b = true;
        for (var i = 0; i < this.msg.length; i++) {
            if (this.msg[i].user === this.u) {
                b = false;
                if (this.msg[i].pass === this.p) {
                    this.code = 1;
                    this.display();


                    this.msg[i].onoff = 1;
                    localStorage.setItem("userMsg", JSON.stringify(this.msg));

                } else {
                    this.code = 2;
                    this.display();
                    this.pass.value = "";
                }
                break;
            }
        }
        if (b) {
            this.code = 0;
            this.display();
            $(".nav-right").find("input").val("")
        }
    }

    display() {
        // 1.成功
        // 2.密码失败
        // 3.账号不存在
        if (this.code == 0) {
            $(".mengban").fadeIn()
            $("div[class=bounced-text]").html("账号不存在")
        } else if (this.code == 1) {
            $(".mengban").fadeIn()
            $("div[class=bounced-text]").html("登录成功")

        } else if (this.code == 2) {
            $(".mengban").fadeIn()
            $("div[class=bounced-text]").html("账号密码错误")
        }
    }
}

new Login();

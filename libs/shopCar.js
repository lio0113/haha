class shopCar {
    constructor() {
        this.url = "/shuju.json";
        this.addEvent();
        this.load();
        // this.display();
    }

    load() {
        var that = this
        ajaxGet(this.url, function (res) {
            that.res = JSON.parse(res)
            that.display();
        })
    }

    display() {
        var str = ""
        // console.log(localStorage.getItem("carMsg"));
        this.carList = localStorage.getItem("carMsg") ? JSON.parse(localStorage.getItem("carMsg")) : [];
        for (var i = 0; i < this.carList.length; i++) {
            for (var j = 0; j < this.res.length; j++) {
                if (this.carList[i].id === this.res[j].goodsId) {
                    str += `
                <div id="" class="product-layer ${this.res[j].goodsId}">
                    <div class="product-detail">
                        <!-- 商品 -->
                        <div class="product-info">
                            <b><input type="checkbox" id="p_cb_${this.carList[i].id}" class="lease-product-cb" checked="checked">
                            </b>
                            <div class="product-box">
                                <div class="pic">
                                    <a target="_blank" class="product-link" href="">
                                        <img src="${this.res[j].img}" title="">
                                    </a>
                                </div>
                                <div class="txt">
                                    <a target="_blank" class="product-link" href="">戴尔(DELL)
                                        Latitude 3490 14英寸笔记本电脑(i3-7020U/4G/128GSSD/核显/Win10 家庭版)</a>
                                    <p class="rent-type" id="">
                                        随租随还
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- 单价（元） -->
                        <div class="lease-product-price">
                            <div class="month-rent-box clearfix">
                                <div class="month-rent-label">
                                    月租金 :
                                </div>
                                <div class="month-rent-list">
                                    <input id="rent_num" value="" type="hidden">
                                    <div class="month-rent-item">
                                        ${this.res[j].price}.00（1-12月）
                                    </div>
                                </div>
                            </div>
                            <div class="month-rent-box1">
                                <div class="month-rent-label">押金 :</div>
                                <div class="month-rent-list">
                                    <div class="month-rent-item" id="">2000.00</div>
                                </div>
                            </div>
                        </div>

                        <div class="product-num ">
                            <div class="number ${this.res[j].goodsId}">
                                <a class="num-reduce">-</a>
                                <a class="num">
                                    <input id="num_" class="ipt-num" type="text" value="${this.carList[i].num}" min="1">
                                </a>
                                <a class="num-add">+</a>
                            </div>
                        </div>

                        <!-- 首付期数 -->
                        <div class="down-pay-month" id="" data_val="1">1</div>

                        <!-- 应付小计（元） -->
                        <div class="lease-product-sum">
                            <p>
                                <span>首付租金 :</span>
                                <i class="pay">${this.res[j].price * this.carList[i].num}.00</i>
                            </p>
                            <p>
                                <span>押金小计 :</span>
                                <i id="deposit_sum">4000.00</i>
                            </p>
                        </div>

                        <!-- 操作 -->
                        <div class="product-handle">
                            <a class="delete">删除</a>
                        </div>
                    </div>
                    <div class="product-rent-info">
                        <div class="product-rent-month"> 本商品租期为<i>36</i>个月，租期结束后设备归还易点租
                        </div>
                    </div>
                    <div class="arrival-time-tips-box">上海仓现货，预计<span class="num">1</span>天内送达</div>
                </div>`
                }
                $(".lease-product").html(str);
            }
        }
        this.pay();
        $("#selected_zl_sum").html($(".leased-goods").find(".product-layer").length);
    }

    addEvent() {
        var that = this;
        // 全选
        this.onoff = 0;
        $(".shopping-cart").on("click", ".product-cb-all", function () {
            if (that.onoff == 0) {
                $(".product-layer").find(".lease-product-cb").prop("checked", true)
                $(".shopping-cart").find(".product-cb-all").prop("checked", true)
                that.onoff = 1
            } else if (that.onoff == 1) {
                $(".product-layer").find(".lease-product-cb").prop("checked", false)
                $(".shopping-cart").find(".product-cb-all").prop("checked", false)
                that.onoff = 0;
            }
        })

        $(".shopping-cart").on("click", "#del_selected", function () {
            that.del_selected();
        })


        $(".shopping-cart").on("click", "#clear_carts", function () {
            that.del_selected();
        })


        // 购物车数量加减   
        $(".lease-product").on("click", ".num-reduce", function () {
            // console.log(this);
            if ($(this).next("a").children("input").val() == 0) {
                $(this).next("a").children("input").val(0)
            } else {
                that.sum = $(this).next("a").children("input").val($(this).next("a").children("input").val() - 1).val()
            }
            that.exchange($(this).next("a"));
        })

        $(".lease-product").on("click", ".num-add", function () {
            // console.log(this);
            that.sum = $(this).prev("a").children("input").val(parseInt($(this).prev("a").children("input").val()) + 1).val()
            that.exchange($(this).prev("a"));
        })

        // 删除购物车
        $(".lease-product").on("click", ".product-handle", function () {
            // console.log();
            that.zhege = $(this);
            that.remove();
            $(this).parent().parent().remove()
        })
    }

    exchange(a) {
        this.carList = localStorage.getItem("carMsg") ? JSON.parse(localStorage.getItem("carMsg")) : [];
        this.dd = a.parent().attr("class").split(" ")[1];
        this.type = $(a.context).attr("class");

        for (var i = 0; i < this.carList.length; i++) {

            if (this.carList[i].id == this.dd) {
                if (this.type == "num-reduce") {
                    this.carList[i].num--
                } else {
                    this.carList[i].num++
                }
            }
        }
        localStorage.setItem("carMsg", JSON.stringify(this.carList))
        this.display();
    }

    pay() {
        var payNum = $(".leased-goods").find(".lease-product-sum").find(".pay")
        this.num1 = 0;
        for (var i = 0; i < payNum.length; i++) {
            this.num1 += parseInt(payNum[i].innerHTML)
        }
        $(".settle-accounts-box").find(".pay-total").html(this.num1)
        $(".pay-rent-total").html(this.num1)
    }

    remove() {
        // console.log(this.zhege);
        this.zhege.id = this.zhege.parent().parent().attr("class").split(" ")[1];
        for (var i in this.carList) {
            if (this.carList[i].id === this.zhege.id) {
                this.carList.splice(i, 1)
            }
        }
        localStorage.setItem("carMsg", JSON.stringify(this.carList))
        this.display();
    }


    del_selected() {
        var checked = $(".leased-goods").find(".lease-product-cb");
        // console.log(checked);

        for (let i = 0; i < checked.length; i++) {
            if ($(checked[i]).prop("checked")) {
                this.delNum = $(checked[i]).attr("id").split("_")[2];
                // var aaaa = $(checked[i]).parent().parent().parent().parent()[0]
                // $(aaaa).remove();
                // console.log($(aaaa).remove());

                // console.log($(checked[i]).parent().parent().parent().parent()[0]);

                for (var j = 0; j < this.carList.length; j++) {
                    if (this.delNum == this.carList[j].id) {
                        this.carList.splice(j, 1)
                    }
                }
            }
        }
        localStorage.setItem("carMsg", JSON.stringify(this.carList));
        this.display();
    }



}

new shopCar()
























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
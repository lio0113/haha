class xuanran {
    constructor() {
        this.floor = document.querySelector(".floor");
        this.url = "/shuju.json";
        this.load();
        this.addEvent();
    }

    load() {
        var that = this
        ajaxGet(this.url, function (res) {
            // console.log(res);
            that.res = JSON.parse(res)
            // console.log(that.res);
            that.display();
        }, {})
    }

    display() {
        var str = ""
        for (var i = 0; i < this.res.length; i++) {
            if (i < 8) {
                str += `
                        <div class="product-item">
                            <a href="http://localhost:83/goods.html?${this.res[i].goodsId}" target="_blank" list-id="${this.res[i].goodsId}">
                                <div class="img-box">
                                    <img alt="" src="${ this.res[i].img}">
                                </div>
                                    <h4 class="desc" title="">${this.res[i].name}</h4>
                                    <p class="price">￥${this.res[i].price}/月</p>
                            </a>
                        </div>`
            }
        }
        str = `<div class="floor-boxl">
                    <a href="##">
                        <img src="https://edzimg.edianzu.com/product/2019/07/2336657d84d31c5e12ad1bac1001d59b.jpg?x-oss-process=style/optimize90" alt="">
                    </a>
                    <a href="##">
                        <img src="https://edzimg.edianzu.com/product/2019/07/2336657d84d31c5e12ad1bac1001d59b.jpg?x-oss-process=style/optimize90" alt="">
                    </a>
                </div>
                <div class="floor-boxr">
                ${str}
                </div>`

        var str1 = ""
        for (var j = 0; j < 5; j++) {
            str1 += `
            <div id="floor-1" class="tit">行政办公</div>
            ${str}
            `
        }
        this.floor.innerHTML = str1
    }


    addEvent() {
        $(".nav-item-box").hover(function () {
            console.log(this);
            $(this).find(".sanji").css("display", "block")
            $(this).css({ background: "#fff", color: "#31a3ff" })
        }, function () {
            $(this).find(".sanji").css("display", "none")
            $(this).css({ background: "#f5f5f5", color: "#333" })
        })
    }
}



new xuanran();








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
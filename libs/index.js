class xuanran {
    constructor() {
        this.floor = document.querySelector(".floor");
        this.floor1 = document.getElementById("floor-1");
        this.floor2 = document.getElementById("floor-2");
        this.floor3 = document.getElementById("floor-3");
        this.floor4 = document.getElementById("floor-4");
        this.floor5 = document.getElementById("floor-5");
        this.floor6 = document.getElementById("floor-6");
        this.url = "/shuju.json";
        this.load();
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
        // console.log(this.res);
        var str = ""
        for (var i = 0; i < this.res.length; i++) {
            str +=
                ` <div class="floor-boxl">
                    <a href="##">
                        <img src="${this.res[i].img}" alt="">
                    </a>
                    <a href="##">
                        <img src="${this.res[i].img}" alt="">
                    </a>
                </div>`
            for (var q = 0; q < 8; q++) {
                str += `
                        <div class="floor-boxr">
                        <div class="product-item">
                            <a href="##" target="_blank">
                                <div class="img-box">
                                    <img alt="" src="${ this.res[q].img}">
                                </div>
                                    <h4 class="desc" title="">${this.res[q].name}</h4>
                                    <p class="price">￥${this.res[q].price}/月</p>
                            </a>
                            </div>
                        </div>`
            }

        }
        var str1 = ""
        for (var j = 0; j < 2; j++) {
            str1 += `
            <div id="floor-1" class="tit">行政办公</div>
            ${str}
            `
        }
        this.floor.innerHTML = str1
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
const base = 'http://localhost:8000';

/* eslint-disable */
export default {
    install: function (Vue, options) {
        //post method
        Vue.prototype.ajax_post = function ajax_post(url, data) {
            let dataString = '';
            if (data != "" && data != undefined) {
                for (let i in data) {
                    dataString += `${i}=${data[i]}&`;
                }
            }
            console.log(`
                myAjax On
                url : ${base + url}
                data : ${dataString}
            `);
            return new Promise((resolve, reject) => {
                var xhr = new XMLHttpRequest();
                xhr.open("POST", base + url, true)
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
                xhr.setRequestHeader("Authorization", "SG_Token " + localStorage.getItem("SG_Token"));
                xhr.onreadystatechange = function () {
                    if (this.readyState === 4) {
                        if (this.status === 200) {
                            resolve(JSON.parse(this.responseText), this)
                        } else {
                            var resJson = { code: this.status, response: this.response }
                            reject(resJson, this)
                        }
                    }
                }
                xhr.send(dataString);
            })
        },
            //get method
            Vue.prototype.ajax_get = function ajax_get(url, data) {
                let dataString = "";
                if (data != "" && data != undefined) {
                    dataString = "?";
                    for (let i in data) {
                        dataString += `${i}=${data[i]}&`;
                    }
                }
                console.log(`
                    myAjax On
                    url : ${base + url}
                    data : ${dataString}
                `);
                return new Promise((resolve, reject) => {
                    var xhr = new XMLHttpRequest()
                    xhr.open("GET", base + url + dataString);
                    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
                    xhr.setRequestHeader("Authorization", "SG_Token "+localStorage.getItem("SG_Token"));
                    xhr.onreadystatechange = function () {
                        if (this.readyState === 4) {
                            if (this.status === 200) {
                                resolve(JSON.parse(this.responseText), this)
                            } else {
                                var resJson = { code: this.status, response: this.response }
                                reject(resJson, this)
                            }
                        }
                    }
                    xhr.send();
                })
            }
    },
}
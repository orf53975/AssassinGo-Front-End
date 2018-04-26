/* eslint-disable */
export default {
    install: function (Vue, options) {
        Vue.prototype.setCookie = function (key, value, time) {
            let date = new Date(new Date().getTime() + (time * 1000));
            document.cookie = `${key}=${value}; expires=${date};`;
        }
        Vue.prototype.unsetCookie = function (key) {
            let UTC = new Date(0);
            document.cookie = `${key}=; expires=${UTC};`;
        },
            Vue.prototype.checkCookie = function (key) {
                let cookies = document.cookie.split(';');
                for (let i = 0; i < cookies.length; i++) {
                    if (cookies[i].split('=')[0].replace(/\s/g, "") == key) {
                        return true;
                    }
                }
                return false;
            },
            Vue.prototype.getCookie = function (key) {
                let cookies = document.cookie.split(';');
                for (let i = 0; i < cookies.length; i++) {
                    if (cookies[i].split('=')[0].replace(/\s/g, "") == key) {
                        return cookies[i].split('=')[1];
                    }
                }
                return false;
            }
    }
}
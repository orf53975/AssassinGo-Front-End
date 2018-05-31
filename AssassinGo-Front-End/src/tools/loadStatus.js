/* eslint-disable */
export default {
    install: function (Vue, options) {
        Vue.prototype.loadStatus = {
            reconBaseAlreadyLoad: false,
            reconTraceRouteAlreadyLoad: false,
            reconSubdomainAlreadyLoad: false,
            attackCrawlerAlreadyLoad: false,
            attackSqliAlreadyLoad: false,
            attackSshAlreadyLoad: false,
            attackXssiAlreadyLoad: false,
            load (part) {
                this[part] = true;
            },
            clear () {
                this.reconBaseAlreadyLoad = false;
                this.reconTraceRouteAlreadyLoad = false;
                this.reconSubdomainAlreadyLoad = false;
                this.attackCrawlerAlreadyLoad = false;
                this.attackSqliAlreadyLoad = false;
                this.attackSshAlreadyLoad = false;
                this.attackXssiAlreadyLoad = false;
            }
        };
    }
}
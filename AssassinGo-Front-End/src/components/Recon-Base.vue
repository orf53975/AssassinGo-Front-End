<template>
    <TabBlock :Tab="Tab" v-show="show" @refresh="refresh">
        <div class="base-top-container">
            <div class="base-probability" title="Honeypot Score">
                <div class="probability-info">Honeypot Score</div>
                <div>{{score}}</div>
                <div class="percent">%</div>
            </div>
            <div>IP: <span>{{ip == "" ? "Unknown" : ip}}</span></div>
            <div class="basic-server">Server: <span>{{server == "" ? "Unknown" : server}}</span></div>
            <div>CMS: <span>{{cms == "" ? "Unknown" : cms}}</span></div>
            <div v-if="server == 'cloudflare'">RealIP: <span>{{realip == "" ? "Unknown" : realip}}</span></div>
        </div>
        <div class="base-main-container">
            <div class="base-whois">
                <div class="base-whois-title">Whois</div>
                <div class="base-whois-main">
                    <div>
                        <div>Domain:</div>
                        <div>{{whois.domain == "" || whois.domain == undefined ? "Unknown" : whois.domain}} </div>
                    </div>
                    <div>
                        <div>Registrar:</div>
                        <div> {{whois.registrar_name == "" || whois.registrar_name == undefined ? "Unknown" : whois.registrar_name}} </div>
                    </div>
                    <div>
                        <div>Admin:</div>
                        <div>{{whois.admin_name == "" || whois.admin_name == undefined ? "Unknown" : whois.admin_name}}</div>
                    </div>
                    <div>
                        <div>Email:</div>
                        <div>{{whois.admin_email == "" || whois.admin_email == undefined ? "Unknown" : whois.admin_email}}</div>
                    </div>
                    <div>
                        <div>Phone:</div>
                        <div>{{whois.admin_phone == "" || whois.admin_phone == undefined ? "Unknown" : whois.admin_phone}}</div>
                    </div>
                    <div>
                        <div>Created Date:</div>
                        <div>{{whois.created_date == "" || whois.created_date == undefined ? "Unknown" : whois.created_date}}</div>
                    </div>
                    <div>
                        <div>Expiration Date:</div>
                        <div>{{whois.expiration_date == "" || whois.expiration_date == undefined ? "Unknown" : whois.expiration_date}}</div>
                    </div>
                    <div>
                        <div>DNS:</div>
                        <div>{{whois.ns == "" || whois.ns == undefined  ? "Unknown" : whois.ns.split(',')[0]}}</div>
                    </div>
                    <div>
                        <div>State:</div>
                        <div>{{whois.state == "" || whois.state == undefined ? "Unknown" :  whois.state}}</div>
                    </div>
                </div>
            </div>
            <div class="security-header-container">
                <div class="security-header-title">Security Header</div>
                <div>
                    <div>Click-Jacking Protection</div>
                    <div v-if="click_jacking_protection == 'Unknown'">{{click_jacking_protection}}</div>
                    <div v-if="click_jacking_protection == true">
                        <i class="fa fa-check fa-lg header-true"></i>
                    </div>
                    <div v-if="click_jacking_protection == false">
                        <i class="fa fa-close fa-lg header-false"></i>
                    </div>
                </div>
                <div>
                    <div>Content-Security-Policy</div>
                    <div v-if="content_security_policy == 'Unknown'">{{content_security_policy}}</div>
                    <div v-if="content_security_policy == true">
                        <i class="fa fa-check fa-lg header-true"></i>
                    </div>
                    <div v-if="content_security_policy == false">
                        <i class="fa fa-close fa-lg header-false"></i>
                    </div>
                </div>
                <div>
                    <div>Strict Transport Security</div>
                    <div v-if="strict_transport_security == 'Unknown'">{{strict_transport_security}}</div>
                    <div v-if="strict_transport_security == true">
                        <i class="fa fa-check fa-lg header-true"></i>
                    </div>
                    <div v-if="strict_transport_security == false">
                        <i class="fa fa-close fa-lg header-false"></i>
                    </div>
                </div>
                <div>
                    <div>X-Content-Type-Options</div>
                    <div v-if="x_content_type_options == 'Unknown'">{{x_content_type_options}}</div>
                    <div v-if="x_content_type_options == true">
                        <i class="fa fa-check fa-lg header-true"></i>
                    </div>
                    <div v-if="x_content_type_options == false">
                        <i class="fa fa-close fa-lg header-false"></i>
                    </div>
                </div>
            </div>
            <div class="base-port-scan">
                <div class="base-port-scan-title">Port Scan</div>
                <div class="base-port-scan-container">
                    <div class="base-port-scan-top">
                        <div>Port</div>
                        <div>Service</div>
                    </div>
                    <div class="base-port-scan-main">
                        <div class="base-port-scan-item" v-if="acceptPorts.length > 0" v-for="port in ports" :key="port.port">
                            <div>{{port.port}}</div>
                            <div>{{port.service}}</div>
                        </div>
                        <div v-else>
                            Unknown
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </TabBlock>
</template>

<script>
import TabBlock from './TabBlock';
export default {
    name: 'Base',
    components: {
        TabBlock,
    },
    data() {
        return {
            show: false,
            Tab: {
                title: 'Recon',
                subtitle: 'base',
                refresh: true,
            },
            ip: "",
            server: "",
            cms: "",
            whois: "",
            realip: "",
            score: 0,
            acceptPorts: [],
            click_jacking_protection: "Unknown",
            content_security_policy: "Unknown",
            strict_transport_security: "Unknown",
            x_content_type_options: "Unknown",
        }
    },
    //计算属性 这里面存放的是数据类似data 但是这里的数据是动态生成的 譬如ports这个数组是根据acceptPorts排序后生成的
    computed: {
        ports () {
            return this.acceptPorts.sort( (a,b) => {
                //根据port端口大小从小到大排列
                return parseInt(a.port) - parseInt(b.port);
            });
        }
    },
    methods: {
        //获取基本信息
        getBasic () {
            const url = '/api/info/basic';
            this.ajax_get(url).then(response => {
                //判断请求成功
                if(response.flag == 1){
                    if(response.data.webserver == "cloudflare") {
                        this.getRealIP();
                    }
                    //请求成功后将返回的ip赋值给这个实例中的ip变量。这样子html中的文字也会发生相应改变。因为在html中我们引用了这个变量。
                    this.ip = response.data.ip;
                    //同上
                    this.server = response.data.webserver;
                    this.click_jacking_protection = response.data.click_jacking_protection;
                    this.content_security_policy = response.data.content_security_policy;
                    this.strict_transport_security = response.data.strict_transport_security;
                    this.x_content_type_options = response.data.x_content_type_options;
                }
            })
        },
        getCms () {
            const url = '/api/info/cms';
            this.ajax_get(url).then(response => {
                if(response.flag == 1){
                    this.cms = response.data.cms;
                }
            });
        },
        getWhoIs () {
            const url = '/api/info/whois';
            this.ajax_get(url).then(response => {
                if(response.flag == 1) {
                    this.whois = response.data;
                }
            })
        },
        getHoneyPot () {
            const url = '/api/info/honeypot';
            this.ajax_get(url).then(response => {
                if(response.flag == 1){
                    this.score = Math.round(parseFloat(response.data.score) * 100);
                }
            })
        },
        //ws获取端口信息
        getPortStatus () {
            const url = '/info/port';
            const  msg = {
                method: "tcp",
            };
            this.acceptPorts = [];
            this.ws(url, msg, this.addPortStatus);
        },
        //回调函数 当ws发来端口信息时的处理函数
        addPortStatus (data) {
            //acceptPorts是存放接受数据的数组，实际展示的时候需要用排序之后的数组。
            this.acceptPorts.push(data);
        },
        getRealIP () {
            const url = '/api/info/bypasscf';
            const data = {

            };
            this.ajax_get(url, data).then(response => {
                if(response.flag == 1){
                    this.realip = response.data.real_ip;
                }
            })
        },
        refresh (msg) {
            if(msg === true) {
                this.ip = "";
                this.server = "";
                this.cms = "";
                this.whois = "";
                this.realip = "";
                this.score = 0;
                this.acceptPorts = [];
                this.click_jacking_protection = "Unknown";
                this.content_security_policy = "Unknown";
                this.strict_transport_security = "Unknown";
                this.x_content_type_options = "Unknown";
                this.alreadyLoad = false;
                this.getBasic();
                this.getCms();
                this.getWhoIs();
                this.getHoneyPot();
                this.getPortStatus();
                this.alreadyLoad = true;
            }
        },
    },
    watch: {
        show () {
            if(this.show == true && this.loadStatus.reconBaseAlreadyLoad != true) {
                this.getBasic();
                this.getCms();
                this.getWhoIs();
                this.getHoneyPot();
                this.getPortStatus();
                this.loadStatus.load('reconBaseAlreadyLoad');
            }
        },
    },
    // created () {
    //     if(this.ip != "" && this.ip != undefined) {
    //         console.log(this.ip);
    //     }
    //     else {
    //         console.log("ajax");
    //         this.getBasic();
    //         this.getCms();
    //         this.getWhoIs();
    //         this.getHoneyPot();
    //         this.getPortStatus();
    //     }
    // }
}
</script>

<style scoped>

.base-top-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 10px
}
.base-top-container > div {
    height: 100px;
    width: 25%;
    line-height: 100px;
    white-space: nowrap;
}
/* .basic-server {
    width: 400px !important;
} */
.base-top-container > div > span {
    color: #e56845;
}
.base-probability {
    height: 80px;
    width: 80px;
    background: #e56845;
    color: white;
    font-size: 30px;
    font-weight: lighter;
    display: flex;
    justify-content: center;
    align-items: center;
}
.percent {
    margin-left: 2px;
    color: white;
    font-size: 14px !important;
    position: relative;
    bottom: -4px;
}
.base-top-container-bottom {
    height: 25px;
    width: 100%;
    box-sizing: border-box;
    padding: 0 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.base-main-container {
    height: 362px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 40px;
}
.base-whois {
    width: 34%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}
.base-whois-title,
.base-port-scan-title {
    font-size: 36px;
    height: 50px;
    width: 100%;
}
.base-whois-main {
    width: 100%;
    flex-grow: 1;
    box-sizing: border-box;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    overflow: auto;
}
.base-whois-main > div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.base-whois-main > div > div:first-of-type {
    text-align: left;
}
.base-whois-main > div > div:last-of-type {
    color: #e56845;
    text-align: right;
}
.base-port-scan {
    width: 33%;
    height: 100%;
    display: flex;
    overflow: hidden;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}
.base-port-scan-container {
    width: 100%;
    height: 313px;
    box-sizing: border-box;
    padding-top: 40px;
    position: relative;
}
.base-port-scan-top {
    width: 100%;
    height: 40px;
    box-sizing: border-box;
    padding: 0 20px 0 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    border-bottom: 2px solid gray;
}
.base-port-scan-top > div {
    height: 100%;
    width: 170px;
    box-sizing: border-box;
    line-height: 40px;
    font-weight: bold;
}
/* .base-port-scan-top > div:last-of-type {
    flex-grow: 1;
    box-sizing: border-box;
    padding-left: 15px;
    text-align: left;
} */
.base-port-scan-main {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    padding: 0 20px 0 0;
    border-top: none;
    overflow: auto;
}
.base-port-scan-item {
    height: 40px;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.base-port-scan-item:nth-child(2n) {
    background: rgb(220, 220, 220);
    color: #e56845;
}
.base-port-scan-item > div {
    height: 40px;
    line-height: 40px;
    text-align: center;
    width: 170px;
}
/* .base-port-scan-item > div:last-of-type {
    flex-grow: 1;
    box-sizing: border-box;
    padding-left: 15px;
    text-align: left;
} */
.probability-info {
    font-size: 20px !important;
    margin-right: 10px;
    font-weight: normal;
}
.security-header-container {
    height: 100%;
    width: 33%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    box-sizing: border-box;
    padding: 0px 20px 0px 20px;
}
.security-header-container > div {
    height: 40px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.security-header-container > div > div:last-of-type {
    color: #e56845;
}
.security-header-title {
    height: 50px !important;
    width: 100% !important;
    font-size: 36px !important;
    justify-content: center !important;
}
.header-true {
    color: rgb(34, 112, 34);
}
.header-false {
    color: rgb(184, 49, 49);
}
</style>
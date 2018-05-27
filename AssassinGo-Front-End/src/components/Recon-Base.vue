<template>
    <TabBlock :Tab="Tab" v-show="show">
        <div class="base-top-container">
            <div class="base-probability" title="蜜罐指数">
                <div class="probability-info">蜜罐指数</div>
                <div>{{score}}</div>
                <div class="percent">%</div>
            </div>
            <div>ip: <span>{{ip}}</span></div>
            <div>server: <span>{{server}}</span></div>
            <div>cms: <span>{{cms}}</span></div>
        </div>
        <div class="base-main-container">
            <div class="base-whois">
                <div class="base-whois-title">Whois</div>
                <div class="base-whois-main">
                    <div>
                        <div>域名:</div>
                        <div>{{whois == "" ? "" : whois.domain}} </div>
                    </div>
                    <div>
                        <div>注册商:</div>
                        <div> {{whois == "" ? "" : whois.registrar_name}} </div>
                    </div>
                    <div>
                        <div>联系人:</div>
                        <div>{{whois == "" ? "" : whois.admin_name}}</div>
                    </div>
                    <div>
                        <div>联系邮箱:</div>
                        <div>{{whois == "" ? "" : whois.admin_email}}</div>
                    </div>
                    <div>
                        <div>联系电话:</div>
                        <div>{{whois == "" ? "" : whois.admin_phone}}</div>
                    </div>
                    <div>
                        <div>创建时间:</div>
                        <div>{{whois == "" ? "" : whois.created_date}}</div>
                    </div>
                    <div>
                        <div>过期时间:</div>
                        <div>{{whois == "" ? "" : whois.expiration_date}}</div>
                    </div>
                    <div>
                        <div>DNS:</div>
                        <div>{{whois == "" ? "" : whois.ns.split(',')[0]}}</div>
                    </div>
                    <div>
                        <div>状态:</div>
                        <div>{{whois == "" ? "" :  whois.state}}</div>
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
                        <div class="base-port-scan-item" v-for="port in ports" :key="port.port">
                            <div>{{port.port}}</div>
                            <div>{{port.service}}</div>
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
            show: true,
            Tab: {
                title: 'Recon',
                subtitle: 'base',
            },
            ip: "",
            server: "",
            cms: "",
            whois: "",
            score: 0,
            acceptPorts: [],
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
                    //请求成功后将返回的ip赋值给这个实例中的ip变量。这样子html中的文字也会发生相应改变。因为在html中我们引用了这个变量。
                    this.ip = response.data.ip;
                    //同上
                    this.server = response.data.webserver;
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
    },
    created () {
        //created表示vue渲染的一个阶段，这个是比较早的阶段，建议在这个一开始的阶段就发出请求，减少等待。总之AJAX写在created里面就好了。
        this.getBasic();
        this.getCms();
        this.getWhoIs();
        this.getHoneyPot();
        this.getPortStatus();
    }
}
</script>

<style scoped>

.base-top-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 10px;
}
.base-top-container > div {
    height: 100px;
    width: 300px;
    line-height: 100px;
}
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
    width: 400px;
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
.base-whois-main > div > div:last-of-type {
    color: #e56845;
}
.base-port-scan {
    flex-grow: 1;
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
}
.base-port-scan-top > div {
    height: 100%;
    box-sizing: border-box;
    line-height: 40px;
    width: 80px;
    border: 1px solid gray;
    border-right: none;
}
.base-port-scan-top > div:last-of-type {
    flex-grow: 1;
    box-sizing: border-box;
    padding-left: 15px;
    text-align: left;
    border-right: 1px solid gray;
}
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
    background: rgb(221, 220, 220);
    color: #e56845;
}
.base-port-scan-item > div {
    height: 40px;
    line-height: 40px;
    text-align: center;
    width: 80px;
}
.base-port-scan-item > div:last-of-type {
    flex-grow: 1;
    box-sizing: border-box;
    padding-left: 15px;
    text-align: left;
}
.probability-info {
    font-size: 20px !important;
    margin-right: 10px;
}
</style>
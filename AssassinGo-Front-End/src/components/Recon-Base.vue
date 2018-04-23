<template>
    <TabBlock :Tab="Tab" v-show="show">
        <div class="base-top-container">
            <div class="base-probability">
                <div>70</div>
                <div class="percent">%</div>
            </div>
            <div>ip: {{ip}}</div>
            <div>server: {{server}}</div>
            <div>cms: vue</div>
        </div>
        <div class="base-top-container-bottom">
            <div class="cross-line"></div>
        </div>
        <div class="base-main-container">
            <div class="base-whois">
                <div class="base-whois-title">Whois</div>
                <div class="base-whois-main">
                    <div>
                        <div>域名:</div>
                        <div> example.com</div>
                    </div>
                    <div>
                        <div>注册商:</div>
                        <div>example, Inc</div>
                    </div>
                    <div>
                        <div>联系人:</div>
                        <div>Example</div>
                    </div>
                    <div>
                        <div>联系邮箱:</div>
                        <div>example@example.com</div>
                    </div>
                    <div>
                        <div>联系电话:</div>
                        <div>12345678909</div>
                    </div>
                    <div>
                        <div>创建时间:</div>
                        <div>2018年4月15日</div>
                    </div>
                    <div>
                        <div>过期时间:</div>
                        <div>2019年4月15日</div>
                    </div>
                    <div>
                        <div>公司:</div>
                        <div>Example, Co. Ltd</div>
                    </div>
                    <div>
                        <div>DNS:</div>
                        <div>DNS.EXAMPLE.COM</div>
                    </div>
                    <div>
                        <div>状态:</div>
                        <div>客户端禁止转移。</div>
                    </div>
                </div>
            </div>
            <div class="base-port-scan">
                <div class="base-port-scan-title">Port Scan</div>
                <div class="base-port-scan-container">
                    <div class="base-port-scan-top">
                        <div>Port</div>
                        <div>Server</div>
                    </div>
                    <div class="base-port-scan-main">
                        <div class="base-port-scan-item" v-for="i in 10" :key="i">
                            <div>0{{i}}</div>
                            <div>0{{i}}</div>
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
        }
    },
    methods: {
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
        }
    },
    created () {
        //created表示vue渲染的一个阶段，这个是比较早的阶段，建议在这个一开始的阶段就发出请求，减少等待。总之AJAX写在created里面就好了。
        this.getBasic();
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
.base-probability {
    height: 80px;
    width: 80px;
    border-radius: 50%;
    background: black;
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
</style>
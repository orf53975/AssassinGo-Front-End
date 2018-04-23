<template>
    <div class="home-container">
        <div class="home-main-body">
            <div class="home-head-name">
                {{ NAME }}
            </div>
            <div class="warning" v-show="warningStatus">{{warningText}}</div>
            <div class="home-input-group">
                <input type="text" class="home-input" autofocus v-model="targetURL">
                <div class="submit-button" @click="setTarget">Set Target</div>
            </div>
            <div class="home-head-name" style="visibility: hidden">
                AssassinGo
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            //title name
            NAME: 'AssassinGo',
            //用于存放target的变量
            targetURL: "",
            //提示文本显示/隐藏变量
            warningStatus: false,
            //提示文本内容变量
            warningText: ""
        }
    },
    //methods对象 用于存放这个vue文件的所有方法
    methods: {
        /*
         * 设置目标地址函数
         * 用@click绑定鼠标点击事件在Set Target DIV上
        */
        setTarget () {
            //获取data变量时要在之前加this.
            if(this.targetURL != "") {
                //验证通过取消提示
                this.warningStatus = false;

                //定义Ajax相关常数
                // const 是ES6的语法 用于定义不变的变量 但是定的对象里面的属性是可以改变的
                const url = '/api/assassin';
                const data = {
                    target: this.targetURL
                };

                //this.ajax_post()是我封装好的ajax POST方法 具体定义可以看tools/ajax.js
                //then表示请求成功后的执行的操作 response表示请求成功后返回的json
                this.ajax_post(url, data).then(response => {
                    //如果请求成功
                    if(response.flag == 1) {
                        //$router为全局的路由，将/recon压进全局路由进行跳转
                        this.$router.push({
                            path: '/recon',
                        });
                    }
                }).catch(error => console.log(error));
            }
            else {
                //设置警告文本
                this.warningText = "目标地址不能为空";
                //设置警告文本状态为显示
                this.warningStatus = true;
            }
        },
    },
    mounted () {

    }
}
</script>

<style scoped>
.warning {
    font-size: 10px;
    color: brown;
}
.home-container {
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
}
.home-head-name {
    font-size: 44px;
    color: black;
}
.home-input {
    height: 50px;
    width: 500px;
    font-size: 18px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    box-sizing: border-box;
    padding-left: 10px;
    border: 1px solid gray;
}
.home-input:focus {
    outline: none;
    border: 1px solid gray;
}
.home-input-group {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px;
}
.submit-button {
    height: 50px;
    width: 90px;
    box-sizing: border-box;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    line-height: 50px;
    text-align: center;
    border: 1px solid gray;
    border-left: none;
    cursor: pointer;
    transition:  all .5s linear;
}
.submit-button:hover {
    background: black;
    color: white;
}
</style>
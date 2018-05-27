<template>
    <div class="container">
        <div class="main-login-container">
            <div class="login-aside">
                <img src="../../static/images/aside.jpg">
            </div>
            <div class="login-container">
                <h1>AssassinGo Login</h1>
                <input type="text" placeholder="用户名" v-model="username">
                <input type="password" placeholder="密码" v-model="password" @keyup.enter="getToken">
                <div class="submit" @click="getToken">登录</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                username: "",
                password: "",
            }
        },
        methods: {
            /*
            * 获取合法TOKEN，储存在本地供AJAX认证
            */
            getToken () {
                const url = '/token';
                const data = {
                    username: this.username,
                    password: this.password,
                };
                this.ajax_post(url, data).then(response => {
                    if(response.flag == 1){
                        sessionStorage.setItem("SG_Token", response.data.SG_Token);
                        this.$router.push({
                            path: '/home'
                        });
                    }
                    else {
                        alert(response.msg);
                    }
                })
            }
        },
        created () {
            this.$emit("menu", "login");
        }
    }
</script>

<style scoped>
.container {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.main-login-container {
    height: 400px;
    width: 600px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.login-aside {
    height: 100%;
    width: 200px;
    overflow: hidden;
}
.login-aside > img {
    height: 100%;
    width: auto;
}
.login-container {
    height: 100%;
    width: 300px;
    background: white;
    border-radius: 5px;
    box-shadow: 1px 1px 4px gray;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}
.login-container > input {
    height: 30px;
    width: 200px;
    border-radius: 3px;
    border: 1px solid black;
    box-shadow: none;
}
.login-container > input:focus {
    outline: none;
    border: 1px solid black;
}
.submit {
    height: 40px;
    width: 100px;
    border-radius: 3px;
    line-height: 40px;
    text-align: center;
    background: #e56845;
    color: white;
}
</style>
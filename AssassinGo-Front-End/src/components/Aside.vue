<template>
    <div class="aside-container" v-if="menu != 'login'">
        <div class="aside">
            <div class="aside-head-container">
                <div class="aside-head-icon" @click="jump2Login">
                    <img src="../../static/images/logo.jpg">
                </div>
                <div class="aside-head-name">
                    Assassin<span>Go</span>
                </div>
            </div>
            <div class="aside-icon-group">
                <router-link tag="div" class="aside-icon-item" to="/home">
                    <div class="aside-icon-svg" v-if="menu == 'home'">
                        <img src="../../static/icons/home2.svg">
                    </div>
                    <div class="aside-icon-svg" v-else>
                        <img src="../../static/icons/home.svg">
                    </div>
                    <div class="aside-icon-name">Home</div>
                </router-link>
                <router-link tag="div" class="aside-icon-item" to="/recon">
                    <div class="aside-icon-svg" v-if="menu == 'recon'">
                        <img src="../../static/icons/eyes2.svg">
                    </div>
                    <div class="aside-icon-svg" v-else>
                        <img src="../../static/icons/eyes.svg">
                    </div>
                    <div class="aside-icon-name">Recon</div>
                </router-link>
                <router-link tag="div" class="aside-icon-item" to="/attack">
                    <div class="aside-icon-svg" v-if="menu == 'attack'">
                        <img src="../../static/icons/sword2.svg">
                    </div>
                    <div class="aside-icon-svg" v-else>
                        <img src="../../static/icons/sword.svg">
                    </div>
                    <div class="aside-icon-name">Attack</div>
                </router-link>
                <router-link tag="div" class="aside-icon-item" to="/assassinate">
                    <div class="aside-icon-svg" v-if="menu == 'assassinate'">
                        <img src="../../static/icons/ghost2.svg">
                    </div>
                    <div class="aside-icon-svg" v-else>
                        <img src="../../static/icons/ghost.svg">
                    </div>
                    <div class="aside-icon-name">Assassinate</div>
                </router-link>
                <router-link tag="div" class="aside-icon-item" to="/seek">
                    <div class="aside-icon-svg" v-if="menu == 'seek'">
                        <img src="../../static/icons/search2.svg">
                    </div>
                    <div class="aside-icon-svg" v-else>
                        <img src="../../static/icons/search.svg">
                    </div>
                    <div class="aside-icon-name">Seek</div>
                </router-link>
                <!-- <div class="aside-icon-item">
                    <div class="aside-icon-svg">
                        <img src="../../static/icons/contact.svg">
                    </div>
                    <div class="aside-icon-name">Contact</div>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            menu: String,
        },
        data() {
            return {
            }
        },
        methods: {
            jump2Login () {
                this.$router.push({
                    path: "/login",
                })
            }
        },
        created () {

        }
    }
</script>

<style scoped>
.aside-container {
    height: 100%;
    width: 120px;
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
    background: white;
    box-shadow: -1px 0 3px gray;
    box-sizing: border-box;
    padding: 40px 0;
    z-index: 100;
}
.aside-head-container {
    width: 100%;
}
.aside-head-icon {
    height: 120px;
    width: 120px;
    overflow: hidden;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}
.aside-head-icon > img {
    height: 120%;
    width: 120%;
}
img {
    height: 100%;
    width: 100%;
}
.aside-head-name {
    width: 100%;
    color: black;
    text-align: center;
    font-size: 20px;
    font-weight: normal;
    word-wrap: break-word;
    margin: 10px 0;
}
.aside-head-name > span {
    color: #e56845;
}
.aside-icon-group {
    width: 100%;
}
.aside-icon-item {
    height: 80px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 10px 0;
    cursor: pointer;
    box-sizing: border-box;
}
.aside-icon-item:hover {
    background-color: rgb(245, 245, 245);
    border-right: 3px solid #e56845;
}
.aside-icon-svg {
    height: 40px;
    width: 40px;
    overflow: hidden;
}
.aside-icon-svg > i {
    line-height: 50px;
    width: 50px;
}
</style>
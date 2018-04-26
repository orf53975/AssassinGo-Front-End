<template>
    <div class="aside-container">
        <div class="aside">
            <div class="aside-head-container">
                <div class="aside-head-icon">
                    <img src="../../static/images/logo.jpg">
                </div>
                <div class="aside-head-name">
                    AssassinGo
                </div>
            </div>
            <div class="aside-icon-group">
                <router-link tag="div" class="aside-icon-item" to="/home">
                    <div class="aside-icon-svg">
                        <img src="../../static/icons/home.svg">
                    </div>
                    <div class="aside-icon-name">Home</div>
                </router-link>
                <router-link tag="div" class="aside-icon-item" to="/recon" :style="{'cursor': cursor}">
                    <div class="aside-icon-svg">
                        <img src="../../static/icons/eyes.svg">
                    </div>
                    <div class="aside-icon-name">Recon</div>
                </router-link>
                <router-link tag="div" class="aside-icon-item" to="/attack"  :style="{'cursor': cursor}">
                    <div class="aside-icon-svg">
                        <img src="../../static/icons/sword.svg">
                    </div>
                    <div class="aside-icon-name">Attack</div>
                </router-link>
                <router-link tag="div" class="aside-icon-item" to="/seek"  :style="{'cursor': cursor}">
                    <div class="aside-icon-svg">
                        <img src="../../static/icons/search.svg">
                    </div>
                    <div class="aside-icon-name">Seek</div>
                </router-link>
                <div class="aside-icon-item">
                    <div class="aside-icon-svg">
                        <img src="../../static/icons/ghost.svg">
                    </div>
                    <div class="aside-icon-name">Assassinate</div>
                </div>
                <div class="aside-icon-item">
                    <div class="aside-icon-svg">
                        <img src="../../static/icons/contact.svg">
                    </div>
                    <div class="aside-icon-name">Contact</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                target: sessionStorage.getItem("target"),
            }
        },
        computed: {
            cursor () {
                return this.target == undefined ? "not-allowed" : "";
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
    height: 80px;
    width: 100%;
    box-sizing: border-box;
    padding: 0 20px;
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
}
.aside-icon-item:hover {
    background-color: rgb(245, 245, 245);
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
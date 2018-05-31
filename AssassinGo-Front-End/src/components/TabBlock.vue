<template>
<div class="base-container">
        <div class="base-title">
            {{Tab.title}}
            <div class="refresh" v-if="Tab.refresh === true">
                <i class="fa fa-refresh fa-lg" @click="doRefresh"></i>
            </div>
        </div>
        <div class="base-subtitle-container">
            <div class="cross-line"></div>
            <div class="base-subtitle">{{Tab.subtitle}}</div>
        </div>
        <slot></slot>
</div>
</template>

<script>
    export default {
        props: {
            Tab: [Object],
        },
        data() {
            return {

            }
        },
        methods: {
            doRefresh () {
                this.$emit("refresh", true);
            }
        },
    }
</script>

<style scoped>
@keyframes refresh {
    0% {
        transform: rotateZ(0deg);
    }
    100% {
        transform: rotateZ(360deg);
    }
}
.base-container {
    height: 700px;
    width: 1200px;
    border-radius: 2px;
    box-shadow: 0 0 40px rgb(220, 220, 220);
    background: white;
    /* transform: translate3d(0, 0, 0); */
    /* animation: slip 1s cubic-bezier(.23,.97,1,1.11); */
}
.base-title {
    text-align: center;
    font-size: 50px;
    position: relative;
}
.base-subtitle-container {
    width: 100%;
    height: 25px;
    box-sizing: border-box;
    padding: 0 20px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}
.cross-line {
    height: 2px;
    width: 100%;
    background: #000000;
}
.base-subtitle {
    font-style: italic;
    font-size: 18px;
    position: absolute;
    background: white;
    padding: 0 10px;
    color: #e56845;
}
.refresh {
    font-size: 14px;
    position: absolute;
    right: 20px;
    top: 0;
    height: 100%;
    width: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
.refresh > i:hover {
    animation: refresh 2s infinite; 
}
</style>
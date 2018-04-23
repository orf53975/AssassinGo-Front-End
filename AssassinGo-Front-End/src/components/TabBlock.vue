<template>
<div class="base-container">
        <div class="base-title">{{Tab.title}}</div>
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
        }
    }
</script>

<style scoped>
.base-container {
    height: 600px;
    width: 1000px;
    border-radius: 2px;
    box-shadow: 0 0 3px rgb(0, 0, 0);
    transform: translate3d(0, 0, 0);
    animation: slip 1s cubic-bezier(.23,.97,1,1.11);
}
.base-title {
    font-size: 50px;
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
    background: black;
}
.base-subtitle {
    font-style: italic;
    font-size: 18px;
    position: absolute;
    background: white;
    padding: 0 10px;
}
</style>
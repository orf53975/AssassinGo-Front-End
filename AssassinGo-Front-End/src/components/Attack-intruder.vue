<template>
    <TabBlock :Tab="Tab" v-show="show">
        <div class="inturder-container">
            <div class="inturder-result">
                <div class="inturder-result-top-container">
                    <div>id</div>
                    <div class="inturder-result-top-payload">payload</div>
                    <div>status</div>
                    <div>length</div>
                </div>
                <div class="inturder-result-main">
                    <div class="inturder-result-item" v-for="i in 15" :key="i">
                        <div>{{i}}</div>
                        <div class="inturder-result-top-payload">{{i}}</div>
                        <div>{{i}}</div>
                        <div>{{i}}</div>
                    </div>
                </div>
            </div>
            <div class="inturder-header">
                <textarea name="" id="header" class="inturder-header-textarea" placeholder="HTTP Header"></textarea>
                <div class="inturder-header-set">
                    <input type="text" placeholder="Add">
                    <input type="text" placeholder="GoOutTimes">
                    <input type="text" placeholder="TimeOut">
                </div>
                <div class="inturder-header-button-group">
                    <div class="inturder-header-button">
                        Do
                    </div>
                    <div class="inturder-header-button">
                        Stop
                    </div>
                    <div class="line"></div>
                    <div class="inturder-header-button">
                        Set
                    </div>
                    <div class="inturder-header-button">
                        Origin
                    </div>
                </div>
            </div>
        </div>
    </TabBlock>
</template>

<script>
import TabBlock from './TabBlock'
export default {
    name: 'inturder',
    components: {
        TabBlock,
    },
    data () {
        return {
            show: true,
            Tab: {
                title: 'Attack',
                subtitle: 'intruder',
            }
        }
    },
    mounted () {
        let textarea = document.getElementById('header');
        textarea.addEventListener("mouseup", function() {
            let text = window.getSelection();
            if(text.toString().length > 1) {
                console.log(text.toString());
            }
        })
    }
    
}
</script>

<style scoped>
.inturder-container {
    width: 100%;
    height: 607px;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.inturder-result {
    height: 100%;
    width: 600px;
    box-sizing: border-box;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}
.inturder-result-top-container {
    height: 40px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    box-shadow: 0 0 5px gray;
    margin-bottom: 5px;
}
.inturder-result-top-payload {
    flex-grow: 1 !important;
}
.inturder-result-top-container > div,
.inturder-result-item > div {
    height: 100%;
    width: 80px;
    line-height: 40px;
    text-align: center;
}
.inturder-result-main {
    height: 467px;
    width: 100%;
    overflow: auto;
}
/* .inturder-result-main::-webkit-scrollbar {
    width: 10px;
    height: 10px;
} */
.inturder-result-item {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
}
.inturder-result-item:nth-of-type(2n-1) {
    background: gray;
}
.inturder-header {
    height: 100%;
    flex-grow: 1;
    box-sizing: border-box;
    padding: 0 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}
.inturder-header-textarea {
    height: 350px;
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    border: 1px solid gray;
    border-radius: 2px;
    font-size: 16px;
}
.inturder-header-set {
    width: 100%;
    height: 80px;
    display: flex;
    /* flex-direction: column; */
    justify-content: space-around;
    align-items: center;
}
.inturder-header-set > input {
    width: 30%;
    height: 40px;
    margin: 5px;
    box-sizing: border-box;
    padding: 0 10px;
    border: 1px solid gray;
} 
.inturder-header-set > input:focus {
    outline: none;
    border: 1px solid gray;
}
.inturder-header-textarea:focus {
    outline: none;
    border: 1px solid gray;
}
.inturder-header-button-group {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
}
.inturder-header-button-group > .line {
    height: 40px;
    width: 2px;
    background: gray;
    margin: 0 15px;
}
.inturder-header-button {
    height: 40px;
    line-height: 40px;
    text-align: center;
    width: 80px;
    border-radius: 2px;
    background: rgb(56, 175, 155);
    color: white;
    margin: 0 10px;
}
</style>
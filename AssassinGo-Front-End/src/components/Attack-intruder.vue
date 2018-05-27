<template>
    <TabBlock :Tab="Tab" v-show="show">
        <div class="inturder-container">
            <div class="inturder-result">
                <div class="inturder-result-top-container">
                    <!-- <div>id</div> -->
                    <div class="inturder-result-top-payload">payload</div>
                    <div>status</div>
                    <div>length</div>
                </div>
                <div class="inturder-result-main">
                    <div class="inturder-result-item" v-for="result in inturderResult" :key="result.payload">
                        <!-- <div>{{i}}</div> -->
                        <div class="inturder-result-top-payload">{{result.payload}}</div>
                        <div>{{result.resp_status}}</div>
                        <div>{{result.resp_len}}</div>
                    </div>
                </div>
            </div>
            <div class="inturder-header">
                <textarea name="" id="header" class="inturder-header-textarea" placeholder="HTTP Header" v-model="header"></textarea>
                <div class="inturder-header-set">
                    <input type="text" placeholder="Add Payload use , to separate" v-model="payload">
                    <input type="text" placeholder="GoOutTimes" v-model="GoOutTimes">
                    <!-- <input type="text" placeholder="TimeOut" v-model="TimeOut"> -->
                </div>
                <div class="inturder-header-button-group">
                    <div class="inturder-header-button" @click="doInturder">
                        Do
                    </div>
                    <div class="inturder-header-button" @click="stopInturder">
                        Stop
                    </div>
                    <!-- <div class="line"></div>
                    <div class="inturder-header-button">
                        Set
                    </div>
                    <div class="inturder-header-button">
                        Origin
                    </div> -->
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
            },
            header: "",
            payload: "",
            GoOutTimes: "",
            TimeOut: "",
            inturderResult: [],
            selectSting: "",
            selectStart: 0,
            selectEnd: 0,
            thisws: "",
        }
    },
    methods: {
        doInturder() {
            const url = '/attack/intrude';
            const msg = {
                header: this.header.replace(/\n/g,"\n"),
                payload: this.payload.replace(/,/g,'\n'),
                concurrency: parseInt(this.GoOutTimes)
            };
            this.inturderResult = [];
            // console.log(msg);
            this.thisws = this.ws(url, msg, this.showInturder);
        },
        showInturder (data) {
            this.inturderResult.push(data);
        },
        stopInturder () {
            const msg = {
                stop: 1
            }
            this.thisws.send(JSON.stringify(msg));
        }
    },
    mounted () {
        let textarea = document.getElementById('header');
        textarea.addEventListener("mouseup", () => {
            //取消选中的时候还会再获取一次选中内容，因为取消选中的事件在mouseup之后，所以用一下异步。
            setTimeout( () => {
                let text = window.getSelection();
                let regExp = /^\$\$(.*?)\$\$$/;
                let mode = (regExp.test(text.toString()));
                if(text.toString().length >= 1) {
                    if(mode === true) {
                        let temp = this.header.split('');
                        console.log(`
                        start: ${textarea.selectionStart}
                        end: ${textarea.selectionEnd}
                        before: ${temp}
                        replaceString: ${(regExp.exec(text.toString()))[1]}
                        `);
                        console.log(regExp.exec(text.toString()));
                        temp.splice(textarea.selectionStart, textarea.selectionEnd - textarea.selectionStart, (regExp.exec(text.toString()))[1]);
                        console.log(temp);
                        this.header = temp.join('');
                    }
                    else {
                        let temp = this.header.split('');
                        console.log(`
                        start: ${textarea.selectionStart}
                        end: ${textarea.selectionEnd}
                        before: ${temp}
                        replaceString: ${"$$"+text.toString()+"$$"}
                        `);
                        temp.splice(textarea.selectionStart, textarea.selectionEnd - textarea.selectionStart, "$$"+text.toString()+"$$");
                        console.log(temp);
                        this.header = temp.join('');
                    }
                }
            }, 0);
        });
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
    height: 450px;
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
    justify-content: center;
    align-items: center;
}
.inturder-header-set > input {
    width: 47%;
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
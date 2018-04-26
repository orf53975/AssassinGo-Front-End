const base = "ws://amyang.xyz:8000/ws";

export default {
    install: function(Vue, options) {
        Vue.prototype.ws = function (url, data, success, close, error) {
                const ws = new WebSocket(base + url);
                let dataString = "";
                if (data != undefined) {
                    dataString = JSON.stringify(data);
                    ws.onopen = () => {
                        ws.send(dataString);
                    }
                }
                // console.log(`
                //     WebSocket On ${base + url}
                //     Data is ${dataString}
                // `);
                ws.onmessage = (e) => {
                    success(JSON.parse(e.data));
                };
                ws.onclose = () => {
                    console.log('WebSocket Close.')
                };
                ws.onerror = (e) => {
                    console.log(e);
                }
        }
    }
}
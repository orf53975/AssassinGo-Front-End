<template>
    <TabBlock :Tab="Tab" v-show="show" @refresh="refresh">
        <div class="map-container">
            <div id="map">
                获取不到Google Map
            </div>
        </div>
        <div id="canvas"></div>
        <div class="traceroute-table">
            <div class="traceroute-top">
                <div class="traceroute-top-item">TTL</div>
                <div class="traceroute-top-item">ADDR</div>
                <div class="traceroute-top-item">ELAPSED TIME</div>
                <div class="traceroute-top-item">COUNTRY</div>
                <div class="traceroute-top-item">LATITUDE</div>
                <div class="traceroute-top-item">LONGITUDE</div>
            </div>
            <div class="traceroute-main">
                <div class="traceroute-main-item" v-for="item in sortTraceRoute" :key="item.ttl">
                    <div>{{item.ttl}}</div>
                    <div>{{item.addr}}</div>
                    <div>{{item.elapsed_time}}</div>
                    <div>{{item.country}}</div>
                    <div>{{item.lat}}</div>
                    <div>{{item.long}}</div>
                </div>
            </div>
        </div>
    </TabBlock>
</template>

<script>
import TabBlock from './TabBlock';
export default {
    name: 'TraceRoute',
    components: {
        TabBlock,
    },
    data() {
        return {
            show: false,
            Tab: {
                title: 'Recon',
                subtitle: 'traceroute',
                refresh: true,
            },
            traceRoute: [],
            map: "",
        }
    },
    computed: {
        sortTraceRoute () {
            return this.traceRoute.sort( (a,b) => {
                return parseInt(a.ttl) - parseInt(b.ttl); 
            })
        }
    },
    methods: {
        drawLine () {
            //Get Position Not (0,0)
            let routePosition = [];
            for(let i = 0; i < this.sortTraceRoute.length; i++) {
                if(this.sortTraceRoute[i].lat != 0 && this.sortTraceRoute[i].long != 0) {
                    let temp = new google.maps.LatLng(this.sortTraceRoute[i].lat, this.sortTraceRoute[i].long)
                    routePosition.push(temp);
                }
            }
            //Polyline Config
            let polylineOptions = {
                path: routePosition,
                strokeColor: "rgb(0, 0, 0)",
                strokeOpacity: 0.8,
                strokeWeight: 1
            }
            let routerLine = new google.maps.Polyline(polylineOptions);
            
            //Init Config
            let myLatLng = new google.maps.LatLng(22.81248, 108.361378);
            let map = this.map || new google.maps.Map(document.getElementById('map'), {
                center: myLatLng,
                zoom: 8
            });

            for(let i = 0; i < routePosition.length; i++) {
                markers.push(new google.maps.Marker({
                    position: routePosition[i],
                    map: map,
                }));
            }

            //Set Viewport
            let bound = new google.maps.LatLngBounds();
            for(let i = 0; i < markers.length; i++) {
                bound.extend(markers[i].getPosition());
            }
            //Draw Line
            routerLine.setMap(map);
            // marker.setMap(map);
            map.fitBounds(bound);
        },
        getTraceRoute () {
            const url = '/info/tracert';
            this.traceRoute = [];
            this.ws(url, undefined, this.addTraceRoute);
        },
        addTraceRoute (data) {
            if(data.lat != 0 && data.long != 0) {
                this.traceRoute.push(data);
                this.drawLine();
            }
        },
        createMap () {
            let myLatLng = new google.maps.LatLng(22.81248, 108.361378);
            this.map = new google.maps.Map(document.getElementById('map'), {
                center: myLatLng,
                zoom: 8
            });
        },
        refresh (msg) {
            if(msg === true) {
                this.createMap();
                this.getTraceRoute();
            }
        }
    },
    watch: {
        show: function () {
            if(this.show == true && this.loadStatus.reconTraceRouteAlreadyLoad != true) {
                this.createMap();
                this.getTraceRoute();
                this.loadStatus.load('reconTraceRouteAlreadyLoad');
            }
        }
    },
}
</script>

<style scoped>
.map-container {
    height: 300px;
    width: 100%;
    box-sizing: border-box;
    padding: 0 20px;
    margin: 10px 0;
}
#map {
    height: 100%;
    width: 100%;
}
.traceroute-table {
    height: 275px;
    width: 100%;
    box-sizing: border-box;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}
.traceroute-top {
    height: 45px;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    overflow: auto;
    margin-bottom: 2px;
    border-bottom: 2px solid gray;
}
.traceroute-top-item {
    min-width: 120px;
    width: 16.6%;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    color: gray;
    font-weight: bold;
}
.traceroute-main {
    height: 227px;
    width: 100%;
    overflow: auto;
}
.traceroute-main > div:nth-of-type(2n) {
    background: rgb(220, 220, 220);
}
.traceroute-main-item {
    height: 45px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: auto;
}
.traceroute-main-item > div {
    min-width: 120px;
    width: 16.6%;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
<template>
    <TabBlock :Tab="Tab" v-show="show">
        <div class="map-container">
            <div id="map">
                获取不到Google Map
            </div>
        </div>
        <div class="traceroute-table">
            <div class="traceroute-top">
                <div class="traceroute-top-item">TTL</div>
                <div class="traceroute-top-item">ADDR</div>
                <div class="traceroute-top-item">Elapsed Time</div>
                <div class="traceroute-top-item">Country</div>
                <div class="traceroute-top-item">Latitude</div>
                <div class="traceroute-top-item">Longitude</div>
            </div>
            <div class="traceroute-main">
                <div class="traceroute-main-item" v-for="item in traceRoute" :key="item.ttl">
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
            show: true,
            Tab: {
                title: 'Recon',
                subtitle: 'traceroute',
            },
            traceRoute: [],
        }
    },
    methods: {
        drawLine () {
            //Polyline Config
            let routePosition = [];
            for(let i = 0; i < this.traceRoute.length; i++) {
                let temp = new google.maps.LatLng(this.traceRoute[i].lat, this.traceRoute[i].long)
                routePosition.push(temp);
            }
            let polylineOptions = {
                path: routePosition,
                strokeColor: "rgb(0, 0, 0)",
                strokeOpacity: 0.8,
                strokeWeight: 1
            }
            let routerLine = new google.maps.Polyline(polylineOptions);
            
            //Init Config
            let myLatLng = new google.maps.LatLng(22.81248, 108.361378);
            let map = new google.maps.Map(document.getElementById('map'), {
                center: myLatLng,
                zoom: 8
            });

            //Markder Collect
            let markers = []
            let myIconUrl = "../../static/icons/spider.svg";
            let myIcon = {
                url: myIconUrl,
                size: new google.maps.Size(40, 40),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(20, 20),
            };
            for(let i = 0; i < routePosition.length; i++) {
                markers.push(new google.maps.Marker({
                    position: routePosition[i],
                    map: map,
                    icon: myIcon,
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
            this.ws(url, undefined, this.addTraceRoute);
        },
        addTraceRoute (data) {
            this.traceRoute.push(data);
            this.drawLine();
        }
    },
    // watch: {
    //     'google': () =>{
    //         this.drawLine();
    //     },
    // },
    mounted () {

    },
    created () {
        this.getTraceRoute();
    }
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
    box-shadow: 0 0 3px gray;
    margin-bottom: 2px;
}
.traceroute-top-item {
    min-width: 120px;
    width: 16.6%;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
}
.traceroute-main {
    height: 227px;
    width: 100%;
    overflow: auto;
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
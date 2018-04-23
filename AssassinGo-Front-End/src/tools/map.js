export function MAP(param) {
    return new Promise(function (resolve, rejection) {
        window.init = function () {
            resolve(GMAP);
        }
    });
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://maps.googleapis.com/maps/api/js"
    script.onerror = reject;
    document.body.appendChild(script);
}
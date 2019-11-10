if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
    navigator.serviceWorker
        .register("./sw-pwa.js")
        .then(function() {
        console.log("SW registered");
        })
        .catch(function() {
        console.log("SW failed");
        });
    });
} else {
    console.log("ServiceWorker belum didukung browser ini.");
}
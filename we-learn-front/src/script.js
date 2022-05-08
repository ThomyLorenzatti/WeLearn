setInterval(function () {
    document.getElementById("skipButton").click();
}, 4000);

if (window.location.href.indexOf("lesson") > -1) {
    document.body.style.overflowY = "auto";
} else {
    document.body.style.overflowY = "hidden";
}

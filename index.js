let size = 380;
let canvas = null
let ctx = null;
let timer = null;
const offset = 80;

if (window.screen.availWidth <= 800) {
    size = window.screen.availWidth - offset;
}

function drawQR() {
    const text = document.getElementById("text")?.value || "https://ricbuz94.github.io";
    const title = document.getElementById("title")?.value || "MyWebsite";

    if (!!canvas) {
        ctx = undefined;
        canvas.remove();
    }

    // Draw code
    $("#qrcode").drawQr({width: size, height: size, text});
    canvas = document.querySelector("#qrcode > canvas");
    ctx = canvas.getContext("2d", {alpha: false, willReadFrequently: true});
    const tmp = ctx.getImageData(0, 0, canvas.width, canvas.height);
    canvas.height = size + offset;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.putImageData(tmp, 0, 0);

    // Draw title
    ctx.font = "28px Verdana";
    ctx.textAlign = "center";
    ctx.fillStyle = "#000";
    ctx.fillText(title, canvas.width * 0.5, canvas.height * 0.95);
}

function downloadImage() {
    const $downloadButton = $(this);
    $downloadButton.prop("disabled", true);
    const title = document.getElementById("title")?.value || "MyWebsite";
    const link = document.createElement('a');
    link.href = canvas.toDataURL();
    link.download = 'QR_' + title + "_" + Date.now() + '.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    timer = setTimeout(() => {
        $downloadButton.prop("disabled", false);
        clearTimeout(timer);
    }, 5000);
}

// Initial draw
drawQR();

// Text input
$("#text").on("input", drawQR);

// Title input
$("#title").on("input", drawQR);

// Download QR image
$("#download").on("click", downloadImage);

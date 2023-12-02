let size = 420;
let qrimage, ctx;
const offset = 16 * 4;

if (window.screen.availWidth <= 800) {
	size = window.screen.availWidth - offset;
}

function drawQR({ text: exText, title: exTitle }) {

	let text = exText;
	let title = exTitle;

	if (!exText) {
		text = document.getElementById("text").value || "https://ricbuz94.github.io";
	}
	if (!exTitle) {
		title = document.getElementById("title").value || "MyWebsite";
	}

	if (!!qrimage) {
		qrimage.remove();
		ctx = undefined;
	}
	$("#qrcode").qrcode({ width: size, height: size, text });
	qrimage = document.querySelector("#qrcode > canvas");
	// qrimage.setAttribute("willReadFrequently", true);
	ctx = qrimage.getContext("2d", { willReadFrequently: true });
	const tmp = ctx.getImageData(0, 0, qrimage.width, qrimage.height);
	qrimage.height = size + offset;
	ctx.fillStyle = "#fff";
	ctx.fillRect(0, 0, qrimage.width, qrimage.height);
	ctx.putImageData(tmp, 0, 0);

	// Draw text
	ctx.font = "28px Verdana";
	ctx.textAlign = "center";
	ctx.fillStyle = "#000";
	ctx.fillText(title, qrimage.width * 0.5, qrimage.height * 0.95);
}

// Initial draw
drawQR({ text: "https://ricbuz94.github.io", title: "MyWebsite" });

// Text input
$("#text").on("input", (event) => drawQR({ text: event?.target?.value || "https://ricbuz94.github.io" }));

// Title input
$("#title").on("input", (event) => drawQR({ title: event?.target?.value || "MyWebsite" }));

async function downloadImage(imageSrc) {
	const image = await fetch(imageSrc);
	const imageBlob = await image.blob();
	const imageURL = URL.createObjectURL(imageBlob);

	const title = document.getElementById("title").value || "MyWebsite";
	const link = document.createElement('a');
	link.href = imageURL;
	link.download = 'QR_' + title + "_" + Date.now() + '.png';
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}

// Download QR image
$("#download").on("click", async () => {
	const img = new Image();
	img.src = qrimage.toDataURL("image/png", 1.0);
	await downloadImage(img.src);
});

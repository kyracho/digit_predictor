let model;
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;

async function loadModel() {
    model = await tf.loadLayersModel('model/model.json');
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById('prediction').innerText = '';
}

canvas.addEventListener('mousedown', () => { isDrawing = true; });
canvas.addEventListener('mouseup', () => { isDrawing = false; ctx.beginPath(); });
canvas.addEventListener('mousemove', draw);

function draw(event) {
    if (!isDrawing) return;
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';

    ctx.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
}

async function predictDigit() {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const input = tf.browser.fromPixels(imageData, 1)
        .resizeNearestNeighbor([28, 28])
        .toFloat()
        .expandDims(0)
        .div(255.0);
    const prediction = model.predict(input);
    const digit = prediction.argMax(1).dataSync()[0];
    document.getElementById('prediction').innerText = `Predicted digit: ${digit}`;
}

loadModel();

let model;
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;

async function loadModel() {
    model = await tf.loadLayersModel('model.json');
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById('prediction').innerText = '';
}

canvas.addEventListener('mousedown', () => { isDrawing = true; });
canvas.addEventListener('mouseup', () => { isDrawing = false; ctx.beginPath(); });
canvas.addEventListener('mousemove', draw);
// canvas.addEventListener('mousedown', draw);

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
    let input = tf.browser.fromPixels(imageData, 1)
        .resizeNearestNeighbor([28, 28])
        .toFloat()
        .div(255.0);
       
    // Remove the last dimension [28, 28, 1] -> [28, 28]
    input = tf.squeeze(input, [2]);

    // Flatten the tensor [28, 28] -> [784]
    input = input.flatten();


    // Add batch dimension [784] -> [1, 784]
    input = input.expandDims(0);

    const prediction = model.predict(input);


    // Find the index of the maximum value in the prediction tensor
    digit = tf.argMax(prediction, 1).dataSync()[0];

    document.getElementById('prediction').innerText = `Predicted digit: ${digit}`;
}

loadModel();
let model;
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;

async function loadModel() {
    model = await tf.loadLayersModel('static/model/model.json');
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fillCanvasWithBlack()
}

function fillCanvasWithBlack() {
    ctx.fillStyle = 'black'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height); 
}

// Call after clearing the canvas or on page load
fillCanvasWithBlack();
    canvas.addEventListener('mousedown', () => { isDrawing = true; });
    canvas.addEventListener('mouseup', () => { isDrawing = false; ctx.beginPath(); });
    canvas.addEventListener('mousemove', draw);
    // End the stroke when the mouse leaves the canvas
    canvas.addEventListener('mouseleave', () => { isDrawing = false; ctx.beginPath(); });

// Ensure accurate positioning of draw events
function draw(event) {
    if (!isDrawing) return;

    // Get the bounding rectangle of the canvas
    const rect = canvas.getBoundingClientRect();

    // Calculate the mouse position relative to the canvas
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    console.log('Drawing at:', x, y);

    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'rgba(255, 255, 255, 1)';

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

// Main function
async function predictDigit() {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    console.log('First few pixel values:', imageData.data.slice(0, 10));

    // const width = imageData.width;
    // const height = imageData.height;
    // const channels = 4;  
    // console.log(`ImageData shape: [${height}, ${width}, ${channels}]`);
    // const pixelData = imageData.data; 
    // let summ = 0;
    // for (let i = 0; i < pixelData.length; i++) {
    //     summ += pixelData[i];
    // }
    // console.log('Sum of all pixel data:', summ);

    // Convert imageData to a tensor
    let input = tf.browser.fromPixels(imageData, 1);

    // const inputArray = input.arraySync();
    // console.log('First few pixel values of the tensor:', inputArray.slice(0, 10));

    // Print the shape and values of the tensor before resizing
    // console.log('Tensor shape before resizing:', input.shape);
    // input.print();

    // Resize the tensor
    input = input.resizeNearestNeighbor([28, 28]);
    // console.log('Tensor shape after resizing:', input.shape);
    // input.print();

    input = input.toFloat()
        .div(255.0)
        .reshape([1, 28, 28, 1]);

    const sum = input.sum().dataSync()[0];//testing
    console.log('Sum of all values in the input tensor:', sum);//testing

    // Check if there is a drawing
    if (sum === 0) {
    document.getElementById('prediction').innerText = 'Draw a digit';
    return; // Exit the function early
    }
    
    const prediction = model.predict(input);

    // Convert the prediction tensor to an array and print all probabilities
    const probabilities = prediction.dataSync();

    // Log all probabilities to the console
    // console.log('Probabilities for each digit:');
    // for (let i = 0; i < probabilities.length; i++) {
    //     console.log(`Digit ${i}: ${probabilities[i]}`);
    // }

    // Find the index of the maximum value in the prediction tensor
    const digit = tf.argMax(prediction, 1).dataSync()[0];

    // Display both maximum probability and predicted digit in the same element
    document.getElementById('prediction').innerText = `Predicted digit: ${digit}`;
}

// Function to initialize a message 
function initializeMessage() {
    document.getElementById('prediction').innerText = 'Draw a digit';
}

initializeMessage();

loadModel();

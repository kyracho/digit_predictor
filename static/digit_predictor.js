let model;
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;

async function loadModel() {
    model = await tf.loadLayersModel('model.json');
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fillCanvasWithBlack()
}

function fillCanvasWithBlack() {
    ctx.fillStyle = 'black'; // Set the fill color to black
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill the entire canvas with black
}

// Call this function after clearing the canvas or on page load
fillCanvasWithBlack();

canvas.addEventListener('mousedown', () => { isDrawing = true; });
canvas.addEventListener('mouseup', () => { isDrawing = false; ctx.beginPath(); });
canvas.addEventListener('mousemove', draw);
// canvas.addEventListener('mousedown', draw);

function draw(event) {
    if (!isDrawing) return;
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'rgba(255, 255, 255, 1)';

    ctx.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
}

async function predictDigit() {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    console.log('First few pixel values:', imageData.data.slice(0, 10));
    
    // Log the shape of the imageData
const width = imageData.width;
const height = imageData.height;
const channels = 4;  // RGBA has 4 channels

console.log(`ImageData shape: [${height}, ${width}, ${channels}]`);
    const pixelData = imageData.data; //testing
    let summ = 0;// testing 
    for (let i = 0; i < pixelData.length; i++) {// testing
        summ += pixelData[i];//testing
    }//testing
    console.log('Sum of all pixel data:', summ);//testing

    // let input = tf.browser.fromPixels(imageData, 1)
    //     .resizeNearestNeighbor([28, 28])
    //     .toFloat()
    //     .div(255.0)
    //     .reshape([1, 28, 28, 1]);

    // Convert imageData to a tensor
    let input = tf.browser.fromPixels(imageData, 1);

    const inputArray = input.arraySync();
    console.log('First few pixel values of the tensor:', inputArray.slice(0, 10));

    // Print the shape and values of the tensor before resizing
    console.log('Tensor shape before resizing:', input.shape);
    input.print();


    // Now resize the tensor
    input = input.resizeNearestNeighbor([28, 28]);
    console.log('Tensor shape after resizing:', input.shape);
    input.print();

        
    input = input.toFloat()
        .div(255.0)
        .reshape([1, 28, 28, 1]);

    const sum = input.sum().dataSync()[0];//testing
    console.log('Sum of all values in the input tensor:', sum);//testing


    const prediction = model.predict(input);

     // Convert the prediction tensor to an array and print all probabilities
     const probabilities = prediction.dataSync();

     // Log all probabilities to the console
     console.log('Probabilities for each digit:');
     for (let i = 0; i < probabilities.length; i++) {
         console.log(`Digit ${i}: ${probabilities[i]}`);
     }

    // Find the index of the maximum value in the prediction tensor
    digit = tf.argMax(prediction, 1).dataSync()[0];

    document.getElementById('prediction').innerText = `Predicted digit: ${digit}`;
}

loadModel();
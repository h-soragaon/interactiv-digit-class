document.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    
    // Set the fill color to black
    ctx.fillStyle = "black";
    // Draw a filled rectangle covering the entire canvas area
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Function to clear the canvas
    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Event listener for the "Clear" button
    var clearButton = document.getElementById("clearButton");
    clearButton.addEventListener("click", clearCanvas);

    var isDrawing = false;
    
    // Function to start drawing
    function startDrawing(e) {
        isDrawing = true;
        draw(e);
    }

    // Function to stop drawing
    function stopDrawing() {
        isDrawing = false;
        ctx.beginPath();
    }

    // Function to draw on the canvas
    function draw(e) {
        if (!isDrawing) return;

        ctx.lineWidth = 15;
        ctx.lineCap = "round";
        ctx.strokeStyle = "white";

        ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    }

    // Event listeners for mouse actions
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseout", stopDrawing);

    // Event listener for the "Back" button
    const backButton = document.getElementById("backButton");
    backButton.addEventListener("click", function() {
        window.location.href = "https://h-soragaon.github.io/"; // Replace "your_link_page.html" with the actual URL
    });

});

// integrating CANVAS with the CNN MODEL

// loading the model

//the base url of website in which our web app is deployed is obtained from window.location.origin
//the json file is loaded using async function

var base_url = window.location.origin;
let model;
(async function(){  
    console.log("model loading...");  
    model = await tf.loadLayersModel("https://h-soragaon.github.io/interactiv-digit-class/model/model.json")
    console.log("model loaded..");
})();

//preprocessing model

// the digit drawn is passed as image to model so as to predict the value of it

function preprocessCanvas(image) { 
    // resizing the input image to target size of (1, 28, 28) 
    // tf.browser.fromPixels() : creates a tensor 
    // tf.image.resizeNearestNeighbor() : resizes a batch of 3D images to a new shape
    // tf.mean() : computes the mean of elements across the dimensions of the tensor
    // tf.toFloat() : casts the tensor to type float
    // tensor.div() : divides the tensor by the maximum RGB value(255)
    let tensor = tf.browser.fromPixels(image).resizeNearestNeighbor([28, 28]).mean(2).expandDims(2).expandDims().toFloat(); 
    console.log(tensor.shape); 
    return tensor.div(255.0);
}

// Prediction
// canvas.toDataURL() : returns image in format specified default png
// then send to preprocess function
// await makes program wait until model prediction
// displayLabel to display result

document.getElementById('predictButton').addEventListener("click",async function(){     
    var imageData = myCanvas.toDataURL();    
    let tensor = preprocessCanvas(imageData); 
    console.log(tensor)   
    let predictions = await model.predict(tensor).data();  
    console.log(predictions)  
    let results = Array.from(predictions);    
    displayLabel(results);    
    console.log(results);
});


// output

function displayLabel(results) { 
    var max = results[0], maxIndex = 0;    
    for (var i = 1; i < data.length; i++) {        
        if (results[i] > max) {            
            max = results[i];    
            maxIndex = i;
        }
    }
document.getElementById('result').innerHTML = maxIndex;  
document.getElementById('confidence').innerHTML = "Confidence: "+ (max * 100).toFixed(2) + "%";
}
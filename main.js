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
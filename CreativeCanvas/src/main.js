let canvas;
let ctx;
let restore_array = [];
let savedImageData;
let start_index = -1;
let stroke_color = 'black';
let stroke_width = "2";
let is_drawing = false;
let colorButton = document.getElementById("primary_color");
let colorDiv = document.getElementById("color_val");

console.log(window.screen.width)
console.log(window.screen.height)


document.addEventListener('DOMContentLoaded', setupCanvas);

function setupCanvas(){
    canvas = document.getElementById('my__canvas');
    // canvas.width = window.screen.width * .70;
    // canvas.height = window.screen.height * 0.60;
    canvas.width = window.innerWidth - (window.innerWidth * 0.3);
    canvas.height = window.innerHeight * 0.70;
    ctx = canvas.getContext("2d"); 
    
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);


    canvas.addEventListener("touchstart", start, false);
    canvas.addEventListener("touchmove", draw, false);
    canvas.addEventListener("touchend", stop, false);
    canvas.addEventListener("mousedown", start, false);
    canvas.addEventListener("mousemove", draw, false);
    canvas.addEventListener("mouseup", stop, false);
    canvas.addEventListener("mouseout", stop, false);  
    window.addEventListener('resize', resizeCanvas, false);
}

function change_color(element) {
  stroke_color = element.style.background;
}

function change_width(element) {
  stroke_width = element.innerHTML
}

function start(event) {
  is_drawing = true;
  ctx.beginPath();
  ctx.moveTo(getX(event), getY(event));
  event.preventDefault();
}

function draw(event) {
  if (is_drawing) {
    ctx.lineTo(getX(event), getY(event));
    ctx.strokeStyle = stroke_color;
    ctx.lineWidth = stroke_width;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
  }
  event.preventDefault();
}

function stop(event) {
  if (is_drawing) {
    ctx.stroke();
    ctx.closePath();
    is_drawing = false;
  }
  event.preventDefault();
  restore_array.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
  start_index += 1;
}

// Get the Mouses X location
function getX(event) {
  if (event.pageX == undefined) {return event.targetTouches[0].pageX - canvas.offsetLeft}
  else {return event.pageX - canvas.offsetLeft}
  }

// Get the Mouses Y location
function getY(event) {
  if (event.pageY == undefined) {return event.targetTouches[0].pageY - canvas.offsetTop}
  else {return event.pageY - canvas.offsetTop}
}


// 
function Restore() {
  if (start_index <= 0) {
    Clear()
  } else {
    start_index += -1;
    restore_array.pop();
    if ( event.type != 'mouseout' ) {
        ctx.putImageData(restore_array[start_index], 0, 0);
    }
  }
}


// Clear the Canvas
function Clear() {
    ctx.fillStyle = "white";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    restore_array = [];
    start_index = -1;
}

// Save Image
function SaveImage() {
    var imageFile = document.getElementById("img-file");
    imageFile.setAttribute('download', 'painterImage.png');
    imageFile.setAttribute('href', canvas.toDataURL())
}


// OpenImage
function OpenImage(ev){
   console.log(ev);
    var ctx = document.getElementById('canvas').getContext('2d');
    img = new Image();
    f = document.getElementById("file").files[0];
    url = window.URL || window.webkitURL;
    src = url.createObjectURL(f);

    img.src = src;
    img.onload = function() {
        ctx.drawImage(img, 0, 0);
        url.revokeObjectURL(src);
    }

    document.getElementById("file").addEventListener("change", draw, false)
    // let img = new Image();
    // img.onload = function(){
    //     ctx.clearRect(0, 0, canvas.width, canvas.height);
    //     ctx.drawImage(img, 0, 0);
    // }
    // img.src = document.querySelector("file").value;
}

// Auto resizing the canvas on differnt 
// function resizeCanvas() {
//     savedImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//     canvas.width = window.screen.width * .70;
//     canvas.height = window.screen.height * 0.60;

//   console.log(window.screen.width)
//   console.log(window.screen.height)
//   console.log(window.screen.width * 0.70)
//   console.log(window.screen.height * 0.60) 
//     // Redraw everything after resizing the window
    
//     ctx.putImageData(savedImageData, 0, 0);
// }

// Auto resizing the canvas on differnt 
function resizeCanvas() {
    savedImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    canvas.width = window.innerWidth - (window.innerWidth * 0.3);
    canvas.height = window.innerHeight * 0.70;

    // Redraw everything after resizing the window
    
    ctx.putImageData(savedImageData, 0, 0);
}

// Color changing settings 
colorButton.onchange = function() {
  colorDiv.innerHTML = colorButton.value;
  colorDiv.style.color = colorButton.value;
}

//Open modal
function OpenModal(){
  document.querySelector('.modal').style.display = "flex";
}


//Close modal and clear the input
function CloseModal(){
  document.querySelector('.modal').style.display = "none";
}
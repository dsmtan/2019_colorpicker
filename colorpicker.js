"use strict";
let canvas = document.querySelector("#imageCanvas");
let ctx = canvas.getContext("2d");
let canvasW = canvas.width;
let canvasH = canvas.height;

let zoomCanvas = document.querySelector("#zoomCanvas");
let zoomCTX = zoomCanvas.getContext("2d");
let zoomWidth = zoomCanvas.width;
let zoomHeight = zoomCanvas.height;
let zoomData;
let zoomIndex;

let img = new Image(); // Create new img element
img.src = "cat.jpg";
let imgData;
let imageIndex;

let xOffset;
let yOffset;

let r;
let g;
let b;

function init() {
  //load image to imagecanvas
  img.onload = function() {
    ctx.drawImage(img, 0, 0);
    storeImgData();
  };
}

init();

function storeImgData() {
  imgData = ctx.getImageData(0, 0, canvasW, canvasH);

  //   console.log(zoomData);
}

// add eventlistener to mouse move over image
canvas.addEventListener("mousemove", getMousePosition);

function getMousePosition(event) {
  xOffset = event.offsetX;
  yOffset = event.offsetY;

  //put imagedata on canvases
  ctx.putImageData(imgData, 0, 0);

  zoomData = ctx.getImageData(xOffset - 5, yOffset - 5, zoomWidth, zoomHeight);

  //   getZoomPixels();
  showZoom();

  //draw green square of 10x10 around cursor
  ctx.strokeStyle = "green";
  ctx.strokeRect(xOffset - 5, yOffset - 5, 10, 10);

  getPixelInfo(xOffset, yOffset);
}

//get rgbData for 1 pixel of mousetarget
function getPixelInfo(x, y) {
  let rgbInfo = ctx.getImageData(x, y, 1, 1);

  r = rgbInfo.data[0];
  g = rgbInfo.data[1];
  b = rgbInfo.data[2];

  showColorInfo(r, g, b);
}

function showColorInfo(r, g, b) {
  document.querySelector("#r").textContent = r;
  document.querySelector("#g").textContent = g;
  document.querySelector("#b").textContent = b;

  const hex =
    "#" +
    r.toString(16).padStart(2, "0") +
    g.toString(16).padStart(2, "0") +
    b.toString(16).padStart(2, "0");

  document.querySelector("#hex").textContent = hex;

  document.querySelector("#colorbox").style.backgroundColor = hex;
}

// function getZoomPixels() {
//   for (let y = 0; y < 10; y++) {
//     for (let x = 0; x < 10; x++) {
//       zoomIndex = y * zoomWidth + x;

//       let zoomR = 4 * zoomIndex;
//       let zoomG = 4 * zoomIndex + 1;
//       let zoomB = 4 * zoomIndex + 2;
//       let zoomA = 4 * zoomIndex + 3;

//       imageIndex = y * canvasW + x;

//       let imageR = 4 * imageIndex;
//       let imageG = 4 * imageIndex + 1;
//       let imageB = 4 * imageIndex + 2;
//       let imageA = 4 * imageIndex + 3;

//       zoomData.data[zoomR] = imgData.data[imageR];
//       zoomData.data[zoomG] = imgData.data[imageG];
//       zoomData.data[zoomB] = imgData.data[imageB];
//       zoomData.data[zoomA] = imgData.data[imageA];

//       //   console.log(zoomData.data[zoomR]);
//     }
//   }
// }

function showZoom() {
  zoomCTX.putImageData(zoomData, 0, 0);
}

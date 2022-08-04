const SIGNATURE_SETTINGS={
    canvas:{width:450,height:150},
    line:{lineCap:"round",strokeStyle : '#0857cb',lineWidth: 4}
}
window.addEventListener('load'   , ()=>{ 
    resize();   // Resizes the canvas once the window loads 
    document.addEventListener(   'mousedown'   , startPainting); 
    document.addEventListener(   'mouseup'   , stopPainting); 
    document.addEventListener(   'mousemove'   , sketch); 
    //window.addEventListener(   'resize'   , resize); 
}); 

const canvas = document.querySelector('#SignatureCanvas'); 
canvas.style.cursor = "url('/images/pen-cursor.svg'),crosshair"
// Context for the canvas for 2 dimensional operations 
const ctx = canvas.getContext('2d'); 

const btnSignatureCanvasReset = document.querySelector('#btnSignatureCanvasReset'); 
btnSignatureCanvasReset.addEventListener("click",resize);
// Resizes the canvas to the available size of the window. 
function   resize(){ 
    ctx.canvas.width =SIGNATURE_SETTINGS.canvas.width;// "450";//window.innerWidth; 
    ctx.canvas.height =SIGNATURE_SETTINGS.canvas.height;// "150";//window.innerHeight; 
} 

// Stores the initial position of the cursor 
let coord = {x:0 , y:0}; 

// This is the flag that we are going to use to 
// trigger drawing 
let paint = false; 

// Updates the coordianates of the cursor when 
// an event e is triggered to the coordinates where 
// the said event is triggered. 
function getPosition(event){ 
    coord.x = event.clientX - canvas.offsetLeft; 
    coord.y = event.clientY - canvas.offsetTop; 
} 

// The following functions toggle the flag to start 
// and stop drawing 
function startPainting(event){ 
    paint =   true   ; 
    getPosition(event); 
} 
function stopPainting(){ 
    paint =   false   ; 
} 

function sketch(event){ 
    if   (!paint)   return   ; 
    ctx.beginPath(); 

    ctx.lineWidth = SIGNATURE_SETTINGS.line.lineWidth;// 4; 

    // Sets the end of the lines drawn 
    // to a round shape. 
    ctx.lineCap = SIGNATURE_SETTINGS.line.lineCap;//  'round'; 

    ctx.strokeStyle = SIGNATURE_SETTINGS.line.strokeStyle;//  '#0857cb'; 

    // The cursor to start drawing 
    // moves to this coordinate 
    ctx.moveTo(coord.x, coord.y); 

    // The position of the cursor 
    // gets updated as we move the 
    // mouse around. 
    getPosition(event); 

    // A line is traced from start 
    // coordinate to this coordinate 
    ctx.lineTo(coord.x , coord.y); 

    // Draws the line. 
    ctx.stroke(); 
} 
// Select the canvas element from the HTML document
var canvas = document.querySelector("canvas");

// Set the canvas width and height to match the window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Function to generate random numbers within a given range
function getRandom(min,max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// Get the 2D rendering context for the canvas
var c = canvas.getContext("2d");

// Object to store mouse coordinates
var mouse = {
    x : undefined,
    y : undefined
}

// Event listener to update mouse coordinates when mouse moves
window.addEventListener("mousemove", event => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

// Event listener to resize canvas when window size changes
window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

// Array of colors for drawing circles
var colorArray = [
    "#001F3F", // nightSky: Deep blue like the night sky
    "#FFD700", // starryNight: Shining gold like stars
    "#E0FFFF", // moonlight: Soft cyan like moonlight
    "#6A0DAD", // nebulaPurple: Deep purple like nebulae
    "#003366", // galaxyBlue: Dark blue like distant galaxies
    "#00FF00", // cometGreen: Bright green like a comet
    "#FF4500", // solarFlare: Fiery orange like a solar flare
    "#B565A7", // cosmicDust: Mauve like cosmic dust
    "#4B0082", // auroraBorealis: Indigo like the aurora borealis
]

// Constructor function to create circle objects
function Circle(x, y , radius, color){
    this.x = x;
    this.y = y;
    this.radius = Math.random() * Math.PI * 2;
    this.color = colorArray[getRandom(0, colorArray.length)];
    this.radians = Math.random() * Math.PI * 2;
    this.velocity = 0.02;
    this.distanceFromcentre = {
        x: getRandom(0,canvas.width/4),
        y: getRandom(0,canvas.height/4  )
    }

    // Method to update circle position
    this.update = () => {
        const lastpoint = {x: this.x, y:this.y};
        this.radians += this.velocity
        this.x = Math.sin(this.radians) * this.distanceFromcentre.x +mouse.x;
        this.y = Math.cos(this.radians) * this.distanceFromcentre.y + mouse.y;
        this.draw(lastpoint);
    }

    // Method to draw the circle
    this.draw = lastpoint => {
        c.beginPath();
        c.strokeStyle = this.color;
        c.lineWidth = this.radius;
        c.moveTo(lastpoint.x,lastpoint.y);
        c.lineTo(this.x,this.y);
        c.stroke();
    }
}

// Array to store circle objects
let circles;

// Function to initialize the animation
function init() {
    circles = [];

    // Create 200 circle objects and push them into the circles array
    for (let i = 0; i < 200; i++) {
        circles.push(new Circle(canvas.width/2, canvas.height/2, 10 , "black"));        
    }
}

// Function to animate the circles
function anima() {
    requestAnimationFrame(anima);
    c.fillStyle = "rgba(0,0,0,0.2)"
    c.fillRect(0,0,canvas.width,canvas.height);
    circles.forEach(Circle => {
        Circle.update();
    });
}

// Initialize the animation
init();
anima();
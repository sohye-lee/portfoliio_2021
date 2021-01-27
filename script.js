
// Initial Setup
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

// Variables
var mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
};

const background = document.querySelector('body');
const logo = document.querySelector('#logo');


const placards = document.getElementsByClassName('about__placard')
const placardSigns = document.getElementsByClassName('placard__sign');
const placardRods = document.getElementsByClassName('placard__line')

const navBottom = document.querySelector('.nav__bottom');
const navBottomItems = document.getElementsByClassName('bottom__item');
const navTopItems = document.querySelectorAll('.top__item__link');

const toggler = document.querySelector('.nav__toggler');
const navList = document.querySelector('.nav__list');
const togglerInners = document.querySelectorAll('.nav__toggler__inner');

const scrollRight = document.querySelector('.scroll__right')

//Variables for ball
const color = colorGenerator();
const color2 = colorGenerator();
const gravity = 1;
const friction = 0.97;



//Event Listeners
document.addEventListener("mousemove", function(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

document.addEventListener("resize", function() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
});

function colorChange() {
    background.classList.add('bgcolorChange')
}
function colorBack() {
    background.classList.remove('bgcolorChange')
}
document.addEventListener('click', function(e) {
    // init();
    console.log(e.target);
    colorChange();
    setTimeout(colorBack, 300);
})

const playSwing = (placard, className) => {
    placard.classList.add(className);
}
var swings = ['swing1', 'swing2','swing3', 'swing4'];



scrollRight.style.display = 'none';

window.onscroll = function(event) {
    canvas.width = innerWidth*2;
    for (var i = 0; i < placards.length; i++) {
        playSwing(placards[i],swings[i]); 
    }

    if (window.scrollX <= 200) {
        if (logo.classList.contains('logo__right')) {
            logo.classList.remove('logo__right');
        } 
        if (logo.classList.contains('logo__left')) {
            logo.classList.remove('logo__left');
        } 
        scrollRight.style.display = 'block'

    } else if (window.scrollX > 200 && window.scrollX <= (innerWidth*0.8)) {
        logo.classList.add('logo__right');
        scrollRight.style.display = 'block'

    } else if (window.scrollX > (innerWidth*0.8) && window.scrollX <= (innerWidth*4)) {
        logo.classList.add('logo__left');
        scrollRight.style.display = 'block'
    } else if (window.scrollX > (innerWidth*4)) {
        scrollRight.style.display = 'none'
    }

    if (window.scrollX > (innerWidth*2-100) && window.scrollX < (innerWidth*5)) {
        navBottom.classList.add('bottom__vertical');
    } else {
        navBottom.classList.remove('bottom__vertical');
    }

    
    if (window.scrollX < (innerWidth * 2 - 70)) {
        for (var i = 0;i<navBottomItems.length;i++) {
            navBottomItems[i].style.background = 'var(--Smoke)';
            navBottomItems[i].style.color = color;
        }
        for (var i = 0;i<navTopItems.length;i++) {
            navTopItems[i].style.background ='var(--Smoke)';
            navTopItems[i].style.color = color;
        }
        for (var i = 0; i<togglerInners.length; i++) {
            togglerInners[i].style.background = color;
            togglerInners[i].classList.add('shadow__smoke');
        }
        
    } else {
        for (var i = 0;i<navBottomItems.length;i++) {
            navBottomItems[i].style.background = 'none';
            navBottomItems[i].style.color = 'var(--White)';
        }
        for (var i = 0;i<navTopItems.length;i++) {
            navTopItems[i].style.background ='none';
            navTopItems[i].style.color = 'var(--Smoke)'
        }
        for (var i = 0; i<togglerInners.length; i++) {
            togglerInners[i].style.background = 'var(--Smoke)'
            togglerInners[i].classList.remove('shadow__smoke');

        }
    }
};


//Utility Functions
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function colorGenerator() {
    var red = String(Math.floor(Math.random() * 180)+50);
    var yellow = String(Math.floor(Math.random() * 180)+50);
    var blue = String(Math.floor(Math.random() * 180)+50);
    return 'rgba('+red+','+yellow+','+blue+',0.9)';
}


//Objects
class Ball {
    constructor(x, y, dx, dy, radius, color) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.color = color;
    }
    
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 
            Math.PI*2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    };

    update() {
        if (this.y + this.radius + this.dy > canvas.height) {
            this.dy = -this.dy * friction;
        } else {
            this.dy += gravity;
        }

        if (this.x + this.radius + this.dx > canvas.width
            || this.x - this.radius <= 0) {
            this.dx = -this.dx
        } 
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    };

}

//Ball implementation
var ball;
var ball2;
function init() {
    ball = new Ball(canvas.width/2, 0, 3, 0.3, 300, color);
    ball2 = new Ball(canvas.width/2, 0, -5, 0.5, 350, color2);


    for (var i = 0;i<navBottomItems.length;i++) {
        navBottomItems[i].style.background = 'var(--Smoke)';
        navBottomItems[i].style.color = color;
    }

    for (var i = 0;i<navTopItems.length;i++) {
        navTopItems[i].style.background = 'var(--Smoke)';
        navBottomItems[i].style.color = color;
    }

    for (var i = 0; i<togglerInners.length; i++) {
        togglerInners[i].style.background = color;
        togglerInners[i].classList.add('shadow__smoke');
    }

    scrollRight.style.display = 'block'

}

//Ball animation Loop
function animate() {
    requestAnimationFrame(animate);
  
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ball.update();
    ball2.update();
}

init();
animate();


// Color
const colorObjects = document.querySelectorAll('.color__change');
const bgcolorObjects = document.querySelectorAll('.bgcolor__change');

function changeObjectsColor() {
    for (var i=0;i<colorObjects.length;i++) {
        colorObjects[i].style.color = color;
    }
    for (var i=0;i<bgcolorObjects.length;i++) {
        bgcolorObjects[i].style.background = color;
    }
}


changeObjectsColor();




// Navbar Toggler Handling

toggler.addEventListener('click', function() {
    if (toggler.classList.contains('nav__toggler__clicked')) {
        toggler.classList.remove('nav__toggler__clicked');
        navList.classList.remove('nav__list__clicked');
        togglerInners[0].classList.remove('toggler__x');
        togglerInners[1].classList.remove('toggler__x');
    } else {
        toggler.classList.add('nav__toggler__clicked');
        navList.classList.add('nav__list__clicked');
        togglerInners[0].classList.add('toggler__x');
        togglerInners[1].classList.add('toggler__x');
    }
})

// Contact Click --> email gathered
var emailLetters = document.querySelectorAll('.email');
var emailTrigger = document.querySelector('.email__trigger');
var email = document.querySelector('#email');

for (var i = 0; i<emailLetters.length;i++) {
    emailLetters[i].style.position = 'absolute';
    emailLetters[i].style.top = String(Math.random() * innerHeight)+'px';
    emailLetters[i].style.left = String(Math.random() * innerWidth)+'px';
}


emailTrigger.addEventListener('click', function() {
    if (emailLetters[0].style.position == 'absolute') {
        for (var i = 0; i<emailLetters.length; i++) {
            emailLetters[i].style.position = 'relative';
            emailLetters[i].style.top = '50px';
            emailLetters[i].style.left = '0';
            emailTrigger.style.color = 'var(--Black)';
        }
        
    } else {
        for (var i = 0; i<emailLetters.length; i++) {
            emailLetters[i].style.position = 'absolute';
            emailLetters[i].style.top = String(Math.random() * innerHeight)+'px';
            emailLetters[i].style.left = String(Math.random() * innerWidth)+'px';
            emailTrigger.style.color = 'var(--White)';

        }
    }
    
})


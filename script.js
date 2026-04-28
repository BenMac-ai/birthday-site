
// COUNTDOWN
const countdown = document.getElementById("countdown");
const birthday = new Date("May 9, 2026").getTime();

setInterval(() => {
    let now = new Date().getTime();
    let distance = birthday - now;

    if (distance < 0) {
        countdown.innerHTML = "🎉 It's my Birthday!";
        return;
    }

    let d = Math.floor(distance / (1000*60*60*24));
    let h = Math.floor((distance/(1000*60*60))%24);
    let m = Math.floor((distance/1000/60)%60);
    let s = Math.floor((distance/1000)%60);

    countdown.innerHTML = `${d}d ${h}h ${m}m ${s}s`;
}, 1000);

// MUSIC
function playMusic() {
    document.getElementById("music").play();
}

// SLIDESHOW
const images = ["img1.jpg","img2.jpg","img3.jpg","img4.jpg"];
let i = 0;
let slideInterval;

function startSlideshow() {
    if (slideInterval) return;

    slideInterval = setInterval(() => {
        i = (i + 1) % images.length;
        document.getElementById("slide").src = images[i];
    }, 2500);
}

// SURPRISE (FIREWORKS + SLIDESHOW)
function showSurprise() {
    document.getElementById("surprise").classList.remove("hidden");

    createFireworks();
    animateFireworks();

    startSlideshow();
}

// MESSAGES
let messages = [];

function addMessage() {
    let name = document.getElementById("nameInput").value;
    let msg = document.getElementById("msgInput").value;

    if (!name || !msg) return;

    messages.push({name, msg});
    renderMessages();
}

function renderMessages() {
    let list = document.getElementById("messageList");
    let admin = document.getElementById("adminMessages");

    list.innerHTML = "";
    admin.innerHTML = "";

    messages.forEach(m => {
        list.innerHTML += `<div class="message-box"><b>${m.name}</b>: ${m.msg}</div>`;
        admin.innerHTML += `<p><b>${m.name}</b>: ${m.msg}</p>`;
    });
}

// GAME
let score = 0;
let active = false;

function gameClick() {
    if (!active) {
        active = true;
        score = 0;

        setTimeout(() => {
            active = false;
            alert("Time up! Score: " + score);
        }, 10000);
    }

    score++;
    document.getElementById("score").innerText = "Score: " + score;
}

// ADMIN
function toggleAdmin() {
    document.getElementById("adminPanel").classList.toggle("hidden");
}

// FIREWORKS ENGINE (FIXED)
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function createFireworks() {
    particles = [];

    for (let i = 0; i < 120; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height / 2,
            speedX: Math.random()*4-2,
            speedY: Math.random()*4-2
        });
    }
}

function animateFireworks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        ctx.fillStyle = "rgba(255,255,255,0.8)";
        ctx.fillRect(p.x, p.y, 2, 2);
    });

    requestAnimationFrame(animateFireworks);
}

// AUTO MUSIC ON LOAD
window.onload = () => {
    setTimeout(() => {
        document.getElementById("music").play();
    }, 2000);
};
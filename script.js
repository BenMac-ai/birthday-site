// FIREBASE CONFIG
const firebaseConfig = {
    apiKey: "YOUR_KEY",
    authDomain: "YOUR_DOMAIN",
    projectId: "YOUR_PROJECT"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const messagesRef = db.collection("messages");

// COUNTDOWN
const countdown = document.getElementById("countdown");
const birthday = new Date("May 9, 2026").getTime();

setInterval(() => {
    let diff = birthday - Date.now();
    let days = Math.floor(diff / (1000*60*60*24));
    countdown.innerHTML = diff > 0 ? `${days} days to go 🎉` : "🎉 It's Today!";
}, 1000);

// START EXPERIENCE
function startExperience() {
    document.getElementById("hero").style.display = "none";
    document.getElementById("experience").classList.remove("hidden");

    document.getElementById("music").play();

    launchFireworks();
    startSlideshow();
}

// BACK FUNCTION
function goBack() {
    clearInterval(window.slideInterval);
    particles = [];

    document.getElementById("experience").classList.add("hidden");
    document.getElementById("hero").style.display = "flex";

    document.getElementById("music").pause();
}

// SLIDESHOW
const images = ["img1.jpg","img2.jpg","img3.jpg","img4.jpg"];
let i = 0;

function startSlideshow() {
    if (window.slideInterval) return;

    window.slideInterval = setInterval(() => {
        const img = document.getElementById("slide");
        img.style.opacity = 0;

        setTimeout(() => {
            i = (i + 1) % images.length;
            img.src = images[i];
            img.style.opacity = 1;
        }, 300);

    }, 2500);
}

// FIREWORKS
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

let particles = [];
const colors = ["#ff0044","#ffcc00","#00e5ff","#ffffff"];

function launchFireworks() {
    setInterval(() => {
        for (let j = 0; j < 40; j++) {
            particles.push({
                x: canvas.width/2,
                y: canvas.height/2,
                vx: (Math.random()-0.5)*6,
                vy: (Math.random()-0.5)*6,
                life: 100,
                color: colors[Math.floor(Math.random()*colors.length)]
            });
        }
    }, 800);

    animate();
}

function animate() {
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    particles.forEach((p,i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life--;

        ctx.fillStyle = p.color;
        ctx.fillRect(p.x,p.y,2,2);

        if(p.life <= 0) particles.splice(i,1);
    });

    requestAnimationFrame(animate);
}

// SAVE MESSAGE ONLY (PRIVATE)
function addMessage() {
    let name = document.getElementById("nameInput").value;
    let msg = document.getElementById("msgInput").value;

    if(!name || !msg) return;

    messagesRef.add({
        name,
        msg,
        time: Date.now()
    });

    // Clear inputs
    document.getElementById("nameInput").value = "";
    document.getElementById("msgInput").value = "";

    alert("🎉 Your wish has been sent!");
}

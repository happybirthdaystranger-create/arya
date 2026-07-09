// ===============================
// Efek hati
// ===============================
const hearts = document.querySelector(".hearts");

function createHeart(){

    const heart = document.createElement("div");

    heart.className = "heart";

    heart.innerHTML = "❤";

    heart.style.left = Math.random()*100+"vw";

    heart.style.fontSize=(18+Math.random()*25)+"px";

    heart.style.animationDuration=(5+Math.random()*4)+"s";

    hearts.appendChild(heart);

    setTimeout(()=>{
        heart.remove();
    },9000);

}

setInterval(createHeart,300);


// ===============================
// Membuka kado
// ===============================

function openGift(){

    const lid=document.querySelector(".lid");
    const gift=document.querySelector(".gift");

    // buka tutup kado
    lid.style.transform="rotate(-35deg) translateY(-20px)";

    // zoom sedikit
    gift.style.transform="scale(1.08)";

    // efek menghilang
    setTimeout(()=>{

        document.body.style.transition=".8s";
        document.body.style.opacity="0";

    },1200);


    // pindah halaman
    setTimeout(()=>{

        location.href="game.html";

    },2000);

}

// ===========================
// MINI GAME
// ===========================

const area=document.getElementById("gameArea");

if(area){

const basket=document.getElementById("basket");

const scoreText=document.getElementById("score");

const winSound=document.getElementById("winSound");

let score=0;

let gameStop=false;

// Gerakkan keranjang

document.addEventListener("mousemove",(e)=>{

basket.style.left=e.clientX+"px";

});

document.addEventListener("touchmove",(e)=>{

basket.style.left=e.touches[0].clientX+"px";

},{passive:false});

// Membuat hati

function createHeart(){

if(gameStop)return;

const heart=document.createElement("div");

heart.className="fallHeart";

heart.innerHTML="❤️";

heart.style.left=Math.random()*(area.clientWidth-30)+"px";

heart.style.top="-40px";

area.appendChild(heart);

let y=-40;

const speed=4+Math.random()*3;

const fall=setInterval(()=>{

if(gameStop){

clearInterval(fall);

heart.remove();

return;

}

y+=speed;

heart.style.top=y+"px";

const hRect=heart.getBoundingClientRect();

const bRect=basket.getBoundingClientRect();

if(

hRect.bottom>bRect.top &&

hRect.left<bRect.right &&

hRect.right>bRect.left

){

clearInterval(fall);

heart.remove();

score++;

scoreText.innerHTML=score+" / 10 ❤️";

if(score>=10){

menang();

}

}

if(y>area.clientHeight){

clearInterval(fall);

heart.remove();

}

},20);

}

const loop=setInterval(createHeart,700);

function menang(){

gameStop=true;

clearInterval(loop);

winSound.play();

area.innerHTML=`

<div class="win">

<h1>🎉 Selamat 🎉</h1>

<p>Kamu berhasil menangkap semua hati ❤️</p>

<button onclick="location.href='message.html'">

Buka Pesan 💌

</button>

</div>

`;

}

}
// Dinosaur Game - David Stobbe

let cnv = document.getElementById("canvas");
let ctx = cnv.getContext("2d");
cnv.width = 700;
cnv.height = 200;
let cactusImg = document.getElementById("cactus");
let dinosaurImg = document.getElementById("dinosaur");

let cactusDisplayInterval = Math.round(Math.random() * 200) + 50;
let cactusDisplayDuration = 0;
let cacti = []
let dinosaurY = 70
let jumping = false
let jumpTimer = 0
let gravity = 0.4
let death = false;
let score = 0
let highScore = 0
let dinosaurX = 80
let dinosaurW = 30
let dinosaurH = 30
let secretCode = []


document.addEventListener("keydown", keydownListener)

class cactus {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    display() {
        ctx.drawImage(cactusImg, this.x, this.y, this.w, this.h)
        this.x -= 10

        if (dinosaurX + dinosaurW - 6 >= this.x && dinosaurX + dinosaurW - 6 <= this.x + 18 && dinosaurY + dinosaurH - 6 >= this.y && dinosaurY + dinosaurH - 6 <= this.y + 30) {
            death = true
        }
    }
}


requestAnimationFrame(loop)
function loop() { 
    console.log(secretCode)
    if (!death) {
        console.log(dinosaurY)
        console.log(jumping)
        ctx.fillStyle = "rgb(255, 255, 255)"
        ctx.fillRect(0, 0, cnv.width, cnv.height)
        ctx.font = "20px Sabo"
        ctx.fillStyle = "rgb(0, 0, 0)"
        ctx.fillText("Score: " + score, 600, 20)
        ctx.fillText("High Score: " + highScore, 400, 20)
        if(jumping === true) {
            jumpTimer += 0.7
        }
        console.log(jumpTimer)
        console.log(jumping)
        ctx.drawImage(dinosaurImg, dinosaurX, dinosaurY, dinosaurW, dinosaurH)
        cactusDisplayDuration ++;
        if (cactusDisplayDuration === cactusDisplayInterval) {
            cacti.push(new cactus(cnv.width, 70, 20, 30));
            cactusDisplayDuration = 0;
            cactusDisplayInterval = Math.round(Math.random() * 200) + 50;
        }
        if (jumping === true) {
            dinosaurY = (0.5 * gravity * jumpTimer * jumpTimer - 6 * jumpTimer + 70)
            if (dinosaurY > 70) {
                dinosaurY = 70
                jumping = false;
            }
        }
        if (secretCode === ["control", "D", "A", "V", "I", "D"]) {
            alert("EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")
        }
        for (let n = 0; n < cacti.length; n++) {
            cacti[n].display();
            if (cacti[n].x <= -20) {
                cacti.splice(n, 1)
            }
        }

    }
    else {
        ctx.fillText("Press enter to restart game", 250, 180)
    }
    requestAnimationFrame(loop)
}

function keydownListener(event) {
    console.log(event.code)
    if (event.code === "Space") {
        if (jumping === false) {
            jumping = true;
            jumpTimer = 0
        }
    } else if (event.code === "Enter") {
        console.log("EEE")
        if (death) {
            if (score > highScore) {
                highScore = score;
            }
            score = 0
            cacti.splice(0, cacti.length)
            death = false;
        }
    } else if (event.code === "MetaLeft") {
        secretCode = ["control"]
    } else if (event.code === "KeyD") {
        secretCode.push("D")
    } else if (event.code === "KeyA") {
        secretCode.push("A")
    } else if (event.code === "KeyV") {
        secretCode.push("V")
    } else if (event.code === "KeyI") {
        secretCode.push("I")
    }
}

function Gamescore() {
    if (!death) {
        score++
        if (!jumping) {
            if (dinosaurImg.src === "http://127.0.0.1:5500/img/dino1.png") {
                dinosaurImg.src = "img/dino2.png"
            } else {
                dinosaurImg.src = "img/dino1.png"
            }
        }
    }
}
setInterval(Gamescore, 100)

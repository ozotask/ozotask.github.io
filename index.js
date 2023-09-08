const frame = document.querySelector('#area');
const objectWidth = 43;
const objectHeight = 43;
const widthBowndary = frame.offsetWidth - objectWidth;
const heightBowndary = -frame.offsetHeight + objectHeight;
const mainObject = document.querySelector('#object');
const pos = { x: 0, y: 0 };

var joystick = new JoyStick({
    radius: 60,
    x: window.innerWidth / 2,
    y: window.innerHeight / 1 - 130,
    // x: widthBowndary / 5,
    // y: (heightBowndary * -1) - 100,
    inner_radius: 40,
    mouse_support: isMobile ? false : true,
});





// document.addEventListener("keydown", (ev) => {

//     const dir = (ev.key.match(/(?<=^Arrow)\w+/) || [])[ 0 ];
//     if (!dir) return; // Not an arrow key.

//     ev.preventDefault(); // Prevent Browser scroll if overflow
    
//     ({
//         Left: () => pos.x -= 40,
//         Right: () => pos.x += 40,
//         Up: () => pos.y -= 40,
//         Down: () => pos.y += 40,
//     }[ dir ])();
    
//     if (pos.x < 0) { 
//         pos.x = 0;
//      }
//     if (pos.y > 0) { 
//         pos.y = 0;
//      }
//      if (pos.y < heightBowndary) {
//          pos.y = heightBowndary;
        
//      }
//      if (pos.x > widthBowndary) {
//          pos.x  = widthBowndary;
//      }
//      console.log(ev.key)
//     mainObject.style.transform = `translate(${pos.x}px, ${pos.y}px)`

// });

const keyDict = {};
const Player = {
    el: document.querySelector("#object"),
    x: 0,
    y: 0,
    speed: 6,
    move() {
        this.el.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }
};

const updateKeyDict = (ev) => {
    const k = ev.code;
    if (/^Arrow\w+/.test(k)) { // If is arrow
        ev.preventDefault();
        keyDict[ k ] = ev.type === "keydown"; // set boolean true / false
    }
};

const update = (direction) => {
    // Determine move distance to account diagonal move: 1/Math.sqrt(2) = ~0.707
    let dist =
        keyDict.ArrowUp && (keyDict.ArrowLeft || keyDict.ArrowRight) ||
            keyDict.ArrowDown && (keyDict.ArrowLeft || keyDict.ArrowRight) ? 0.707 : 1;

    dist *= Player.speed;

    if (Player.x < 0) {
        Player.x = 0;
    }
    if (Player.y > 0) {
        Player.y = 0;
    }
    if (Player.y < heightBowndary) {
        Player.y = heightBowndary;

    }
    if (Player.x > widthBowndary) {
        Player.x = widthBowndary;
    }

    if (joystick.left || keyDict.ArrowLeft) Player.x -= dist;
    if (joystick.up ||keyDict.ArrowUp) Player.y -= dist;
    if (joystick.right ||keyDict.ArrowRight) Player.x += dist;
    if (joystick.down ||keyDict.ArrowDown) Player.y += dist;
    Player.move();
}

document.addEventListener('keydown', updateKeyDict);
document.addEventListener('keyup', updateKeyDict);

(function engine() {
    update();
    window.requestAnimationFrame(engine);
}());

var Joy1 = new JoyStick('joy1Div', {}, function (stickData) {
    joy1IinputPosX.value = stickData.xPosition;
    joy1InputPosY.value = stickData.yPosition;
    joy1Direzione.value = stickData.cardinalDirection;
    // joy1X.value = stickData.x;
    // joy1Y.value = stickData.y;
});

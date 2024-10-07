

const cursor = document.querySelector(".cursor");
const buttons = document.querySelectorAll('a');

const vanishable_buttons = document.querySelectorAll('.vanishable');

var hover = false;

var item = null;

const about_button = document.getElementById("about_button");

const panel = document.querySelector(".panel");

var x = 0;
var y = 0;
var finalX = 0;
var finalY = 0;


document.addEventListener('DOMContentLoaded', () => {
    const interBubble = document.querySelector('.interactive');
    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;

    function move() {
        curX += (tgX - curX) / 20;
        curY += (tgY - curY) / 20;
        interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
        requestAnimationFrame(() => {
            move();
        });
    }

    window.addEventListener('mousemove', (event) => {
        tgX = event.clientX;
        tgY = event.clientY;
    });

    move();
});

setInterval(() => {
    if(hover) {
        var offset = item.getBoundingClientRect();

        x = offset.left + item.offsetWidth / 2;
        y = offset.top + item.offsetHeight / 2;
    }
    
    finalX = finalX + (-finalX+x) / 3;
    finalY = finalY + (-finalY+y) / 3;

    cursor.style.transform = `translate(${Math.round(finalX-7.5)}px, ${Math.round(finalY-7.5)}px)`;
}, 10)

addEventListener("mousemove", (event) => {
    x = event.clientX;
    y = event.clientY;
});

about_button.onclick = () => {
    toggleAbout();
};
document.getElementById("closeAbout").onclick = () => {
    document.querySelector(".about").classList.remove("toggle")
    panel.style = "--vanish: " + 0 + "%";

    toggleAbout();
};

function toggleAbout() {
    const about = document.querySelector(".about");
    const toggled = about.getAttribute("toggled") === "1";

    if(toggled) {
        about.setAttribute("toggled", "0")
        about.style = "--vanish: 150%;"
        return;
    }
    about.setAttribute("toggled", "1")
    about.style = "--vanish: 0%;"
}

for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("mouseover", function (e) {
        hover = true;
        item = e.target;
    });
}

for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("mouseleave", function () {
        hover = false;
        item = null;
    });
}
// Vanishable buttons
for (var i = 0; i < vanishable_buttons.length; i++) {
    vanishable_buttons[i].addEventListener("click", function () {
        panel.style = "--vanish: " + 150 + "%";
    });
}
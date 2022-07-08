// ---------------
// QUERY SELECTORS
// ---------------

const earnButton = document.querySelector(".counter .earner");
const playerMoney = document.querySelector('[data-money="playerMoney"]');
const buildingC = document.querySelector('[data-money="buildingCost"]')
const carC = document.querySelector('[data-money="carCost"]')
const peopleC = document.querySelector('[data-money="peopleCost"]')

const buildingsUpgrade = document.querySelector(".upgrades .buildings img");
const carUpgrade = document.querySelector(".upgrades .cars img");
const peopleUpgrade = document.querySelector(".upgrades .people img");

const gameArea = document.querySelector(".gameArea");
const gameMenu = document.querySelector(".gameMenu");

const objectsList = document.querySelectorAll('.gameArea i');


// ---------------
//    VARIABLES
// ---------------

let money = 0;
let buildingCost = 10;
let carCost = 8;
let peopleCost = 6;

let objectsArray = [...objectsList];

// ---------------
// PRICE OF UPGRADES
// ---------------

buildingC.textContent = `${buildingCost}$`;
carC.textContent = `${carCost}$`;
peopleC.textContent = `${peopleCost}$`;

// ---------------
// EARN MONEY BUTTON - COUNTER
// ---------------

earnButton.addEventListener("click", (e) => {
    money++;
    checkIsEnoughtMoney();
    newDollarAfterClick(e);
    playerMoney.textContent = `${money}$`;

});

// ---------------
// UPGRADES
// ---------------

buildingsUpgrade.addEventListener("click", buyUpgrades(buildingCost, buildingsUpgrade));
carUpgrade.addEventListener("click", buyUpgrades(carCost, carUpgrade));
peopleUpgrade.addEventListener("click", buyUpgrades(peopleCost, peopleUpgrade));

function checkIsEnoughtMoney() {
    isEnoughtMoney(buildingsUpgrade, buildingCost);
    isEnoughtMoney(carUpgrade, carCost);
    isEnoughtMoney(peopleUpgrade, peopleCost);
}

function isEnoughtMoney(upgrade, upgradeCost) {
    upgrade.addEventListener("mouseover", () => {
        if (money >= upgradeCost) {
            upgrade.style.opacity = "1";
            upgrade.style.transform = "scale(1.1)";
        }
    })

    upgrade.addEventListener("mouseout", () => {
        upgrade.style.opacity = "0.7";
        upgrade.style.transform = "scale(1)";
    })
}


function buyUpgrades(upgradeCost, upgrade) {
    upgrade.addEventListener("click", () => {
        if (money >= upgradeCost) {
            money = money - upgradeCost;
            playerMoney.textContent = `${money}$`;

            // ---------------
            // CREATE OBJECTS ON G-AREA
            // ---------------

            const upgradeObject = document.createElement("i");
            upgradeObject.classList.add(`fa-solid`);

            if (upgrade == buildingsUpgrade) {
                upgradeObject.classList.add(`fa-house`);
            }
            else if (upgrade == carUpgrade) {
                upgradeObject.classList.add(`fa-car`);
            }
            else if (upgrade == peopleUpgrade) {
                upgradeObject.classList.add(`fa-person`);
            }

            objectsArray.push(upgradeObject);
            gameArea.appendChild(upgradeObject);
            moveObject();
        }
    })
}

// ---------------
// MOVE OBJECT
// ---------------

function moveObject() {
    const objArea = gameArea;
    objectsArray.forEach(function (obj) {
        let objX = 0;
        let objY = 0;
        let mousedown = false;

        obj.addEventListener("mousedown", (e) => {
            mousedown = true;
            objX = obj.offsetLeft - e.clientX;
            objY = obj.offsetTop - e.clientY;
        });

        obj.addEventListener("mouseup", () => {
            mousedown = false;
        });

        objArea.addEventListener("mousemove", (e) => {
            if (mousedown) {
                obj.style.left = e.clientX + objX + "px";
                obj.style.top = e.clientY + objY + "px";
            }
        });
    })
}

// ---------------
// CREATE DOLLAR SIGN
// ---------------

function newDollarAfterClick(e) {
    const dollar = document.createElement("i");
    dollar.classList.add("fa-solid");
    dollar.classList.add("fa-dollar-sign");

    dollar.style.position = "absolute";
    dollar.style.left = e.offsetX + "px";
    dollar.style.top = e.offsetY + "px";

    earnButton.appendChild(dollar);

    // DOLAR ANIMATION
    dollar.animate([

        // KEYFRAMES
        {   // FROM
            transform: "translateY(0px)",
            opacity: 1,
        },
        {   // TO 
            transform: "translateY(-80px)",
            opacity: 0,
        },
    ], {
        // TIMING OPTIONS
        duration: 1000,
    });

    // REMOVING DOLAR FROM DOM
    setTimeout(() => {
        dollar.parentElement.removeChild(dollar);
    }, 900);
}

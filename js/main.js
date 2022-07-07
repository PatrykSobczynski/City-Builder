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

const objectsList = document.querySelectorAll('.gameArea i');


// ---------------
//    VARIABLES
// ---------------

let money = 0;
let buildingCost = 6;
let carCost = 4;
let peopleCost = 2;

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
earnButton.addEventListener("click", () => {
    money++;
    playerMoney.textContent = `${money}$`;
    checkIsEnoughtMoney();
});

// ---------------
// UPGRADES
// ---------------

buildingsUpgrade.addEventListener("click", buyUpgrades(buildingCost, buildingsUpgrade, buildingC));
carUpgrade.addEventListener("click", buyUpgrades(carCost, carUpgrade, carC));
peopleUpgrade.addEventListener("click", buyUpgrades(peopleCost, peopleUpgrade, peopleC));

function checkIsEnoughtMoney() {
    isEnoughtMoney(buildingCost, buildingsUpgrade);
    isEnoughtMoney(carCost, carUpgrade);
    isEnoughtMoney(peopleCost, peopleUpgrade);
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

function isEnoughtMoney(upgradeCost, upgrade) {
    if (money >= upgradeCost) {
        upgrade.addEventListener("mouseover", () => {
            upgrade.style.opacity = "1";
            upgrade.style.transform = "scale(1.1)";
        })

        upgrade.addEventListener("mouseout", () => {
            upgrade.style.opacity = "0.7";
            upgrade.style.transform = "scale(1)";
        })
    }
}

function buyUpgrades(upgradeCost, upgrade, upgradeC) {
    upgrade.addEventListener("click", () => {
        if (money >= upgradeCost) {
            money = money - upgradeCost;
            playerMoney.textContent = `${money}$`;
            upgradeCost = upgradeCost * 3;
            upgradeC.textContent = `${upgradeCost}$`;

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




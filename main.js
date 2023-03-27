let arrayOfCrossDatas = [],
    arrayOfZeroDatas = [],
    moveCounter = 0

const turnText = document.querySelector('.turn');


const winCombinations = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9],
    [1, 4, 7], [2, 5, 8], [3, 6, 9],
    [1, 5, 9], [3, 5, 7],
]






const playerZero = {
    counterOfWins: 0,
    counterOfTurns: 0,
}


const playerCross = {
    counterOfWins: 0,
    counterOfTurns: 0,

}




document.querySelector('.game__wrapper').style.pointerEvents = 'none'
setTimeout(() => {
    turnText.innerHTML = setTurn()
    document.querySelector('.game__wrapper').style.pointerEvents = 'all'
}, 2000);





(function () {
    document.querySelector('.game__wrapper').addEventListener('click', (e) => {
        const { target, currentTarget } = e;
        if (target.classList[0] === 'game__block') {
            mainStructure(currentTarget, target)
        }
    })
})()

function mainStructure(ct, t) {
    if (turnText.textContent === 'Ход крестиков') {
        let blockName = targetInit('крестиков', t, 'X'),
            transformedArr = itemStep(arrayOfCrossDatas, t, playerCross, 'Ход ноликов')


        if (playerCross?.counterOfTurns >= 3) {
            const newArr = winCombinations.map(i => transformedArr.filter(elem => i.includes(elem)))
            newArr.forEach(i => {
                if (i.length === 3) {
                    endOfTheRound(blockName, playerCross)
                    startRound(setTurn(), ct, arrayOfCrossDatas, arrayOfZeroDatas)
                } else if (i.length < 3 && moveCounter >= 9) {
                    draw(ct)
                }
            })
        }

    } else {

        let blockName = targetInit('ноликов', t, 'O'),
            transformedArr = itemStep(arrayOfZeroDatas, t, playerZero, 'Ход крестиков');

        if (playerZero?.counterOfTurns >= 3) {
            const newArr = winCombinations.map(i => transformedArr.filter(elem => i.includes(elem)))
            newArr.forEach(i => {
                if (i.length === 3) {
                    endOfTheRound(blockName, playerZero)
                    startRound(setTurn(), ct, arrayOfCrossDatas, arrayOfZeroDatas)
                } else if (i.length < 3 && moveCounter >= 9) {
                    draw(ct)
                }
            })
        }

    }
}


function randomIntFromInterval(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1) + min)
    return num
}



function setTurn() {
    return randomIntFromInterval(0, 1) ? 'Ход крестиков' : 'Ход ноликов'
}

function targetInit(currentName, targetElem, char) {
    targetElem.innerHTML = char
    document.querySelector('.result').innerHTML = ''
    document.querySelectorAll('.game__block').forEach(i => {
        targetElem.innerHTML == 'X' ? targetElem.style.color = '#FF1744' : targetElem.style.color = '#2979FF'
    })
    targetElem.style.pointerEvents = 'none'
    moveCounter++
    return currentName;
}



function itemStep(arr, targetElem, increaseObjectTurns, turn) {
    arr.push(targetElem.getAttribute("data-item"))
    let transformedArr = arr
        .sort((a, b) => a - b)
        .map(i => +i)
    turnText.innerHTML = turn
    increaseObjectTurns.counterOfTurns++;
    return transformedArr
}

function endOfTheRound(blockName, increaseObjectWins) {
    turnText.innerHTML = `Игра завершена победой ${blockName}`
    document.querySelectorAll('.game__block').forEach(i => {
        i.style.pointerEvents = 'none'
    })
    increaseObjectWins.counterOfWins++
    moveCounter = 0;
    arrayOfCrossDatas = []
    arrayOfZeroDatas = []
}



function startRound(turn, currentTarget) {
    setTimeout(() => {
        turnText.innerHTML = `${turn}`
        document.querySelector('.result').innerHTML = `X ${playerCross?.counterOfWins}:${playerZero?.counterOfWins} O`
        currentTarget.style.pointerEvents = 'all'
        document.querySelectorAll('.game__block').forEach(i => {
            i.innerHTML = '';
            i.style.pointerEvents = 'all'
        })

    }, 2000);
}

function draw(currentTarget) {
    turnText.innerHTML = 'Игра завершена ничьей !'
    moveCounter = 0;
    arrayOfCrossDatas = []
    arrayOfZeroDatas = []
    startRound(setTurn(), currentTarget)
}
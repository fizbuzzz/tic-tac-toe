const winCombinations = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9],
    [1, 4, 7], [2, 5, 8], [3, 6, 9],
    [1, 5, 9], [3, 5, 7],
]



function randomIntFromInterval(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1) + min)
    return num
}



const playerZero = {
    counterOfWins: 0,
    counterOfTurns: 0,
    playerIndex: 1,
    turn: false,
}


const playerCross = {
    counterOfWins: 0,
    counterOfTurns: 0,
    playerIndex: 2,
    turn: false,
    setTurn: function () {
        const int = randomIntFromInterval(playerZero.playerIndex, this.playerIndex)
        
        if (int == this.playerIndex) {
            this.turn = !this.turn;
        } else {
            playerZero.turn = !playerZero.turn
        };
    }

}
playerCross.setTurn()


// setTimeout(() => {
//     playerRed.turn ?
//     document.body.style.background = 'red':
//     document.body.style.background = 'blue' 
// }, 2000);

function hepler(arg) {
    switch (arg) {
        case true:
            return 'Ход крестиков';
        default:
            return 'Ход ноликов';
    }
}

const turnText = document.querySelector('.turn');

document.querySelector('.game__wrapper').style.pointerEvents = 'none'
setTimeout(() => {
    turnText.innerHTML = hepler(playerCross.turn)
    document.querySelector('.game__wrapper').style.pointerEvents = 'all'
}, 2000);




(function(){
    let arrayOfCrossDatas = [];
    let arrayOfZeroDatas = [];
    let moveCounter = 0
    document.querySelector('.game__wrapper').addEventListener('click', (e) => {
        const {target,currentTarget} = e;
        // console.log(target)
        if (target.classList[0] === 'game__block') {
            if (turnText.textContent === 'Ход крестиков') {
                let blockName = 'крестиков'
                target.innerHTML = 'X'
                document.querySelectorAll('.game__block').forEach(i => {
                    if (target.innerHTML == 'X') {
                        target.style.color = '#FF1744'
                    } 
                })
                moveCounter++
                target.style.pointerEvents = 'none'
                arrayOfCrossDatas.push(target.getAttribute("data-item"))
                let transformedArr = arrayOfCrossDatas
                .sort((a,b) => a-b)
                .map(i => +i)
                turnText.innerHTML = 'Ход ноликов'
                playerCross.counterOfTurns++;
                if(playerCross.counterOfTurns >=3) {
                    const newArr = winCombinations.map(i => transformedArr.filter(elem => i.includes(elem)))
                    newArr.forEach(i => {
                        if (i.length === 3) {
                            turnText.innerHTML = `Игра завершена победой ${blockName}`
                            moveCounter = 0 
                            document.querySelectorAll('.game__block').forEach(i => {
                                i.style.pointerEvents = 'none'
                            })
                            playerCross.counterOfWins++
                            setTimeout(() => {
                                turnText.innerHTML = `X ${playerCross.counterOfWins} : ${playerZero.counterOfWins} O`
                                currentTarget.style.pointerEvents = 'all'
                                document.querySelectorAll('.game__block').forEach(i => {
                                    i.innerHTML = '';
                                    i.style.pointerEvents = 'all'
                                })
                                
                                arrayOfCrossDatas = []
                                arrayOfZeroDatas = []
                            }, 2000);
                        } else if (i.length < 3 && moveCounter >= 9) {
                            console.log(moveCounter)
                            console.log(i.length)
                            turnText.innerHTML = 'Игра завершена ничьей !'
                            moveCounter = 0 
                            setTimeout(() => {
                                turnText.innerHTML = `X ${playerCross.counterOfWins} : ${playerZero.counterOfWins} O`
                                currentTarget.style.pointerEvents = 'all'
                                document.querySelectorAll('.game__block').forEach(i => {
                                    i.innerHTML = '';
                                    i.style.pointerEvents = 'all'
                                })
                                
                                arrayOfCrossDatas = []
                                arrayOfZeroDatas = []
                            }, 2000);
                        }
                    })
                }

                
            } else {
                let blockName = 'ноликов'
                target.innerHTML = 'O'
                document.querySelectorAll('.game__block').forEach(i => {
                    if (target.innerHTML == 'O') {
                        target.style.color = '#2979FF'
                    } 
                })
                moveCounter++

                target.style.pointerEvents = 'none'
                arrayOfZeroDatas.push(target.getAttribute("data-item"))
                let transformedArr = arrayOfZeroDatas
                .sort((a,b) => a - b)
                .map(i => +i)
                turnText.innerHTML = 'Ход крестиков'
                playerZero.counterOfTurns++;
                if(playerZero.counterOfTurns >=3) {
                    const newArr = winCombinations.map(i => transformedArr.filter(elem => i.includes(elem)))
                    newArr.forEach(i => {
                        if (i.length === 3) {
                            turnText.innerHTML = `Игра завершена победой ${blockName}`
                            moveCounter = 0
                            document.querySelectorAll('.game__block').forEach(i => {
                                i.style.pointerEvents = 'none'
                            })
                            playerZero.counterOfWins++
                            setTimeout(() => {
                                turnText.innerHTML = `X ${playerCross.counterOfWins} : ${playerZero.counterOfWins} O`
                                currentTarget.style.pointerEvents = 'all'
                                document.querySelectorAll('.game__block').forEach(i => {
                                    i.innerHTML = '';
                                    i.style.pointerEvents = 'all'
                                })
                                
                                arrayOfCrossDatas = []
                                arrayOfZeroDatas = []
                            }, 2000);
                        } else if (i.length < 3 && moveCounter >= 9) {
                            turnText.innerHTML = 'Игра завершена ничьей !'
                            moveCounter = 0 
                            setTimeout(() => {
                                turnText.innerHTML = `X ${playerCross.counterOfWins} : ${playerZero.counterOfWins} O`
                                currentTarget.style.pointerEvents = 'all'
                                document.querySelectorAll('.game__block').forEach(i => {
                                    i.innerHTML = '';
                                    i.style.pointerEvents = 'all'
                                })
                                
                                arrayOfCrossDatas = []
                                arrayOfZeroDatas = []
                            }, 2000);
                        }
                    })
                }

                
                
            }
        } 
    })
}())

            

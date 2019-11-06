const buttons = document.querySelectorAll('button')
const output = document.querySelector('.output')
const result = document.querySelector('.result')
const btnYellow = document.querySelectorAll('.yellow')
let resultStore
let arrayNum = []
let arrayNumTwo = []

const arrayNumAdj = []

let number = 0
let numberTwo = 0
let action = 0
let memory = 0

function calculate(one, two) {
    one = Number(one)
    two = Number(two)
    if (action == '+') {
        resultStore = one + two
    } else if (action == '-') {
        resultStore = one - two
    } else if (action == '/') {
        resultStore = one / two
    } else if (action == 'x') {
        resultStore = one * two
    } else if (action == 'Mod') {
        resultStore = one % two
    }

    number = resultStore
    action = 0
    numberTwo = 0
    arrayNum = []
    arrayNumTwo = []
}

const clearResult = () => {
    number = 0
    resultStore = 0
    action = 0
    numberTwo = 0
    arrayNum = []
    arrayNumTwo = []
    output.innerHTML = ''
}

clearResult()


function is_numeric(str) {
    return /^\d+$/.test(str);
}

document.addEventListener('keydown', function (event) {
    if (event.shiftKey && event.keyCode === 187) {
        document.querySelector('.add').click()

    } else if (event.shiftKey && event.keyCode === 56) {
        document.querySelector('.multiply').click()

    }
});

document.onkeydown = function (e) {
    e = e || window.event;
    switch (e.which || e.keyCode || e.key) {
        case 49:
            document.querySelector('.one').click()
            break;
        case 50:
            document.querySelector('.two').click()
            break;
        case 51:
            document.querySelector('.three').click()
            break;
        case 52:
            document.querySelector('.four').click()
            break;
        case 53:
            document.querySelector('.five').click()
            break;
        case 54:
            document.querySelector('.six').click()
            break;
        case 55:
            document.querySelector('.seven').click()
            break;
        case 56:
            if (e.keyCode == 56 && !e.shiftKey) {
                document.querySelector('.eight').click()
            }
            break;
        case 57:
            document.querySelector('.nine').click()
            break;
        case 48:
            document.querySelector('.zero').click()
            break;
        case 188:
            document.querySelector('.comma').click()
            break;
        case 190:
            document.querySelector('.comma').click()
            break;
        case 191:
            document.querySelector('.divide').click()
            break;
        case 189:
            document.querySelector('.subtract').click()
            break;
        case 13: //BUG!!
            document.querySelector('.equal').click()
            break;
        case 8:
            if (action == 0) {
                arrayNum.pop()
                number = arrayNum.join('')
                output.innerHTML = number
            } else {
                arrayNumTwo.pop()
                numberTwo = arrayNumTwo.join('')
                output.innerHTML = numberTwo
            }
            break;
    }
}

// document.onkeydown = function (e) {
//     if (e.key) {

//         console.log(e.keyCode);

//     }
// }





buttons.forEach(e => {
    e.addEventListener('click', event => {
        const contentItem = event.target.textContent
        const className = event.target.getAttribute("class")
        if (is_numeric(contentItem) && action == 0) {
            if (resultStore != 0) {
                clearResult()
            }
            arrayNum.push(contentItem)

            if (output.innerText == '-') {

                arrayNum[0] = Number(arrayNum[0]) * -1
            }
            number = arrayNum.join('')
            output.innerHTML = number


        } else if (is_numeric(contentItem) && action != 0) {
            arrayNumTwo.push(contentItem)
            if (output.innerText == '-') {

                arrayNumTwo[0] = Number(arrayNumTwo[0]) * -1
            }
            numberTwo = arrayNumTwo.join('')
            output.innerHTML = numberTwo

        } else if (contentItem == '=') {
            calculate(number, numberTwo)
            output.innerHTML = resultStore

        } else if (contentItem == '+/-') {
            if (output.innerHTML == '') {
                output.innerHTML = '-'

            } else if (resultStore != 0) {
                clearResult()
                output.innerHTML = '-'

            } else if (action == 0) {
                arrayNum[0] = arrayNum[0] * -1

                number = number * -1
                output.innerHTML = number

            } else if (action != 0 && numberTwo == 0) {
                output.innerHTML = '-'
            } else if (action != 0 && numberTwo != 0) {
                arrayNumTwo[0] = arrayNumTwo[0] * -1

                numberTwo = numberTwo * -1
                output.innerHTML = numberTwo
            }

        } else if (contentItem == 'AC') {
            clearResult()
        } else if (contentItem == 'M+') {
            memory = output.innerHTML
        } else if (contentItem == 'MR' && memory != 0) {
            if (action == 0) {
                number = memory
            } else {
                numberTwo = memory
            }
            output.innerHTML = memory

        } else if (contentItem == 'MR' && memory == 0) {
            return null

        } else if (contentItem == 'MC') {
            memory = 0
        } else if (contentItem == '%') {
            if (action == 0 && number != 0) {
                arrayNum[0] = arrayNum[0] / 10
                number = number / 10
                output.innerHTML = number

            } else if (action != 0 && numberTwo != 0) {
                numberTwo = numberTwo / 100 * number
                arrayNumTwo = []
                output.innerHTML = numberTwo
            }

        } else if (contentItem == ',') {
            if (output.innerHTML == '') {
                arrayNum[0] = '0.'
                output.innerHTML = '0.'
            } else if (resultStore != 0) {
                clearResult()
                arrayNum[0] = '0.'
                output.innerHTML = '0.'
            } else if (action == 0 && arrayNum[0]) {
                arrayNum[1] = '.'
                output.innerHTML = number + '.'

            } else if (action != 0 && arrayNumTwo[0]) {
                arrayNumTwo[1] = '.'
                output.innerHTML = numberTwo + '.'
            }

            //BUG!!!
        } else if (className == 'backspace' && action == 0) {
            console.log('press');

            arrayNum.pop()
            number = arrayNum.join('')
            output.innerHTML = number

        } else if (event.target.classList.contains("backspace") && action != 0) {
            console.log('pressTwo');

            arrayNumTwo.pop()
            numberTwo = arrayNumTwo.join('')
            output.innerHTML = numberTwo
        } else {
            action = contentItem

        }


    })
})

btnYellow.forEach(e => {
    e.addEventListener('click', event => {
        console.log(event);
//BUG//
        if (event.target.classList.contains('active')) {
            event.target.classList.remove('active')
            action = 0
            console.log('remove');
        } else if (!event.target.classList.contains('active') && !event.target.classList.contains('equal')) {
            console.log('add');
            btnYellow.forEach(e => {
                e.classList.remove('active')
            })
            event.target.classList.add('active')
        } else if (event.target.classList.contains('equal')) {
            btnYellow.forEach(e => {
                e.classList.remove('active')
            })
        } else if (event.target.classList.contains('clear')){
            btnYellow.forEach(e => {
                e.classList.remove('active')
            })
        }
    })
})

buttons.forEach(e => {
    e.addEventListener('mousedown', event => {
        event.target.classList.add('active')
    })
})

buttons.forEach(e => {
    e.addEventListener('mouseup', event => {
        event.target.classList.remove('active')
    })
})
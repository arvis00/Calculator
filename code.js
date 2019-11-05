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
    } else if (action == '*') {
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

function is_numeric(str) {
    return /^\d+$/.test(str);
}

clearResult()

// btnYellow.forEach(e => {
//     e.addEventListener('click', event => {
//         event.target.classList.add('active')

//     })
// })


btnYellow.forEach(e => {
    e.addEventListener('click', event => {
        if (event.target.classList.contains('active')) {
            event.target.classList.remove('active')
        } else {
        event.target.classList.add('active')

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



buttons.forEach(e => {
    e.addEventListener('click', event => {
        const contentItem = event.target.textContent
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


        } else {
            action = contentItem

        }


    })
})
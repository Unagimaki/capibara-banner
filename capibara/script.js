let introButton = document.querySelector('.intro_button')
let introInner = document.querySelector('.intro_inner')
let gameInner = document.querySelector('.game_inner')
let container = document.querySelector('.container')
let gameTitle = document.querySelector('.game_title')
let endTitle = document.querySelector('.end_title')
let wrapper = document.querySelector('.wrapper')
let end = document.querySelector('.end')
let endImg = document.querySelector('.end_img')


let stage = 1

function smoothEnd(element) {
    element.classList.add('smooth-end')
}
function smoothStart(element) {
    element.classList.add('smooth-start')
}

function slide() {
    smoothEnd(introInner)
    setTimeout(() => {
        introInner.classList.remove('flex')
        introInner.classList.add('none')
        gameInner.classList.remove('none')
        smoothStart(gameInner)
    }, 1000)
}


introButton.addEventListener('click', () => {
    slide()
    loadGame()
})
let title = [
    'как проведёте вечер пятницы?',
    'что вкуснее?',
    'вы предпочли бы лежать:',
]
let final = [

]
let height = [
    49.38,
    47,
    47
]

function loadGame() {
    container.style.height = height[stage-1] + 'vw'
    let html = ''
    gameTitle.innerHTML = title[stage-1]
    smoothStart(gameTitle)
    if (stage === 1) {
        html = 
        `
        <div class="check_container">
            <input type="checkbox" class="custom-checkbox" id="green" name="happy">
            <label for="green">созерцая листочки, <br> падающие на водную гладь</label>
        </div>
        <div class="check_container">
            <input type="checkbox" class="custom-checkbox" id="blue" name="happy">
            <label for="blue">гуляя по достопримечательностям <br> местного пруда</label>
        </div>
        <div class="check_container">
            <input type="checkbox" class="custom-checkbox" id="yellow" name="happy">
            <label for="yellow">слушая эпизод подкаста <br> про серийных поедателей клубней</label>
        </div>
        <div class="check_container">
            <input type="checkbox" class="custom-checkbox" id="red" name="happy">
            <label for="red">на открытии нового <br> горячего источника</label>
        </div>

        `
    } else if (stage === 2) {
        html = 
        `
        <div class="check_container">
            <input type="checkbox" class="custom-checkbox" id="blue" name="happy">
            <label for="blue">клубни су-вид <br> с гарниром из коры дуба</label>
        </div>
        <div class="check_container">
            <input type="checkbox" class="custom-checkbox" id="red" name="happy">
            <label for="red">энергия солнца</label>
        </div>
        <div class="check_container">
            <input type="checkbox" class="custom-checkbox" id="yellow" name="happy">
            <label for="yellow">блюда, приготовленное <br> своими лапками</label>
        </div>
        <div class="check_container">
            <input type="checkbox" class="custom-checkbox" id="green" name="happy">
            <label for="green">арбузик</label>
        </div>

        `
    } else if (stage === 3) {
        html = 
        `
        <div class="check_container">
            <input type="checkbox" class="custom-checkbox" id="yellow" name="happy">
            <label for="yellow">с интересной книжкой в лапках</label>
        </div>
        <div class="check_container">
            <input type="checkbox" class="custom-checkbox" id="red" name="happy">
            <label for="red">под звёздным небом</label>
        </div>
        <div class="check_container">
            <input type="checkbox" class="custom-checkbox" id="green" name="happy">
            <label for="green">на кувшинке посреди тихого пруда</label>
        </div>
        <div class="check_container">
            <input type="checkbox" class="custom-checkbox" id="blue" name="happy">
            <label for="blue">какое лежать? вокруг слишком <br> много интересного!</label>
        </div>

        `
    }
    smoothStart(container)
    container.innerHTML = html
    document.querySelectorAll('.custom-checkbox').forEach((item) => {
        item.addEventListener('click', (e) => {
            if (item.hasAttribute('checked')) {
                return
            } else {
                loadSlide(item, e)
            }
        })
    })
}



function loadSlide(item, e) {
    e.target.setAttribute('checked', 'checked')
    let color = e.target.id
    final.push(color)
    stage++
    if (stage === 4) {
        setTimeout(() => {
            smoothEnd(container)
            smoothEnd(gameTitle)
            setTimeout(() => {
                loadEnd()
            }, 1000)
        }, 1000)
    } else  {
        item.setAttribute('checked', 'checked')
        setTimeout(() => {
            smoothEnd(container)
            smoothEnd(gameTitle)
            setTimeout(() => {
                container.classList.remove('smooth-end')
                container.classList.remove('smooth-start')
                gameTitle.classList.remove('smooth-end')
                gameTitle.classList.remove('smooth-start')
                loadGame()    
            }, 1000)
        }, 1000)
    }
}

function identical(array) {
    if (array[0] === array[1] ) {
        return array[0]
    } else if (array[1] === array[2]) {
        return array[1]
    }
    else if (array[0] === array[2]) {
        return array[0]
    } else {
        return 'curious'
    }
}
let endBack = [
    '/images/back-green.png',
    '/images/back-blue.png',
    '/images/back-yellow.png',
    '/images/back-red.png',
    '/images/back-end.png',
]


function loadEnd() {
    let span = document.querySelector('.end_span')
    let color = identical(final)
    smoothEnd(wrapper)
    setTimeout(() => {
        wrapper.remove()
        end.classList.remove('none')
        smoothStart(end)
    }, 1000)
    if (color === 'green') {
        endTitle.innerHTML = 'Вы - капибара на чиле'
        span.innerHTML = 'Залипнуть'
        endImg.setAttribute('src', `${endBack[0]}`)
    } else if (color === 'blue') {
        endTitle.innerHTML = 'Вы - впечатлительная капибара'
        span.innerHTML = 'Удивиться'
                endImg.setAttribute('src', `${endBack[1]}`)
    } else if (color === 'yellow') {
        endTitle.innerHTML = 'вы — преисполнившаяся капибара'
        span.innerHTML = 'Научиться'
                endImg.setAttribute('src', `${endBack[2]}`)
    } else if (color === 'red') {
        endTitle.innerHTML = 'вы — мечтательная капибара'
        span.innerHTML = 'Вдохновиться'
        endImg.setAttribute('src', `${endBack[3]}`)
        endImg.style.width = 43 + 'vw'
    } else if (color === 'curious') {
        endTitle.innerHTML = 'вы — любопытная капибара'
        span.innerHTML = 'Быть в курсе'
        endImg.setAttribute('src', `${endBack[4]}`)
        endImg.style.width = 52 + 'vw'
    }
}
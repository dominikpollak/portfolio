const carousel = document.getElementById('carousel')
const counterWrapper = document.getElementById('counter-wrapper')
const counter = document.getElementById('counter')
const counterNum = document.getElementsByClassName('counterNum')
const heading = document.getElementById('heading')
const images = document.querySelectorAll('.image')
const viewportWidth = window.innerWidth || document.documentElement.clientWidth;


window.onload = function () {

    carousel.animate({
        transform: `translateY(-45%)`,
        left : '42%',
    }, { duration: 2500, fill: 'forwards', easing: "cubic-bezier(0.25, 0.1, 0.25, 1)" })

    counterWrapper.style.color = 'white'
    for (const num of counterNum) {
        num.style.color = 'white'
    }

    heading.style.color = 'white'
}


for (const img of images) {
    img.addEventListener('click', () => {

        for (const img of images) {
            img.classList.add('minimized')
        }
        carousel.classList.add('minimized')
        counterWrapper.style.color = 'transparent'
        for (const num of counterNum) {
            num.style.color = 'transparent'
        }

        img.classList.add('maximized')

    })

}

window.onmousemove = e => {

    if (carousel.dataset.mouseDownAt === '0') return;

    if ((parseFloat(carousel.dataset.mouseDownAt) - e.clientX) !== 0) {

        carousel.classList.remove('minimized')
        counterWrapper.style.color = 'white'

        for (const num of counterNum) {
            num.style.color = 'white'
        }

        for (const img of images) {
            img.classList.remove('maximized')
            img.classList.remove('minimized')
        }

    }

    const mouseDelta = parseFloat(carousel.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth

    let percentage = (mouseDelta / maxDelta) * -100,
        nextPercentage = parseFloat(carousel.dataset.prevPercentage) + percentage;

    if (nextPercentage >= 0) nextPercentage = 0
    if (nextPercentage <= -96.5) nextPercentage = -96.6

    counter.animate({
        transform: `translateY(${nextPercentage * 0.99377593361}%)`
    }, { duration: 900, delay: 300, fill: 'forwards', easing: "cubic-bezier(0.25, 0.1, 0.25, 1)" })


    carousel.dataset.percentage = nextPercentage

    carousel.animate({
        transform: `translate(${nextPercentage}%, -45%)`
    }, { duration: 2200, fill: 'forwards' })

    for (const img of carousel.getElementsByClassName("image")) {
        img.animate({
            objectPosition: `${nextPercentage + 100}% 50%`
        }, { duration: 2200, fill: 'forwards' })

    }
}


window.addEventListener('wheel', (e) => {

    carousel.classList.remove('minimized')
    counterWrapper.style.color = 'white'
    for (const num of counterNum) {
        num.style.color = 'white'
    }

    for (const img of images) {
        img.classList.remove('maximized')
        img.classList.remove('minimized')
    }

    let prevValue = parseFloat(carousel.dataset.prevPercentage)
    let value = prevValue

    if (e.deltaY > 0) {
        value += 0.2
    }
    else {
        value -= 0.2
    }

    if (value >= 0) value = 0
    if (value <= -96.6) value = -96.6

    counter.animate({
        transform: `translateY(${value * 0.99377593361}%)`
    }, { duration: 800, delay: 200, fill: 'forwards', easing: "cubic-bezier(0.1, 0, 1, 1)" })


    carousel.dataset.prevPercentage = value;

    carousel.animate({
        transform: `translate(${value}%, -45%)`
    }, { duration: 2200, fill: 'forwards', easing: "cubic-bezier(0.1, 0, 1, 1)" })

    for (const img of carousel.getElementsByClassName("image")) {
        img.animate({
            objectPosition: `${value + 100}% 50%`
        }, { duration: 900, fill: 'forwards' })

    }

});

window.onmousedown = e => {
    carousel.dataset.mouseDownAt = e.clientX;
}

window.onmouseup = () => {
    carousel.dataset.mouseDownAt = '0'
    carousel.dataset.prevPercentage = carousel.dataset.percentage
}

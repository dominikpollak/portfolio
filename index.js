const carousel = document.getElementById('carousel')
const counter = document.getElementById('counter')
const counterNum = document.getElementById('counterNum')
const heading = document.getElementById('heading')
const images = document.querySelectorAll('.image')
const viewportWidth = window.innerWidth || document.documentElement.clientWidth;


window.onload = function () {

    carousel.classList.add('show')

    counter.style.color = 'white'

    heading.style.color = 'white'
}

for (const img of images) {
    img.addEventListener('click', () => {

        // carousel.classList.remove('show')
        for (const img of images) {
            img.classList.add('minimized')
        }
        carousel.classList.add('minimized')
        counter.style.color = 'transparent'

        img.classList.add('maximized')

    })

}

window.onmousemove = e => {

    if (carousel.dataset.mouseDownAt === '0') return;

    if ((parseFloat(carousel.dataset.mouseDownAt) - e.clientX) !== 0) {

        carousel.classList.remove('minimized')
        carousel.classList.add('show')
        counter.style.color = 'white'

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
                transform: `translateY(${nextPercentage * 0.994813278}%)`
            }, { duration: 400, delay: 200, fill: 'forwards' })
        

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
    carousel.classList.add('show')
    counter.style.color = 'white'

    for (const img of images) {
        img.classList.remove('maximized')
        img.classList.remove('minimized')
    }

    let prevValue = parseFloat(carousel.dataset.prevPercentage)
    let value = prevValue

    if (e.deltaY > 0) {
        value += 0.25
    }
    else {
        value -= 0.25
    }

    if (value >= 0) value = 0
    if (value <= -96.6) value = -96.6

        counter.animate({
            transform: `translateY(${value * 0.994813278}%)`
        }, { duration: 400, delay: 200, fill: 'forwards' })
    

    carousel.dataset.prevPercentage = value;

    carousel.animate({
        transform: `translate(${value}%, -45%)`
    }, { duration: 900, fill: 'forwards' })

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

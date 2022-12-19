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

    if (nextPercentage <= -96.4){
        nextPercentage = -96.4
    }

    else if (nextPercentage >= 0.2) {
        nextPercentage = 0
        // counter.style.transform =  `translateY(${100.2 + nextPercentage}%)`
    }

    else{
        counter.animate({
            transform: `translateY(${100.2 + nextPercentage}%)`
        }, { duration: 400, delay: 200, fill: 'forwards' })
    
    }
    console.log(nextPercentage)
   

    // counter.style.transform = `scale(${((nextPercentage * -1) / 130) + 1.1})`

   

    // if (nextPercentage < -94.5) counterNum.textContent = 25

    // else if (nextPercentage < -50) {
    //     counterNum.textContent = `${Math.floor((nextPercentage * -1) / 3.93) + 1}`
    // }
    // else {
    //     counterNum.textContent = `${Math.floor((nextPercentage * -1) / 3.856) + 1}`

    // }


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
    if (value <= -96.4) value = -96.4

    if (value >= 0.2) {
        value = 0
        // counter.style.transform =  `translateY(${100.2 + value}%)`
    }

    console.log('value',value)
    if(value <= -96.35){
        counter.style.transform =  'translateY(13.8)%'
    }

    else{
        counter.animate({
            transform: `translateY(${100.2 + value}%)`
        }, { duration: 400, delay: 200, fill: 'forwards' })
    
    }

    // if (value < -94.5) counterNum.textContent = 25

    // else if (value < -50) {
    //     counterNum.textContent = `${Math.floor((value * -1) / 3.93) + 1}`
    // }
    // else {
    //     counterNum.textContent = `${Math.floor((value * -1) / 3.856) + 1}`

    // }

    // counter.style.transform = `scale(${((value * -1) / 130) + 1.1})`

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

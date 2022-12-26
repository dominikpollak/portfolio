const carousel = document.getElementById('carousel')
const counterWrapper = document.getElementById('counter-wrapper')
const counter = document.getElementById('counter')
const counterNum = document.getElementsByClassName('counterNum')
const heading = document.getElementById('heading')
const subheading = document.getElementById('subheading')
const images = document.querySelectorAll('.image')
const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
const arrowRight = document.getElementById('arrow-right')
const arrowLeft = document.getElementById('arrow-left')
const arrows = document.getElementById('arrows')
const label = document.querySelector('#img-label')

let mouseMoved = false

const imageWidth = 280


const minimizedImages = () => {
    //triggers when user scrolls the carousel anyhow
    //it minimizes all photos and brings back the counter with the heading

    label.innerHTML = '&nbsp;'
    label.classList.remove('active')

    heading.classList.add('active')
    subheading.classList.add('active')
    arrows.classList.add('active')
    counterWrapper.style.color = 'white'

    for (const num of counterNum) {
        num.style.color = 'white'
    }
    for (const img of images) {
        img.classList.remove('maximized')
    }
}


window.onload = function () {

    counter.animate({
        transform: `translateY(0%)`,
    }, { duration: 2500, fill: 'forwards', easing: "cubic-bezier(0.25, 0.1, 0.25, 1)" })


    carousel.animate({
        transform: `translateY(-45%)`,
        left: '42%',
    }, { duration: 2500, fill: 'forwards', easing: "cubic-bezier(0.25, 0.1, 0.25, 1)" })

    counterWrapper.style.color = 'white'
    for (const num of counterNum) {
        num.style.color = 'white'
    }

    heading.classList.add('active')

    subheading.classList.add('active')
    arrows.classList.add('active')

    label.classList.add('ready')


    arrowLeft.animate({
        transform: 'scale(0)'
    }, { duration: 1500, fill: 'forwards' })
}

window.onmousemove = e => {

    if (carousel.dataset.mouseDownAt === '0') return;

    mouseMoved = true

    minimizedImages()

    const mouseDelta = parseFloat(carousel.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 0.7

    let percentage = (mouseDelta / maxDelta) * -100,
        nextPercentage = parseFloat(carousel.dataset.prevPercentage) + percentage;

    if (nextPercentage >= 0) {
        nextPercentage = 0
        arrowLeft.animate({
            transform: 'scale(0)'
        }, { duration: 1000, fill: 'forwards' })
    }
    else {
        arrowLeft.animate({
            transform: 'scale(1)'
        }, { duration: 1000, fill: 'forwards' })
    }

    if (nextPercentage <= -96.5) {
        nextPercentage = -96.6
        arrowRight.animate({
            transform: 'scale(0)'
        }, { duration: 1000, fill: 'forwards' })
    }
    else {
        arrowRight.animate({
            transform: 'scale(1)'
        }, { duration: 1000, fill: 'forwards' })
    }

    //number counter logic
    for (let i = 0; i < counterNum.length; i++) {
        //
        //
        //
        //
        if ((nextPercentage - 1.8) * -1 < 4.025 + i * 4.025) {
            counter.animate({
                transform: `translateY(${-24.51 * i}px)`
            }, { duration: 1300, delay: 400, fill: 'forwards', easing: "cubic-bezier(0, 0, 0.58, 1)" });
            break;
        }
    }

    carousel.dataset.percentage = nextPercentage

    carousel.animate({
        transform: `translate(${nextPercentage}%, -45%)`
    }, { duration: 3000, fill: 'forwards', easing: "cubic-bezier(0, 0, 0.58, 1)" })

}


window.addEventListener('wheel', (e) => {

    minimizedImages()

    let value = parseFloat(carousel.dataset.prevPercentage)

    //horizontal and vertical scrolling
    value += e.deltaY / 30 + (e.deltaX * -1) / 30

    if (value >= 0) {
        value = 0
        arrowLeft.animate({
            transform: 'scale(0)'
        }, { duration: 1500, fill: 'forwards' })
    }

    else {
        arrowLeft.animate({
            transform: 'scale(1)'
        }, { duration: 1500, fill: 'forwards' })
    }

    if (value <= -96.5) {
        value = -96.6
        arrowRight.animate({
            transform: 'scale(0)'
        }, { duration: 1500, fill: 'forwards' })
    }

    else {
        arrowRight.animate({
            transform: 'scale(1)'
        }, { duration: 1500, fill: 'forwards' })
    }

    //number counter logic
    for (let i = 0; i < counterNum.length; i++) {

        if ((value - 1.8) * -1 < 4.025 + i * 4.025) {
            counter.animate({
                transform: `translateY(${-24.51 * i}px)`
            }, { duration: 1300, delay: 400, fill: 'forwards', easing: "cubic-bezier(0, 0, 0.58, 1)" });
            break;
        }
    }


    carousel.dataset.prevPercentage = value;

    carousel.animate({
        transform: `translate(${value}%, -45%)`
    }, { duration: 3000, fill: 'forwards', easing: "cubic-bezier(0, 0, 0.58, 1)" })

    for (const img of carousel.getElementsByClassName("image")) {
        img.animate({
            objectPosition: `${value + 100}% 50%`
        }, { duration: 900, fill: 'forwards' })

    }
});

window.onmousedown = e => {

    if (!mouseMoved) {
        //maximizes and centers the image, also gets rid of the heading and counter temporarily
        for (let i = 0; i < images.length; i++) {
            images[i].addEventListener('mouseup', () => {
                console.log(i)
                if (mouseMoved) return;

                for (const image of images) {
                    image.classList.remove('maximized')

                    image.animate({
                        objectPosition: `${(-3.8 * (i + 1)) + 100}% 50%`
                    }, { duration: 900, fill: 'forwards' })

                }

                label.classList.add('active')

                setTimeout(() => {
                    label.innerText = images[i].dataset.label
                }, 450)

                arrows.classList.remove('active')
                heading.classList.remove('active')
                subheading.classList.remove('active')
                counterWrapper.style.color = 'transparent'

                for (const num of counterNum) {
                    num.style.color = 'transparent'
                }

                // carousel.dataset.percentage = -3.71538461538 * (i + 1)
                carousel.dataset.percentage = (((imageWidth + 24) * (i+0.5)) * -1) / 78.876811594203

                console.log(imageWidth)

                carousel.animate({
                    transform: `translate(${((imageWidth + 24) * (i + 1.25)) * -1}px, -45%)`
                }, { duration: 1200, fill: 'forwards', easing: "cubic-bezier(0, 0, 0.58, 1)" })

                images[i].classList.add('maximized')
            });
        }
    }
    carousel.dataset.mouseDownAt = e.clientX;
}

window.onmouseup = e => {

    mouseMoved = false

    carousel.dataset.mouseDownAt = '0';
    carousel.dataset.prevPercentage = carousel.dataset.percentage;

};



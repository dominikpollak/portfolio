const carousel = document.getElementById('carousel')
const counterWrapper = document.getElementById('counter-wrapper')
const counter = document.getElementById('counter')
const counterNum = document.getElementsByClassName('counterNum')
const heading = document.getElementById('heading')
const subheading = document.getElementById('subheading')
const images = document.querySelectorAll('.image')
const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
// const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
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
    arrows.classList.add('active')
    counterWrapper.style.color = 'white'
    heading.classList.add('active')
    subheading.classList.add('active')

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
        transform: `translateY(-46%)`,
        left: '40%',
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
    }

    if (nextPercentage >= -1.2) {
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
    }

    if (nextPercentage <= -95.2) {
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

        if ((nextPercentage - 1.8) * -1 < 4.025 + i * 4.025) {
            counter.animate({
                transform: `translateY(${-4 * i}%)`
            }, { duration: 1300, delay: 400, fill: 'forwards', easing: "cubic-bezier(0, 0, 0.58, 1)" });
            break;
        }
    }

    carousel.dataset.percentage = nextPercentage

    for (const img of images) {
        img.animate({
            objectPosition: `${nextPercentage + 100}% 50%`
        }, { duration: 900, fill: 'forwards' })

    }

    carousel.animate({
        transform: `translate(${nextPercentage}%, -45%)`
    }, { duration: 3000, fill: 'forwards', easing: "cubic-bezier(0, 0, 0.58, 1)" })

}

document.addEventListener('keyup', e => {

    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {

        minimizedImages()
        let value = parseFloat(carousel.dataset.prevPercentage)
        value -= 4.02

    if (value >= 0) {
        value = 0
    }

    if (value >= -1.5) {
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
    }

    if (value <= - 95.2) {
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
                transform: `translateY(${-4 * i}%)`
            }, { duration: 900, delay: 400, fill: 'forwards', easing: "cubic-bezier(0, 0, 0.58, 1)" });
            break;
        }
    }

        carousel.dataset.prevPercentage = value;

        for (const img of images) {
            img.animate({
                objectPosition: `${value + 100}% 50%`
            }, { duration: 900, fill: 'forwards' })
    
        }

        carousel.animate({
            transform: `translate(${value}%, -45%)`
        }, { duration: 900, fill: 'forwards', easing: "cubic-bezier(0, 0, 0.58, 1)" })


    }

    else if (e.key === 'ArrowLeft' || e.key==='ArrowDown') {
        
        minimizedImages()
        let value = parseFloat(carousel.dataset.prevPercentage)
        value += 4.02

    if (value >= 0) {
        value = 0
    }

    if (value >= -1.5) {
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
    }

    if (value <= - 95.2) {
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
                transform: `translateY(${-4 * i}%)`
            }, { duration: 900, delay: 400, fill: 'forwards', easing: "cubic-bezier(0, 0, 0.58, 1)" });
            break;
        }
    }

        carousel.dataset.prevPercentage = value;

        for (const img of images) {
            img.animate({
                objectPosition: `${value + 100}% 50%`
            }, { duration: 900, fill: 'forwards' })
    
        }

        carousel.animate({
            transform: `translate(${value}%, -45%)`
        }, { duration: 900, fill: 'forwards', easing: "cubic-bezier(0, 0, 0.58, 1)" })


    }
})


window.addEventListener('wheel', (e) => {

    minimizedImages()

    let value = parseFloat(carousel.dataset.prevPercentage)

    //horizontal and vertical scrolling
    value += e.deltaY / 30 + (e.deltaX * -1) / 30

    if (value >= 0) {
        value = 0
    }

    if (value >= -1.5) {
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
    }

    if (value <= - 95.2) {
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
                transform: `translateY(${-4 * i}%)`
            }, { duration: 1300, delay: 400, fill: 'forwards', easing: "cubic-bezier(0, 0, 0.58, 1)" });
            break;
        }
    }


    carousel.dataset.prevPercentage = value;

    carousel.animate({
        transform: `translate(${value}%, -45%)`
    }, { duration: 3000, fill: 'forwards', easing: "cubic-bezier(0, 0, 0.58, 1)" })

    for (const img of images) {
        img.animate({
            objectPosition: `${value + 100}% 50%`
        }, { duration: 900, fill: 'forwards' })

    }
});

window.onmousedown = e => {
    carousel.dataset.mouseDownAt = e.clientX;
}

if (!mouseMoved) {

    for (let i = 0; i < images.length; i++) {
        images[i].addEventListener('mouseup', () => {

            if (mouseMoved) return;

            if (!images[i].classList.contains('maximized')) {

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

                for (const image of images) {
                    image.classList.remove('maximized')

                    image.animate({
                        objectPosition: `${(-3.8 * (i + 1)) + 100}% 50%`
                    }, { duration: 900, fill: 'forwards' })
                }

                carousel.dataset.percentage = (((imageWidth + 24) * (i + 0.5)) * -1) / 78.876811594203
                console.log(innerWidth)
                carousel.animate({
                    transform: `translate(${((imageWidth + 24) * (i + (innerWidth / 1180.32786885))) * -1}px, -45%)`
                }, { duration: 1200, fill: 'forwards', easing: "cubic-bezier(0, 0, 0.58, 1)" })
            }

            images[i].classList.toggle('maximized')

            //this happens when image gets minimalized with a click
            if (!images[i].classList.contains('maximized')) {

                if (i <= 23) {
                    carousel.dataset.percentage = (((imageWidth + 24) * (i + 1.7)) * -1) / 78.876811594203

                    setTimeout(() => {
                        label.innerText = images[i + 1].dataset.label
                    }, 450)

                    carousel.animate({
                        transform: `translate(${((imageWidth + 24) * (i + 2.25)) * -1}px, -45%)`
                    }, { duration: 1200, fill: 'forwards', easing: "cubic-bezier(0, 0, 0.58, 1)" })

                    images[i + 1].classList.add('maximized')
                }

                else {
                    carousel.dataset.percentage = (((imageWidth + 24) * (i + 0.7)) * -1) / 78.876811594203

                    carousel.animate({
                        transform: `translate(${((imageWidth + 24) * (i)) * -1}px, -45%)`
                    }, { duration: 1200, fill: 'forwards', easing: "cubic-bezier(0, 0, 0.58, 1)" })

                }
            }

        });
    }
}

window.onmouseup = e => {

    carousel.dataset.mouseDownAt = '0';
    carousel.dataset.prevPercentage = carousel.dataset.percentage;
    mouseMoved = false

};



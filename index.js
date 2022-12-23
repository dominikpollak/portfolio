const carousel = document.getElementById('carousel')
const counterWrapper = document.getElementById('counter-wrapper')
const counter = document.getElementById('counter')
const counterNum = document.getElementsByClassName('counterNum')
const heading = document.getElementById('heading')
const images = document.querySelectorAll('.image')
const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
const label = document.getElementById('img-label')


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

    heading.animate({ color: 'white' }, { duration: 4000, fill: 'forwards', easing: "cubic-bezier(0.25, 0.1, 0.25, 1)" })
    // heading.style.color = 'white'
}

window.onmousemove = e => {

    if (carousel.dataset.mouseDownAt === '0') return;

    if ((parseFloat(carousel.dataset.mouseDownAt) - e.clientX) !== 0) {

        // label.style.display = 'none'
        label.classList.remove('active')
        heading.style.display = 'block'
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
        maxDelta = window.innerWidth / 0.7

    let percentage = (mouseDelta / maxDelta) * -100,
        nextPercentage = parseFloat(carousel.dataset.prevPercentage) + percentage;

    if (nextPercentage >= 0) nextPercentage = 0
    if (nextPercentage <= -96.5) nextPercentage = -96.6

    //number counter logic
    for (let i = 0; i < counterNum.length; i++) {

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
    }, { duration: 2200, fill: 'forwards', easing: "cubic-bezier(0, 0, 0.58, 1)" })

    for (const img of carousel.getElementsByClassName("image")) {
        img.animate({
            objectPosition: `${nextPercentage + 100}% 50%`
        }, { duration: 2200, fill: 'forwards' })

    }
}

//pomaly scroll na kolecku 
window.addEventListener('wheel', (e) => {

    let isTrackpad = false
    heading.style.display = 'block'
    label.classList.remove('active')
    // label.style.display = 'none'
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

    console.log(e.deltaY)

    if (e.deltaY > 2 && e.deltaY < 119) { 
        value += 0.3 
    }
    else if (e.deltaY < -2 && e.deltaY > -119) {
        value -= 0.3
    }
    else if (e.deltaY > 119){
        value += 10
    }
    else if (e.deltaY < -119){
        value -+ 10
    }

    if (value >= 0) value = 0
    if (value <= -96.5) value = -96.6

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
    }, { duration: 2200, fill: 'forwards', easing: "cubic-bezier(0, 0, 0.58, 1)" })

    for (const img of carousel.getElementsByClassName("image")) {
        img.animate({
            objectPosition: `${value + 100}% 50%`
        }, { duration: 900, fill: 'forwards' })

    }

});

window.onmousedown = e => {
    carousel.dataset.mouseDownAt = e.clientX;
}

if (parseFloat(carousel.dataset.mouseDownAt) == 0) {

    for (let i = 0; i < images.length; i++) {
        images[i].addEventListener('click', () => {

            for (const image of images) {
                image.classList.remove('maximized')

                image.animate({
                    objectPosition: `${(-3.8 * (i + 1))+100}% 50%`
                }, { duration: 900, fill: 'forwards' })
        
            }

            label.innerText = images[i].dataset.label
            label.classList.add('active')
            heading.style.display = 'none'
            counterWrapper.style.color = 'transparent'
            for (const num of counterNum) {
                num.style.color = 'transparent'
            }

            carousel.animate({
                transform: `translate(${-304.92 * (i + 1.25)}px, -45%)`
            }, { duration: 1200, fill: 'forwards', easing: "cubic-bezier(0, 0, 0.58, 1)" })

            carousel.dataset.prevPercentage = -3.8 * (i + 1)

            // }

            images[i].classList.add('maximized')


        });

    }
}

window.onmouseup = e => {

    // if (parseFloat(carousel.dataset.mouseDownAt) !== 0) {

    //     for (const img of images) {
    //         img.addEventListener('click', () => {

    //             for(const image of images){
    //                 image.classList.remove('maximized')
    //             }

    //             counterWrapper.style.color = 'transparent'
    //             for (const num of counterNum) {
    //                 num.style.color = 'transparent'
    //             }

    //             img.classList.add('maximized')

    //         });
    //     }
    // }

    carousel.dataset.mouseDownAt = '0';
    carousel.dataset.prevPercentage = carousel.dataset.percentage;

};

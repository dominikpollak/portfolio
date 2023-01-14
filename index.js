/* eslint-disable no-undef */

const carousel = document.getElementById('carousel');
const counterWrapper = document.getElementById('counter-wrapper');
const counter = document.getElementById('counter');
const counterNum = document.getElementsByClassName('counterNum');
const heading = document.getElementById('heading');
const subheading = document.getElementById('subheading');
const images = document.querySelectorAll('.image');
// const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
const arrowRight = document.getElementById('arrow-right');
const arrowLeft = document.getElementById('arrow-left');
const arrows = document.getElementById('arrows');
const label = document.querySelector('#img-label');

let mouseMoved = false;
const imageWidth = 280;

function minimizedImages() {
   //triggers when user scrolls the carousel anyhow
   //it minimizes all photos and brings back the counter with the heading
   label.innerHTML = '&nbsp;';
   label.classList.remove('active');
   arrows.classList.add('active');
   gsap.to(counterWrapper, { color: 'white' });
   heading.classList.add('active');
   subheading.classList.add('active');

   gsap.to(counterNum, { color: 'white' });

   for (const img of images) {
      img.classList.remove('maximized');
   }
}

function leftArrowAnimation(value) {
   //make left arrow disappear when user scrolls to the right
   if (value >= -1.5) {
      gsap.to(arrowLeft, {
         scale: 0,
         duration: 1,
      });
   } else {
      gsap.to(arrowLeft, {
         scale: 1,
         duration: 1,
      });
   }
}

function rightArrowAnimation(value) {
   //make right arrow disappear when user scrolls to the right
   if (value <= -95.2) {
      gsap.to(arrowRight, {
         scale: 0,
         duration: 1,
      });
   } else {
      gsap.to(arrowRight, {
         scale: 1,
         duration: 1,
      });
   }
}

window.onload = function () {
   //page on load animations

   gsap.to(counter, {
      transform: `translateY(0%)`,
      duration: 2.5,
      fill: 'forwards',
      ease: Power3.easeOut,
   });

   gsap.to(carousel, {
      transform: `translateY(-46%)`,
      left: '40%',
      duration: 3,
      ease: Power2.easeOut,
   });
   gsap.to(counterWrapper, { color: 'white' });

   gsap.to(counterNum, { color: 'white' });

   heading.classList.add('active');
   subheading.classList.add('active');
   arrows.classList.add('active');
   label.classList.add('ready');

   gsap.to(arrowLeft, {
      scale: 0,
      duration: 3,
   });
};

window.onmousemove = (e) => {
   if (carousel.dataset.mouseDownAt === '0') return;

   mouseMoved = true;

   minimizedImages();

   const mouseDelta = parseFloat(carousel.dataset.mouseDownAt) - e.clientX,
      maxDelta = window.innerWidth / 0.7;

   let percentage = (mouseDelta / maxDelta) * -100,
      nextPercentage = parseFloat(carousel.dataset.prevPercentage) + percentage;

   if (nextPercentage >= 0) {
      nextPercentage = 0;
   }

   leftArrowAnimation(nextPercentage);

   if (nextPercentage <= -96.5) {
      nextPercentage = -96.6;
   }

   rightArrowAnimation(nextPercentage);

   //number counter logic
   for (let i = 0; i < counterNum.length; i++) {
      if ((nextPercentage - 1.8) * -1 < 4.025 + i * 4.025) {
         gsap.to(counter, {
            transform: `translateY(${-4 * i}%)`,
            duration: 0.5,
            delay: 0.6,
            ease: Power2.easeOut,
         });
         break;
      }
   }

   carousel.dataset.percentage = nextPercentage;

   gsap.to(images, {
      objectPosition: `${nextPercentage + 100}% 50%`,
      duration: 3,
      ease: Power3.easeOut,
   });

   gsap.to(carousel, {
      transform: `translate(${nextPercentage}%, -45%)`,
      duration: 2.5,
      ease: Power4.easeOut,
      delay: 0.05,
   });
};

document.addEventListener('keyup', (e) => {
   //carousel scrolling with keys
   if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      minimizedImages();
      let value = parseFloat(carousel.dataset.prevPercentage);
      value -= 4.02;

      if (value >= 0) {
         value = 0;
      }

      leftArrowAnimation(value);

      if (value <= -96.5) {
         value = -96.6;
      }

      rightArrowAnimation(value);

      //number counter logic
      for (let i = 0; i < counterNum.length; i++) {
         if ((value - 1.8) * -1 < 4.025 + i * 4.025) {
            counter.animate(
               {
                  transform: `translateY(${-4 * i}%)`,
               },
               {
                  duration: 900,
                  delay: 400,
                  fill: 'forwards',
                  ease: 'cubic-bezier(0, 0, 0.58, 1)',
               }
            );
            break;
         }
      }

      carousel.dataset.prevPercentage = value;

      for (const img of images) {
         img.animate(
            {
               objectPosition: `${value + 100}% 50%`,
            },
            { duration: 900, fill: 'forwards' }
         );
      }

      gsap.to(carousel, {
         transform: `translate(${value}%, -45%)`,
         duration: 1,
         ease: Power1.easeOut,
         fill: 'forwards',
      });
   } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      minimizedImages();
      let value = parseFloat(carousel.dataset.prevPercentage);
      value += 4.02;

      if (value >= 0) {
         value = 0;
      }

      leftArrowAnimation(value);

      if (value <= -96.5) {
         value = -96.6;
      }

      rightArrowAnimation(value);

      //number counter logic
      for (let i = 0; i < counterNum.length; i++) {
         if ((value - 1.8) * -1 < 4.025 + i * 4.025) {
            counter.animate(
               {
                  transform: `translateY(${-4 * i}%)`,
               },
               {
                  duration: 900,
                  delay: 400,
                  fill: 'forwards',
                  ease: 'cubic-bezier(0, 0, 0.58, 1)',
               }
            );
            break;
         }
      }

      carousel.dataset.prevPercentage = value;

      for (const img of images) {
         img.animate(
            {
               objectPosition: `${value + 100}% 50%`,
            },
            { duration: 900, fill: 'forwards' }
         );
      }

      gsap.to(carousel, {
         transform: `translate(${value}%, -45%)`,
         duration: 1,
         ease: Power1.easeOut,
         fill: 'forwards',
      });
   }
});

window.addEventListener('wheel', (e) => {
   minimizedImages();

   let value = parseFloat(carousel.dataset.prevPercentage);

   //horizontal and vertical scrolling
   value += e.deltaY / 30 + (e.deltaX * -1) / 30;

   if (value >= 0) {
      value = 0;
   }

   leftArrowAnimation(value);

   if (value <= -96.5) {
      value = -96.6;
   }

   rightArrowAnimation(value);

   //number counter logic
   for (let i = 0; i < counterNum.length; i++) {
      if ((value - 1.8) * -1 < 4.025 + i * 4.025) {
         gsap.to(counter, {
            transform: `translateY(${-4 * i}%)`,
            duration: 0.5,
            delay: 0.4,
            ease: Power2.easeOut,
         });
         break;
      }
   }

   carousel.dataset.prevPercentage = value;

   gsap.to(images, {
      objectPosition: `${value + 100}% 50%`,
      duration: 1,
      ease: 'cubic-bezier(0, 0, 0.58, 1)',
   });

   gsap.to(carousel, {
      transform: `translate(${value}%, -45%)`,
      duration: 2,
      fill: 'forwards',
      ease: Power4.easeOut,
   });
});

window.onmousedown = (e) => {
   carousel.dataset.mouseDownAt = e.clientX;
};

if (!mouseMoved) {
   for (let i = 0; i < images.length; i++) {
      images[i].addEventListener('mouseup', () => {
         if (mouseMoved) return;

         if (!images[i].classList.contains('maximized')) {
            label.classList.add('active');

            setTimeout(() => {
               label.innerText = images[i].dataset.label;
            }, 500);

            arrows.classList.remove('active');
            heading.classList.remove('active');
            subheading.classList.remove('active');

            gsap.to(counterWrapper, { color: 'transparent' });
            gsap.to(counterNum, { color: 'transparent' });

            for (const image of images) {
               image.classList.remove('maximized');
            }

            carousel.dataset.percentage =
               ((imageWidth + 24) * (i + 0.5) * -1) / 78.876811594203;

            gsap.to(carousel, {
               transform: `translate(${
                  (imageWidth + 24) * (i + innerWidth / 1190.08264463) * -1
               }px, -45%)`,
               duration: 2,
               ease: Power3.easeOut,
            });
         }

         images[i].classList.toggle('maximized');

         //this happens when image gets minimalized with a click
         if (!images[i].classList.contains('maximized')) {
            if (i <= 23) {
               carousel.dataset.percentage =
                  ((imageWidth + 24) * (i + 1.7) * -1) / 78.876811594203;

               setTimeout(() => {
                  label.innerText = images[i + 1].dataset.label;
               }, 450);

               gsap.to(carousel, {
                  transform: `translate(${
                     (imageWidth + 24) * (i + 2.25) * -1
                  }px, -45%)`,
                  duration: 2.5,
                  ease: Power2.easeOut,
               });

               images[i + 1].classList.add('maximized');
               // gsap.utils.to(images,{ classname : '+=maximized'})
            } else {
               carousel.dataset.percentage =
                  ((imageWidth + 24) * (i + 0.7) * -1) / 78.876811594203;

               gsap.to(carousel, {
                  transform: `translate(${(imageWidth + 24) * i * -1}px, -45%)`,
                  duration: 2,
                  ease: Power2.easeOut,
               });
            }
         }
      });
   }
}

window.onmouseup = () => {
   carousel.dataset.mouseDownAt = '0';
   carousel.dataset.prevPercentage = carousel.dataset.percentage;
   mouseMoved = false;
};

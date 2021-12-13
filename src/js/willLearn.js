import { Swiper, Controller, Autoplay } from 'swiper';

Swiper.use([Controller, Autoplay]);

export default function willLearn() {
    const elements = Array.from(document.querySelectorAll('.js-will-learn'));

    elements.forEach(element => {
        const sliders = Array.from(element.querySelectorAll('.will-learn__slider'));

        const instances = [];

        const OFFSET = window.matchMedia('(max-width: 640px)').matches ? 32 : 64;

        sliders.forEach((slider, sliderIndex) => {
            const container = slider.querySelector('.swiper-container');

            const instance = new Swiper(container, {
                slidesPerView: 'auto',
                watchOverflow: true,
                loop: true,
                loopedSlides: 7,
                spaceBetween: OFFSET,
                slidesOffsetBefore: sliderIndex * ((document.querySelector('.will-learn__slider-card')?.offsetWidth || 0) / 2 + OFFSET / 2),
                speed: 7000,
                allowTouchMove: false,
                autoplay: {
                    delay: 0,
                    disableOnInteraction: false
                }
            });

            instances.push(instance);

            if (sliderIndex !== 0) {
                const prevInstance = instances[sliderIndex - 1];

                instance.controller.control = prevInstance;

                prevInstance.controller.control = instance;
            }
        });
    });
}

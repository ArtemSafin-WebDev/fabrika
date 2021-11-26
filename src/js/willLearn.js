import { Swiper, Controller } from 'swiper';

Swiper.use([Controller]);

export default function willLearn() {
    const elements = Array.from(document.querySelectorAll('.js-will-learn'));

    elements.forEach(element => {
        const sliders = Array.from(element.querySelectorAll('.will-learn__slider'));

        const instances = [];

        sliders.forEach((slider, sliderIndex) => {
            const container = slider.querySelector('.swiper-container');

            const instance = new Swiper(container, {
                slidesPerView: 'auto',
                watchOverflow: true,
                loop: true,
                loopedSlides: 7,
                spaceBetween: 64,
                slidesOffsetBefore: sliderIndex * ((document.querySelector('.will-learn__slider-card')?.offsetWidth || 0) / 2 + 64 / 2)
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

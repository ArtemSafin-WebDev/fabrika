import { Swiper, Navigation } from 'swiper';

Swiper.use([Navigation]);

export default function mentorsSlider() {
    const elements = Array.from(document.querySelectorAll('.js-mentors-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper-container');

        new Swiper(container, {
            slidesPerView: 'auto',
            watchOverflow: true,
            spaceBetween: 40,
            navigation: {
                nextEl: element.querySelector('.mentors__slider-move'),
                prevEl: null
            },
            breakpoints: {
                641: {
                    spaceBetween: 55
                }
            }
        });
    });
}

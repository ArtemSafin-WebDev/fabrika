import { Swiper, Autoplay } from 'swiper';

Swiper.use([Autoplay]);

export default function ourPartners() {
    const elements = Array.from(document.querySelectorAll('.js-partners-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper-container');

        new Swiper(container, {
            slidesPerView: 'auto',
            watchOverflow: true,
            spaceBetween: 16,
            loop: true,
            loopedSlides: 7,
            allowTouchMove: false,
            speed: 6000,
            autoplay: {
                delay: 0,
                disableOnInteraction: false
            },
            breakpoints: {
                641: {
                    spaceBetween: 40
                }
            }
        });
    });
}

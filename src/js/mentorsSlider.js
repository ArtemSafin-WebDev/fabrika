import { Swiper } from 'swiper';

export default function mentorsSlider() {
    const elements = Array.from(document.querySelectorAll('.js-mentors-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper-container');

        new Swiper(container, {
            slidesPerView: 'auto',
            watchOverflow: true,
            spaceBetween: 55
        });
    });
}

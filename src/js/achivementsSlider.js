import { Swiper } from 'swiper';

export default function achivementsSlider() {
    const elements = Array.from(document.querySelectorAll('.js-achivements-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper-container');

        new Swiper(container, {
            slidesPerView: 'auto',
            watchOverflow: true,
            spaceBetween: 40
        });
    });
}

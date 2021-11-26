import { Swiper } from 'swiper';

export default function ourPartners() {
    const elements = Array.from(document.querySelectorAll('.js-partners-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper-container');

        new Swiper(container, {
            slidesPerView: 'auto',
            watchOverflow: true,
            spaceBetween: 40
        });
    });
}

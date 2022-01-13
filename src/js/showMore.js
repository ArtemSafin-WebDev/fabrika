import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function showMore() {
    const elements = Array.from(document.querySelectorAll('.js-show-more'));

    elements.forEach(element => {
        const btn = element.querySelector('.js-show-more-btn');

        if (btn) {
            btn.addEventListener('click', event => {
                event.preventDefault();

                element.classList.add('all-shown');

                ScrollTrigger.refresh();
            });
        }
    });
}

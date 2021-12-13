import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function counter() {
    const elements = Array.from(document.querySelectorAll('.js-counter'));

    elements.forEach(element => {
        const originalValue = parseInt(element.textContent, 10);
        if (isNaN(originalValue)) {
            console.error('Value is NaN');
            return;
        }
        element.textContent = '';

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: element,
                start: 'top bottom'
            }
        });
        tl.to(element, {
            innerText: originalValue,
            duration: 5,
            snap: {
                innerText: 1
            }
        });
    });
}

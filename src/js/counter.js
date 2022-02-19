import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function counter() {
    const elements = Array.from(document.querySelectorAll('.js-counter'));

    elements.forEach(element => {
        const spans = element.getElementsByTagName('span');
        if (!spans.length) return;
        const originalValue = parseInt(element.getElementsByTagName('span')[0].textContent.trim(), 10);
        if (isNaN(originalValue)) {
            console.error('Value is NaN');
            return;
        }
        // element.textContent = '';
        spans[0].textContent = '';

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: spans[0],
                start: 'top bottom'
            }
        });
        tl.to(spans[0], {
            innerText: originalValue,
            duration: 5,
            snap: {
                innerText: 1
            }
        });
    });
}

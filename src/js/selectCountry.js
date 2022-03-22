import Inputmask from 'inputmask';

export default function selectCountry() {
    const elements = Array.from(document.querySelectorAll('.js-select-country'));

    elements.forEach(element => {
        const input = element.querySelector('.js-select-country-input');
        const cards = Array.from(element.querySelectorAll('.js-select-country-card'));
        const currentFlag = element.querySelector('.js-current-flag');
        const btn = element.querySelector('.js-select-btn');

        cards.forEach(card => {
            card.addEventListener('click', event => {
                event.preventDefault();
                const mask = card.getAttribute('data-mask');
                const placeholder = card.getAttribute('data-placeholder');

                if (input.inputmask) {
                    input.inputmask.remove();
                }

                input.value = '';
                input.placeholder = placeholder;

                const instance = new Inputmask({ mask });
                instance.mask(input);

                input.setAttribute('data-applied-mask', mask);

                currentFlag.src = card.querySelector('img').src;

                element.classList.remove('show-dropdown');
            });
        });

        btn.addEventListener('click', event => {
            event.preventDefault();
            element.classList.toggle('show-dropdown');
        });

        document.addEventListener('click', event => {
            if (event.target.matches('.js-select-btn') || event.target.closest('.js-select-btn')) return;
            if (
                !(
                    event.target.matches('.has-questions__form-select-country-dropdown') ||
                    event.target.closest('.has-questions__form-select-country-dropdown')
                )
            ) {
                element.classList.remove('show-dropdown');

            }
        });

        if (cards.length) {
            cards[0].click();
        }

        console.log('Validate', Inputmask.isValid('+7 (904) 566-70-00', { mask: '+7 (999) 999-99-99' }));
    });
}

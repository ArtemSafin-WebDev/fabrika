export default function citySearch() {
    const elements = Array.from(document.querySelectorAll('.js-city-search'));

    elements.forEach(element => {
        const input = element.querySelector('input');

        const cityLinks = Array.from(element.querySelectorAll('.modal__city-search-link'));

        const searchByTerm = term => {
            cityLinks.forEach(link => {
                const text = link.textContent;

                if (
                    text
                        .trim()
                        .toLowerCase()
                        .includes(term.trim().toLowerCase()) ||
                    term.trim() === ''
                ) {
                    link.parentElement.classList.remove('hidden');
                } else {
                    link.parentElement.classList.add('hidden');
                }
            });
        };

        input.addEventListener('input', () => {
            searchByTerm(input.value);
        });
    });
}

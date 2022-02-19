export default function cityDropdown() {
    const cityDropdown = document.querySelector('.page-header__city-dropdown');

    if (!cityDropdown) return;

    const btns = Array.from(cityDropdown.querySelectorAll('.page-header__city-dropdown-btns a'));

    btns.forEach(btn => {
        btn.addEventListener('click', event => {
            event.preventDefault();
            cityDropdown.classList.add('hidden');
        })
    })
}
export default function fixedHeader() {
    const pageHeader = document.querySelector('.page-header');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 0) {
            pageHeader.classList.add('fixed');
        } else {
            pageHeader.classList.remove('fixed');
        }
    });
}

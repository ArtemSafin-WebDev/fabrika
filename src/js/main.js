import polyfills from './polyfills';
import './lazyload';
import detectTouch from './detectTouch';
import setScrollbarWidth from './setScrollbarWidth';
import validation from './validation';
import customSelects from './customSelects';
import masks from './masks';
import fileUpload from './fileUpload';
import anchorLinks from './anchorLinks';
import mediaPlayer from './mediaPlayer';
import datepicker from './datepicker';
import accordions from './accordions';
import modals from './modals';
import fixedHeader from './fixedHeader';
import willLearn from './willLearn';
import ourPartners from './ourPartners';
import mentorsSlider from './mentorsSlider';
import achivementsSlider from './achivementsSlider';
import citySearch from './citySearch';
import fancybox from './fancybox';
import agesSlider from './agesSlider';
import menu from './menu';
import counter from './counter';
import showMore from './showMore';
import cityDropdown from './cityDropdown';
import selectCountry from './selectCountry';

document.addEventListener('DOMContentLoaded', function() {
    polyfills();
    detectTouch();
    setScrollbarWidth();
    validation();
    customSelects();
    masks();
    fileUpload();
    anchorLinks();
    accordions();
    mediaPlayer();
    modals();
    datepicker();
    fixedHeader();
    willLearn();
    ourPartners();
    mentorsSlider();
    achivementsSlider();
    citySearch();
    fancybox();
    // agesSlider();
    menu();
    counter();
    showMore();
    selectCountry();
    // cityDropdown();

    setTimeout(() => {
        document.body.classList.add('loader-removed');
    }, 2500);
});

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    document.body.classList.add('loader-removed');
    setTimeout(() => document.body.classList.add('animatable'), 300);
});

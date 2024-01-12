'use strict';

import cards from './modules/cards';
import calc from './modules/calc';
import forms from './modules/forms';
import modal from './modules/modal';
import slider from './modules/slider';
import tabs from './modules/tabs';
import timer from './modules/timer';
import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {

	const modalTimer = setTimeout(() => openModal('.modal', modalTimer), 30000);

	calc();
	cards();
	forms('form', modalTimer);
	modal('[data-modal]', '.modal', modalTimer);
	slider({
		container: '.offer__slider',
		slide: '.offer__slide',
		nextArrow: '.offer__slider-next',
		prevArrow: '.offer__slider-prev',
		totalCounter: '#total',
		currentCounter: '#current'
	});
	tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
	timer('.timer', '2024-01-21');
});

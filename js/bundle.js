/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
	const result = document.querySelector('.calculating__result span');

	let sex, height, weight, age, ratio;
	
	if (localStorage.getItem('sex')) {
		sex = localStorage.getItem('sex');
	} else {
		sex = 'female';
		localStorage.setItem('sex', 'female');
	}
	
	if (localStorage.getItem('ratio')) {
		ratio = localStorage.getItem('ratio');
	} else {
		ratio = 1.375;
		localStorage.setItem('ratio', 1.375);
	}
	
	function initLocalSettings(selector, activeClass) {
		const elements = document.querySelectorAll(selector);
	
		elements.forEach(elem => {
			elem.classList.remove(activeClass);
			if (elem.getAttribute('id') === localStorage.getItem('sex')) {
				elem.classList.add(activeClass);
			}
			if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
				elem.classList.add(activeClass);
			}
		});
	}
	
	initLocalSettings('#gender div', 'calculating__choose-item_active');
	initLocalSettings('#ratio div', 'calculating__choose-item_active');
	
	function calcTotal () {
		if (!sex || !height || !weight || !age || !ratio) {
			result.textContent = '_ _ _ _';
			return;
		}
	
		if (sex === 'female') {
			result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
		} else {
			result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
		}
	}
	
	calcTotal();
	
	function getStaticInfo(parentSelector, activeClass) {
		const elements = document.querySelectorAll(`${parentSelector} div`);
	
		document.querySelector(parentSelector).addEventListener('click', (e) => {
			if(e.target.classList.contains('calculating__choose-item')) {
				if(e.target.getAttribute('data-ratio')) {
					ratio = +e.target.getAttribute('data-ratio');
					localStorage.setItem('ratio', ratio);
				} else {
					sex = e.target.getAttribute('id');
					localStorage.setItem('sex', sex);
				}
				elements.forEach(elem => {
					elem.classList.remove(activeClass);
				});
				e.target.classList.add(activeClass);
				calcTotal();
			}
		});
	
		/* 		elements.forEach(elem => {
				elem.addEventListener('click', (e) => {
					if(e.target.getAttribute('data-ratio')) {
						ratio = +e.target.getAttribute('data-ratio');
					} else {
						sex = e.target.getAttribute('id');
					}
		
					elements.forEach(elem => {
						elem.classList.remove(activeClass);
					});
					e.target.classList.add(activeClass);
					calcTotal();
				});
			}); */
	}
	
	getStaticInfo('#gender', 'calculating__choose-item_active');
	getStaticInfo('#ratio', 'calculating__choose-item_active');
	
	function getDynamcInfo(selector) {
		const input = document.querySelector(selector);
	
		input.addEventListener('input',() => {
	
			if(input.value.match(/\D/g)) {
				input.style.border = '1px solid red';
			} else {
				input.style.border = 'none';
			}
	
			switch(input.getAttribute('id')) {
			case 'height':
				height = +input.value;
				break;
			case 'weight':
				weight = +input.value;
				break;
			case 'age':
				age = +input.value;
				break;
			}
			calcTotal();
		});
	
	}
	
	getDynamcInfo('#height');
	getDynamcInfo('#weight');
	getDynamcInfo('#age');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
	//use classes for cards
	class MenuCard {
		constructor (src, alt, title, descr, price, parentSelector, ...classes) {
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.descr = descr;
			this.price = price;
			this.classes = classes;
			this.parent = document.querySelector(parentSelector);
			this.transfer = 27;
			this.convertToUAH();
		}

		convertToUAH() {
			this.price = this.price * this.transfer;
		}
		render() {
			const element = document.createElement('div');
			if (!this.classes.includes('menu__item')) {
				this.classes.push('menu__item');
			}
			this.classes.forEach(className => element.classList.add(className));
			
			element.innerHTML = `
				<img src= ${this.src} alt= ${this.alt}>
				<h3 class="menu__item-subtitle">${this.title}</h3>
				<div class="menu__item-descr">${this.descr}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
					<div class="menu__item-cost">Цена:</div>
					<div class="menu__item-total"><span>${this.price}</span> грн/день</div>
				</div>
			`;
			this.parent.append(element);
		}
	}

	(0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
		.then(data => {
			data.forEach(({img, altimg, title, descr, price}) => {
				new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
			});
		});

	// axios
	/* 	axios.get('http://localhost:3000/menu')
		.then(data => {
			data.data.forEach(({img, altimg, title, descr, price}) => {
				new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
			});
		}); */

	// cards without classes
	/* 	getResource('http://localhost:3000/menu')
		.then(data => createCard(data));

	function createCard(data){
		data.forEach(({img, altimg, title, descr, price}) => {
			const element = document.createElement('div');

			element.classList.add('menu__item');

			element.innerHTML = `
			<img src= ${img} alt= ${altimg}>
			<h3 class="menu__item-subtitle">${title}</h3>
			<div class="menu__item-descr">${descr}</div>
			<div class="menu__item-divider"></div>
			<div class="menu__item-price">
				<div class="menu__item-cost">Цена:</div>
				<div class="menu__item-total"><span>${price}</span> грн/день</div>
			</div>
			`;

			document.querySelector('.menu .container').append(element);
		});
	} */
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formSelector, modalTimerId) {
	// forms

	const forms = document.querySelectorAll(formSelector);

	const message = {
		loading: 'img/form/spinner.svg',
		success: 'спасибо! мы скоро с вами свяжемся',
		failure: 'что-то пошло не так'
	};
	
	forms.forEach(item => {
		bindPostData(item);
	});
	
	function bindPostData(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();
			const statusMessage = document.createElement('img');
			statusMessage.src = message.loading;
			statusMessage.style.cssText = `
					display: block;
					margin: 0 auto;
				`;
			form.insertAdjacentElement('afterend', statusMessage);
	
			const formData = new FormData(form);
	
			const json = JSON.stringify(Object.fromEntries(formData.entries()));
	
			(0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
				.then(data => {
					console.log(data);
					showThanksModal(message.success);
					statusMessage.remove();
				})
				.catch(() => {
					showThanksModal(message.failure);
				})
				.finally(() => {
					form.reset();
				});
		});
	}
	
	function showThanksModal(message) {
		const prevModalDialog = document.querySelector('.modal__dialog');
	
		prevModalDialog.classList.add('hide');
		(0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId);
	
		const thanksModal = document.createElement('div');
		thanksModal.classList.add('modal__dialog');
		thanksModal.innerHTML = `
			<div class="modal__content">
				<div data-close class="modal__close">&times;</div>
				<div class="modal__title">${message}</div>
			</div>
			`;
		
		document.querySelector('.modal').append(thanksModal);
		setTimeout(() => {
			thanksModal.remove();
			prevModalDialog.classList.add('show');
			prevModalDialog.classList.remove('hide');
			(0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
		}, 2000);
	}
	
	/* 	fetch('http://localhost:3000/menu')
			.then(data => data.json());
			.then(res => console.log(res)); */
	
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeModal: () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   openModal: () => (/* binding */ openModal)
/* harmony export */ });
function openModal(modalSelector, modalTimerId) {
	const modal = document.querySelector(modalSelector);

	modal.classList.add('show');
	modal.classList.remove('hide');
	document.body.style.overflow = 'hidden';
	
	if(modalTimerId) {
		clearInterval(modalTimerId);
	}
	localStorage.setItem('modalOpened', 'true'); // Store flag in localStorage
	// window.removeEventListener('scroll', showModalByScroll);
}

function showModalByScroll(modalSelector,modalTimerId) {
	if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
		const modalOpened = localStorage.getItem('modalOpened'); // Get flag from localStorage
		if (!modalOpened) {
			openModal(modalSelector, modalTimerId);
			window.removeEventListener('scroll', () => showModalByScroll(modalSelector, modalTimerId));
		}
	}
}

function closeModal(modalSelector) {
	const modal = document.querySelector(modalSelector);

	modal.classList.add('hide');
	modal.classList.remove('show');
	document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {
	const modal = document.querySelector(modalSelector),
		modalTrigger = document.querySelectorAll(triggerSelector);

	modalTrigger.forEach(btn => {
		btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
	});

	modal.addEventListener('click', (e) => {
		if (e.target === modal || e.target.getAttribute('data-close') == '') {
			closeModal(modalSelector);
		}
	});

	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modal.classList.contains('show')) {
			closeModal(modalSelector);
		}
	});

	window.addEventListener('scroll', () => showModalByScroll(modalSelector, modalTimerId));

	// Check if modal has been opened before and remove scroll event listener if it has
	const modalOpened = localStorage.getItem('modalOpened');
	if (modalOpened) {
		window.removeEventListener('scroll', () => showModalByScroll(modalSelector, modalTimerId));
	}
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _timer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timer */ "./js/modules/timer.js");


function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter}) {
	//slider

	//simple
	/* 	const slides = document.querySelectorAll('.offer__slide'),
		arrowPrev = document.querySelector('.offer__slider-prev'),
		arrowNext = document.querySelector('.offer__slider-next'),
		currentSlide = document.querySelector('#current'),
		totalSlide = document.querySelector('#total');
	let slideIndex = 1;

	function showSlides(n) {
		if (n > slides.length) {
			slideIndex = 1;
		}
		if (n < 1) {
			slideIndex = slides.length;
		}

		slides.forEach(item => item.style.display = 'none');
		slides[slideIndex - 1].style.display = 'block';

		if (slides.length < 10) {
			currentSlide.textContent = `0${slideIndex}`;
		} else {
			currentSlide.textContent = slideIndex;
		}
	}

	function plusSlides(n) {
		showSlides(slideIndex +=n);
	}

	arrowPrev.addEventListener('click', () => {
		plusSlides(-1);
	});

	arrowNext.addEventListener('click', () => {
		plusSlides(1);
	});

	showSlides(slideIndex);

	if (slides.length < 10) {
		totalSlide.textContent = `0${slides.length}`;
	} else {
		totalSlide.textContent = slides.length;
	} */

	//carousel
	/* 	const slider = document.querySelector('.offer__slider'),
		slideWrapper = slider.querySelector('.offer__slider-wrapper'),
		slidesInner = slideWrapper.querySelector('.offer__slider-inner'),
		slides = slideWrapper.querySelectorAll('.offer__slide'),
		arrowPrev = slider.querySelector('.offer__slider-prev'),
		arrowNext = slider.querySelector('.offer__slider-next'),
		currentSlide = slider.querySelector('#current'),
		totalSlide = slider.querySelector('#total'),
		width = window.getComputedStyle(slideWrapper).width;

	let slideIndex = 1;

	currentSlide.textContent = getZero(slideIndex);
	totalSlide.textContent = getZero(slides.length);

	slideWrapper.style.overflow = 'hidden';
	slidesInner.style.width = 100 * slides.length +'%';
	slidesInner.style.display = 'flex';
	slidesInner.style.transition = '0.5s all';

	slides.forEach(slide => {
		slide.style.width = width;
	});

	slider.style.position = 'relative';
	const dotsWrapper = document.createElement('ol'),
		dots = [];
	dotsWrapper.classList.add('carousel-indicators');
	slider.append(dotsWrapper);

	for (let i =0; i < slides.length; i++) {
		const dot = document.createElement('li');
		dot.classList.add('dot');
		dot.setAttribute('data-slide-to', i + 1);
		dotsWrapper.append(dot);
		if (i == 0) {
			dot.style.opacity = 1;
		}
		dots.push(dot);
	} */

	/* 		arrowNext.addEventListener('click', () => {
		if(offset == parseInt(width) * (slides.length -1)) {
			offset = 0;
		} else {
			offset += parseInt(width);
		}

		if(offset == +width.slice(0, width.length -2) * (slides.length -1)) {
			offset = 0;
		} else {
			offset += +width.slice(0, width.length -2);
		}

		slidesInner.style.transform = `translateX(-${offset}px)`;

		if (slideIndex == slides.length) {
			slideIndex = 1;
		} else {
			slideIndex++;
		}
		currentSlide.textContent = getZero(slideIndex);

	}); */

	/* 	function moveSlide(index) {
		let offset = (index - 1) * (+width.replace(/\D/g, ''));
		slidesInner.style.transform = `translateX(-${offset}px)`;
		currentSlide.textContent = getZero(index);
	}

	function showActiveDot(index, arr) {
		arr.forEach(dot => dot.style.opacity = '.5');
		arr[index - 1].style.opacity = '1';
	}

	arrowNext.addEventListener('click', () => {

		if (slideIndex == slides.length) {
			slideIndex = 1;
		} else {
			slideIndex++;
		}
		moveSlide(slideIndex);
		showActiveDot(slideIndex, dots);
	});

	arrowPrev.addEventListener('click', () => {

		if (slideIndex == 1) {
			slideIndex = slides.length;
		} else {
			slideIndex--;
		}
		moveSlide(slideIndex);
		showActiveDot(slideIndex, dots);
	});

	dots.forEach(dot => {
		dot.addEventListener('click', (e) => {
			const slideTo = e.target.getAttribute('data-slide-to');

			slideIndex = slideTo;
			moveSlide(slideIndex);
			showActiveDot(slideIndex, dots);
		});
	}); */

	//my result
	const sliderSection = document.querySelector(container), 
		arrowPrev = sliderSection.querySelector(prevArrow), 
		arrowNext = sliderSection.querySelector(nextArrow),
		currentSlide = sliderSection.querySelector(currentCounter),
		totalSlide = sliderSection.querySelector(totalCounter),
		slides = sliderSection.querySelectorAll(slide), 
		indexTotal = slides.length;
		
	let index = 0;

	function hideSlides(arr) {
		arr.forEach(item => {
			item.classList.add('hide');
			item.classList.remove('show', 'fade');
		});
	}

	function showCurSlide(i, arr) {
		arr[i].classList.add('show', 'fade');
		arr[i].classList.remove('hide');
	}

	function showCurIndex(i) {
		currentSlide.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZero)((i + 1));
	}
	function showTotalIndex(total) {
		totalSlide.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZero)(total);
	}

	function showSlides(i, arr, total) {
		if (i >= total) {
			i = 0;
		}
		if (i < 0) {
			i = total -1;
		}
		index = i;
		hideSlides(arr);
		showCurSlide(i, arr);
		showCurIndex(i, total);
	}

	//dots
	const dotsWrapper = document.createElement('ol'),
		dots = [];

	sliderSection.style.position = 'relative';
	dotsWrapper.classList.add('carousel-indicators');
	sliderSection.append(dotsWrapper);
	
	for (let i = 0; i < indexTotal; i++) {
		const dot = document.createElement('li');
		dot.classList.add('dot');
		dot.dataset.id = i;
		dotsWrapper.append(dot);
		dots.push(dot);
	}
	
	function showActiveDot(i) {	
		dots.forEach(dot => {
			dot.classList.remove('active');
			if (dot.dataset.id == i) {
				dot.classList.add('active');
			}
		});
	}

	showTotalIndex(indexTotal);
	showSlides(index, slides, indexTotal);
	showActiveDot(index);


	arrowPrev.addEventListener('click', () => {
		index --;
		showSlides(index, slides, indexTotal);
		showActiveDot(index);
	});

	arrowNext.addEventListener('click', () => {
		index ++;
		showSlides(index, slides, indexTotal);
		showActiveDot(index);
	});

	dots.forEach(dot => {
		dot.addEventListener('click', (e) => {
			if (e.target) {
				index = +e.target.dataset.id;
				showSlides(index, slides, indexTotal);
				showActiveDot(index);
			}
		});
	});
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
	//Tabs

	const tabs = document.querySelectorAll(tabsSelector),
		tabsContent = document.querySelectorAll(tabsContentSelector),
		tabsParent = document.querySelector(tabsParentSelector);

	function hideTabContent() {
		tabsContent.forEach(item => {
			item.classList.add('hide');
			item.classList.remove('show', 'fade');
		});

		tabs.forEach (item => {
			item.classList.remove(activeClass);
		});
	}

	function showTabContent(i = 0) {
		tabs[i].classList.add(activeClass);

		tabsContent[i].classList.add('show', 'fade');
		tabsContent[i].classList.remove('hide');
	}
	
	hideTabContent();
	showTabContent();

	tabsParent.addEventListener('click', (e) => {
		const target = e.target;

		if (target && target.classList.contains(tabsSelector.slice(1))) {
			tabs.forEach((item, i) => {
				if (target == item) {
					hideTabContent();
					showTabContent(i);
				}
			});
		}
	});
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   getZero: () => (/* binding */ getZero)
/* harmony export */ });
function getZero(num) {
	if (num >= 0 && num < 10) {
		return`0${num}`;
	} else {
		return num;
	}
}

function timer(id, deadline) {

	function parseDate(dateStr) {
		const [year, month, day] = dateStr.split('-').map(Number);
		return new Date(year, month - 1, day);
	}

	function getTimeRemaining(endtime) {
		// const t = Date.parse(endtime) - Date.parse(new Date());
		const t = parseDate(endtime).getTime() - new Date().getTime();
		let days, hours, minutes, seconds;

		if (t <= 0) {
			days = 0;
			hours = 0;
			minutes = 0;
			seconds = 0;
		} else {
			days = Math.floor(t / (1000 * 60 * 60 * 24));
			hours = Math.floor((t / (1000 * 60 * 60)) % 24);
			minutes = Math.floor((t / (1000 * 60)) % 60);
			seconds = Math.floor((t / 1000) % 60);
		}
			
		// return {
		// 	'total': t,
		// 	'days': days,
		// 	'hours': hours,
		// 	'minutes': minutes,
		// 	'seconds': seconds
		// };

		return {total: t, days, hours, minutes, seconds};
	}

	function setClock(selector, endtime) {
		const timer = document.querySelector(selector),

			days = timer.querySelector('#days'),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			seconds = timer.querySelector('#seconds'),

			timeInterval = setInterval(updateClock, 1000);

		updateClock();

		function updateClock() {
			const t = getTimeRemaining(endtime);

			days.innerHTML = getZero(t.days);
			hours.innerHTML = getZero(t.hours);
			minutes.innerHTML = getZero(t.minutes);
			seconds.innerHTML = getZero(t.seconds);

			if (t.total <=0) {
				clearInterval(timeInterval);
			}
		}
	}

	setClock(id, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);


/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getResource: () => (/* binding */ getResource),
/* harmony export */   postData: () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
	const res = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-type': 'application/json'
		},
		body: data
	});
	return await res.json();
};

const getResource = async (url) => {
	const res = await fetch(url);

	if (!res.ok) {
		throw new Error(`Could not fetch ${url}, status: ${res.status}`);
	}
	return await res.json();
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");











window.addEventListener('DOMContentLoaded', () => {

	const modalTimer = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.openModal)('.modal', modalTimer), 30000);

	(0,_modules_calc__WEBPACK_IMPORTED_MODULE_1__["default"])();
	(0,_modules_cards__WEBPACK_IMPORTED_MODULE_0__["default"])();
	(0,_modules_forms__WEBPACK_IMPORTED_MODULE_2__["default"])('form', modalTimer);
	(0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])('[data-modal]', '.modal', modalTimer);
	(0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])({
		container: '.offer__slider',
		slide: '.offer__slide',
		nextArrow: '.offer__slider-next',
		prevArrow: '.offer__slider-prev',
		totalCounter: '#total',
		currentCounter: '#current'
	});
	(0,_modules_tabs__WEBPACK_IMPORTED_MODULE_5__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
	(0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])('.timer', '2024-01-21');
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map
'use strict';

window.addEventListener('DOMContentLoaded', () => {

	//Tabs

	const tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent'),
		tabsParent = document.querySelector('.tabheader__items');

	function hideTabContent() {
		tabsContent.forEach(item => {
			item.classList.add('hide');
			item.classList.remove('show', 'fade');
		});

		tabs.forEach (item => {
			item.classList.remove('tabheader__item_active');
		});
	}

	function showTabContent(i = 0) {
		tabs[i].classList.add('tabheader__item_active');

		tabsContent[i].classList.add('show', 'fade');
		tabsContent[i].classList.remove('hide');
	}
	
	hideTabContent();
	showTabContent();

	tabsParent.addEventListener('click', (e) => {
		const target = e.target;

		if (target && target.classList.contains('tabheader__item')) {
			tabs.forEach((item, i) => {
				if (target == item) {
					hideTabContent();
					showTabContent(i);
				}
			});
		}
	});

	//Timer
	const deadline = '2023-12-31';

	function getTimeRemaining(endtime) {
		const t = Date.parse(endtime) - Date.parse(new Date());
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

	function getZero(num) {
		if (num >= 0 && num < 10) {
			return`0${num}`;
		} else {
			return num;
		}
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

	setClock('.timer', deadline);

	//Modal

	const modal = document.querySelector('.modal'),
		modalTrigger = document.querySelectorAll('[data-modal]');
		// modalCloseBtn = document.querySelector('[data-close]');

	function openModal() {
		modal.classList.add('show');
		modal.classList.remove('hide');
		document.body.style.overflow = 'hidden';
		clearInterval(modalTimerId);
		window.removeEventListener('scroll', showModalByScroll);
	}

	function closeModal() {
		modal.classList.add('hide');
		modal.classList.remove('show');
		document.body.style.overflow = '';
	}

	modalTrigger.forEach(btn => {
		btn.addEventListener('click', openModal);
	});

	// modalCloseBtn.addEventListener('click', closeModal);

	modal.addEventListener('click', (e) => {
		if (e.target === modal || e.target.getAttribute('data-close') == '') {
			closeModal();
		}
	});

	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modal.classList.contains('show')) {
			closeModal();
		}
	});
	
	const modalTimerId = setTimeout(openModal, 50000);

	function showModalByScroll() {
		if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
			openModal();
			window.removeEventListener('scroll', showModalByScroll);
		}
	}

	window.addEventListener('scroll', showModalByScroll);

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

	const getResource = async (url) => {
		const res = await fetch(url);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${res.status}`);
		}
		return await res.json();
	};

	getResource('http://localhost:3000/menu')
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

	// forms

	const forms = document.querySelectorAll('form');

	const message = {
		loading: 'img/form/spinner.svg',
		success: 'спасибо! мы скоро с вами свяжемся',
		failure: 'что-то пошло не так'
	};

	forms.forEach(item => {
		bindPostData(item);
	});

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

			postData('http://localhost:3000/requests', json)
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
		openModal();

		const thanksModal = document.createElement('div');
		thanksModal.classList.add('modal__dialog');
		thanksModal.innerHTML = `
		<div class="modal__content">
			<div data-close class="modal__close">&times;</div>
			<div class="modal__title">${message}</div>
		</div>
		`;

		modal.append(thanksModal);
		setTimeout(() => {
			thanksModal.remove();
			prevModalDialog.classList.add('show');
			prevModalDialog.classList.remove('hide');
			closeModal();
		}, 2000);
	}

	/* 	fetch('http://localhost:3000/menu')
		.then(data => data.json());
		.then(res => console.log(res)); */


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

	/* 	arrowNext.addEventListener('click', () => {
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
		let offset = (index - 1) * parseInt(width);
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
	const sliderSection = document.querySelector('.offer__slider'),
		arrowPrev = sliderSection.querySelector('.offer__slider-prev'),
		arrowNext = sliderSection.querySelector('.offer__slider-next'),
		currentSlide = sliderSection.querySelector('#current'),
		totalSlide = sliderSection.querySelector('#total'),
		slides = sliderSection.querySelectorAll('.offer__slide'),
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
		currentSlide.textContent = getZero((i + 1));
	}
	function showTotalIndex(total) {
		totalSlide.textContent = getZero(total);
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

});






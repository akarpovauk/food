import { getZero } from './timer';

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
}

export default slider;
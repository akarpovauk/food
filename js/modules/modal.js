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

export default modal;
export { closeModal, openModal };
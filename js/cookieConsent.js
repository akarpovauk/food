window.addEventListener('DOMContentLoaded', () => {
	//cookoes stored at localStorage
/* 	const storageType = localStorage;
	const consentPropertyType = 'site_consent';
	const isAllowed = () => storageType.getItem(consentPropertyType) === 'true'? true : false;
	const toggleStorage = (prop) => storageType.setItem(consentPropertyType, prop);

	const popup = document.querySelector('.popup'),
		btnAllow = popup.querySelector('[data-allow]'),
		btnDecline = popup.querySelector('[data-decline]');

	if(isAllowed()) {
		console.log('Loading...');
	} else {
		popup.classList.add('popup_active');
	}

	btnAllow.addEventListener('click', () => {
		toggleStorage(true);
		popup.classList.remove('popup_active');
		console.log('Loading...');
	});

	btnDecline.addEventListener('click', () => {
		toggleStorage(false);
		popup.classList.remove('popup_active');

	}); */

	//cookies stored at cookie
	/* 	const cookieStorage = {
		getItem: (key) => {
			const cookies = document.cookie
				.split(';')
				.map(cookie => cookie.split('='))
				.reduce((acc, [key, value]) => ({...acc,
					[key.trim()] : value}), {});
			return cookies[key];
		},
		setItem: (key, value) => {
			document.cookie = `${key}=${value};expires=Sun, 16 Jul 2025 06:23:41 GMT`;
		}
	};
	const storageType = cookieStorage;
	const consentPropertyType = 'site_consent';
	const isAllowed = () => storageType.getItem(consentPropertyType) === 'true'? true : false;
	const toggleStorage = (prop) => storageType.setItem(consentPropertyType, prop);

	const popup = document.querySelector('.popup'),
		btnAllow = popup.querySelector('[data-allow]'),
		btnDecline = popup.querySelector('[data-decline]');

	if(isAllowed()) {
		console.log('Loading...');
	} else {
		popup.classList.add('popup_active');
	}

	btnAllow.addEventListener('click', () => {
		toggleStorage(true);
		popup.classList.remove('popup_active');
		console.log('Loading...');
	});

	btnDecline.addEventListener('click', () => {
		toggleStorage(false);
		popup.classList.remove('popup_active');

	}); */

	//refactoring (using class)
	class CookieConsent {
		constructor({popup, btnAllow, btnDecline, activeClass = ''} = {}) {
			this.popup = document.querySelector(popup);
			this.btnAllow = document.querySelector(btnAllow);
			this.btnDecline = document.querySelector(btnDecline);
			this.activeClass = activeClass;
			this.consentPropertyType = 'site_consent';
		}

		getItem = (key) => {
			const cookies = document.cookie
				.split(';')
				.map(cookie => cookie.split('='))
				.reduce((acc, [key, value]) => ({...acc,
					[key.trim()] : value}), {});
			return cookies[key];
		};

		setItem = (key, value) => {
			document.cookie = `${key}=${value};expires=Sun, 16 Jul 2025 06:23:41 GMT`;
		};

		isAllowed = () => {
			if (this.getItem(this.consentPropertyType) === 'true') {
				return true;
			} else {
				return false;
			}
		};

		changeStatus = (prop) => {
			this.setItem(this.consentPropertyType, prop);
			if (this.isAllowed()) {
				// Paste here your scripts that use cookies requiring consent
				myScripts();
			}
		};

		bindTriggers = () => {
			this.btnAllow.addEventListener('click', () => {
				this.changeStatus(true);
				this.popup.classList.remove(this.activeClass);
			});
		
			this.btnDecline.addEventListener('click', () => {
				this.changeStatus(false);
				this.popup.classList.remove(this.activeClass);
		
			});
		};

		init = () => {
			try {
				if (this.isAllowed()) {
					myScripts();
				} else {
					this.popup.classList.add(this.activeClass);
				}

				this.bindTriggers();
			} catch(e) {
				console.error('submitted incomplete data');
			}
		};
	}

	new CookieConsent({
		activeClass: 'popup_active',
		popup: '.popup',
		btnAllow: '[data-allow]',
		btnDecline: '[data-decline]'
	}).init();


	function myScripts() {
		console.log('Loading');
		// Google Analytics, you need to change 'UA-00000000-1' to your ID
		/* 		(function(i,s,o,g,r,a,m) {
			i['GoogleAnalyticsObject']=r;i[r]=i[r]||function() {
				(i[r].q=i[r].q||[]).push(arguments);},
			i[r].l=1*new Date();a=s.createElement(o),
			m=s.getElementsByTagName(o)[0];
			a.async=1;a.src=g;m.parentNode.insertBefore(a,m);
		})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
		ga('create', 'UA-00000000-1', 'auto');
		ga('send', 'pageview'); */

		// Facebook Pixel Code, you need to change '000000000000000' to your PixelID
		/* 		!function(f,b,e,v,n,t,s)
		{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
			n.callMethod.apply(n,arguments):n.queue.push(arguments);};
		if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
		n.queue=[];t=b.createElement(e);t.async=!0;
		t.src=v;s=b.getElementsByTagName(e)[0];
		s.parentNode.insertBefore(t,s);}(window, document,'script',
			'https://connect.facebook.net/en_US/fbevents.js');
		fbq('init', '000000000000000');
		fbq('track', 'PageView'); */
	}

});
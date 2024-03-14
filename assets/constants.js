const ON_CHANGE_DEBOUNCE_TIMER = 300;

const PUB_SUB_EVENTS = {
  cartUpdate: 'cart-update',
  quantityUpdate: 'quantity-update',
  variantChange: 'variant-change',
  cartError: 'cart-error',
};

const setCookie = (name, value, days) => {
	let expires = '';
	if (days) {
		let date = new Date();
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
		expires = '; expires=' + date.toUTCString();
	}
	document.cookie = name + '=' + (value || '') + expires + '; path=/';
};

const getCookie = (name) => {
	let nameEQ = name + '=';
	let ca = document.cookie.split(';');
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
};

const removeAllBR = () => {
	const brAll = document.querySelectorAll(
		'.content-age-info .notification  br'
	);
	if (brAll && window.innerWidth > 680) {
		brAll.forEach((br) => {
			br.remove();
		});
	}
};

removeAllBR();

const html = document.querySelector('html');
const body = document.querySelector('body');
const sectionAge = document.querySelector('.section-age');
const infoWelcome = sectionAge.querySelector('.info-group.welcome');
const infoNotification = sectionAge.querySelector('.info-group.notification');
// const preloader = document.querySelector('.preloader');
const btn_success = document.querySelector('#btn-success');
const btn_error = document.querySelector('#btn-error');

const setOverflowY = () => {
	html.classList.add('age-gate');
	body.classList.add('age-gate');
	console.log('add OverflowY');
};
const removeOverflowY = () => {
	html.classList.remove('age-gate');
	body.classList.remove('age-gate');
	console.log('remove OverflowY');
};


const successAge = () => {
	sectionAge.remove();
	// removePreloader();
	removeOverflowY();
	console.log('success age');
};

const errorAge = () => {
	setOverflowY();
	// removePreloader();
	infoWelcome.classList.toggle('hide');
	infoNotification.classList.toggle('hide');
	console.log('error age');
};

let checkAge = getCookie('gate');

switch (checkAge) {
	case 'success':
		successAge();
		break;
	case 'error':
		errorAge();
		break;
	default:
		setCookie('gate', 'false', 30);
		setOverflowY();
		// removePreloader();

		btn_success.addEventListener('click', () => {
			setCookie('gate', 'success', 30);
			sectionAge.classList.add('hide-animation');
			setTimeout(() => {
				successAge();
			}, 1000);
		});
		btn_error.addEventListener('click', () => {
			setCookie('gate', 'error', 30);
			errorAge();
		});
		break;
}
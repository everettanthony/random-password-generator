(function() {
	const resultEl = document.getElementById('result');
	const lengthEl = document.getElementById('length');
	const uppercaseEl = document.getElementById('uppercase');
	const lowercaseEl = document.getElementById('lowercase');
	const numbersEl = document.getElementById('numbers');
	const symbolsEl = document.getElementById('symbols');
	const generatorBtn = document.getElementById('generator');
	const clipboardBtn = document.getElementById('clipboard');
	const alertEl = document.getElementById('alert');
	let rangeVal = document.querySelector('.range-val');
	rangeVal.innerHTML = '(' + lengthEl.value + ')';

	const randomFunc = {
		lower: getRandomLower,
		upper: getRandomUpper,
		number: getRandomNumber,
		symbol: getRandomSymbol,
	}

	clipboardBtn.addEventListener('click', function(e) {
		const textarea = document.createElement('textarea');
		const password = resultEl.innerText;

		if (!password) { return; }

		textarea.value = password;
		document.body.appendChild(textarea);
		textarea.select();
		document.execCommand('copy');
		textarea.remove();
		alertUser("Your password has been copied to the clipboard.");
	});

	generatorBtn.addEventListener('click', function(e) {
		const length = +lengthEl.value;
		const hasLower = lowercaseEl.checked;
		const hasUpper = uppercaseEl.checked;
		const hasNumber = numbersEl.checked;
		const hasSymbol = symbolsEl.checked;

		resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
	});

	lengthEl.addEventListener('input', function(e) {
		rangeVal.innerHTML = '(' + lengthEl.value + ')';
	}, false);

	function generatePassword(lower, upper, number, symbol, length) {
		let newPassword = '';
		const typeCount = lower + upper + number + symbol;
		const typeArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);


		if (typeCount === 0) {
			return '';
		}

		for (let i = 0; i < length; i += typeCount) {
			typeArr.forEach(type => {
				const funcName = Object.keys(type)[0];
				newPassword += randomFunc[funcName]();
			});
		}

		const finalPassword = newPassword.slice(0, length);
		return finalPassword;
	}

	function alertUser(msg) {
		if (msg) {
			alertEl.innerHTML = msg;
		}

		alertEl.classList.add('alert-show');

		setTimeout(function() {
			alertEl.classList.remove('alert-show');
		}, 4000);
	}

	function getRandomLower() {
		return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
	}

	function getRandomUpper() {
		return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
	}

	function getRandomNumber() {
		return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
	}

	function getRandomSymbol() {
		const symbol = '!@#$%^&*()';
		return symbol[Math.floor(Math.random() * symbol.length)];
	}
})();
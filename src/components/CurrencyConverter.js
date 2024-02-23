import React, { useState, useEffect } from 'react';
import '../App.css';

const CurrencyConverter = () => {
	const [amount, setAmount] = useState(1);
	const [selectedCurrencyFrom, setSelectedCurrencyFrom] = useState('USD');
	const [selectedCurrencyTo, setSelectedCurrencyTo] = useState('EUR');
	const [exchangeRates, setExchangeRates] = useState({});
	const [convertedAmount, setConvertedAmount] = useState(0);

	const popularCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'SEK', 'NZD'];

	useEffect(() => {
		fetchExchangeRates(selectedCurrencyFrom);
	}, [selectedCurrencyFrom]);

	const fetchExchangeRates = async (baseCurrency) => {
		try {
			const response = await fetch(`https://api.exchangerate.host/latest?base=${baseCurrency}`);
			const data = await response.json();
			const rates = data.rates;

			setExchangeRates(rates);
		} catch (error) {
			console.error('Ошибка при получении курсов валют', error);
		}
	};

	const handleAmountChange = (e) => {
		const inputAmount = parseFloat(e.target.value);
		setAmount(isNaN(inputAmount) ? 0 : inputAmount);
	};

	const handleCurrencyFromChange = (currency) => {
		setSelectedCurrencyFrom(currency);
	};

	const handleCurrencyToChange = (currency) => {
		setSelectedCurrencyTo(currency);
	};

	const handleCheckRate = () => {
		if (exchangeRates && selectedCurrencyTo in exchangeRates) {
			const rate = exchangeRates[selectedCurrencyTo];
			setConvertedAmount(amount * rate);
		}
	};

	useEffect(() => {
		if (exchangeRates && Object.keys(exchangeRates).length > 0) {
			handleCheckRate();
		}
	}, [amount, exchangeRates, selectedCurrencyTo, handleCheckRate]);

	return (
		<div>
			<div>
				<label htmlFor="amount">Сумма:</label>
				<input type="number" id="amount" value={amount} onChange={handleAmountChange} />
			</div>
			<div>
				<label htmlFor="currencyFrom">Из валюты:</label>
				<select id="currencyFrom" value={selectedCurrencyFrom} onChange={(e) => handleCurrencyFromChange(e.target.value)}>
					{popularCurrencies.map((currency) => (
						<option key={currency} value={currency}>
							{currency}
						</option>
					))}
				</select>
			</div>
			<div>
				<label htmlFor="currencyTo">В валюту:</label>
				<select id="currencyTo" value={selectedCurrencyTo} onChange={(e) => handleCurrencyToChange(e.target.value)}>
					{popularCurrencies.map((currency) => (
						<option key={currency} value={currency}>
							{currency}
						</option>
					))}
				</select>
			</div>
			<div>
				<button onClick={handleCheckRate}>Узнать курс</button>
			</div>
			<div>
				<p>Конвертированная сумма: {convertedAmount}</p>
			</div>
		</div>
	);
};

export default CurrencyConverter;


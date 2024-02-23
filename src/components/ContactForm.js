import React, { useState } from 'react';
import CurrencyConverter from './CurrencyConverter';
import '../App.css';

const ContactForm = () => {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		message: '',
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log('Данные, отправленные на сервер:', formData);
		setFormData({
			firstName: '',
			lastName: '',
			email: '',
			phone: '',
			message: '',
		});
	};

	return (
		<div>
			<h2>Форма обмена валюты</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="firstName">Имя:</label>
					<input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} />
				</div>
				<div>
					<label htmlFor="lastName">Фамилия:</label>
					<input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} />
				</div>
				<div>
					<label htmlFor="email">Email:</label>
					<input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
				</div>
				<div>
					<label htmlFor="phone">Телефон:</label>
					<input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
				</div>
				<div>
					<label htmlFor="message">Сообщение:</label>
					<textarea id="message" name="message" value={formData.message} onChange={handleChange}></textarea>
				</div>
				<CurrencyConverter />
				<button type="submit">Отправить</button>
			</form>
		</div>
	);
};

export default ContactForm;

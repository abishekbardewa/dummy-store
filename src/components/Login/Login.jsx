import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { config } from '../../config';
import './login.styles.css';

const Login = ({ cartLength, setCurrentUser }) => {
	const navigate = useNavigate();
	const [user, setUser] = useState({ username: '', password: '' });

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUser((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { username, password } = user;
		try {
			const url = `${config.endpoint}/auth/login`;
			const method = 'POST';
			const body = JSON.stringify({ username: username, password: password });
			const headers = { 'Content-Type': 'application/json' };

			let response = await (
				await fetch(url, {
					method: method,
					body: body,
					headers: headers,
				})
			).json();

			localStorage.setItem('username', username);
			// localStorage.setItem('token', response.token);
			setCurrentUser(username);
			if (cartLength !== 0) {
				navigate('/checkout');
			} else {
				navigate('/');
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="login__container">
			<form onSubmit={handleSubmit}>
				<input type="text" placeholder="Username" name="username" value={user.username} onChange={handleChange} />
				<input type="password" placeholder="password" name="password" value={user.password} onChange={handleChange} />
				<button type="submit">Login</button>
			</form>
		</div>
	);
};

export default Login;

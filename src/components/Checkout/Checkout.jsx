import { useEffect, useState } from 'react';
import { config } from '../../config';

const Checkout = ({ currentUser }) => {
	const [userProfile, setUserProfile] = useState([]);
	useEffect(() => {
		getUserInfo();
	}, []);
	console.log(userProfile);
	const getUserInfo = async () => {
		try {
			const url = `${config.endpoint}/users`;
			const response = await fetch(url);
			const responseData = await response.json();
			console.log(responseData);
			setUserProfile(
				responseData.filter((data) => {
					return data.username === currentUser;
				}),
			);
		} catch (error) {
			console.log(error);
		}
	};
	return <div>Checkout page</div>;
};

export default Checkout;

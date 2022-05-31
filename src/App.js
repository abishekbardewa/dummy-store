import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { config } from './config';
import { toast } from 'react-toastify';
import './App.css';
import Cart from './components/Cart/Cart';
import ProductList from './components/ProductList/ProductList';
import Nabvar from './components/Navbar/Navbar';
import ProductDetail from './components/ProductDetail/ProductDetail';

import Login from './components/Login/Login';
import Checkout from './components/Checkout/Checkout';

//Getting Data from LocalStorage
const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart') || '[]');
const totalCartItem = JSON.parse(localStorage.getItem('cartCounter')) || 0;
const token = localStorage.getItem('token');
const currentUserFromLocalStorage = localStorage.getItem('username') || '';

const App = () => {
	// toast.configure();
	// function notify(message) {
	// 	toast(message);
	// }
	const [loading, setLoading] = useState(true);
	const [products, setProducts] = useState([]);
	const [cartItems, setCartItems] = useState(cartFromLocalStorage);
	const [cartCounter, setCartCounter] = useState(totalCartItem);
	//Error Handling
	const [isError, setIsError] = useState();

	//Filter By category
	const [isCatActive, setCatActive] = useState();
	const [filterByCategory, setFilterByCategory] = useState([]);

	//Search
	const [searchText, setSearchText] = useState('');
	const [searchResult, setSearchResult] = useState([]);
	const [currentUser, setCurrentUser] = useState('');

	const navigate = useNavigate();
	//useEffect to check currentUser
	useEffect(() => {
		setCurrentUser(currentUser);
	}, [currentUser]);

	//UseEffect to store cart items in localStorage
	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cartItems));
		localStorage.setItem('cartCounter', cartCounter);
	}, [cartItems, cartCounter]);

	// UseEffect to get Product from Server
	useEffect(() => {
		getProducts();
	}, []);

	//Get Product from API
	const getProducts = async () => {
		try {
			const url = `${config.endpoint}/products`;
			const response = await fetch(url);
			const responseData = await response.json();
			setProducts(responseData);
			setFilterByCategory(responseData);
			setCatActive('all');
			setLoading(false);
		} catch (error) {
			setIsError(error);
		}
	};
	//Add to Cart Handler
	const addToCartHandler = (product) => {
		// console.log(cartItems);

		const itemExist = cartItems.find((cartItem) => cartItem.id === product.id);
		if (itemExist) {
			setCartItems(cartItems.map((cartItem) => (cartItem.id === product.id ? { ...itemExist, qty: itemExist.qty + 1 } : cartItem)));
		} else {
			setCartItems([...cartItems, { ...product, qty: 1 }]);
		}
		setCartCounter(cartCounter + 1);
		// toast.success('ITEM ADDED TO CART');
	};

	//Remove from Cart Handler
	const removeFromCartHandler = (product) => {
		const itemExist = cartItems.find((cartItem) => cartItem.id === product.id);

		if (itemExist.qty === 1) {
			setCartItems(cartItems.filter((cartItem) => cartItem.id !== product.id));
		} else {
			setCartItems(cartItems.map((cartItem) => (cartItem.id === product.id ? { ...itemExist, qty: itemExist.qty - 1 } : cartItem)));
		}
		if (cartCounter > 0) {
			setCartCounter(cartCounter - 1);
		}
	};

	// Remove Item Handler
	const removeItemHandler = (product) => {
		setCartItems(cartItems.filter((cartItem) => cartItem.id !== product.id));
		setCartCounter(Math.abs(product.qty - cartCounter));
	};
	//Remove All Item form Cart
	const clearCartHandler = () => {
		setCartItems([]);
		setCartCounter(0);
	};

	//Filter By Category
	const filterByCategoryHandler = (productCategoryId) => {
		resetSearchInput();
		setCatActive(productCategoryId);
		if (productCategoryId === 'all' || searchText !== '') {
			setFilterByCategory(products);
		} else {
			const result = products.filter((product) => product.category === productCategoryId);
			setFilterByCategory(result);
		}
	};

	//Search
	const search = (e) => {
		const text = e.target.value;
		setSearchText(text);
		if (text === '') {
			setSearchResult(products);
		} else {
			//Search in all categories
			const searchFilter = products.filter((ele) => {
				return ele.title.toLowerCase().includes(text.toLowerCase()) || ele.category.toLowerCase().includes(text.toLowerCase());
			});

			//Search in each filtered Category
			// const searchFilter = filterByCategory.filter((ele) => {
			// 	return ele.title.toLowerCase().includes(text.toLowerCase()) || ele.category.toLowerCase().includes(text.toLowerCase());
			// });
			// setSearchText('');
			setSearchResult(searchFilter);
			// setSearchText('');
		}
	};
	const resetSearchInput = () => {
		setSearchText('');
	};

	const handleLogout = () => {
		setCurrentUser('');
		localStorage.removeItem('cart');
		setCartItems(cartFromLocalStorage);
		navigate('/');
	};
	const handleCursor = () => {
		setCatActive('all');
	};
	return (
		<div>
			<Nabvar cartCounter={cartCounter} search={search} handleCursor={handleCursor} currentUser={currentUser} handleLogout={handleLogout} />

			<Routes>
				<Route path="/login" element={<Login cartLength={cartItems.length} setCurrentUser={setCurrentUser} />} />
				<Route
					path="/"
					element={
						<ProductList
							loading={loading}
							isError={isError}
							products={searchText === '' ? filterByCategory : searchResult}
							addToCartHandler={addToCartHandler}
							isCatActive={isCatActive}
							filterByCategoryHandler={filterByCategoryHandler}
						/>
					}
				/>
				<Route
					path="/cart"
					element={
						<Cart
							cartItems={cartItems}
							addToCartHandler={addToCartHandler}
							removeFromCartHandler={removeFromCartHandler}
							removeItemHandler={removeItemHandler}
							clearCartHandler={clearCartHandler}
						/>
					}
				/>
				<Route path="/product/:productId" element={<ProductDetail addToCartHandler={addToCartHandler} />} />
				<Route path="/checkout" element={currentUser ? <Checkout currentUser={currentUser} /> : <Navigate to="/login" />} />
			</Routes>
		</div>
	);
};

export default App;

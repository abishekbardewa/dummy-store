import { useState } from 'react';
import { Link } from 'react-router-dom';
import Search from '../Search/Search';
import './navbar.styles.css';

const Navbar = ({ cartCounter, search, currentUser, handleLogout, handleCursor }) => {
	const [navbar, setNavbar] = useState(false);

	const changeBackground = () => {
		if (window.scrollY >= 10) {
			setNavbar(true);
		} else {
			setNavbar(false);
		}
	};
	window.addEventListener('scroll', changeBackground);
	return (
		<>
			<nav className={navbar ? 'navbar active' : 'navbar'}>
				{/* <div className="navbar__container"> */}
				<div className="navbar__title">
					<Link to="/">
						<h1 className="store-title">DUMMY STORE</h1>
					</Link>
				</div>
				<div className="search__search-box">
					<input type="text" className="search-input" onChange={search} onClick={handleCursor} placeholder="Search..." />
				</div>

				<div className="navbar__cart">
					<div className="navbar__user-info">
						{currentUser ? (
							<button className="btn" onClick={handleLogout}>
								Logout
							</button>
						) : (
							<Link to="/login" className="btn">
								Login
							</Link>
						)}
					</div>
					<Link to="/cart" className="cart">
						{/* <div> */}
						<span>
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="handbag" viewBox="0 0 16 16">
								<path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
							</svg>
						</span>
						<span className="cart-counter">{cartCounter}</span>
						{/* </div> */}
					</Link>
				</div>

				{/* </div> */}
			</nav>
		</>
	);
};

export default Navbar;

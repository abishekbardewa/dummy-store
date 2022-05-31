import { useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import './product.list.styles.css';
import { ToastContainer } from 'react-toastify';
const ProductList = ({ loading, isError, products, addToCartHandler, isCatActive, filterByCategoryHandler }) => {
	const [categories] = useState([
		{ id: `all`, text: 'All' },
		{ id: `men's clothing`, text: 'Mens Clothing' },
		{ id: `women's clothing`, text: 'Womens Clothing' },
		{ id: 'electronics', text: 'Electronic Devices' },
		{ id: 'jewelery', text: 'Jewelery' },
	]);

	if (isError) {
		return (
			<div className="loading">
				<h2>Could not fetch the data</h2>
			</div>
		);
	}

	return (
		<>
			{loading ? (
				<div className="loading">
					<h1>Loading...</h1>
				</div>
			) : (
				<div className="home-container">
					<div className="home__category">
						{categories.map((category, idx) => {
							return (
								<button
									key={idx}
									id={category.id}
									className={`btn ${isCatActive === category.id ? 'btn-active' : ' '}`}
									onClick={() => {
										filterByCategoryHandler(category.id);
									}}
								>
									{category.text}
								</button>
							);
						})}
					</div>

					{products.length <= 0 && !loading ? (
						<Loading />
					) : (
						<ul className="home-products">
							{products.map((product) => {
								return (
									<li className="home-product" key={product.id}>
										<Link to={`/product/${product.id}`} key={product.id}>
											<img src={product.image} alt={product.title} />
										</Link>
										<div className="home-product-info">
											<p>{product.title}</p>
											<h3>&#65284;{product.price}</h3>
											<button type="button" className="btn" onClick={() => addToCartHandler(product)}>
												Add to cart
											</button>
											<ToastContainer autoClose={2000} />
										</div>
									</li>
								);
							})}
						</ul>
					)}
				</div>
			)}
		</>
	);
	// }
};

export default ProductList;

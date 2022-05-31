import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { config } from '../../config';
import './product.detail.styles.css';
const ProductDetail = ({ addToCartHandler }) => {
	const params = useParams();
	const [loading, setLoading] = useState(true);
	const [singleProduct, setSingleProduct] = useState([]);

	useEffect(() => {
		getSingleProduct();
		console.log(singleProduct);
	}, []);

	const getSingleProduct = async () => {
		try {
			const url = `${config.endpoint}/products/${params.productId}`;
			const response = await fetch(url);
			const data = await response.json();
			console.log(data);
			setSingleProduct(data);
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			{!loading && (
				<div className="product-detail__product">
					<div className="product-detail__image">
						<img src={singleProduct.image} alt={singleProduct.title} />
					</div>
					<div className="product-detail__product-info">
						<h1>{singleProduct.title}</h1>
						<h2>Price: &#65284;{singleProduct.price}</h2>
						<p>{singleProduct.description}</p>
						<div className="product-detail__add-btn">
							<button type="button" className="btn" onClick={() => addToCartHandler(singleProduct)}>
								Add to cart
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default ProductDetail;

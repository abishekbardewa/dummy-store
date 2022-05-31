import { Link } from 'react-router-dom';
import Order from '../Order/Order';
import './cart.styles.css';
import emptyCart from '../../assets/images/empty-cart.svg';

const Cart = ({ cartItems, addToCartHandler, removeFromCartHandler, removeItemHandler, clearCartHandler }) => {
	return (
		<>
			<div className="cart__container">
				{cartItems.length === 0 ? (
					<div className="cart__cart-empty">
						<img src={emptyCart} alt="Empty Cart" />
						<h1>Your Cart is empty</h1>

						<Link to="/" className="continue-shopping btn">
							Continue Shopping
						</Link>
					</div>
				) : (
					<div className="cart__cart-section">
						<div className="cart__cart-title">
							<h1>Your Cart</h1>
						</div>
						<div className="cart__cart-order">
							<div className="cart__cart-summary">
								<ul className="cart__cart">
									{cartItems.map((cartItem) => {
										return (
											<li className="cart__cart-product" key={cartItem.id}>
												<div className="cart__cart-image">
													<img src={cartItem.image} alt={cartItem.title} />
												</div>

												<div className="cart__cart-product-info">
													<p>{cartItem.title}</p>
													<div className="cart__cart-product-total">
														<h5>&#65284;{cartItem.price}</h5>

														<div className="cart__cart-product-btn">
															<div className="minus-btn" onClick={() => removeFromCartHandler(cartItem)}>
																-
															</div>
															<span className="quantity">{cartItem.qty}</span>
															<div className="plus-btn" onClick={() => addToCartHandler(cartItem)}>
																+
															</div>
														</div>
														<h5>&#65284;{(cartItem.qty * cartItem.price).toFixed(2)}</h5>
													</div>
												</div>
												<div className="cart__cart-product-remove">
													{/* <p>{cartItem.title}</p> */}
													<span onClick={() => removeItemHandler(cartItem)}>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="16"
															height="16"
															fill="currentColor"
															className="product-remove"
															viewBox="0 0 16 16"
														>
															<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
															<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
														</svg>
													</span>
												</div>
											</li>
										);
									})}
								</ul>
								<div className="cart__cart-clear">
									<Link to="/" className="continue-shopping btn">
										Continue Shopping
									</Link>
									<button type="button" className="btn clear-cart" onClick={clearCartHandler}>
										Clear Cart
									</button>
								</div>
							</div>
							<>
								<Order cartItems={cartItems} />
							</>
						</div>
					</div>
					// </>
				)}
			</div>
		</>
	);
};

export default Cart;

import { Link } from 'react-router-dom';
import './order.styles.css';

const Order = ({ cartItems }) => {
	const shippingCost = 100;
	const totalQty = cartItems.reduce((acc, cur) => {
		return acc + cur.qty;
	}, 0);
	let subTotal = 0;
	cartItems.forEach((ele) => {
		subTotal += ele.qty * ele.price;
	});

	return (
		<div className="order__summary">
			<div className="order__heading">
				<h1>Order Summary</h1>
			</div>
			<div className="order__total">
				<div className="order__total-products">
					<div>Total Products</div>
					<div>{totalQty}</div>
				</div>
				<div className="order__subtotal">
					<div>Sub Total</div>
					<div>&#65284;{subTotal.toFixed(2)}</div>
				</div>
				<div className="order__shipping">
					<div>Shipping Cost</div>
					<div>&#65284;{shippingCost}</div>
				</div>
			</div>
			<div className="order__total-cost">
				<h3>Total Cost</h3>
				<h3>&#65284;{(subTotal + shippingCost).toFixed(2)}</h3>
			</div>
			<div className="order__proceed">
				<Link to="/checkout">
					<button className="proceed-btn btn ">Proceed to checkout</button>
				</Link>
			</div>
		</div>
	);
};

export default Order;

import React, { useState, useEffect } from "react";
import db from "../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { loadStripe } from "@stripe/stripe-js";
import "./PlansScreen.css";

function PlansScreen() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const user = useSelector(selectUser);

	const loadCheckout = async (priceId) => {
		setLoading(true);
		const docRef = await db.collection
			.customers("customers")
			.doc(user.uid)
			.collection("checkout_sessions")
			.add({
				price: priceId,
				success_url: window.location.origin,
				cancel_url: window.location.origin,
			});
		docRef.onSnapshot(async (snap) => {
			const { error, sessionId } = snap.data();

			if (error) {
				//show an error to your customer ND
				//INSPECT YUR CLOUD FUNCTION LOGS IN THE FIREBASE CONSOLE
				alert("An error occured: ${error.message}");
			}

			if (sessionId) {
				//we have a session, lets redirect to checkout
				//Init stripe

				const stripe = await loadStripe(
					"pk_test_51MpbrKExTSrfptEVuXzPn6ku7AbtxBT8zFVvdmbO8B8Tql88GA1d6TbuUNwdVRj0D3YM9B4fjvaoMNYL38ffm16V00gBssJor5"
				);
				stripe.redirectToCheckout({ sessionId });
				setLoading(false);
			}
		});
	};

	useEffect(() => {
		db.collection("products")
			.where("active", "==", true)
			.get()
			.then((querySnapshot) => {
				const products = {};

				querySnapshot.forEach(async (productDoc) => {
					products[productDoc.id] = productDoc.data();

					const priceSnap = await productDoc.ref.collection("prices").get();

					priceSnap.docs.forEach((price) => {
						products[productDoc.id].prices = {
							priceId: price.id,
							priceData: price.data(),
						};
					});
				});
				setProducts(products);
			});
	}, []);

	console.log(products);

	return (
		<div className="plansScreen">
			{Object.entries(products).map(([productId, productData]) => {
				//Note: destructuring with square bracket instead of curly
				//todo: some logi to check user subscription is active
				return (
					<div className="plansScreen__plan">
						<div className="plansScreen__info">
							<h5>{productData.name}</h5>
							<h6>{productData.description}</h6>
						</div>
						<button onClick={() => loadCheckout(productData.prices.priceId)}>
							Subscribe
						</button>
					</div>
				);
			})}
		</div>
	);
}

export default PlansScreen;

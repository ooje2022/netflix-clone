import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import db from "../firebase";
import "./PlansScreen.css";
import { loadStripe } from "@stripe/stripe-js";
import Spinner from "./Spinner";

const PlansScreen = () => {
	const [products, setProducts] = useState([]);
	const user = useSelector(selectUser);
	const [subs, setSubs] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		db.collection("customers")
			.doc(user.uid)
			.collection("subscriptions")
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach(async (subscription) => {
					setSubs({
						role: subscription.data().role,
						current_period_end: subscription.data().current_period_end.seconds,
						current_period_start:
							subscription.data().current_period_start.seconds,
					});
				});
			});
	}, [user.uid]);
	// console.log(products);
	// console.log(subs);

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

	const loadCheckOut = async (priceId) => {
		setLoading(true);
		const docRef = await db
			.collection("customers")
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
				// show an error to your customer and oinspect ypur cloud function logs in the firebase console
				alert(`An errir occured:${error.message}`);
			}
			if (sessionId) {
				//we have a sesson lets redirect to checkout -->init stripe
				const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY);
				stripe.redirectToCheckout({ sessionId });
				setLoading(false);
			}
		});
	};
	return (
		<div className="plansScreen">
			{loading && <Spinner />}
			<br />
			{subs && (
				<p>
					Renewal date:{" "}
					{new Date(subs?.current_period_end * 1000).toLocaleDateString()}
				</p>
			)}
			{Object.entries(products).map(([productID, productData]) => {
				//logist to check if users subscription is active
				const isCurrentPackage = productData.name
					?.toLowerCase()
					.includes(subs?.role);
				return (
					<div
						key={productID}
						className={`${
							isCurrentPackage && "plansScreen__plan--disabled"
						} plansScreen__plan`}
					>
						<div className="plansScreen__info">
							<h5>{productData.name}</h5>
							<h6>{productData.description}</h6>
						</div>
						<button
							onClick={() =>
								!isCurrentPackage && loadCheckOut(productData.prices.priceId)
							}
						>
							{isCurrentPackage ? "Current Package" : "Subscribe"}
						</button>
					</div>
				);
			})}
		</div>
	);
};

export default PlansScreen;

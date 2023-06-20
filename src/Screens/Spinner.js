import React from "react";
import { SpinnerComponent } from "react-element-spinner";

const Spinner = () => {
	return (
		<SpinnerComponent
			color="#e50514"
			loading={true}
			position="global"
			message="Please wait, redirected to the stripe..."
		/>
	);
};

export default Spinner;

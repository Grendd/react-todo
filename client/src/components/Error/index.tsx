import React from "react";

import "./styles.scss";

interface ErrorProps {
    message: string;
}

const Error: React.FC<ErrorProps> = ({message}: ErrorProps) => {
	return (
		<div className="error">
			{message}
		</div>
	);
};

export default Error;
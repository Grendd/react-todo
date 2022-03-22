import React from "react";

import "./styles.scss";

interface TooltipProps {
    text: string;
    margin: string;
    children: React.ReactNode;
}

const Tooltip = ({text, margin = "0", children}: TooltipProps) => {
	return (
		<div className="tooltip__wrapper" >
			<div className="tooltip-content">{children}</div>
			<div className="tooltip" style={{margin}}>{text}</div>
		</div>
	);
};

export default Tooltip;
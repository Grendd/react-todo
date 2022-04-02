import React from "react";

import "./styles.scss";

type BaseProps = {
    children?: React.ReactNode
}
export const Header: React.FC = ({children}: BaseProps) => {
	return (
		<header className="header">{children}</header>
	);
};
export const Main: React.FC = ({children}: BaseProps) => {
	return (
		<main className="main">{children}</main>
	);
};
export const Footer: React.FC = ({children}: BaseProps) => {
	return (
		<footer className="footer">{children}</footer>
	);
};

export const Box: React.FC = ({children}: BaseProps) => {
	return (
		<div className="box">{children}</div>
	);
};

const Layout: React.FC = ({children}: BaseProps) => {
	return (
		<div className="layout">{children}</div>
	);
};
export default Layout;
import './Layout.scss';

export const Header: React.FC = ({children}) => {
    return (
        <header className="header">{children}</header>
    )
}
export const Main: React.FC = ({children}) => {
    return (
        <main className="main">{children}</main>
    )
}
export const Footer: React.FC = ({children}) => {
    return (
        <footer className="footer">{children}</footer>
    )
}

export const Box: React.FC = ({children}) => {
    return (
        <div className="box">{children}</div>
    )
}

const Layout: React.FC = ({children}) => {
    return (
        <div className="layout">{children}</div>
    )
}
export default Layout;
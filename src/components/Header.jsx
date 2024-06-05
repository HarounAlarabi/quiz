import logo from '../../data/logo.webp';
function Header() {
    return (
        <header className='app-header'>
            <img src={logo} alt="logo" />
            <div className='app-title'>
                <h1>QUiz </h1>

            </div>

        </header>
    );
}

export default Header;

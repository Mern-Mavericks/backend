import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div>
            <header>
                
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/users">Users</Link>
                    <Link to="/signup">Sign Up</Link>
                    <Link to="/signin">Sign In</Link>
                </nav>
            </header>
            <main>
                
            </main>
        </div>
    );
}

export default HomePage;

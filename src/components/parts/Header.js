import React from 'react'

function Header({ username }) {

    const formatUsername = () => /[aeiouy]/i.test(username[0]) ? `d'${username}` : `de ${username}`;
    
    return (
        <header className="header">
            <div className="container">
                <h1 className="text-center">La boîte à recettes { formatUsername() } </h1>
            </div>
        </header>
    )
}

export default Header

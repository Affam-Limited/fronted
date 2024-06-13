import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Dashboard from './Dashboard'
import Menu from './Menu'

function Main() {
    return (
        <div>
            <Header />
            <Menu />
            <Dashboard />
            <Footer />
        </div>
    )
}

export default Main
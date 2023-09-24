import Nav from './Nav';
import React from 'react'

function LandingPage() {

    return (
        <div>
            <Nav />
            <div id="outer">
                <section id="landing">
                    <h2>Recipe App</h2>
                    <p >Search, Save, and Create Recipes.....</p>
                </section>
            </div>
        </div>
    )
}

export default LandingPage;
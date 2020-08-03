import React, { useContext } from 'react';
import { Nav2 } from './Nav';
import UserContext from '../contexts/UserContext';

function SearchPage(props) {

    const user = JSON.parse(localStorage.getItem("user"));
    const { searchedRecipes, setCurrentRecipe } = useContext(UserContext.context);

    const linkClick = (e) => {
        const index = parseInt(e.target.id);
        setCurrentRecipe(searchedRecipes[index]);
        props.history.push(`/${user.username}/view/${searchedRecipes[index]._id}`)
    }

    return (
        <div>
            <Nav2 />
            <div className="container">
                <div className="row">
                    <h2>Search:</h2>
                    <ul>
                        {searchedRecipes.map((val, index) => (
                            <li key={index}>
                                <div id={index} onClick={linkClick}>{val.name}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}


export default SearchPage;

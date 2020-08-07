import React, { useEffect, useState } from 'react';
import { Nav2 } from './Nav';
import axios from 'axios';

function SearchPage(props) {

    const user = JSON.parse(localStorage.getItem("user"));
    //const { searchedRecipes, setCurrentRecipe } = useContext(UserContext.context);
    const [searchedRecipes, setSearched] = useState([]);

    useEffect(() => {
        axios.get('/db/search', {
            params: {
                item: props.match.params.q,
                uid: user.id
            }
        }).then(res => {
            console.log(res.data);
            setSearched(res.data);
        })
    }, [props.match.params.q, user.id]);

    const linkClick = (e) => {
        const index = parseInt(e.target.id);
        props.history.push(`/${user.username}/view/${searchedRecipes[index]._id}`)
    }

    return (
        <div>
            <Nav2 />
            <div className="container">
                <div className="row">
                    <h2>Search:</h2>
                </div>
                <div className="row">
                    <ul>
                        {searchedRecipes.map((val, index) => (
                            <li style={{ marginBottom: "10px" }} key={index}>
                                <div id={index} onClick={linkClick}>
                                    <h6 className="search-result">
                                        {val.name}
                                    </h6>
                                    <p>{val.description.substring(0, 100)}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}


export default SearchPage;

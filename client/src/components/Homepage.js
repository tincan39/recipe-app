import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../contexts/UserContext';
import { Nav2 } from './Nav';
import { Link } from 'react-router-dom';
import axios from 'axios';


function Homepage(props) {

    const user = JSON.parse(localStorage.getItem("user"));
    const [recipes, setRecipes] = useState([]);
    const [searchField, setSearch] = useState('');
    const [savedRecipes, setSaved] = useState([]);
    const { setCurrentRecipe, setSearched } = useContext(UserContext.context);


    useEffect(() => {
        //retrieves recipes from the database if they are
        axios.get('/db/get', {
            params: {
                uid: user.id
            }
        })
            .then((res) => {
                setRecipes(res.data.myRecipes);
                setSaved(res.data.savedRecipes);
            })
            .catch(err => console.log(err));


    }, [user.id]);

    //redirects user to where the recipe can be edited
    const linkClick = (e) => {
        const index = parseInt(e.target.id);
        setCurrentRecipe(recipes[index]);
        props.history.push(`/${user.username}/edit/${recipes[index]._id}`);
    }

    //redirects user to where recipe can be viewed
    const viewLink = (e) => {
        const index = parseInt(e.target.id);
        setCurrentRecipe(savedRecipes[index]);
        props.history.push(`/${user.username}/view/${savedRecipes[index]._id}`);
    }

    const search = (e) => {
        e.preventDefault();
        axios.get('/db/search', {
            params: {
                item: searchField,
                uid: user.id
            }
        }).then(res => {
            console.log(res.data);
            setSearched(res.data);
            props.history.push(`/${user.username}/search`);
        });
    }

    return (
        <div>
            <Nav2 history={props.history} />
            <div className="container">
                <div className="row">
                    <form onSubmit={search} style={{ marginTop: "50px" }} className="form-inline mx-auto">
                        <input onChange={(e) => { setSearch(e.target.value) }} className="form-control" type="search" placeholder="Search Recipes" aria-label="Search Recipes" />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
                <div className="row">
                    <div className="col r-cell">
                        <h3>My Recipes</h3>
                        <ul>
                            {recipes.map((val, index) => (
                                <li key={index}>
                                    <div id={index} onClick={linkClick}>{val.name}</div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="col r-cell">
                        <h3>Saved Recipes</h3>
                        <ul>
                            {savedRecipes.map((val, index) => (
                                <li key={index}>
                                    <div id={index} onClick={viewLink}>{val.name}</div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <Link className="btn btn-dark" to={`/${props.match.params.username}/create`}> Create Recipe </Link>
                </div>
            </div>
        </div>
    );
}



export default Homepage;
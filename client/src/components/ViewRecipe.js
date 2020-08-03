import React, { useContext } from 'react'
import Recipe from './Recipe';
import UserContext from '../contexts/UserContext';


function ViewRecipe(props) {
    const { currentRecipe } = useContext(UserContext.context);

    return (
        <div>
            <Recipe history={props.history} user={JSON.parse(localStorage.getItem('user'))} content={{ id: currentRecipe._id, title: currentRecipe.name, summary: currentRecipe.description, steps: currentRecipe.steps, imgUrl: currentRecipe.imgUrl }} type='view' />
        </div>
    );
}

export default ViewRecipe;
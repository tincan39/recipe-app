import React, { useState, useEffect } from 'react'
import Recipe from './Recipe';
import queryRecipe from '../utility';



function EditRecipe(props) {

    const [currentRecipe, setRecipe] = useState({});

    useEffect(() => {
        queryRecipe(props.match.params.id).then(res => setRecipe({ ...res.data }));
    }, [props.match.params.id]);

    return (
        <div>
            <Recipe history={props.history} user={JSON.parse(localStorage.getItem('user'))}
                content={{
                    id: currentRecipe._id, title: currentRecipe.name,
                    summary: currentRecipe.description, steps: currentRecipe.steps, imgUrl: currentRecipe.imgUrl
                }} type='edit' />
        </div>
    );

}


export default EditRecipe;
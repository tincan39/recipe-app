import React from 'react';
import Recipe from "./Recipe";



function CreateRecipe(props) {

    //filler content
    const title = "Some Recipe";
    const summary = "Lorem ipsum dolor sit amet, consectetur adipisci" +
        "lacinia semper fermentum malesuada arcu. Pellentesque consectetur ante ut velit facilisis rho. ";
    const steps = [];


    return (
        <Recipe history={props.history} user={JSON.parse(localStorage.getItem('user'))} content={{ id: null, title, summary, steps, imgUrl: 'http://dgsa391cfwse1.cloudfront.net/images.png' }} type='create' />
    );


}

export default CreateRecipe;
import React, { useState, useEffect } from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import axios from 'axios';
import { Nav2 } from './Nav';


function Recipe(props) {
    const { content, type, user } = props;
    //various parts of the recipe
    const [name, setName] = useState(content.title);
    const [summary, setSummary] = useState(content.summary);
    const [steps, setSteps] = useState(() => !content.steps ? [] : [...content.steps]);
    const [imgUrl, setImgUrl] = useState(content.imgUrl);
    //intermediate state that holds data for when the user wants to add a state
    const [step, setStep] = useState('');
    //An error message if it occurs
    const [error, setError] = useState('');

    let isView = (type === 'view');

    useEffect(() => {
        setName(content.title);
        setSummary(content.summary);
        setSteps(() => !content.steps ? [] : [...content.steps]);
        setImgUrl(content.imgUrl);
    }, [content])

    //adds a step to the recipe
    const addStep = () => {
        let stepObj = { step: step, spot: steps.length }
        setSteps([...steps, stepObj]);
        setStep('');
    }

    //deletes a step
    const deleteStep = (e) => {
        let index = parseInt(e.target.id);
        let tempSteps = steps;
        tempSteps.splice(index, 1);//removes step
        //moves each element back 1 in the array
        for (let i = index; i < steps.length; i++) {
            tempSteps[i].spot = tempSteps[i].spot - 1;
        }
        setSteps([...tempSteps]);

    }

    const submit = (e) => {
        e.preventDefault();
        const recipe = {
            name,
            description: summary,
            steps,
            imgUrl,
            userId: user.id,
            id: content.id
        };
        console.log(recipe);
        axios.post(`/db/${type}`, recipe).then(props.history.push(`/${user.username}/home`))
            .catch(err => setError(err.message));
    }

    const deleteRecipe = () => {
        axios.delete('/db/delete', {
            params: {
                id: content.id
            }
        }).then(props.history.push(`/${user.username}/home`))
            .catch(err => setError(err.message));
    }

    const saveRecipe = () => {
        if (!user.savedRecipes.includes(content.id)) {
            axios.post('/db/save', {
                uid: user.id,
                recipeId: content.id
            }).then(res => {
                localStorage.setItem('user', JSON.stringify(res.data.user));
                props.history.push(`/${user.username}/home`);
            })
                .catch(err => setError(err.message));
        }
    }

    const unsaveRecipe = () => {
        axios.post('/db/unsave', {
            uid: user.id,
            recipeId: content.id
        }).then(res => {
            localStorage.setItem('user', JSON.stringify(res.data.user));
            props.history.push(`/${user.username}/home`);
        });
    }

    const imgSelect = (e) => {
        console.log(e.target.files[0]);
        let formData = new FormData()
        formData.append('image', e.target.files[0]);
        formData.append('name', content.id);
        axios.post('/img/upload', formData).then(res => {
            console.log(res.data);
            setImgUrl(res.data);
        })
            .catch(err => setError(err.message));
    }

    return (
        <div>
            <Nav2 history={props.history} />
            <div className="container my-container">
                <form onSubmit={submit}>
                    <div className="row justify-content-center">

                        <input contentEditable={type !== 'view'} style={{ textAlign: "center" }} className="col-4" type="text" onChange={(e) => { setName(e.target.value) }} value={name} />
                    </div>
                    <div className="row row-layout">
                        <TextareaAutosize contentEditable={type !== 'view'} className="col-5" id="summary-box" onChange={(e) => { setSummary(e.target.value) }} value={summary} />
                        <div className="col-4" style={{ marginLeft: "90px", marginTop: "10px" }}>
                            <img width="400" height="400" src={imgUrl} alt="" />
                            {!isView && <label className="file-label" htmlFor="img-upload"> Upload image </label>}
                            {!isView && <input onChange={imgSelect} id="img-upload" type="file" accept="image/*" />}
                        </div>
                    </div>
                    <label>Steps:</label>
                    <div>
                        <ol>
                            {steps.map(val => (

                                <li style={{ fontSize: "17px" }} key={val.spot}>
                                    {val.step}
                                    {!isView && <button style={{ fontSize: "7px", marginLeft: "20px" }} id={val.spot} onClick={deleteStep} type="button" className="btn-xs btn-danger">X</button>}
                                </li>
                            ))}
                        </ol>
                    </div>
                    {type !== 'view' && <div className="row row-layout">
                        <input className="col-6" type="text" onChange={(e) => { setStep(e.target.value) }} value={step} />
                        <button style={{ marginLeft: "10px" }} className="btn btn-primary col-2" type='button' onClick={addStep} >Add Step</button>
                    </div>}
                    <div className="row row-layout">
                        {(isView && !user.savedRecipes.includes(content.id)) && <button onClick={saveRecipe} style={{ marginTop: "10px" }} className='btn btn-primary' type='button'>save</button>}
                        {(isView && user.savedRecipes.includes(content.id)) && <button onClick={unsaveRecipe} style={{ marginTop: "10px" }} className='btn btn-primary' type='button'>unsave</button>}
                        {!isView && <button style={{ marginTop: "10px" }} className='btn btn-success' type='submit'>submit</button>}
                        {type === 'edit' && <button onClick={deleteRecipe} style={{ marginTop: "10px" }} className='btn btn-danger' type='button'>delete</button>}
                    </div>
                    <div className="row">
                        {error !== '' && <small className="text-danger err">{error}</small>}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Recipe;
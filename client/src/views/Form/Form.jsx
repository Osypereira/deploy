import React, { useEffect, useState } from "react";// eslint-disable-line
import { useDispatch, useSelector } from "react-redux";// eslint-disable-line
import { getAllCountries, postActivities } from "../../components/redux/actions"; // 
import style from "../Form/Form.module.css";  // eslint-disable-line




const Form = () => {

    const count = useSelector(state => state.countries)?.sort((a, z) => a.name.localeCompare(z.name))
        console.log(count)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllCountries())
    }, [dispatch])

    const [form, setForm] = useState({
        name: "",
        dificulty: "",
        duration: "",
        season: "",
        countries: []
    })

    const [error, setError] = useState({})
//  ------------- handlers ---------------//
    
    const changeInputHandler = (event) => {
        const property = event.target.name;
        const value = event.target.value

        setForm({ ...form, [property]: value })
    }

    const [names, setNames] = useState([])

    const selectCountryHandler = (event) => {
        if(!names.length || !names.find(countries => countries.id === event)){
        const countryMatch = count.find(item => item.id === event);
        setNames([...names, countryMatch]);

        setForm({
            ...form,
            countries: [...form.countries, event]
        })
      }
    }

    const selectDificultyHandler = (event) => {
        setForm({
            ...form,
            dificulty: Number(event.target.value)
        })
    }

    const selectDurationHandler = (event) => {
        setForm({
            ...form,
            duration: Number(event.target.value)
        })
    }
    
    const selectSeasonHandler = (event) => {
        setForm({
            ...form,
            season: event.target.value
        })
    }

    const deleteFlagHandler = (id) => {
        const filteredCountries = form.countries.filter(c => c !== id)
        setForm({ ...form, countries: filteredCountries })
        setNames(names.filter(c => c.id !== id))
    }

    // ---------------- submit ----------------//
    const handlerSubmit = (e) => {
        e.preventDefault();
        dispatch(postActivities(form))
        alert(`You have been created the new activity ${form.name}`)
        setForm({
            name: "",
            dificulty: null,
            duration: null,
            countries: [],
            season: "",
        })
    }

    const durationSelect = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
    const dificultySelect = [1, 2, 3, 4, 5]

    // ------------------ Validation -------------------//

    useEffect(() => {
        setError(validator(form))
    }, [form])

    const validator = (form) => {
        let errors = {}
        if (!form.name) {
            errors.name = 'Name is required'
        }
        if (!/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g.test(form.name)) {
            errors.name = 'Name is invalid'
        }
        if (!form.duration || form.duration < 1) {
            errors.duration = 'Duration is required'
        }
        if (!form.dificulty) {
            errors.dificulty = 'Dificulty is required'
        }
        if (!form.season) {
            errors.season = 'You must select one season'
        }
        if (!form.countries.length) {
            errors.countries = 'You must select at least one country'
        }
        return errors
    }

    return (
        <div className={style.container}>

        <form className={style.containerForm} onSubmit={handlerSubmit}>
            <div>
                <div>
                    <label className={style.lether}>NAME:</label>
                   
                    <input placeholder="NAME IS REQUIRED" type="text" 
                           value={form.name} onChange={changeInputHandler} name="name"    
                        autoComplete="off" className={style.lether} />
                    {error.name && <span className={style.error}>{error.name}</span>}
                </div>
                <div>
                    <span className={style.lether}>DIFICULTY:</span>
                    <select className={style.lether} onChange={selectDificultyHandler}>
                        <option value="" hidden>-</option>
                        {dificultySelect.map(item => <option key={item} name="dificulty" value={item}>{item}</option>)}
                    </select>
                    {error.dificulty && <span className={style.error}>{error.dificulty}</span>}
                </div>
                <div>
                <span className={style.lether}>DURATION:</span>
                    <select className={style.lether} onChange={selectDurationHandler}>
                        <option value="" hidden>-</option>
                        {durationSelect.map(item => <option key={item} name="duration" value={item}>{item}</option>)}
                    </select>
                    {error.duration && <span className={style.error}>{error.duration}</span>}
                </div>
                <div>
                <span className={style.lether}>SEASON:</span>
                    <select className={style.lether} onChange={selectSeasonHandler}>
                        <option value="" hidden>-</option>
                        <option name="SUMMER" value="summer">SUMMER</option>
                        <option name="FALL" value="fall">FALL</option>
                        <option name="WINTER" value="winter">WINTER</option>
                        <option name="SPRING" value="spring">SPRING</option>
                        
                    </select>
                    {error.season && <span className={style.error}>{error.season}</span>}
                </div>
                <div>
                <label className={style.lether}>COUNTRIES:</label>
                    <select className={style.lether} onChange={(e) => selectCountryHandler(e.target.value)}>
                        <option value="" hidden>-</option>
                        {count?.map(item => {
                           return (<option key={item.id} value={item.id}>{item.name.toUpperCase()}</option>)
                        })}
                    </select>
                    {error.countries && <span className={style.error}>{error.countries}</span>}
                </div>
                <div className={style.buttonContainer}>
                    {Object.entries(error).length === 0 &&
                        <button className={style.button}
                            type="submit">ADD ACTIVITY
                        </button>}
                </div>

            </div>
            <div className={style.countriesFlags}>
                {
                    names.map(country =>
                        <div key={country.id}>
                            <button className={style.deleteButton}
                                onClick={() => deleteFlagHandler(country.id)}>x</button>
                            <h3>{country.name}</h3>
                        </div>
                    )
                }
            </div>

        </form>
        </div>
    )
}

export default Form;
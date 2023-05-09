import Card from "../Card/Card"
import style from "./CardsContainer.module.css"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react";
import { getAllCountries, getAllActivities, filterCountry } from "../redux/actions"
import Paginado from "../Pagination/Paginado";

const CardsContainer = () => {
    
    
    const countries = useSelector(state => state.countries)
    const allCountry = useSelector(state => state.allCountries)
    const activitis = useSelector (state => state.activities)
    const dispatch = useDispatch();
    const currentPage = useSelector(state => state.pag)
    const [countriesPerPage, setCountriesPerPage] = useState(10) // eslint-disable-line
    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
    const currentCountries = countries.slice(indexOfFirstCountry, indexOfLastCountry)   // eslint-disable-line
    const [touristActivity, setTouristActivity] = useState("");
    const [continent, setContinent] = useState("");
    const [order, setOrder] = useState("");


    useEffect(() => {
        dispatch(getAllCountries())
        dispatch(getAllActivities())
    }, [dispatch])

    useEffect(() => {
        filterCountries()   //cada vez que cambie se va a ejecuta de nuevo
    }, [continent,    // eslint-disable-line
        touristActivity,
        order
    ])

    const filterCountries = () => {
        let copyCountry = [...allCountry]
       
            if (continent !== "") copyCountry = copyCountry.filter(count => count.continent === continent)
            if (touristActivity !== "") copyCountry = copyCountry.filter(count => count.activities?.find(act => act.name === touristActivity))
            if (order === "alphaAscending") copyCountry = copyCountry.sort((a, z) => a.name.localeCompare(z.name))
            if (order === "descAlphabetical") copyCountry = copyCountry.sort((a, z) => z.name.localeCompare(a.name)) 
            if (order === "poblationAscending") copyCountry = copyCountry.sort((low, max) => low.population - max.population)
            if (order === "poblationDescending") copyCountry = copyCountry.sort((low, max)=> max.population - low.population) 
            
            
        
        dispatch(filterCountry(copyCountry))
    }


//-----------------------------------------------------//

    return (
        <div>
           <form>
               <select value={continent}
                       onChange={event => setContinent(event.target.value)}>
                   <option value="" key={0}>Select Continent</option>
                   <option value="Asia" key={1}>ASIA</option>
                   <option value="North America" key={2}>NORTH AMERICA</option>
                   <option value="South America" key={3}>SOUTH AMERICA</option>
                   <option value="Africa" key={4}>AFRICA</option>
                   <option value="Antarctica" key={5}>ANTARCTICA</option>
                   <option value="Europe" key={6}>EUROPE</option>
                   <option value="Oceania" key={7}>OCEANIA</option>
               </select>

               <select value={touristActivity}
                       onChange={event => setTouristActivity(event.target.value)}>
                   <option value="" key={0}>Select Activity</option>
                   {activitis && activitis.map(act => <option value={act.name} key={act.name}>{act.name}</option>)}
                </select>
                
                <select value={order}
                        onChange={event => setOrder(event.target.value)}>
                    <option value="" key={0}>Select Order</option>
                    <option value="alphaAscending" key={1}>Alphabetical Ascending</option>
                    <option value="descAlphabetical" key={2}>Descending Alphabetical</option>
                    <option value="poblationAscending" key={3}>Poblation Ascending</option>
                    <option value="poblationDescending" key={4}>Poblation Descending</option>
                </select>
                <button 
            type="button"
            onClick={() => (setOrder(''), setTouristActivity(''), setContinent(''))}
            >Limpiar</button>
                
               <Paginado
                    countriesPerPage={countriesPerPage}
                    countries={countries.length}
                />
                  <div className={style.container}>
                     {currentCountries?.map(country => {
                     return <Card 
                       key={country.id}  
                       id={country.id}
                       imgflag={country.imgflag}
                       name={country.name}
                       continent={country.continent}
                       population={country.population}
                       activities={country.activities}
                   />
                   })}
                  </div>
           </form>
        </div>
    )
}

export default CardsContainer
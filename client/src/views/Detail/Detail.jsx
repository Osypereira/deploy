import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../components/redux/actions"
import { useEffect } from "react";
import style from "../Detail/Detail.module.css";


const Detail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    console.log(id)
    const countries = useSelector((state) => state.detail)
    useEffect(() => {
        dispatch(getDetail(id));
        },[dispatch, id])
    

    return (
        <div>
            <div className={style.cardetail}>
                <h1>{countries?.name}</h1>
                <img className={style.img} src={countries?.imgflag} alt={countries?.imgflag} />
                <h2>Detail</h2>
                <h4>continent: {countries?.continent}</h4>
                <h4>capital: {countries?.capital}</h4>
                <h4>subregion: {countries?.subregion}</h4>
                <h4>area: {countries?.Area}</h4>
                <h4>population: {countries?.population}</h4>
                <h2>actividad Turistica</h2>
                <ul>
                    {
                        countries?.activity && countries.activity.length
                        ?
                        (
                            countries.activity.map(act => {
                                return (<li>
                                    <p>Activities: {act.name}</p>
                                    <p>Dificulty: {act.dificulty}</p>
                                    <p>Duration: {act.duration}</p>
                                    <p>Season: {act.season}</p>
                                </li>
                                )
                            }))
                            :(<p>No hay actividades</p>)
                    }
                </ul>
            </div>
                    
        </div>
    )
}

export default Detail;
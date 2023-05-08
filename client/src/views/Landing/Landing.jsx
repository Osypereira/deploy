import { Link } from "react-router-dom";
import Style from "../Landing/Landing.module.css"

const Landing = () => {
    return (
        <div className={Style.body}>
            <h1>Bienvenido</h1>
            <Link to= "home">
                <button className={Style.button}>INGRESAR</button>
            </Link>
        </div>
    )
}

export default Landing;
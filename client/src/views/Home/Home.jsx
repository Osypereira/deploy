import CardsContainer from "../../components/CardsContainer/CardsContainer"
import Style from "../Home/Home.module.css"

const Home = () => {
    return (
        <div className={Style.body}>
            <h1>COUNTRIES</h1>
            
            <CardsContainer />
        </div>
    )
}

export default Home;
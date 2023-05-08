const { getCountryById, getcountries, getCountryByName } = require("../controllers/countriesControllers");



const getCountriesHandler = async (req, res) => {
    const { name } = req.query;
    if (!name) {
        try {
            const allCountries = await getcountries();
            res.status(200).json(allCountries);
        } catch (error) {
            res.status(400).json({ error: "the search did not return good results" });
        }
    }
    else {
        try {
            const oneCountry = await getCountryByName(name); 
            res.status(200).json(oneCountry);
        } catch (error) {
            res.status(400).json({ error: "Country not found" });
        }
    }
};
//------------------------------------------------------------------//

const getCountryHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const countryId = await getCountryById(id);
        res.status(200).json(countryId);
    } catch (error) {
        res.status(400).json({ error: error.message });
        return
    }

};



module.exports = {
    getCountriesHandler,
    getCountryHandler
};
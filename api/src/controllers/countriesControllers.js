const { Op } = require('sequelize');
const { Country, Activity } = require("../db");

const getCountryById = async (id) => {
    const idCountry = await Country.findByPk(id.toUpperCase(), {
        include: {
            model: Activity,
            attributes: ["name", "dificulty", "duration", "season"],
            through: { attributes: [] }
        }
    })
    return idCountry
}
//----------------------------------------------------------------//

const getcountries = (async () => {
    const dbCountry = await Country.findAll({
        attributes: ["id", "name", "imgflag", "continent", "capital", "subregion", "area", "population"],

        include: {
            model: Activity,
            attributes: ["name", "dificulty", "duration", "season"],
            through: { attributes: [] },
        }
    })
    return dbCountry;
});
//----------------------------------------------------------------//


const getCountryByName = async (name) => {
    const upperCaseName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

    const countryName = await Country.findAll({
        where: { name: { [Op.substring]: `%${upperCaseName}%` } }, include: {
            model: Activity,
            attributes: ["name", "dificulty", "duration", "season"],
            through: { attributes: [] },
        }
    });
    return countryName;
}

//----------------------------------------------------------------//

module.exports = {getCountryById, getcountries, getCountryByName}
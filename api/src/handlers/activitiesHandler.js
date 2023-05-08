const { createActivity, getAllActivitiesControllers } = require("../controllers/activitiesControllers");

const createActivitiesHandler = async(req, res) => {
    console.log(req.body)
    try {
      await createActivity(req.body);
        res.status(200)
    } catch (error) {
        res.status(400).json({ error: error.message }); 
    }
};
//-------------------------------------------------------------------------//  

const getActivitiesHandler = async (req, res) => {
   try {
       const result = await getAllActivitiesControllers();
       res.status(200).json(result);
   } catch (error) {
       res.status(400).json({ error: error.message })
   }
};

module.exports = {
    createActivitiesHandler,
    getActivitiesHandler
};

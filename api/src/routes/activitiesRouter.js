const { Router } = require("express");

const {
    createActivitiesHandler,
    getActivitiesHandler
} = require("../handlers/activitiesHandler");

const activitiesRouter = Router();






activitiesRouter.get("/", getActivitiesHandler);

activitiesRouter.post("/", createActivitiesHandler);



module.exports = activitiesRouter;
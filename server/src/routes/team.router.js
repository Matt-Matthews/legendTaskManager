import express from 'express';
import { httpGetTeams, httpCreateTeam, httpAddMember } from '../controllers/team.controller.js';

const teamRouter = express.Router();

teamRouter.get('/', httpGetTeams);
teamRouter.post('/create', httpCreateTeam);
teamRouter.post('/addMember/:teamId', httpAddMember);

export default teamRouter;
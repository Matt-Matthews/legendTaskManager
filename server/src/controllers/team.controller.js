import { createTeam, getTeams, addMember } from "../models/team.model.js";
import { verifyToken } from "../helpers/jwt.helper.js";

const httpGetTeams = async (req, res) => {

  const user = verifyToken(req.headers["authorization"]);
  console.log(user);
  const teams = await getTeams(user.id);
  return res.status(200).json(teams);
};

const httpCreateTeam = async (req, res) => {

    const user = verifyToken(req.headers["authorization"]);
    const results = await createTeam(req.body, user.id);

    return res.status(200).json(results);
};

const httpAddMember = async (req, res) => {
  const user = verifyToken(req.headers["authorization"]);
    const results = await addMember(req.params.teamId, req.body.email, user.id);

    return res.status(200).json(results);
};

export { httpGetTeams, httpCreateTeam, httpAddMember };

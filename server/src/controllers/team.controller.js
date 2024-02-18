import { createTeam, getTeams, addMember } from "../models/team.model.js";
import { verifyToken } from "../helpers/jwt.helper.js";

const httpGetTeams = async (req, res) => {
  try {
    const user = verifyToken(req.headers["authorization"]);

    const teams = await getTeams(user.id);

    if (!teams) return res.status(404).send("Teams not found");

    return res.status(200).json(teams);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const httpCreateTeam = async (req, res) => {
  try {
    const user = verifyToken(req.headers["authorization"]);
    const results = await createTeam(req.body, user.id);

    if (!results) return res.status(409).send("Team exist");

    return res.status(200).json(results);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const httpAddMember = async (req, res) => {
  try {
    const user = verifyToken(req.headers["authorization"]);
    const results = await addMember(req.params.teamId, req.body.email, user.id);

    if (!results) return res.status(401).send("email not registered, not authorized to add");

    return res.status(200).json(results);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

export { httpGetTeams, httpCreateTeam, httpAddMember };

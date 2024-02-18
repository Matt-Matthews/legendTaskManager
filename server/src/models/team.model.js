import Team from "../schemas/team.schema.js";
import User from "../schemas/user.schema.js";
import { handleID } from "../helpers/db.helper.js";

const getTeams = async (userId) => {
  const id = handleID(userId);

  const teams = await Team.find({
    $or: [{ owner: id }, { members: { $in: [id] } }],
  }).exec();
  //find teams by either ownerId or memberId which references userId in users collection

  if (!teams) return null;

  return teams;
};

const createTeam = async (teamData, userId) => {
  const teamExist = await Team.findOne({ name: teamData.name }).exec();
  if (teamExist) return null; //checks if the team exists, to prevent dublicates

  const newTeam = await Team({ ...teamData, owner: handleID(userId) });
  const created = await newTeam.save();

  return created;
};

const addMember = async (teamId, email, userId) => {
  const member = await User.findOne({ email });
  if (!member) return null; //Checks if the member is already registered or not

  const _team = await Team.findOne({ _id: handleID(teamId) });

  if (userId !== _team.owner.toString()) return null; //only the owner or admin of the team can add members

  const addToTeam = await Team.updateOne(
    { _id: teamId },
    { $push: { members: member._id } }
  );

  return addToTeam;
};

export { createTeam, getTeams, addMember };

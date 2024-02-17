import Team from '../schemas/team.schema.js';
import User from '../schemas/user.schema.js';
import { handleID } from '../helpers/db.helper.js';

const getTeams = async (userId) => {
    try{
        const id = handleID(userId);
        console.log(id, userId);
        const teams = await Team.find({$or: [{owner: id}, {members: {$in: [id]}}]}).exec();
        //{members.0: 'id'}
        console.log(teams);
        if(!teams) return 'not found';

        return teams;
    }catch(err){
        return err.message;
    }
}

const createTeam = async (teamData, userId) => {
    try{

        const teamExist = await Team.findOne({name: teamData.name}).exec();
        if(teamExist) return 'Team name exist';

        const newTeam = await Team({...teamData, owner: handleID(userId)});
        await newTeam.save();
        
        return 'success';

    }catch(err){
        return err.message;
    }
}

const addMember = async (teamId, email, userId) => {
    try{
        const member = await User.findOne({email});
        if(!member) return 'not found';
        
        const _team = await Team.findOne({_id: handleID(teamId)});
        
        if(userId !== _team.owner.toString()) return 'not authorized';

        await Team.updateOne({_id: teamId,}, {$push: {members: member._id}});
        
        return 'success'

    }catch(err){
        return err.message;
    }
}

export {
    createTeam,
    getTeams,
    addMember,
}
import { API_URL } from "../config/configs";

async function getTeams(token: string) {
  try {
    const response = await fetch(`${API_URL}/team`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const results = await response.json();
    return results;
  } catch (err: any) {
    console.log(err.message);
    return null;
  }
}

interface Team {
    name: string;
    description: string;
  }
async function addTeam(token: string, team: Team){
    try {
        const response = await fetch(`${API_URL}/team/create`, 
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(team)
        });
    
        const results = await response.json();
        return results;
      } catch (err: any) {
        console.log(err.message);
        return null;
      }
}

async function addTeamMember(token: string, email: string, teamId: string){
    try {
        const response = await fetch(`${API_URL}/team/addMember/${teamId}`, 
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({email})
        });
    
        const results = await response.json();
        return results;
      } catch (err: any) {
        console.log(err.message);
        return null;
      }
}

export {
    getTeams,
    addTeam,
    addTeamMember,
}
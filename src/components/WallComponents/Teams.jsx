import { Flex, Space, Row, Col } from 'antd';
import { useState } from "react"
import { TeamsForm } from "./TeamsForm"
import { TeamsCard } from "./TeamsCard"
import { healRecruit } from "../../global"


export const Teams = ({operations}) => {
    
    const [teams, setTeams] = operations.teamsOperations
    const [recruits, setRecruits] = operations.recruitsOperations
    
    const deleteTeam = (team) => {
        setTeams( prev => {
            return prev.filter(el => el.id !== team.id)
        })
    }
    const recapacitateTeam = (team) => {
        const recruit = team.recruitIds
    
        healRecruit(recruit, setRecruits, 2)
    }

    return (
        <>  
            
            <div>
                <TeamsForm operations={operations}/>
            </div>
            <Flex wrap gap="small">
                {teams.map( el => <TeamsCard team={el} deleteTeam={deleteTeam} recruits={recruits}/>)}
            </Flex>
        </>
    
    )
    
}

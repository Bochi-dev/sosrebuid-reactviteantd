import { Flex, Space, Row, Col } from 'antd';
import { useState } from "react"
import { TeamsForm } from "./TeamsForm"
import { TeamsCard } from "./TeamsCard"


export const Teams = ({teams, setTeams, recruits, setRecruits}) => {
    return (
        <>  
            
            <div>
                <TeamsForm teams={teams} setTeams={setTeams} recruits={recruits} setRecruits={setRecruits}/>
            </div>
            <Flex wrap gap="small">
                {teams.map( el => <TeamsCard team={el} recruits={recruits}/>)}
            </Flex>
        </>
    
    )
    
}

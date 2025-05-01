import { Flex, Space, Row, Col, Modal } from 'antd';
import { useState } from "react"
import { TeamsForm } from "./TeamsForm"
import { TeamsCard } from "./TeamsCard"
import { healRecruit } from "../../global"


export const Teams = ({operations}) => {
    const [modal, contextHolder] = Modal.useModal();
    const [teams, setTeams] = operations.teamsOperations
    const [recruits, setRecruits] = operations.recruitsOperations
    
    const deleteTeam = (team) => {
        setTeams( prev => {
            return prev.filter(el => el.id !== team.id)
        })
    }
    const recapacitateTeam = (team) => {
        team.recruitIds.forEach(el => {
          const recruit = recruits.find(re => re.id === el)
          healRecruit(recruit, setRecruits, 3)
        
        })

    }

    return (
      <>  
        <div>
            <TeamsForm operations={operations}/>
        </div>
        <Flex wrap gap="small">
            {teams.map( (el, index) => <TeamsCard 
              key={index} team={el} deleteTeam={deleteTeam} 
              operations={operations} 
              healRecruit={healRecruit} recapacitateTeam={recapacitateTeam}
              modal={modal}
            />)}
        </Flex>
        {contextHolder}
      </>
    )
    
}

import {Space, List, Avatar, Button, Modal, Progress} from "antd"
import { GameCard, IconText, Recruits } from "../../components"
import React from 'react';



export function Main({operations}) {
  const [recruits, setRecruits] = operations.recruitsOperations
  const [resources, setResources] = operations.resourcesOperations
  
//  MAKE A FUNCTION TO DISPLAY THE CHANGES IN THE RESOURCES AS TIME PASSES
//  RED if its decreasing and GREEN if its increasing, for the food, make red IF its less the the number of recruits
  const displayResourceCard = (resources) => {
    let cards = []
    Object.keys(resources).forEach((name) => {
      cards.push(<GameCard title={name} amount={resources[name]}/>)
    })
    
    return cards
  }
  
  return (
    <>
        <Space>
        
          <GameCard title="People" amount={recruits.length}/>
          {displayResourceCard(resources)}
          <GameCard title="Happiness" amount="0%"/>
        </Space>
        <Recruits operations={operations}/>

    </>
  )
}



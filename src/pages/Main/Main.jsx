import {Space, List, Avatar, Button, Modal, Progress} from "antd"
import { GameCard, IconText, Recruits } from "../../components"
import React from 'react';



export function Main({operations}) {
  const [recruits, setRecruits] = operations.recruitsOperations
  const [resources, setResources] = operations.resourcesOperations
  
//  MAKE A FUNCTION TO DISPLAY THE CHANGES IN THE RESOURCES AS TIME PASSES
//  RED if its decreasing and GREEN if its increasing, for the food, make red IF its less the the number of recruits
  
  
  return (
    <>
      <h1>Recruits</h1>
      <div>
        <Recruits operations={operations}/>
      </div>
    </>
  )
}



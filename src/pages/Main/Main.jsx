import {Space, List, Avatar, Button, Modal, Progress} from "antd"
import { GameCard, IconText, Recruits } from "../../components"
import React from 'react';



export function Main({operations}) {
  const [trainings, setTrainings, recruits, setRecruits] = operations.operations

  return (
    <>
        <Space>
        
          <GameCard title="People" amount="0"/>
          <GameCard title="Food" amount="0"/>
          <GameCard title="Happiness" amount="0%"/>
        </Space>
        <Recruits recruits={recruits}/>

    </>
  )
}



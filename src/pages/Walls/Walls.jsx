import { useState } from "react"
import { Teams, WallsCard } from "../../components"
import { damageTaken } from "../../global"
import { Button, Col, Row, Space, Flex, Modal } from "antd"
const wallNames = ["North Wall", "South Wall", "East Wall"]


const classes = [
        {id:1, name:"presecurer", label:"Pre-Securer", lvl: 1},
        {id:2, name:"securer", label:"Securer", lvl: 1},
        {id:3, name:"postsecurer", label:"Post-Securer", lvl: 1},
    ]
    
const randomClasses = () => {
    let randclasses = []
    for (let i = 0; i < classes.length; i++){
        if (Math.ceil(Math.random()*2) === 1){
            randclasses.push([{
                ... classes[i],
                lvl: Math.ceil(Math.random()*3)
            }])
        } else {
            randclasses.push([])
        }
    }
    
    return randclasses
}

export const Walls = ({operations}) => {
    const [recruits,setRecruits] = operations.recruitsOperations
/*    adding the health and maxHealth to recruits just to decide when the team will
    be defeated or healed later*/
    const [teams, setTeams] = operations.teamsOperations
    const [walls, setWalls] = operations.wallsOperations
    
    const inWalls = () => {
      const stationated = []
      walls.forEach(el => {
        if (el.stationedTeam === null) return
        stationated.push (el.stationedTeam)
      })
    
      return stationated
    }
    return (<>
      <Row gutter={12}>
          <Col span={12}>
              <Flex wrap={true}>
                {walls.map((el, index) => (
                    <WallsCard key={index} wall={el} setWalls={setWalls} inWalls={inWalls} teams={teams} setRecruits={setRecruits}/>
                  )
                )}
              </Flex>
          </Col>
          <Col span={12}>
            <Teams operations={operations}/>
          </Col>
      </Row>
    </>)
    
    
}

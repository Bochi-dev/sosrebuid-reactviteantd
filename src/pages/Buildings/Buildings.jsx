import {useState} from "react"
import { MissionCard } from "./MissionCard"
import { BuildingCard } from "./BuildingCard"
import { daysOfWeek } from "../../global"
import { Button, Col, Row, Statistic } from 'antd';



const Materials = ({list}) => {
    const statistics = []
    for (let x in list){
        statistics.push(<Col span={6}><Statistic title={x} value={list[x]} /></Col>)
    }
    
    return <Row gutter={16}>
        {statistics}
  </Row>
}

const buildingslist = [
        {
        id: 1,
        name: "Tent",
        recruits:[],
        /*WIP work in progress*/
        
        },
    ]




export const Buildings = ({operations}) => {



    const [dayindex, setDayindex] = useState(0)
    const [turns, setTurns] = useState(0)
    const [days, setDays] = useState(1)
    const testtimeOperations = [daysOfWeek[dayindex], days, turns]






    const [trainings, setTrainings, recruits, setRecruits, timeOperations] = operations.operations
    
    const [materials, setMaterials] = useState({

        cloth: 100,
        stick: 100,

    })
    
    
    const [buildings, setBuildings] = useState([])
    
    
    const [buildBuildings, setBuildBuildings] = useState([
        {
          id:1,
          type:"building",
          name:"Build Tent",
          reqs:[
            {type:"cloth", amount: 2, label: "2 Cloth"},
            {type:"strength", amount: 10, label: "10 Strength"},
            {type:"spirit", amount: 10, label: "10 Spirit"},
            
          ],
          reward:[{type:"building", id:1, label: "Construction of Tent"}],
          progress:0,
          turns: 20,
          participants:[],
          subs: []
        },

    ])
    
    
    function nextTurn () {
    
    
    /*setting the trainings participants to []
    so that in the next turn we can add them again
    
    note: this doesnt make much sense but its the only way
    to assign the participants a propper schedule
    */    
    setTrainings((ts) => {      
      ts.map((t) => {      
        if (t.participants.length >= 1) {
          t.participants = []
        } else {
          return t
        }      
      })
      return ts
    })
    
    
    /*substract 10% of its original value to any number*/
    const minus1toStats = (stat) => {
        const tenpercent = stat * 0.1
        if (stat > 1) {
            return stat -= tenpercent
        }
        return stat
        
    }
    
    /*This will replace the current way we are adding stats to
    the recruits/users */
    const plusXtoStat = (stat) => {
        if (stat < 100) {
            return stat += 1
        }
        return stat
    }
    
    console.log("-------------------------------------------")
    
    
    setRecruits((prev1) => {
        /*Iterate through the recruits*/
        const newPrev1 = prev1.map((recruit,index) => {
          
          const newRecruit = {... recruit}
          const newStats = {... newRecruit.stats}
          
          /*Iterate through the missions of the recruits*/
          newRecruit.curr_actions = newRecruit.curr_actions.map((action, index1) => {
            const NewAction = [... action]
            
            const [mission, timeops] = NewAction
            const newMission = {... mission}
            
            
            
//            if mission type == building
            if (newMission.type === "building"){
                
                const missionId = newMission.id
                setBuildBuildings((prev) => {
                
                    return prev.map((missionBuilding) => {
                        console.log("BEGIN ============================")
                        const newMissionBuilding = {... missionBuilding}
                        if (missionBuilding.id == missionId){
                            
                            console.log("Updating progress for:", missionId);  
                            newMissionBuilding.progress += 1
                            if (newMissionBuilding.progress >= newMissionBuilding.turns){
                            
                                /*YOU LEFT OFF HERE*/
                            
                                newMissionBuilding.progress = 0
                                const finishedBuilding = buildingslist.filter(b => b)[0]
                                setBuildings((prev) => {
                                    return [... prev, ]
                                })
                                
                            }
                        }
                        
                        console.log("missionBuilding: ", newMissionBuilding)
                        console.log("END ============================")
                        return newMissionBuilding
                    })
                })
                
                           
            } else {
            
            console.log("THE TYPE IS NOT BUILDING")
                            newMission.progress += 1
                            if (newMission.progress > newMission.turns){
                                newMission.progress = 0

                                if (checkReqs(mission.reqs, newStats)){ 
                                    const newRewards = newMission.reward.map((reward) => {
                                        if (reward.type == "calories"){
                                          looseGainWeight(newStats, reward.amount)
                                        } else if (reward.type == "fatigue"){
                                         manageFatigue(newStats, reward.amount)                  
                                        } else if (reward.type == "strength"){
                                          newStats.curr_strength += reward.amount
                                        } else if (reward.type == "inteligence"){
                                          newStats.curr_inteligence += reward.amount
                                        } else if (reward.type == "spirit"){
                                          newStats.curr_spirit += reward.amount
                                        }
                                        return reward
                                    })
                                    newMission.reward = newRewards
                                }

                            }
            }
            
            
            console.log(newMission, timeops,index1)
            return [newMission, timeops]
          })
          
          
//          newRecruit.stats = changeStatByTurn(newStats, turns)
          
          
          
          return newRecruit
        })
      
    
    return newPrev1
    })
    
    
    
    
    
    
    
    
    const hoursAday = 24
    setTurns((prev) => {
        return prev += 1
      })
    
    setDays((prev) => {
      if (turns >= hoursAday) {
        setTurns((prev) => {
          return prev = 0
        })
        
        return prev += 1
      } else {
        return prev
      }
    })
    
    if (turns >= hoursAday) {
      setDayindex((prev) => {
        //console.log("dayindex",prev)
        if (prev + 1 >= daysOfWeek.length) {
          return prev = 0
        }
        return prev += 1
      })
    }
    
    
    
  }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    return (<>
    
    {/* 
        turns: 1 = ugly
        Time: 12:00 am = cute
        make it happen
    */}
    
    <Button onClick={nextTurn}>Next Turn</Button>
    
    <h2>{daysOfWeek[dayindex]} Days: {days} Hour: {turns+1}</h2>
    
    <Materials list={materials}/>
    
    <h3>Buildings Options</h3>
    
    <MissionCard 
        missions={buildBuildings}
        setMisssions={setBuildBuildings}
        operations={[recruits, setRecruits]}
        timeOperations={timeOperations}
    />
    
    <h3>Buildings Owned</h3>
    
    <BuildingCard buildings={buildings}/>
    
    
    </>)    
    
}

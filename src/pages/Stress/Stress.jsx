import { Button } from "antd"
import {useState} from "react"
import {Recruits, MissionCard} from "../../components"

export function Stress({operations}){

    const caloriesOfAKg = 7700
    const [recruits, setRecruits] = useState([
    {id:1,
    name:"Garcia",
    curr_actions: [],
    stats: {
      curr_strength: 20,
      curr_inteligence: 20,
      curr_spirit: 20,
      
      fatigue: 0.10,
      fatigue_display:100,
      min_stat_value: 1,
      max_stat_value: 100,
      }
    },])
    
    const [trainings, setTrainings] = useState([
        {id:1, 
        type:"mission", 
        name:"Sleep", 
        subs:[], 
        reward:[{type:"fatigue", amount:-0.00416*3, label: "10-8% less tired"}], 
        progress:0, 
        turns: 1, 
        participants:[]},
        ])
    
    const timeOperations = operations.operations[4]
    
    const manageFatigue = (stats, amount) => {
      
      const fatigue = stats.fatigue + amount
      const fatigue_display = Math.floor((fatigue/0.10)*100)
      
      if (fatigue_display < 0.01){
        stats.fatigue = 0.01
        stats.fatigue_display = 1     
      } else {
        stats.fatigue = fatigue
        stats.fatigue_display = fatigue_display
      }

      return stats
    }
    
    
    const skipXturns = () => {
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
            
            
            
            /*we check if the missions is scheduled for that day*/
          
            const newRewards = newMission.reward.map((reward) => {
                  if (reward.type == "fatigue"){
//                    newStats.fatigue += reward.amount
                     manageFatigue(newStats, reward.amount)
                  }
                  return reward
                })
            console.log(newStats.fatigue)
            newMission.reward = newRewards
           
            
            console.log(newMission, timeops,index1)
            return [newMission, timeops]
          })
          
//          newStats.curr_strength = minus1toStats(newStats.curr_strength)
          manageFatigue(newStats, 0.00416)
          console.log(newStats.fatigue)
          newRecruit.stats = newStats
          
          
          
          return newRecruit
        })
      
    
    return newPrev1
    })
      
    }
    

    console.log("timeOperations",timeOperations)
    return (<>
        <Recruits recruits={recruits} />
        <MissionCard 
          missions={trainings}
          setMisssions={setTrainings}
          operations={[recruits, setRecruits]}
          timeOperations={timeOperations}
        />
        <Button onClick={skipXturns}>Skip 1 turns</Button>
    </>)
}

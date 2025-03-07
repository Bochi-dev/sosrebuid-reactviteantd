import { Button } from "antd"
import {useState} from "react"
import {Recruits, MissionCard} from "../../components"

export function Calories({operations}){
    const [recruits, setRecruits] = useState([
    {id:1,
    name:"Garcia",
    curr_actions: [],
    stats: {
      curr_strength: 1,
      curr_inteligence: 1,
      curr_spirit: 1,
      
      curr_happiness: 100,
      curr_energy: 100,
      
      min_stat_value: 1,
      max_stat_value: 100,
      weight: 150,
      pound: 3500,
      }
    },])
    
    const [trainings, setTrainings] = useState([
        {id:1, 
        type:"mission", 
        name:"Loose Calories", 
        subs:[2,3], 
        reward:[{type:"pound", amount:-Math.abs(500)}], 
        progress:0, 
        turns: 1, 
        participants:[]},
        ])
    
    const timeOperations = operations.operations[4]
    
    
    const looseGainWeight = (stats, amount) => {
      const calories = stats.pound + amount
      
      if (calories > 0){
        stats.pound = calories
      } else if (calories < 0) {
        stats.pound = 3500
        stats.weight -= 1
      } 
      
      return stats
    }
    
    
    const skip10turns = () => {
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
                  if (reward.type == "pound"){
                    looseWeight(newStats, reward.amount)
                  }
                  return reward
                })
            newMission.reward = newRewards
           
            
            console.log(newMission, timeops,index1)
            return [newMission, timeops]
          })
          
          newStats.curr_strength = minus1toStats(newStats.curr_strength)
          newRecruit.stats = newStats
          
          
          
          return newRecruit
        })
      
    
    return newPrev1
    })
      
    }
    

    console.log("timeOperations",timeOperations)
    return (<>
        <Recruits recruits={recruits}/>
        <MissionCard 
          missions={trainings}
          setMisssions={setTrainings}
          operations={[recruits, setRecruits]}
          timeOperations={timeOperations}
        />
        <Button onClick={()=>{
          
        }}>Skip 10 turns</Button>
    </>)
}

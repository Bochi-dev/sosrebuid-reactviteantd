import { Button } from "antd"
import { useState } from "react"
import { Recruits } from "./Recruits"
import { MissionCard } from "./MissionCard"
import { checkReqs } from "./helpers" 


/*
TODO
Sunday March 9

Merge features like stress and calories to main game

change the list of recruits to match the new features
    -fatigue
    -fatigue_display
    -weigth
    -height
    -calories
    -bmi
    
the new functions created need to be put in main
    -manageFatigue
    -getBMICategory
    -looseGainWeight


*/




export function Stress({operations}){

    
    const [recruits, setRecruits] = useState([
    {id:1,
    name:"Garcia",
    curr_actions: [],
    stats: {
      curr_strength: 65,
      curr_inteligence: 30,
      curr_spirit: 70,
      
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
        reqs: [], 
        reward:[
            {type:"fatigue", amount:-0.00416*3, label: "10-8% less tired"}
        ], 
        progress:0, 
        turns: 1, 
        participants:[]},
        
        {id:2, 
        type:"mission", 
        name:"Complex Equations", 
        subs:[],
        reqs: [
            {type:"strength", amount: 50, label: "50 Strength"},
            {type:"spirit", amount: 50, label: "50 Spirit"},
            {type:"inteligence", amount: 25, label: "25 inteligence"},
        ], 
        reward:[
            {type:"inteligence", amount:2, label: "+2 inteligence"}
        ], 
        progress:0, 
        turns: 1, 
        participants:[]},
        ])
    
    const timeOperations = operations.operations[4]
    
    
    
    
    const manageFatigue = (stats, amount) => {
      console.log("stats fatigue",stats.fatigue)
      const fatigue = stats.fatigue + amount
      const fatigue_display = Math.floor((fatigue/0.10)*100)
      
      if (fatigue_display < 0.00){
        stats.fatigue = 0.00
        stats.fatigue_display = 0     
      } else {
        console.log("fatigue2", fatigue)
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
            
            
//            check if you fullfill the requirements

            
            if (checkReqs(mission.reqs, newStats)){           
              const newRewards = newMission.reward.map((reward) => {
                if (reward.type == "fatigue"){

                 manageFatigue(newStats, reward.amount)               
                   
                } else if (reward.type == "inteligence"){
                  newStats.curr_inteligence += reward.amount
                }
                return reward
              })           
            }
            
            
                      
            return [newMission, timeops]
          })
          
          manageFatigue(newStats, 0.00416)
          
          console.log("fatigue",newStats.fatigue)
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

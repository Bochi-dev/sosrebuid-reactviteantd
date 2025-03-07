import { Button } from "antd"
import {useState} from "react"
import {Recruits, MissionCard} from "../../components"

export function Calories({operations}){

    const caloriesOfAKg = 7700
    const [recruits, setRecruits] = useState([
    {id:1,
    name:"Garcia",
    curr_actions: [],
    stats: {
      curr_strength: 20,
      curr_inteligence: 20,
      curr_spirit: 20,
      
      curr_happiness: 100,
      curr_energy: 100,
      
      min_stat_value: 1,
      max_stat_value: 100,
      weight: 68,
      height: 1.7,
      calories: caloriesOfAKg,
      bmi: "normal"
      }
    },])
    
    const [trainings, setTrainings] = useState([
        {id:1, 
        type:"mission", 
        name:"Exercise", 
        subs:[], 
        reward:[{type:"calories", amount:-2500}], 
        progress:0, 
        turns: 1, 
        participants:[]},
        {id:2, 
        type:"mission", 
        name:"Marcdonalds", 
        subs:[], 
        reward:[{type:"calories", amount:1500}], 
        progress:0, 
        turns: 1, 
        participants:[]},
        ])
    
    const timeOperations = operations.operations[4]
 
    const getBMICategory = (bmi) => {
        if (bmi < 18) {
          return 'Underweight';
        } else if (bmi >= 18 && bmi < 25) {
          return 'Normal weight';
        } else if (bmi >= 25 && bmi < 30) {
          return 'Overweight';
        } else {
          return 'Obesity';
        }
    };
    
    
    
    const looseGainWeight = (stats, amount) => {
    
      let calories = stats.calories + (amount)
      
      console.log(calories)
      if (calories > caloriesOfAKg){
        calories = 0
        stats.weight += 1
        
      } else if (calories < 0) {
      
        calories = caloriesOfAKg + calories
        stats.weight -= 1
        
      }
 
      const bmi = stats.weight / stats.height**2;
      const category = getBMICategory(bmi)
      
      stats.calories = calories
      stats.bmi = `${Math.floor(bmi)} - ${category}`
      
      
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
                  if (reward.type == "calories"){
                    looseGainWeight(newStats, reward.amount)
                  }
                  return reward
                })
            newMission.reward = newRewards
           
            
            console.log(newMission, timeops,index1)
            return [newMission, timeops]
          })
          
//          newStats.curr_strength = minus1toStats(newStats.curr_strength)
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
        <Button onClick={skipXturns}>Skip 1 turns</Button>
    </>)
}

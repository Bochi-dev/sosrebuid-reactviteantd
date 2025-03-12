import { useState } from "react"
import { Button, Select, Card, Avatar, List } from "antd"
import { Space, Table, Tag } from 'antd';
const hours = [
  "12:00 AM", "1:00 AM", "2:00 AM", "3:00 AM", "4:00 AM", "5:00 AM", "6:00 AM", "7:00 AM",
  "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM",
  "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM", "11:00 PM"
];
import { Recruits } from "./Recruits"
import { changeStatByTurn, manageFatigue, checkReqs, looseGainWeight, schedule1, schedule2} from "../../global"




const hoursArray = hours.map(time => ({
  hour: time,
  action: null
}));



const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
];

const columns = [
  {
    title: 'Hour',
    dataIndex: 'hour',
    key: 'hour',
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
  },
];




// temp variables
let turns = 0
let days = 0











export const CreateSchedule = ({operations}) => {

    const [turns, setTurns] = useState(1)
    const [days, setDays] = useState(1)


    const [missions, setMissions, recruits, setRecruits, timeOperations, schedules] = operations.operations
    
    const [testRecruits, setTestRecruits] = useState(recruits.map((prev) => {
        const newPrev = {... prev}
        newPrev["schedule"] = null
        return newPrev
    }))
    
    
    
    
    
    const [schedule1, schedule2] = schedules
    const [schedule, setSchedule] = useState(schedule1)
    
    const [display, setDisplay] = useState(hoursArray.map((prev) => {
        const newPrev = { ... prev }       
        const actions = [ ... schedule.actions ]
        
        
        const action = actions.filter((el) => {
            const turn = el.turn
            const hour = hours[turn]
            const hourPrev = newPrev.hour
            if (hour == hourPrev){
                return el
            }
        })[0]
   
        newPrev.action = action?.name
        
        return newPrev
    }))
    
    
    
    
    
    
    
  /*Next turn is used to the game keeps moving forward*/
  function nextTurn () {
    
    
   
    
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
    
    
    setTestRecruits((prev1) => {
        /*Iterate through the recruits*/
        const newPrev1 = prev1.map((recruit) => {
          
          const newRecruit = {... recruit}
          const newStats = {... newRecruit.stats}
          
          if (newRecruit.schedule == null){
            return newRecruit          
          }
          
          
          const recruitSchedule = schedules.filter((el) => {
            if ( el.id == newRecruit.schedule)
            return el
          })[0]
          
          const index = turn-1
          const actionOfHour = recruitSchedule.actions[index]
          
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
          
          
          
          
          
          
          /*
//          Iterate through the missions of the recruits
          newRecruit.curr_actions = newRecruit.curr_actions.map((action, index1) => {
            const NewAction = [... action]
            
            const [mission, timeops] = NewAction
            const newMission = {... mission}
            
            
            
//            we check if the missions is scheduled for that day
            if (timeops[0] == daysOfWeek[dayindex]) {
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
                    We look into the current turn



                  
                }
            }
            
            
            console.log(newMission, timeops,index1)
            return [newMission, timeops]
          })*/
          
          
//          newRecruit.stats = changeStatByTurn(newStats, turns)
          
          
          newRecruit.stats = newStats
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
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    


    return <>
    
    <Button onClick={nextTurn}>Next Turn</Button>
    
    <Recruits recruits={testRecruits} setRecruits={setTestRecruits} schedules={schedules}/>
    
    <Button>create new one</Button><Select placeholder={"Select one to Edit"}/>
    
    <div>
        
        <Card>
            <h3>{schedule.title}</h3>
            
            
            
            <Table dataSource={display} columns={columns} />
            
            
            
            
            {/*------------------------------------------*/}
            {/*<List
                itemLayout="horizontal"
                dataSource={schedule.actions}
                renderItem={(item, index) => (
                  <List.Item>
                    <p>{hours[item.turn]} {item.name}</p>                  
                  </List.Item>
                )}
              />antd
            
            
            <List
                itemLayout="horizontal"
                dataSource={schedule.actions}
                renderItem={(item, index) => (
                  <List.Item>
                    <p>{hours[item.turn]} {item.name}</p>                  
                  </List.Item>
                )}
              />*/}
            
        </Card>
        
    </div>
    
    </>
}

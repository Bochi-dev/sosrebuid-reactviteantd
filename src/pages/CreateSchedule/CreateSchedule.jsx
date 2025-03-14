import { useState } from "react"
import { Button, Select, Card, Avatar, List, Modal } from "antd"
import { Space, Table, Tag } from 'antd';
const hours = [
  "12:00 AM", "1:00 AM", "2:00 AM", "3:00 AM", "4:00 AM", "5:00 AM", "6:00 AM", "7:00 AM",
  "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM",
  "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM", "11:00 PM"
];
import { Recruits } from "./Recruits"
import { changeStatByTurn, manageFatigue, checkReqs, looseGainWeight, schedule1, schedule2, daysOfWeek} from "../../global"
import { MissionCard } from "./MissionCard"



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
    const [disableSelect, setDisableSelect] = useState(false)
    const [dayindex, setDayindex] = useState(0)
    const [turns, setTurns] = useState(1)
    const [days, setDays] = useState(1)
    const testtimeOperations = [daysOfWeek[dayindex], days, turns]

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
    
    
    
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
      setIsModalOpen(true);
    };

    const handleOk = () => {
      setIsModalOpen(false);
      nextTurn()
    };

    const handleCancel = () => {
      setIsModalOpen(false);
    };
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
  /*Next turn is used to the game keeps moving forward*/
  function nextTurn () {
  
  
    /* testing to see if converting the turn to zero */
    
    const hoursAday = 24
    if (turns >= hoursAday) {
      setDisableSelect((prev) => {
        return false
      })
      
      
      setTurns((prev) => {
          return 1
        }) 
        
        
      setDays((prev) => {        
        return prev += 1    
      })
    } else {
      
      setDisableSelect((prev) => {
        return true
      })
    
    }
    
    setTurns((prev) => {
      return prev += 1
    })
    
    
    console.log("index in schedule page (previous index): ", turns - 1)
  
  
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
          
          const index = turns-1    
          const reward = recruitSchedule.actions[index]
          
          
          
          if (reward.type == "calories"){
            looseGainWeight(newStats, reward.amount)
          } else if (reward.type == "fatigue"){
            manageFatigue(newStats, reward.amount)                  
          } else if ( reward.type == "work" || reward.type == "training" ){
          
            const newCurr_actions = newRecruit.curr_actions
            
            if (newCurr_actions.length > 0){
              const action = newCurr_actions[0]
              const [mission, timeops] = action
              console.log(mission)
              const missionRewards = mission.reward
              missionRewards.forEach((value,index,array) => {
                
                if (value.type == "strength"){
                  newStats.curr_strength += value.amount
                } else if (value.type == "inteligence"){
                  newStats.curr_inteligence += value.amount
                } else if (value.type == "spirit"){
                  newStats.curr_spirit += value.amount
                }
              })
            }

          }
             
          newRecruit.stats = changeStatByTurn(newStats, turns)
          
          newRecruit.stats = newStats
          return newRecruit
        })
      
    
    return newPrev1
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
    
    
    const [work, setWork] = useState([
        {
          id:1,
          type:"training",
          name:"Excercise",
          reqs:[
            {type:"strength", amount: 10, label: "10 Strength"},
            {type:"spirit", amount: 10, label: "10 Spirit"},
          ],
          subs:[],
          reward:[{type:"strength", amount:2, label:"+2 Strength"}],
          progress:0,
          turns: 1,
          participants:[]
        },
        {
          id:2, 
          type:"work", 
          name:"Lab Research (Work)", 
          reqs:[],
          subs:[], 
          reward:[{type:"inteligence", amount:5, label:"+5 Inteligence"}], 
          progress:0, 
          turns: 1, 
          participants:[]
        },
        {
          id:3, 
          type:"training", 
          name:"Research in library",
          reqs:[], 
          subs:[], 
          reward:[{type:"inteligence", amount:2, label:"+2 Inteligence"}], 
          progress:0, 
          turns: 1, 
          participants:[]
        }

        ])
    
    const planningMessage = (disableSelect) => {
      if (turns == 24){
        return "Review"
      }
      return disableSelect ? "Executing" : "Planning"
    }
 
    return <>
    <h3>{daysOfWeek[dayindex]}, Days: {days} Turns: {turns}, phase: {planningMessage(disableSelect)} </h3>
    <Button onClick={() => {
      
      if (turns != 24){
        nextTurn()
      } else {
        setIsModalOpen(true)
      }
      
    }}>Next Turn</Button>
    
    <Recruits recruits={testRecruits} setRecruits={setTestRecruits} schedules={schedules} turns={turns} disableSelect={disableSelect}/>
    
    <MissionCard
      
      missions={work}
      setMisssions={setWork}
      operations={[testRecruits, setTestRecruits]}
      timeOperations={testtimeOperations}
      disableSelect={disableSelect}
      
    />
    
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
    
    <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <h1>Do you wanna finish the day?</h1>
    </Modal>
    </>
}

import { Menu, Button, Space} from "antd";
import {
HomeOutlined,
SunOutlined,
ProductFilled,
ThunderboltFilled,
SignalFilled,
OrderedListOutlined,
BuildOutlined,
RadarChartOutlined,
CompassOutlined,
TableOutlined,
AppstoreAddOutlined,} from "@ant-design/icons"
import { useState } from 'react'
import { IconText } from "./components"
import { changeStatByTurn, manageFatigue, checkReqs, looseGainWeight, schedule1, schedule2, RECRUITS} from "./global"
import { Route, Routes, useNavigate, useLocation } from "react-router-dom"
import { Main,
Missions,
Todo,
Training,
Calories,
BmiCalc,
Stress,
CreateSchedule,
Buildings, 
Classes,
Exploration,
Walls} from "./pages"
const daysOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]


//the main app, here is managed the different routes of the app
function App() {

  const [dayindex, setDayindex] = useState(0)
  const [routines, setRoutines] = useState()
  const [recruits, setRecruits] = useState(RECRUITS)
  
  
  const [trainings, setTrainings] = useState([
        {
          id:1,
          type:"training",
          name:"Excercise",
          reqs:[
            {type:"strength", amount: 10, label: "10 Strength"},
            {type:"spirit", amount: 10, label: "10 Spirit"},
          ],
          subs:[2,3],
          reward:[{type:"strength", amount:2, label:"+2 Strength"}],
          progress:0,
          turns: 1,
          participants:[]
        },
        {
          id:2, 
          type:"training", 
          name:"Meditation", 
          reqs:[],
          subs:[3], 
          reward:[{type:"spirit", amount:2, label:"+2 Spirit"}], 
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
  
  
  const [missions, setMissions] = useState([
    {id:1, type:"mission", name:"Complete mission 1", reqs:[], subs:[2,3], reward:[{type:"food", amount:500, label:"Eat 1 food ration"}], progress:0, turns: 10, participants:[]},
    {id:2, type:"mission", name:"Complete mission 2", reqs:[], subs:[3], reward:[{type:"food", amount:1000, label:"Eat 2 food rations"}], progress:0, turns: 5, participants:[]},
    {id:3, type:"mission", name:"Complete mission 3", reqs:[], subs:[], reward:[{type:"food", amount:1500, label:"Eat 3 food rations"}], progress:0, turns: 2, participants:[]},
  ])
  
  let x
  let setX
  
  if (useLocation().pathname == "/Training") {
     x = trainings
     setX = setTrainings
  } else {
     x = missions
     setX = setMissions
  }
  
  
  const [turns, setTurns] = useState(1)
  const [days, setDays] = useState(1)
  
  const timeOperations = [daysOfWeek[dayindex], days, turns]
  
  
  
  /*Next turn is used to the game keeps moving forward*/
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
            
            
            
            /*we check if the missions is scheduled for that day*/
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
                  
                }
            }
            
            
            console.log(newMission, timeops,index1)
            return [newMission, timeops]
          })
          
          
          newRecruit.stats = changeStatByTurn(newStats, turns)
          
          
          
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



  return (

    <>
    
      {/* 
      pass the missions/trainings to the App.jsx page
      then pass the operations of both lists to the respective
      pages (missions => missios and trainings to => trainings) 
    
    
    */}
    
    {/*
      Check the url and send the needed missions/trainings operations
      accordingly - make a system for that.
    */}
    
      <Header days={days} dayName={daysOfWeek[dayindex]} turns={turns} nextTurn={nextTurn}/>
      
      <div style={{
            display: "flex", 
            flexDirection:"row", 
            flex: 1,
        }}>
            <SideMenu/>
            <Content operations={[x,setX,recruits,setRecruits,timeOperations, [schedule1, schedule2]]}/>
        </div>
    </>
  )
}

function SideMenu() {
  const navigate = useNavigate()
  return (
    <div style={{display: "flex"}}>
        <Menu
        onClick={({key}) => {
            if (key === "signout") {
//                TODO, sign out feature here"
            
            } else {
             navigate(key)
            }
        
        }} 
        defaultSelectedKeys={[window.location.pathname]}
        items={[
            {label: "Home", key:"/", icon: <HomeOutlined/>},
            {label: "Missions", key:"/Missions", icon: <ProductFilled/>},
            {label: "Training", key:"/Training", icon: <ThunderboltFilled/>},
            {label: "Create Schedule", key:"/Create_Schedule", icon: <OrderedListOutlined />},
            {label: "Classes and Teams", key:"/Classes", icon: <RadarChartOutlined />},
            {label: "Exploration", key:"/Exploration", icon: <CompassOutlined />},
            {label: "Walls", key:"/Walls", icon: <AppstoreAddOutlined />},
            
            {label: "Buildings (WIP)", key:"/Buildings", icon: <BuildOutlined />, disabled:true},
//            {label: "Food", key:"/Food", icon: <ThunderboltFilled/>},
//            {label: "Calories", key:"/Calories", icon: <ThunderboltFilled/>},
//            {label: "BmiCalc", key:"/BmiCalc", icon: <ThunderboltFilled/>},
//            {label: "Stress", key:"/Stress", icon: <ThunderboltFilled/>},
//            {label: "Todo", key:"/Todo", icon: <SignalFilled/>},
            
            
        ]}>
            
        </Menu>
        
    </div>
  )
}

function Header({days, dayName, turns, nextTurn}) {
    return <div
        style={{
        height: 60,
        display: "flex",
        alignItems: "center",
        fontWeight: "bold"
        }}
    >
    <Space>
      <IconText icon={SunOutlined} text={`${dayName}, Days: ${days} Turns: ${turns}`}/>
      
      <Button onClick={() => {
        nextTurn()
      }}>Next Turn</Button>
    </Space>
    
    </div>
}

function Content(operations) {
    return <div style={{padding:15}}>
        <Routes>
            
            <Route 
                path="/" 
                element={<Main operations={operations}/>}
            />
            <Route 
                path="/Missions" 
                element={<Missions operations={operations}/>}
            />
            <Route 
                path="/Training" 
                element={<Training operations={operations}/>}
            />
            <Route 
                path="/Food" 
                element={<>Food here</>}
            />
            <Route 
                path="/Calories" 
                element={<Calories operations={operations}/>}
            />
            <Route 
                path="/BmiCalc" 
                element={<BmiCalc/>}
            />
            <Route 
                path="/Stress" 
                element={<Stress operations={operations} />}
            />
            <Route 
                path="/Create_Schedule" 
                element={<CreateSchedule operations={operations}/>}
            />
            
            <Route 
                path="/Buildings" 
                element={<Buildings operations={operations}/>}
            />
            
            <Route 
                path="/Exploration" 
                element={<Exploration operations={operations}/>}
            />
            
            <Route 
                path="/Classes" 
                element={<Classes operations={operations}/>}
            />
            
            <Route 
                path="/Walls" 
                element={<Walls operations={operations}/>}
            />
            
            <Route 
                path="/Todo" 
                element={<Todo/>}
            />
            
        </Routes>
    </div>
    }


export default App

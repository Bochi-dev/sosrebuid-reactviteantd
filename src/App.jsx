import { Menu, Button, Space, Modal} from "antd";
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
AppstoreAddOutlined,
ExclamationCircleFilled} from "@ant-design/icons"
import { useState } from 'react'
import { IconText } from "./components"
import { changeStatByTurn, 
manageFatigue, 
checkReqs, 
looseGainWeight, 
schedule1, 
schedule2, 
RECRUITS,
HOURS, proccessEducation} from "./global"
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
  const [resources, setResources] = useState({
    food: 20,
    wood: 30,
  })
  const [disableSelect, setDisableSelect] = useState(false)
  const [dayindex, setDayindex] = useState(0)
  const [routines, setRoutines] = useState()
  const [recruits, setRecruits] = useState(RECRUITS)
  const [confirmMessage, setConfirmMessage] = useState("")
  const schedules = [schedule1, schedule2]

  
  const [education, setEducation] = useState([
        {
          id:1,
          type:"education",
          name:"Pre Securer Master Class",
          reqs:[
            {type:"inteligence", amount: 20, label: "20 Inteligence"},
          ],
          reward:[{type:"education", id:1, label:"Pre Securer Class"}],
          progress:0,
          turns: 7,
          participants:[]
        },
        {
          id:2,
          type:"education",
          name:"Securer Master Class",
          reqs:[
            {type:"inteligence", amount: 10, label: "10 Inteligence"},
            {type:"strength", amount: 20, label: "20 Strength"},
          ],
          reward:[{type:"education", id:2, label:"Securer Class"}],
          progress:0,
          turns: 7,
          participants:[]
        },
        {
          id:3,
          type:"education",
          name:"Post Securer Master Class",
          reqs:[
            {type:"inteligence", amount: 10, label: "10 Inteligence"},
            {type:"strength", amount: 20, label: "20 Strength"},
          ],
          reward:[{type:"education", id:3, label:"Post Securer"}],
          progress:0,
          turns: 7,
          participants:[]
        },
    ])
  
  
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
  } else if (useLocation().pathname == "/Missions") {
     x = missions
     setX = setMissions
  } else {
    x = education
    setX = setEducation
  }
  
  const [turns, setTurns] = useState(0)
  const [days, setDays] = useState(1)
  
  
  

const rewardsFromWork = (missionRewards, stats) => {
  missionRewards.forEach((value,index,array) => {
    if (value.type === "strength") {
      stats = { ... stats, curr_strength: stats.curr_strength + value.amount, }
    }
    if (value.type === "inteligence") {
      stats = { ... stats, curr_inteligence: stats.curr_inteligence + value.amount, }
    }
    if (value.type === "spirit") {
      stats = { ... stats, curr_spirit: stats.curr_spirit + value.amount, }
    }
  })
  
  return stats
}
  
  
  
const processWork = (mission, stats) => {
  const missionRewards = mission.reward
  return rewardsFromWork(missionRewards, stats)
}
  
  
  
  
  /*Next turn is used so game keeps moving forward*/
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
    
    
    
    setRecruits((prev) => {
        /*Iterate through the recruits*/
        return prev.map((recruit) => {
          if (recruit.schedule == null){
            return recruit          
          }
          const curr_actions = recruit.curr_actions
          const recruitSchedule = schedules.find(el => el.id == recruit.schedule)
          const reward = recruitSchedule.actions[turns]
          let stats = recruit.stats 
          
          if (reward.type == "calories"){
            stats = looseGainWeight(stats, reward.amount)
          } else if (reward.type == "fatigue"){
            stats = manageFatigue(stats, reward.amount)                  
          } else if ( reward.type == "work" || reward.type == "training" ){
            if (curr_actions){
              const mission = curr_actions.mission
              if (mission.type === "education"){
                recruit = proccessEducation(recruit)
              } else {
                stats = processWork(mission, stats) 
              }
            }
          }
          return { 
            ... recruit,
            stats: changeStatByTurn(stats, turns, reward.type)
            }
        })
    
    })
    
    const hoursAday = 23
    
    if (turns >= hoursAday) {
      setDisableSelect(false)
      setTurns(0) 
      setDays((prev) => {        
        return prev += 1    
      })
    } else {
      setDisableSelect(true)
      setTurns((prev) => {
        return prev += 1
      })
    
    }
    
    if (turns >= hoursAday) {
      setDayindex((prev) => {
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
    
      <Header days={days} dayName={daysOfWeek[dayindex]} turns={turns} nextTurn={nextTurn} disableSelect={disableSelect}/>
      
      <div style={{
            display: "flex", 
            flexDirection:"row", 
            flex: 1,
        }}>
            <SideMenu/>
            <Content operations={{
                pageOperations: [x,setX],
                recruitsOperations: [recruits,setRecruits],
                timeOperations: [daysOfWeek[dayindex], days, turns], 
                schedules: [schedule1, schedule2],
                resourcesOperations: [resources, setResources],
                disabledOperations: [disableSelect, setDisableSelect]
                }}/>
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
            {label: "Create Schedule", key:"/Create_Schedule", icon: <OrderedListOutlined />, disabled: true},
            {label: "School (Classes)", key:"/Classes", icon: <RadarChartOutlined />},
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

function Header({days, dayName, turns, nextTurn, disableSelect}) {
    const [modal, contextHolder] = Modal.useModal();
    const hour = HOURS[turns]
    const planningMessage = (disableSelect) => {
      if (turns === 23){
        return "Review"
      }
      return disableSelect ? "Executing" : "Planning"
    }

    return <div
        style={{
        height: 60,
        display: "flex",
        alignItems: "center",
        fontWeight: "bold"
        }}
    >
    <Space>
      <IconText icon={SunOutlined} text={`${dayName}, Days: ${days} Hour: ${hour}, Phase: ${planningMessage(disableSelect)}`}/>
      
      <Button onClick={() => {
        if (turns != 23){
          nextTurn()
        } else {
          modal.confirm({
            title: 'Ready to go to the next day?',
            icon: <ExclamationCircleFilled />,
            onOk() {
              nextTurn()
            },
            onCancel() {
            },
          })
        }
      
      }}>Next Turn</Button>
    </Space>
    {contextHolder}
    </div>
}

function Content({operations}) {
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

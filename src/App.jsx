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
import { IconText, GameCard } from "./components"
import { changeStatByTurn, 
manageFatigue, 
checkReqs, 
looseGainWeight, 
schedule1, 
schedule2, 
RECRUITS,
HOURS, 
proccessEducation,
damageTaken} from "./global"
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("")
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  
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
  
  
  
  
  const [expeditions, setExpeditions] = useState([
    /*example {
    id:0,
    participants:[1,2],
    details: "",
    canCarry: 50 (asegurador) + 20(normal) + 20(normal),
    currCarry: []
    bonus: [
      {type: "materials", bonus:0.3, label: "30% more materials per location"} (stackable)
    ],
    progress: 0,
    duration: 7( in days ) in turns 24*7
    
    
    }*/
  ])
  const [locations, setLocations] = useState([
    /*example
      
      this will be found by the amount of the places (10) times (*) 2
      { id:0,
        expeditionId: id of expedition,
        locations:[
        {
          direction: random direction from the 3 directions
          resources: [
            {type:"material", name:"stick", weight: 10, amount:10}
          ],
          
        },
        {
          direction: random direction from the 3 directions
          resources: [
            {type:"material", name:"stick", weight: 10, amount:10}
          ],
          
        },
        ]
      }
    */
  ])
  
  const [visited, setVisited] = useState([
    /*
    example: only put it here if we weren't able to retrive all the resources of the place
    {
      distance: if in one of the days we found one of the locations, the day will be saved here
      
      aside from that it will be a copy of the location
      
    
    }
    
    */
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
  
  const [walls, setWalls] = useState( ["North Wall", "South Wall", "East Wall"].map( (el, index) => {
        return {
            id: index,
            name: el,
            health: 3,
            maxHealth: 3,
            stationedTeam: null,
            isBeingAttacked: false,
            get defenseLevel () {
                if (this.stationedTeam == null) return this.maxHealth
                const stationedTeam = getTeam(this.stationedTeam)
                
                return stationedTeam.powerLevel + this.maxHealth
            }
        
        }
    }))
  const [teams, setTeams] = useState([])
  
  

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
  
  
  
  
  const processRecruitDirectEvents = () => {
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
  }
  
  
  
  
  const goOnExpedition = () => {
    
    if (expeditions.length == 0) return 
    
    const newExpeditions = expeditions.map(exp => {
        const linkedLocations = locations.filter(l => l.expeditionId === exp.id)[0].locations
        const locationsAmount = linkedLocations.length
        const foundedIndex = Math.floor(Math.random()*(locationsAmount*2))
        console.log(foundedIndex, locationsAmount)
        const founded = foundedIndex < locationsAmount
        
        
        if ( exp.duration <= exp.progress ) exp.comingBack = true
        
        if (exp?.comingBack){
            setModalData(exp)
            showModal()
            
            return {... exp, DELETE:true}
        }       
        console.log(founded)
        if (founded) {
            console.log("FOUNDED")
            const foundedLocation = linkedLocations[foundedIndex]
            console.log(foundedLocation)
            const resources = foundedLocation.resources
            const canCarry = exp.canCarry - calcBagWeight(exp.currCarry)
            const cantCarryAll = foundedLocation.resourcesTotalWeight > canCarry
            
            /*move the resources to exp.currCarry before putting them
            in visited, after that, they have to come back with the resources 
            
            so they need an indicator of when they coming back
            
            */
             const moveResources = (expWeightLimit, resources) => {
              const bag = []
              let bagsWeight = 0
              let newResources = [ ... resources]
              for ( const re of resources ){
                const calc = bagsWeight + re.weight
                if (calc >= expWeightLimit){
                  continue
                }
                bagsWeight = calc
                bag.push({ ... re})
                newResources = newResources.filter( nre => JSON.stringify(nre) !== JSON.stringify(re))
              }
              
              return [bag, newResources]
            }
            
            const [recoveredResources, oldResources] = moveResources(canCarry, resources)
            console.log(recoveredResources, oldResources)
            
            const eraseLocation = (expeditionIndex, foundedIndex) => {
//              if (!cantCarryAll && recoveredResources.length < 0) {
  //              erase location with no resources
                setLocations(locations.filter(l => {
//                  if (l.expeditionId === exp.id){
                  if (l.expeditionId === expeditionIndex){
                    return {
                      ... l,
                      locations: [ ... l.locations.slice(1, foundedIndex)]
                    }
                  }
                  return l                
                  }))
//              }
            }
            
             
            
            if (cantCarryAll){
                setVisited([ ... visited, { ... foundedLocation, distance: exp.progress + 1, }])
                eraseLocation(exp.id, foundedIndex)      
                return { 
                  ... exp,
                  progress: exp.progress + 1, 
                  currCarry:[ ... exp.currCarry, ... recoveredResources],
                  comingBack: true,
                  }
            } else if (!cantCarryAll && recoveredResources.length > 0)  {
//            TODO
//the reason for the exploration not finding anything is because they are not reaching the max value capacity of weight they can carrying
//there is no function to load the things they found and then keep going
              eraseLocation(exp.id, foundedIndex)
              return { 
                    ... exp,
                    progress: exp.progress + 1, 
                    currCarry:[ ... exp.currCarry, ... recoveredResources],
                  }
            }
            return { ... exp, progress: exp.progress + 1}
//            if you didn't find anything then sum 24(a whole day) to progress
        } else {
            return { ... exp, progress: exp.progress + 1}
        }
    })
    setExpeditions([ ... newExpeditions.filter(el => (el?.DELETE == true) ? false : true)])
  }
  
  
  
  
  
  const defendWalls = () => {
      
      setWalls((prev) => {
        return prev.map(el => {
          if (el.health <= 0 && (el.messageSent === undefined || el.messageSent === false)){
            setModalMessage(<h2>{el.name} has been destroyed, the bandints have taken some of your stuff, repair as fast as possible!</h2>)
            setIsModalOpen(true)
            return { ... el, messageSent: true, attacked: false, attacker: null }
          }
          const isAttackedState = (wall) => {
              if (wall?.attacked === true) return {}
              
              const attacked =  Math.floor(Math.random()*2) === 1 ? true : false // if it's 1 then it's being attacked
              const attacker = attacked ? {
                powerLevel: Math.floor(Math.random()*27) ,/*a random level between wall's defense + 2 and wall's defense -2   
                obviously without surpassing the 27 max level cap*/
                health: 10,
                maxHealth: 10,
              } : null
              
              return {attacked: attacked, attacker: attacker}
              
            }
          
          const responseToAttackedState = (wall) => {
//            first we have the changes
            let changes = {}
//            checking if the wall is being attacked
            if (
                
                wall?.attacked === false || wall.attacked === undefined ||
                wall?.attacker === null || wall.attacker === undefined
                
              ) return {}
            
            
//            setting the team and attacker as consts
            const attacker = wall.attacker
            const team = teams.find(el => el.id === wall.stationedTeam)
            
            
//            checking if the attacker is still alive
            if (attacker?.health <= 0 || attacker === null){
              changes = {... changes, attacked: false}
            }
            
//            if there is not team, protecting the wall, the wall will take damage directly
            if (team === undefined && (attacker !== null || attacker !== undefined)) {
              changes = {
                ... changes,
//                if the attacker is stronger than the wall
                health: ( wall.defenseLevel <= attacker.powerLevel ) ? Math.max(0, wall.health - 1) : wall.health,
//                because the item is undefined, we are gonna set the stationedTeam to null
                stationedTeam: null,
              }
//              if team is defined and its not weaker than the attacker
            } else if (attacker.powerLevel < team.powerLevel){
                changes = {
                  ... changes,
                  attacker: (attacker.health > 0) ? {
                    ... attacker,
                    health: Math.max(0, attacker.health - 1)
                  } : null,
                }
//              if the enemy stronger
              } else {
                if (team.health <= 0) {
                  changes = { 
                    ... changes, 
                    health: ( wall.defenseLevel <= attacker.powerLevel ) ? Math.max(0, wall.health - 1) : wall.health,
                  }
                  
                } else {
                  damageTaken(team, 1, setRecruits)
                }
              }
            
            return changes
          }
            
            
          
          return { 
            ... el,
            ... isAttackedState(el),
            ... responseToAttackedState(el),
          }
        })
      })
      
  }
  
  
  
  
  
  const processRecruitIndirectEvents = () => {
    defendWalls()
  }
  
  
  /*Next turn is used so game keeps moving forward*/
  function nextTurn () {
    processRecruitDirectEvents()
    processRecruitIndirectEvents()
    
    
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
  
  
  const displayResourceCard = (resources) => {
    let cards = []
    Object.keys(resources).forEach((name) => {
      cards.push(<GameCard title={name} amount={resources[name]}/>)
    })
    
    return cards
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
            <div>
              <Space>
                <GameCard title="People" amount={recruits.length}/>
                  {displayResourceCard(resources)}
                <GameCard title="Happiness" amount="0%"/>
              </Space>
              <Content operations={{
                pageOperations: [x,setX],
                recruitsOperations: [recruits,setRecruits],
                timeOperations: [daysOfWeek[dayindex], days, turns], 
                schedules: [schedule1, schedule2],
                resourcesOperations: [resources, setResources],
                disabledOperations: [disableSelect, setDisableSelect],
                expeditionOperations: [expeditions, setExpeditions],
                locationsOperations: [locations, setLocations],
                visitedOperations: [visited, setVisited],
                modalOpenOperations: [isModalOpen, setIsModalOpen],
                modalMessageOperations: [modalMessage, setModalMessage],
                wallsOperations: [walls, setWalls],
                teamsOperations: [teams, setTeams],
                
                }}/>
            </div>
            {/*MESSAGE MODAL*/}
            <Modal title="Alert Message" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
              {modalMessage}
            </Modal>
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
            {label: "Walls", key:"/Walls", icon: <AppstoreAddOutlined />},
            {label: "Exploration", key:"/Exploration", icon: <CompassOutlined />},

            
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

import { useState } from "react"
import { Teams, WallsCard } from "./pageComponents"
import { damageTaken } from "./global"
import { Button, Col, Row, Space, Flex } from "antd"
const wallNames = ["North Wall", "South Wall", "East Wall"]


const classes = [
        {id:1, name:"presecurer", label:"Pre-Securer", lvl: 1},
        {id:2, name:"securer", label:"Securer", lvl: 1},
        {id:3, name:"postsecurer", label:"Post-Securer", lvl: 1},
    ]
    
const randomClasses = () => {
    let randclasses = []
    for (let i = 0; i < classes.length; i++){
        if (Math.ceil(Math.random()*2) === 1){
            randclasses.push([{
                ... classes[i],
                lvl: Math.ceil(Math.random()*3)
            }])
        } else {
            randclasses.push([])
        }
    }
    
    return randclasses
}

export const Walls = ({operations}) => {
    const [trainings, setTrainings, recruits, setRecruits, timeOperations] = operations.operations
    
/*    adding the health and maxHealth to recruits just to decide when the team will
    be defeated or healed later*/
    const [testRecruits, setTestRecruits] = useState(recruits.map(el => {
        return {
            ... el,
            health: 10,
            maxHealth: 10,
            classes: randomClasses(),
            get level() {
                let lvl = 0
                for (let slot of this.classes){
                    if (slot.length > 0){
                        const slots_class = slot[0]
//                        console.log("slots_class: ", slots_class)
                        lvl += slots_class.lvl
                    }
                }
                return lvl
            }
        }
    }))
    
    
    const [teams, setTeams] = useState([])
    
    const getTeam = (id) => {
      return teams.filter(el => el.id === id)[0]
    } 
    
    const [walls, setWalls] = useState( wallNames.map( (el, index) => {
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
    
    
    
    const nextTurn = () => {
      
      setWalls((prev) => {
        return prev.map(el => {
          
          const isAttackedState = (wall) => {
              if (wall?.attacked === true) return {}
              
              const attacked =  Math.floor(Math.random()*2) === 1 ? true : false // if it's 1 then it's being attacked
              const attacker = attacked ? {
                powerLevel: Math.floor(Math.random()*28) ,/*a random level between wall's defense + 2 and wall's defense -2   
                obviously without surpassing the 27 max level cap*/
                health: 10,
                maxHealth: 10,
              } : null
              
              return {attacked: attacked, attacker: attacker}
              
            }
          
          const responseToAttackedState = (wall) => {
            let changes = {}
            
            if (
                
                wall?.attacked === false || wall.attacked === undefined ||
                wall?.attacker === null || wall.attacker === undefined
                
              ) return {}
            
            const attacker = wall.attacker
            const team = getTeam(wall.stationedTeam)
            
            if (attacker.health <= 0){
              changes = {... changes, attacked: false}
            }
            
            if (team === undefined) {
              changes = {
                ... changes,
                health: ( wall.defenseLevel <= attacker.powerLevel ) ? Math.max(0, wall.health - 1) : wall.health,
                ... isAttackerDead(attacker),
              }
            } else {
              changes = {
              ... changes,
              attacker: (attacker.health > 0) ? {
                ... attacker,
                health: ( attacker.powerLevel < team.powerLevel) ? Math.max(0, attacker.health - 1) : attacker.health,
              } : null,
              ... isAttackerDead(attacker),
              
            
             }
            
            }
            
        
          }
            
            
          
          return { 
            ... el,
            ... isAttackedState(el),
            ... responseToAttackedState(el),
          }
        })
      })
      
    }
    
    const inWalls = () => {
      const stationated = []
      walls.forEach(el => {
        if (el.stationedTeam === null) return
        stationated.push (el.stationedTeam)
      })
    
      return stationated
    }
    
    
    return (<>
    
      <Button onClick={() => {
           /*for (let recruit of testRecruits){
            console.log(recruit,recruit.health)
           }
      
           teams.forEach(el => {
              damageTaken(el, 5, setTestRecruits)
            })*/
            
            testRecruits.forEach(el => {
              console.log(el.level, el.classes, randomClasses())
            })

      }}>Test</Button>
      
      <Button onClick={nextTurn}>Next Turn</Button>
    
      <Row gutter={12}>
          
          <Col span={12}>
              <Flex wrap={true}>
                {walls.map((el, index) => (
                    <WallsCard key={index} wall={el} setWalls={setWalls} inWalls={inWalls} teams={teams} setRecruits={setTestRecruits}/>
                  )
                )}
              </Flex>
          </Col>
          <Col span={12}>
            <Teams  teams={teams} setTeams={setTeams} recruits={testRecruits} setRecruits={setTestRecruits}/>
          </Col>
          
          
      
      </Row>
    
    </>)
    
    
}

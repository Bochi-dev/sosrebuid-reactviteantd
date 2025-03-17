import { Recruits } from "./components"
import { useState } from "react"
import { Card, Select } from "antd"


export const Classes = ({operations}) => {

    const [missions, setMissions, recruits, setRecruits, timeOperations] = operations.operations

    const [testRecruits, setTestRecruits] = useState(recruits.map(r => {
        return {... r, classes: [[],[],[]]}
    }))
    
    const [classes, setClasses] = useState([
        {id:1, name:"presecurer", label:"Pre-Securer", lvl: 1},
        {id:2, name:"securer", label:"Securer", lvl: 1},
        {id:3, name:"postsecurer", label:"Post-Securer", lvl: 1},
    
    ])
    
    const education = [
        {
          id:1,
          type:"education",
          name:"Pre Securer Master Class",
          reqs:[
            {type:"inteligence", amount: 20, label: "20 Inteligence"},
          ],
          reward:[{type:"education", id:2, label:"Pre Securer Class"}],
          progress:0,
          turns: 23*7,
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
          turns: 23*7,
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
          turns: 23*7,
          participants:[]
        },
    
    ]
    
    const [selectedEducation, setSelectedEducation] = useState({})
    
    

    return (<>
        
        <Card title="School">
            <Select
              defaultValue={selectedEducation.participants}
              mode="multiple"
              style={{
                width: '100%',
              }}
              placeholder="Please select"
              onChange={(value) => {
                console.log(value)
                /*Before adding the participants we will add
                    the mission/training to the user*/
                setRecruits((prev) => {
                    return prev.map((r) => {
                        const newRecruit = {... r}
                        
                        const stringifyActions = newRecruit.curr_actions.map(el => {
                          return JSON.stringify(el)
                        })
                        
                        /*If its in values, dont remove the mission from it*/
                        if (value.includes(newRecruit.id)){
                            /*If the mission was already added, dont add it again*/
                            if (stringifyActions.includes(JSON.stringify([mission, timeOperations])) == false){                    
                                newRecruit.curr_actions = [... r.curr_actions, [mission, timeOperations]]
                            }
                        } else {
                            /*If the id is in the mission, we supposed that the mission was already added so we remove it*/
                            newRecruit.curr_actions = r.curr_actions.filter(action => JSON.stringify(action) !== JSON.stringify([mission, timeOperations]))
                        }
                        console.log(newRecruit)
                        return newRecruit
                    
                    })
                })
     
                setMisssions((prev) => {
             
                  prev.map((training) => {
                    /*Comparing the missions selected with all the missions
                    so that we can then add the participants to it*/
                    if (training.id == mission.id) {
                      console.log("hello",training)
                      training.participants = [... value]
                      return training
                    } else {
                      return training
                    }
                  })
                  
                  
                  
                  console.log("prev", prev)
                  return prev
                })
              }}
              options={recruits.map((r) => {
                return {
                  label: r.name,
                  value: r.id,
                }
              
              })}
            />
        
        
        </Card>
        
        
        
    </>)
}

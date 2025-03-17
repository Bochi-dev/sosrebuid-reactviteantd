import { Space,
Card,
Avatar,
Tooltip,
Input,
Button,
Form, 
Checkbox,
InputNumber,
Flex, Progress,
Select} from "antd";

import { DownOutlined } from '@ant-design/icons';

export const BuildingCard = ({operations}) => {
    const buildings = operations.buildings
    const setBuildings = operations.setBuildings
    const recruits = operations.recruits
    const setRecruits = operations.setRecruits
    
    if (buildings.length == 0){
        return <>No Buildings Owned</>
    }
    
        
   
    
    
    
    return (<>
    
        {buildings.map((building, index) => {
            return <Card key={index} title={building.name} variant="borderless" style={{ width: 300 }}>
            
                <p>{building.label}</p>
            
                
                <p>Bonuses:</p>
                    {building.bonuses.map((b, index) => {
                        return <span>({index+1}) - {b.label}</span>
                    })}
                
                
                <Select
                  suffixIcon={
                    <>
                        <span>{building.in} / {building.space}</span>
                        <DownOutlined />
                    </>
                              
                  }
                  defaultValue={building.participants}
                  maxCount={building.space}
                  mode="multiple"
                  style={{
                    width: '100%',
                  }}
                  placeholder="Please select"
                  onChange={(value) => {
                    console.log(value)
//                    Before adding the participants we will add
//                        the mission/training to the user

                    setBuildings((prev) => {
                        return prev.map((b) => {
                            const newB = {... b}
                            newB.participants = [... value]
                            newB.in = newB.participants.length
                            return newB
                        })
                    })


                    setRecruits((prev) => {
                        return prev.map((r) => {
                            const newRecruit = {... r}
                            
                            
                            
                            
                            
                            const convertToCompare = (bonuses) => {
                                                            
                              const newEl1 = {id:el1.id, type:el1.type}                              
                              return JSON.stringify([newEl1, el2])                                                              
                            }
                            
                            
                            const stringifyActions = newRecruit.curr_actions.map(el => {
                              return convertToCompare(el)
                            })
                            
//                            If its in values, dont remove the mission from it
                            
                            if (value.includes(newRecruit.id)){
//                                If the mission was already added, dont add it again
                                
                                if (stringifyActions.includes(convertToCompare([mission, timeOperations])) == false){                    
                                    newRecruit.curr_actions = [... r.curr_actions, [mission, timeOperations]]
                                }
                            } else {
//                                If the id is in the mission, we supposed that the mission was already added so we remove it
                                newRecruit.curr_actions = r.curr_actions.filter(action => convertToCompare(action) !== convertToCompare([mission, timeOperations]))
                            }
                            console.log(newRecruit)
                            
                            
                            
                            
                            
                            return newRecruit
                        
                        })
                    })
         
                    /*setMisssions((prev) => {
                 
                      prev.map((training) => {
//                        Comparing the missions selected with all the missions
//                        so that we can then add the participants to it
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
                    })*/
                  }}
                  
                  options={recruits.map((r) => {
                    return {
                      label: r.name,
                      value: r.id,
                    }
                  
                  })}
            />
            
            </Card>
        
        })}
    
    </>)
}

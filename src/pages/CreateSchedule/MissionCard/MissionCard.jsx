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
import { AntDesignOutlined, UserOutlined, MinusCircleOutlined} from '@ant-design/icons';


export function MissionCard ({missions, setMisssions, operations, timeOperations, disableSelect}) {
    const [recruits, setRecruits] = operations
    const [weekday, day, turn] = timeOperations
    
    const requirements = (reqs) => {
      if (reqs.length == 0){
        return "N/A"
      }
      return reqs.map((req, index) => {
        return <p key={index}>({index+1}) - {req.label}</p>  
      })
    }

    return (
        <Space direction={"horizontal"} size={6} wrap>
    
          {
          missions.map((mission) => {
            return <Card key={mission.id} title={mission.name} variant="borderless" style={{ width: 300 }}>
            
            <p>progress {mission.progress}/{mission.turns}</p>
            
            
            <p>
            <strong>Requirements</strong>
            </p>
            {requirements(mission.reqs)}

            <p>
            <strong>Rewards</strong>
            </p>
            {mission.reward.map((reward, index) => {
              return <p key={index}>({index+1}) - {reward.label}</p>
            
            })}
            
            <Select
              disabled={disableSelect}
              defaultValue={mission.participants}
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
            
            
            
            
            
            <p>Sub Tasks</p>
            {mission.subs.map((id, index) => {
              return missions.map((mission) => {
                if (mission.id == id) {
                  return <p key={index}>{mission.name}</p>
                } else {
                  return 
                }
              
              })
            })}
          </Card>
          
          })
          
          
          }
          
          
        </Space>    
        
        
        
    )
}

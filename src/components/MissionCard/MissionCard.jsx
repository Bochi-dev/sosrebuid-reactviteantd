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


export function MissionCard ({operations}) {
    const [missions, setMissions] = operations.pageOperations
    const [recruits, setRecruits] = operations.recruitsOperations
    const [weekday, day, turn] = operations.timeOperations
    
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
            
            <strong>Progress</strong>: <Progress percent={Math.floor((mission.progress/mission.turns)*100)}/> 
            
            
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
                    return prev.map((recruit) => {
                        console.log( recruit.name, recruit.curr_actions)
//                        if the id is inside values
                        if (value.includes(recruit.id)){
//                        return a recruit with a new current mission
                            return {
                                ... recruit,
                                curr_actions: { mission: mission, hour: turn }
                            }
//                            if its not inside values and curr actions is null
                        } else if (recruit.curr_actions === null) { 
                          return recruit
                        
//                        if its not inside the array and the current action IS NOT null
//                           check if the mission inside of it is equal to mission displayed by the card
                        } else if (
                          recruit.curr_actions.mission.id === mission.id &&
                          recruit.curr_actions.mission.type === mission.type
                           ) {
//                           remove the mission if IT IS equal
                            return { ... recruit, curr_actions: null }
                        } 
                        return recruit
                    
                    })
                })
     
                setMissions((prev) => {
                  prev.map((training) => {
                    /*Comparing the missions selected with all the missions
                    so that we can then add the participants to it*/
                    if (!training.id === mission.id) return training
                    return { ... training, participants: value, }
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
            {/*mission.subs.map((id, index) => {
              return missions.map((mission) => {
                if (mission.id == id) {
                  return <p key={index}>{mission.name}</p>
                } else {
                  return 
                }
              
              })
            })*/}
          </Card>
          
          })
          
          
          }
          
          
        </Space>    
        
        
        
    )
}

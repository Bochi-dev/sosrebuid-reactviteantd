import { Card, Space, Flex, Progress, Select, Button, Modal, List } from 'antd';
import { useState } from "react"
import { green, red } from '@ant-design/colors';
import { ExclamationCircleOutlined,
CheckCircleOutlined,
ArrowUpOutlined,
PlusOutlined} from "@ant-design/icons"
import { checkAndSubstract } from "../../global"


const data = [
  {
    get label() {
      return `${this.name} : X${this.amount}`
    },
    amount: 10,
    name: "Wood",
    type: "material"
  },
  {
    get label() {
      return `${this.name} : X${this.amount}`
    },
    amount: 5,
    name: "Rope",
    type: "material"
  }
];


export const WallsCard = ({wall, setWalls, inWalls, teams, setRecruits, operations}) => {
    const [resources, setResources] = operations.resourcesOperations
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalMessage, setModalMessage] = useState(<></>)
    const attacker = wall.attacker
    let style = {background: null}
    let color = green[6]
    let msg = <h3>SAFE</h3>
    let icon = <CheckCircleOutlined />
    if (wall?.attacked == true){
        style = {background: red[3]}
        color = red[6]
        msg = <h3>UNDER ATTACK!</h3>
        icon = <ExclamationCircleOutlined />
    }
    
    
    
    const AttackerDetails  = ({attacker}) => {
        if (!attacker) return <></>
        
        return (
            <Card>
                level: {attacker.powerLevel}<br/>
                <Flex gap={6}>
                    HP
                    <Progress 
                        percent={(attacker.health/attacker.maxHealth)*100}
                        format={percent => `${attacker.health}`}
                    />
                    
                </Flex>
            </Card>
        )
    }
    
    const onChange = (value) => {
        setWalls(prev => {
            return prev.map(el => {
                if (el.id !== wall.id) return el
                return {
                    ... el,
                    stationedTeam: value,
                }
            })
        })
            
    }
    
    const repair = () => {
      setModalMessage(<>
        <h3>Do you wann use the next materials to repair the wall?</h3>
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  description={item.label}
                />
              </List.Item>
            )}
          />
      </>
      )
      setIsModalOpen(true)
    }
    const onOk = () => {
      if (checkAndSubstract(resources, setResources, "wood", 5)) {
          setWalls(prev => {
              const index = prev.findIndex(el => el.id === wall.id); // Find the index

              // If the wall is not found, return the previous state
              if (index === -1) {
                  return prev;
              }

              // Create a new array with the updated wall at the found index
              return [
                  ...prev.slice(0, index), // Elements before the updated wall
                  {
                      ...prev[index], // Copy the existing wall properties
                      health: prev[index].health + 1, // Update health
                      messageSent: false, // Update messageSent
                  },
                  ...prev.slice(index + 1), // Elements after the updated wall
              ];
          });
      } else {
          setModalMessage(<p>
            Insufficient resources, to repair the wall (hint: go on an exploration to get more)
          </p>)
      }
      setIsModalOpen(false)
    
    }
        
    const onCancel = () => {
      setIsModalOpen(false)
    }

    return <div>
        {msg}
        <Card style={style}>
            {icon} <strong>{wall.name}</strong>
            <div>
                <Progress 
                    percent={(wall.health/wall.maxHealth)*100}
                    steps={3} 
                    size={[20, 10]} 
                    format={percent => `${wall.health}`}
                    strokeColor={color} 
                />
                
                { (wall.health < wall.maxHealth) ? <Button 
                  onClick={repair} 
                  type="success" 
                  icon={<PlusOutlined/>}
                  style={{color: green[6]}}
                /> : <></>}
            </div>
            <div>
                <strong>Assigned Squad</strong><br/>
                <Select 
                style={{ borderColor: 'red', color: 'red' }} 
                size={"100"}
                defaultValue={wall.stationedTeam}
                options={[ {label: "N/A", value:null}, ... teams.map(el => { return { label: el.name, value: el.id, disabled: inWalls().includes(el.id) } })]}
                onChange={onChange}
                />
            </div>
        </Card>
        <AttackerDetails attacker={attacker}/>
         <Modal title="Basic Modal" open={isModalOpen} onOk={onOk} onCancel={onCancel}>{modalMessage}</Modal>
    </div>

}

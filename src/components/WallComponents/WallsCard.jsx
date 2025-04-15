import { Card, Space, Flex, Progress, Select, Button, Modal, List } from 'antd';
import { useState } from "react"
import { green, red } from '@ant-design/colors';
import { ExclamationCircleOutlined,
CheckCircleOutlined,
ArrowUpOutlined,
PlusOutlined} from "@ant-design/icons"


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


export const WallsCard = ({wall, setWalls, inWalls, teams, setRecruits}) => {
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
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState(<></>);
    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleOk = () => {
      setIsModalOpen(false);
//      remove materials from our materials and then repair, but for now, only repair

      setWalls( prev => {
        return prev.map(el => {
          if (el.id !== wall.id) return el
          return {
            ... el,
            health: el.health + 1,
            messageSent: false,
          }
        })
      })
      
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    
    
    const repair = () => {
        setModalMessage(
          <>
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
    
    
        showModal()
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
        <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          {modalMessage}
        </Modal>
    </div>

}

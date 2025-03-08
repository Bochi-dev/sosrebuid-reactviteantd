import {
StarOutlined,
LikeOutlined,
MessageOutlined,
MenuOutlined,
ArrowRightOutlined,
CheckOutlined,
CloseOutlined,} from "@ant-design/icons"
import { red, green } from '@ant-design/colors';

const daysOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
import { GameCard, IconText } from "../../../components"
import {Space, List, Avatar, Button, Modal, Progress} from "antd"
import React from 'react';
import { useState } from 'react'

const IcontButton = ({icon, text, action}) => (
    <Space>
         <Button color="primary" variant="link" onClick={action}>
            {React.createElement(icon)}
            {text}
          </Button>
    </Space>
)

export function Recruits({recruits}){

    const data = [... recruits];
    const [modalData, setModalData] = useState([])
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    
//    Open modal y set its data
    const showModal = (id) => {
      setIsModalOpen(true);
      const recruit = recruits.filter((el) => {
       if (el.id == id) {
        return el
       } 
      })[0]
      
      console.log("moda_recruit: ",recruit)
      setModalData([recruit.curr_actions, recruit.stats])
      
      
      
    };
    
    const handleOk = () => {
      setIsModalOpen(false);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    
    
    
    const debuffByFatigue = (stat, fatigue) => {
        const debuff_percentage = (fatigue/0.10) 
        let modified = debuff_percentage * 0.45     
        console.log(modified)          
        return Math.ceil(stat*modified)
    }
    
    const display = (statToDisplay,stats) => {
        const fatigue = stats.fatigue
        const fatigueDebuff = debuffByFatigue(statToDisplay,fatigue)        
        return `${statToDisplay-fatigueDebuff} (${statToDisplay} - ${fatigueDebuff})`
    }
    
    const requirements = (reqs, stats) => {
      if (reqs.length == 0){
        return <div>N/A</div>
      }
      
      return reqs.map((req, index) => {
        
        const stat = stats["curr_"+req.type]
        let color
        let icon
        
        if (stat >= req.amount){
          color = green.primary
          icon = <CheckOutlined />
        } else {
          color = red.primary
          icon = <CloseOutlined />
        }
      
        return <div style={{color: color}}>({index+1}) - {req.label} {icon}</div> 
      })
    }
    
    const Schedule = () => {       
        return daysOfWeek.map((day) => {
          const [assigments, stats] = modalData
          const dayData = assigments.filter((el) => {
            if (el[1][0] == day){
              return el
            }          
          })                   
          const renderItem = (item, index) => {
            const [mission, timeops] = item     
            return <List.Item>
              <List.Item.Meta
                title={<a href="https://ant.design">{item[0].name}</a>}
                description={`
                ${timeops[0]} |
                day: ${timeops[1]} |
                hour: ${timeops[2]} |
                `}
              />
              <Space>
                <Space direction={"vertical"}>
                  <p>
                    <strong>Requirements</strong>
                  </p>
                  {requirements(mission.reqs, stats)}
                </Space>
                <Progress type="circle" percent={(mission.progress/mission.turns)*100} />            
              </Space>
                                                       
            </List.Item>                   
          }
                                 
          return (<>
          <h2>{day}</h2>
          <List
          itemLayout="vertical"
          dataSource={dayData}
          renderItem={(item, index) => (
            renderItem(item, index)
          )}
          />
          </>)
        
        })
    
    
    }
    
    


    return (<>
        <List
          itemLayout="vertical"
          dataSource={data}
          renderItem={(item, index) => (
            <List.Item
               actions={[
                <p>Strength: {display(item.stats.curr_strength, item.stats)}</p>,
                <p>Inteligence: {display(item.stats.curr_inteligence, item.stats)}</p>,
                <p>Spirit: {display(item.stats.curr_spirit, item.stats)}</p>,
               
                <p>Fatigue: {item.stats?.fatigue_display}%</p>,
                
                <IcontButton icon={MenuOutlined} text="Schedule" action={() => {
                  showModal(item.id)
                }}/>,
                <IcontButton icon={ArrowRightOutlined} text="Go to"/>
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                title={<a href="https://ant.design">{item.name}</a>}
                description="Lorem impsum"
              />
              {item.content}
            </List.Item>
          )}
        />
          
          
      <Modal title="Schedule" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
         <Schedule/>
        
      </Modal>
    </>)
}

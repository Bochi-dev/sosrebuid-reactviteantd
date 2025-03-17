import {
StarOutlined,
LikeOutlined,
MessageOutlined,
MenuOutlined,
ArrowRightOutlined} from "@ant-design/icons"
const daysOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
import { GameCard, IconText, SchedulerModal} from "../../components"
import { debuffByFatigue } from "../../../../global"
import {Space, List, Avatar, Button, Modal, Progress, Select} from "antd"
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
    const [isModalStatsOpen, setIsModalStatsOpen] = useState(false);
    
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
    
    const showModalStat = (id) => {
      setIsModalStatsOpen(true);
      const recruit = recruits.filter((el) => {
       if (el.id == id) {
        return el
       } 
      })[0]
      
      console.log("moda_recruit: ",recruit)
      setModalData(recruit.stats)

    };
    
    const handleStatsOk = () => {
      setIsModalStatsOpen(false);
    };
    
    const handleStatsCancel = () => {
      setIsModalStatsOpen(false);
    };
    
    
    
    
    const display = (statToDisplay,stats) => {
        const fatigue = stats.fatigue
        const fatigueDebuff = debuffByFatigue(statToDisplay,fatigue) 
        
        if ( fatigueDebuff > 0 ){
            return `${statToDisplay-fatigueDebuff} (${statToDisplay} - ${fatigueDebuff})`
        }  
        return statToDisplay     
        
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
                <IcontButton icon={StarOutlined} text="Stats" action={() => {
                  showModalStat(item.id)
                }}/>,
                <IcontButton icon={MenuOutlined} text="Schedule" action={() => {
                  showModal(item.id)
                }}/>,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                title={<a href="https://ant.design">{item.name}</a>}
                description="Lorem impsum"
              />
              
            </List.Item>
          )}
        />
     
      <SchedulerModal 
        title="Schedule"
        open={isModalOpen}
        onOk={handleOk} 
        onCancel={handleCancel}
        modalData={modalData} />
        
      <Modal title="Stats" open={isModalStatsOpen} onOk={handleStatsOk} onCancel={handleStatsCancel}> 
          <p>Strength: {display(modalData.curr_strength, modalData)}</p>
          <p>Inteligence: {display(modalData.curr_inteligence, modalData)}</p>
          <p>Spirit: {display(modalData.curr_spirit, modalData)}</p>
          <p>Weight: {modalData?.weight}</p>
          <p>Height: {modalData?.height}</p>
          <p>Calories: {modalData?.calories}</p>
          <p>BMI: {modalData?.bmi}</p>
          <p>Fatigue: {modalData?.fatigue_display}%</p>
      </Modal>
      
      
    </>)
}

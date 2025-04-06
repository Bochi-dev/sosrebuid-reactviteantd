import {
StarOutlined,
LikeOutlined,
MessageOutlined,
MenuOutlined,
ArrowRightOutlined,
UserOutlined,
DownOutlined} from "@ant-design/icons"
const daysOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
import { GameCard, IconText, SchedulerModal} from "../../components"
import { debuffByFatigue } from "../../global"
import {Space, 
List, 
Avatar, 
Button, 
Modal, 
Progress, 
Select, 
Card, Dropdown, message, Tooltip} from "antd"
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



export function Recruits({operations}){
    
    const [recruits, setRecruits] = operations.recruitsOperations
    const [id, setId] = useState(0)
    const [modalData, setModalData] = useState(false)
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalStatsOpen, setIsModalStatsOpen] = useState(false);
    
    const showModal = (id) => {
      setModalData({
        recruitId: id,
        })
      setIsModalOpen(true);

    };
    
    
    const handleOk = () => {
      setIsModalOpen(false);
      setModalData(false)
    };
    
    const handleCancel = () => {
      setIsModalOpen(false);
      setModalData(false)
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
      setModalData(false)
    };
    
    const handleStatsCancel = () => {
      setIsModalStatsOpen(false);
      setModalData(false)
    };
    
    
    
    
    const items = [
      {
        label: 'Stats',
        key: '1',
        icon: <StarOutlined />,
      },
      {
        label: 'Schedule',
        key: '2',
        icon: <MenuOutlined />,
      },
    ];


    const handleMenuClick = e => {
      console.log('click', e);
      const key = e.key
      if (key === "1"){
        showModalStat(id)
      } else {
        showModal(id)
      }
    };

    const menuProps = {
      items,
      onClick: handleMenuClick,
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
          dataSource={recruits}
          grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 4,
              lg: 4,
              xl: 6,
              xxl: 3,
            }}
          renderItem={(item, index) => (
            <Card 
            
            title={item.name}
            actions={[
              <p>💪: {display(item.stats.curr_strength, item.stats)}</p>,
              <p>🧠: {display(item.stats.curr_inteligence, item.stats)}</p>,
              <p>👻: {display(item.stats.curr_spirit, item.stats)}</p>,
            ]}
            extra={
              <Dropdown menu={menuProps}>
                <a onClick={e => setId(item.id)}>
                  <Space>
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            }
            >
            HP <Progress/>
            </Card>
          )}
        />
     
      <SchedulerModal 
        title="Schedule"
        open={isModalOpen}
        onOk={handleOk} 
        onCancel={handleCancel}
        modalData={modalData}
        operations={operations}
      />
        
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

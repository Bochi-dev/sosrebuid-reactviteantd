import {
StarOutlined,
LikeOutlined,
MessageOutlined,
MenuOutlined,
ArrowRightOutlined} from "@ant-design/icons"
const daysOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
import { GameCard, IconText, SchedulerModal} from "../../components"
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

export function Recruits({recruits, display}){

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
    
    
    
    


    return (<>
        <List
          itemLayout="vertical"
          dataSource={data}
          renderItem={(item, index) => (
            <List.Item
               actions={[
                <p>Strength: {item.stats.curr_strength}</p>,
                <p>Inteligence: {item.stats.curr_inteligence}</p>,
                <p>Spirit: {item.stats.curr_spirit}</p>,
                <IcontButton icon={StarOutlined} text="Stats" action={() => {
                  showModalStat(item.id)
                }}/>,
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
          
          
      {/*<Modal title="Schedule" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        
        {daysOfWeek.map((day) => {
          const dayData = modalData.filter((el) => {
            if (el[1][0] == day){
              return el
            }          
          })
          return (<>
          <h2>{day}</h2>
          <List
          itemLayout="vertical"
          dataSource={dayData}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                title={<a href="https://ant.design">{item[0].name}</a>}
                description={`
                ${item[1][0]} |
                day: ${item[1][1]} |
                hour: ${item[1][2]} |
                `}
              />
              <Progress type="circle" percent={(item[0].progress/item[0].turns)*100} />
            </List.Item>
          )}
          />
          </>)
        
        })}
      </Modal>*/}
      
      
      <SchedulerModal 
        title="Schedule"
        open={isModalOpen}
        onOk={handleOk} 
        onCancel={handleCancel}
        modalData={modalData} />
        
      <Modal title="Stats" open={isModalStatsOpen} onOk={handleStatsOk} onCancel={handleStatsCancel}> 
          <p>Strength: {modalData.curr_strength}</p>
          <p>Inteligence: {modalData.curr_inteligence}</p>
          <p>Spirit: {modalData.curr_spirit}</p>
          <p>Weight: {modalData?.weight}</p>
          <p>Height: {modalData?.height}</p>
          <p>Calories: {modalData?.calories}</p>
          <p>BMI: {modalData?.bmi}</p>
          <p>Fatigue: {modalData?.fatigue_display}%</p>
      </Modal>
      
      
    </>)
}

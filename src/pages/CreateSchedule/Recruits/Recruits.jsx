import {
StarOutlined,
LikeOutlined,
MessageOutlined,
MenuOutlined,
ArrowRightOutlined} from "@ant-design/icons"
const daysOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
import { GameCard, IconText, SchedulerModal} from "../../../components"
import { debuffByFatigue } from "../../../global"
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

export function Recruits({recruits, setRecruits, schedules, turns}){

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
    
    
    
    
    const showCurrentAction = (actions) => {
        /*
        we are gonna look if it has a schedule assigned
        if not it will say "doing nothing"
        if it has a schedule assigned Im gonna show what thing 
        they currently doing based on the schedule
        sleep and eating are fine
        */
    
    
        console.log(actions)
        if (actions.length == 0){
            return "doing nothing"
        }
        
        
        
    }
    
    const showSchedule = (schedule, curr_actions) => {
        if (schedule == null){
            return "No schedule assigned"
        }
    
//       getting the schedule by its id
        schedule = schedules.filter((el) => {
            if (el.id == schedule){
                return el
            }
        })[0]

//        with the schedule determine if it is working hours
        const schedule_actions = schedule.actions
        const index = turns - 1
        
        const action = schedule_actions[index]
        
        const type = action.type
        let action_string = action.name         
        /*        
        look if the recruit has a mission or something to do 
        while it is working hours and display it
        */
        
        if (type == "work"){
            if (curr_actions.length > 0){
                const [mission, timeops] = curr_actions[0]
                action_string += ` (${mission.name})`
            } else {
                console.log("What")
                action_string += " (Free Time/Doing nothing)"
            }
            
        }
        
        
        return `${action_string}`
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
                <Select 
                style={{
                width: '100%',
                }}
                defaultValue={item.schedule}
                placeholder="Select a schedule"
                
                
                onChange={(value) => {
                  
                  setRecruits((prev) => {
                    return prev.map((recruit) => {
                      const newRecruit = {... recruit}
                      if (recruit.id == item.id){
                        console.log(value)
                        newRecruit.schedule = value
                      }
                      return newRecruit
                    })
                  })
                  
                  
                }}
                
                options={[{label:"None", value:null}, ... schedules.map((r) => {
                return {
                  label: r.title,
                  value: r.id,
                }
              
              })]}
                />
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                title={<a href="https://ant.design">{item.name}</a>} 
                description={showSchedule(item.schedule, item.curr_actions)}               
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

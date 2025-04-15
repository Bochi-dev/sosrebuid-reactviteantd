import {
StarOutlined,
LikeOutlined,
MessageOutlined,
MenuOutlined,
ArrowRightOutlined,
UserOutlined,
DownOutlined,
RadarChartOutlined,
AntDesignOutlined,
CloseOutlined} from "@ant-design/icons"
const daysOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
import { GameCard, IconText, SchedulerModal, ClassesAvatars} from "../../components"
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


const display = (statToDisplay,stats) => {
    const fatigue = stats.fatigue
    const fatigueDebuff = debuffByFatigue(statToDisplay,fatigue) 
    
    if ( fatigueDebuff > 0 ){
        return `${statToDisplay-fatigueDebuff} (${statToDisplay} - ${fatigueDebuff})`
    }  
    return statToDisplay     
    
}



const ClassesDetails = ({slots}) => {
  slots = slots.map(el => {
    if (el.length === 0 ) return {
      avatar:  <Avatar icon={<CloseOutlined/>} />,
      title: "Empty class slot",
      description: "N/A"
      
    }
    const slot = el[0]
    
    return {
      avatar:  <Avatar src={<img src={slot.icon} alt="avatar" />} />,
      title: slot.name,
      description: slot.benefitsDesc[0]
    }
  })
  return (
   <List
    itemLayout="horizontal"
    dataSource={slots}
    renderItem={(item, index) => (
      <List.Item>
        <List.Item.Meta
          avatar={item.avatar}
          title={item.title}
          description={item.description}
        />
      </List.Item>
    )}
  /> 
  )
}




const RecruitStats = ({modalData}) => {

  return <>
    <p>Strength: {display(modalData.curr_strength, modalData)}</p>
    <p>Inteligence: {display(modalData.curr_inteligence, modalData)}</p>
    <p>Spirit: {display(modalData.curr_spirit, modalData)}</p>
    <p>Weight: {modalData?.weight}</p>
    <p>Height: {modalData?.height}</p>
    <p>Calories: {modalData?.calories}</p>
    <p>BMI: {modalData?.bmi}</p>
    <p>Fatigue: {modalData?.fatigue_display}%</p>
  </>

}


export function Recruits({operations}){
    
    const [recruits, setRecruits] = operations.recruitsOperations
    const [id, setId] = useState(0)
    
//    modal states
    const [modalData, setModalData] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null)
    const [modalTitle, setModalTitle] = useState("")
    
//    change the data and title to show the scheduler
    const setSchedulerData = (id) => {
      setModalTitle("Recruit Scheduler")
      setModalData({ recruitId: id })
    };
//    change the data and title to show the stats
    const setStatsData = (id) => {
      const recruit = recruits.find(el => el.id == id)
      setModalData(recruit.stats)
      setModalTitle("Recruit Stats")
    };
    
    const setClassesData = () => {
      const recruit = recruits.find(el => el.id == id)
      setModalData(recruit.classes)
      setModalTitle("Recruit Classes")
    }
    
    const handleOk = () => {
      setIsModalOpen(false);
      setModalData(false)
      setModalType(null)
      setModalTitle("")
      
    };
    
    const handleCancel = () => {
      setIsModalOpen(false);
      setModalData(false)
      setModalType(null)
      setModalTitle("")
    };
    
//    options of drop down
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
      {
        label: 'Classes',
        key: '3',
        icon: <RadarChartOutlined />,
      },
    ];

//    handle drop down click
    const handleMenuClick = e => {
      const key = e.key
      if (key === "1"){
        setStatsData(id)
      } else if (key === "2"){
        setSchedulerData(id)
      } else {
        setClassesData(id)
      }
      setIsModalOpen(true)
      setModalType(key)
    };

    const menuProps = {
      items,
      onClick: handleMenuClick,
    };
    
    
    

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
            HP <Progress percent={(item.stats.health/item.stats.maxHealth)*100} format={() => item.stats.health}/>
            FATIGUE <Progress percent={item.stats.fatigue_display}/>
            BMI: {item.stats.bmi}<br/>
            TASK: {(item.curr_actions) ? item.curr_actions.mission.name : "N/A ‼️"}<br/>
            <ClassesAvatars classes={item.classes}/>
            </Card>
          )}
        />
     
      {/*<SchedulerModal 
        modalData={modalData}
        operations={operations}
      />*/}
        
      {/* my modal */}
      <Modal title={modalTitle} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}> 
        {modalType === "1" && modalData && <RecruitStats modalData={modalData} />}
        {modalType === "2" && modalData && <SchedulerModal modalData={modalData} operations={operations} />}
        {modalType === "3" && modalData && <ClassesDetails slots={modalData}/>}
      </Modal>
      
    </>)
}

import React, { useState } from 'react';
import { Space, Divider, List, Typography } from "antd";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Tooltip,
  Modal,
} from 'antd';
import { ClassesAvatars, NotAvailableMessage } from "../../components"


const materials = [
  { type: "material", name: "wood", weight: 5, amount: 10 },
  { type: "material", name: "food", weight: 10, amount: 10 },
  { type: "material", name: "people", weight: 0, amount: 1 },
];







export const ExplorationForm = ({operations}) => {
    
    const [recruits, setRecruits] = operations.recruitsOperations
    const [expeditions, setExpeditions] = operations.expeditionOperations
    const [locations, setLocations] = operations.locationsOperations
    const [isModalOpen, setIsModalOpen] = operations.modalOpenOperations
    const [modalMessage, setModalMessage] = operations.modalMessageOperations
    const [data, setData] = useState([
        [],
        [],
        []
    ])
    
    const checkIfPresecurer = (el) => {
      const classes = el.classes
      return (classes.filter(el => (el[0] !== undefined) ? (el[0].name === "presecurer") : false).length > 0) 
    }
    
    const onFinish = (values) => {
        const participants = values.participants
        console.log(participants)
        if (participants === undefined || participants.length === 0){
            setIsModalOpen(true)
            setModalMessage("Necesitas al menos un partipante para ir de exploracion")
            return
        
        }
//        check if there is AT LEAST one presecurer
        if (participants.map(el => (recruits.find(ex => ex.id === el))).filter(checkIfPresecurer).length === 0){
            setIsModalOpen(true)
            setModalMessage("No puedes ir de exploracion sin un presecurer")
            return
        }
        
        const directions = values.directions
        const daysLong = values.daysLong
        const filterParticipant = (id) => {
            return recruits.filter(tr => tr.id === id)[0]
        }
      
        const checkIfParticipantClass = (id, clss) => {
            const conditions = []
            const participant = filterParticipant(id)
            participant.class.forEach(c => conditions.push((c.length > 0) ? c[0].name === clss : false))
            return conditions.includes(true) 
        }
      
        const calculateWeight = (ids) => {
            let total = 0
            ids.forEach( i => {
                total += (checkIfParticipantClass(i, "securer")) ? 50 : 20
            })
            return total
            
        }
        
        const clssBonuses = (ids) => {
            return ids.map(id => {
                if (checkIfParticipantClass(id, "postsecurer")) {
                    return {type: "materials", bonus:0.3, label: "30% more materials per location"}
                }
            })
            
        }
        
        const expedition = {
            id:Math.floor(Math.random()*500),
            direction:directions,
            participants:participants,
            details: "",
            canCarry: calculateWeight(participants),
            currCarry: [],
            get carrying() {
              const currCarry = this.currCarry
              if (currCarry.length == 0) return 0
              
              let total = 0
              
              currCarry.forEach(m => {
                const weight = m.weight
                total += weight
              })
              
              return total            
              
            },
            bonus: clssBonuses(participants),
            progress: 0,
            duration: daysLong,
               
        }
      
        console.log([... expeditions, expedition])
        setExpeditions(prev => [... prev, expedition])
        
        const createMaterialsSet = () => {
          const amountOfMaterials = 10
          const emptyList = []
          for (let i = 0; i < amountOfMaterials; i++){
            const randomIndex = Math.floor(Math.random()*materials.length)
            emptyList.push(materials[randomIndex])
          }
          return emptyList
          
        }
        
        const createLocationSet = () => {
          const emptyList = []
          const amountOfPlace = 10
          for (let i = 0; i < amountOfPlace; i++){
            emptyList.push(
              {
                direction: directions,
                resources: createMaterialsSet(),
                get resourcesTotalWeight() {
                  const currCarry = this.resources
                  if (currCarry.length == 0) return 0
                  
                  let total = 0
                  
                  currCarry.forEach(m => {
                    const weight = m.weight
                    total += weight
                  })
                  
                  return total            
                  
                },
                
              },
            )
          }
          
          return emptyList
          
        }
        
        const locationSet = { 
              id:Math.floor(Math.random()*500),
              expeditionId: expedition.id,
              locations:createLocationSet()/*[
                {
                  direction: random direction from the 3 directions
                  resources: [
                    {type:"material", name:"stick", weight: 10, amount:10}
                  ],
                  
                },
                {
                  direction: random direction from the 3 directions
                  resources: [
                    {type:"material", name:"stick", weight: 10, amount:10}
                  ],
                  
                },
              ]*/
            }
        console.log("locations: ", locations, locationSet)
        setLocations([... locations, locationSet])
      
      
      
    };
    
    
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };

  
  
  
  
  const RecruitClasses = ({classesList}) => {
    return classesList.map((c, index) => <p>({index + 1}) - {(c.length !== 0) ? c[0].label : "EMPTY SLOT" }</p>)
  }
  
  
  
  const checkIfRecruitAlreadyInExpedition = (recruit) => {
    let inExpeditions = new Set([])
    expeditions.forEach(e => {
        inExpeditions = new Set(... inExpeditions, ... e.participants)
    })
    return inExpeditions.has(recruit.id)
  }
  
  const checkIfRecruitHasAJob = (recruit) => {
    return (recruit.curr_actions === null)
  }
  
  return (<>
    <h4>Exploration Form</h4>
    <Form
      name="basic"
      Col={{
        span: 12,
      }}
      wrapperCol={{
        span: 20,
      }}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      
      <Form.Item label="Participants" name="participants">
        <Select
          mode="multiple"
          style={{
            width: '100%',
          }}
          placeholder="Please select"
          options={recruits.map((r) => {
//            Disabled the options of recruits that are already in a expedition
            return {
              label: r.name,
              value: r.id,
              curr_actions: r.curr_actions,
              classes: r.classes,
              disabled: (r.curr_actions !== null)
            }
          
          })}
          optionRender={option => (
            <Space>
              {option.label}
              <ClassesAvatars classes={option.data.classes}/>
              <NotAvailableMessage curr_actions={option.data.curr_actions}/>
            </Space>
          )}
        />
      
      </Form.Item>
      
      <Form.Item label="Directions" name="directions">
        <Select  
        defaultValue={"north"}
        options={[
        {id:"north", value:"North"},
        {id:"south", value:"South"},
        {id:"east", value:"East"},
        ]}/>
      </Form.Item>
      <Form.Item label="DaysLong" name="daysLong">
        <InputNumber min={1} max={99} value={1}/>
      </Form.Item>
      
      <Form.Item label={null}>
        <List
          header={<div>Details</div>}
          bordered
          dataSource={data}
          renderItem={(item, index) => (
            <List.Item key={index}>
              <Typography.Text mark>[ITEM]</Typography.Text> {item}
            </List.Item>
          )}
        />
      </Form.Item>
      <Form.Item label={null}>
        <Button  htmlType="submit" >Depart</Button>
      </Form.Item>
    </Form>
  </>);
}

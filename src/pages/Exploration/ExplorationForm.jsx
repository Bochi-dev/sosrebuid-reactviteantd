import React, { useState } from 'react';
import { Space, Divider, List, Typography } from "antd";
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from 'antd';



const materials = [
  { type: "material", name: "wood", weight: 5, amount: 10 },
  { type: "material", name: "food", weight: 10, amount: 10 },
  { type: "material", name: "people", weight: 0, amount: 1 },
/*  { type: "material", name: "rock", weight: 15, amount: 8 },
  { type: "material", name: "metal scrap", weight: 20, amount: 5 },
  { type: "material", name: "plastic bottle", weight: 5, amount: 12 },
  { type: "material", name: "wire", weight: 8, amount: 7 },
  { type: "material", name: "cloth", weight: 3, amount: 20 },
  { type: "material", name: "glass shard", weight: 6, amount: 10 },
  { type: "material", name: "rubber tube", weight: 12, amount: 4 },
  { type: "material", name: "charcoal", weight: 9, amount: 15 },
  { type: "material", name: "bone", weight: 14, amount: 6 },
  { type: "material", name: "concrete chunk", weight: 25, amount: 3 },
  { type: "material", name: "leather scrap", weight: 7, amount: 10 },
  { type: "material", name: "paper", weight: 2, amount: 30 },
  { type: "material", name: "copper pipe", weight: 18, amount: 5 },
  { type: "material", name: "rusted nail", weight: 4, amount: 20 },
  { type: "material", name: "wood plank", weight: 22, amount: 4 },
  { type: "material", name: "rope", weight: 10, amount: 9 },
  { type: "material", name: "tarpaulin", weight: 16, amount: 6 },
  { type: "material", name: "broken circuit board", weight: 5, amount: 7 },
  { type: "material", name: "battery cell", weight: 11, amount: 5 },
  { type: "material", name: "scrap cloth", weight: 3, amount: 25 },
  { type: "material", name: "aluminum can", weight: 2, amount: 15 },
  { type: "material", name: "brick", weight: 30, amount: 2 },
  { type: "material", name: "shattered mirror", weight: 6, amount: 8 },
  { type: "material", name: "old tire", weight: 40, amount: 1 }*/
];







export const ExplorationForm = ({operations, expeditions, setExpeditions, locations, setLocations}) => {
    
    const [missions, setMissions, recruits, setRecruits, timeOperations] = operations
  
    
    
    const onFinish = (values) => {
        const participants = values.participants
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











    /*I need a list of objects called sites
  
  random direction (north, south, east)
  random names (camp site, factory, abandoned site)
  random objects : {type: "material", name:"stick", label: "Stick", weight: 5}
  random chance to find it {chance: 1} that will work based on the amount of 
  places there is available: var findingChance = Math.floor(Math.random()*sites.length)
  
  */



  
  
  const [data, setData] = useState([
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
    ])
  
  
  const RecruitClasses = ({classesList}) => {
    return classesList.map((c, index) => <p>({index + 1}) - {(c.length !== 0) ? c[0].label : "EMPTY SLOT" }</p>)
  }
  
  
  
  
  
  
  
  
  return (<>
  
    {recruits.map((tr, index) => <div key={index}> <span>{tr.name}</span> <RecruitClasses classesList={tr.classes} /></div>)}
  
  
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
          onChange={(value) => {
            
            const newData = recruits.map(r => {
                const classes = []
                
                r.class.forEach((slot) => {
                    if (slot.length === 0){
                        return
                    }
                    
                    const inside = slot[0]
                    
                    if (inside) {
                        
                    }
                    
                    
                })
                
                
            })
            
            
          }}
          options={recruits.map((r) => {
//            Disabled the options of recruits that are already in a expedition
            return {
              label: r.name,
              value: r.id,
            }
          
          })}
        />
      
      </Form.Item>
      
      
      
      
      <Form.Item label="Directions" name="directions">
        <Select  options={[
        
        {id:"north", value:"North"},
        {id:"south", value:"South"},
        {id:"east", value:"East"},
        ]}/>
      </Form.Item>
      
      
      
      <Form.Item label="DaysLong" name="daysLong">
        <InputNumber />
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

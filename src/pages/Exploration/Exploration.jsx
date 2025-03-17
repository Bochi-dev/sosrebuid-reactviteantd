import React, { useState } from 'react';
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


const classes = [
        {id:1, name:"presecurer", label:"Pre-Securer", lvl: 1},
        {id:2, name:"securer", label:"Securer", lvl: 1},
        {id:3, name:"postsecurer", label:"Post-Securer", lvl: 1},
    ]

const randomListIndex = list => Math.floor(Math.random() * list.length)



export const Exploration = ({operations}) => {


  /*I need a list of objects called sites
  
  random direction (north, south, east)
  random names (camp site, factory, abandoned site)
  random objects : {type: "material", name:"stick", label: "Stick", weight: 5}
  random chance to find it {chance: 1} that will work based on the amount of 
  places there is available: var findingChance = Math.floor(Math.random()*sites.length)
  
  */



  const [missions, setMissions, recruits, setRecruits, timeOperations] = operations.operations  
  const [testRecruits, setTestRecruits] = useState(recruits.map(r => {
    return {... r,
      class: [
        [classes[randomListIndex(classes)]],
        [],
        [],
      ]
    }
    
  }))
  
  
  const RecruitClasses = ({classesList}) => {
    return classesList.map((c, index) => <p>({index + 1}) - {(c.length !== 0) ? c[0].label : "EMPTY SLOT" }</p>)
  }
  
  return (<>
  
    {testRecruits.map(tr => <div> <span>{tr.name}</span> <RecruitClasses classesList={tr.class} /></div>)}
  
  
    <h4>Exploration Form</h4>
    <Form
      Col={{
        span: 12,
      }}
      wrapperCol={{
        span: 20,
      }}
      layout="vertical"
    >
      
      <Form.Item label="Participants">
        <Select
          mode="multiple"
          style={{
            width: '100%',
          }}
          placeholder="Please select"
          onChange={(value) => {
            console.log(value)
            /*Before adding the participants we will add
                the mission/training to the user*/
            setRecruits((prev) => {
                return prev.map((r) => {
                    const newRecruit = {... r}
                    
                    const stringifyActions = newRecruit.curr_actions.map(el => {
                      return JSON.stringify(el)
                    })
                    
                    /*If its in values, dont remove the mission from it*/
                    if (value.includes(newRecruit.id)){
                        /*If the mission was already added, dont add it again*/
                        if (stringifyActions.includes(JSON.stringify([mission, timeOperations])) == false){                    
                            newRecruit.curr_actions = [... r.curr_actions, [mission, timeOperations]]
                        }
                    } else {
                        /*If the id is in the mission, we supposed that the mission was already added so we remove it*/
                        newRecruit.curr_actions = r.curr_actions.filter(action => JSON.stringify(action) !== JSON.stringify([mission, timeOperations]))
                    }
                    console.log(newRecruit)
                    return newRecruit
                
                })
            })
 
            setMisssions((prev) => {
         
              prev.map((training) => {
                /*Comparing the missions selected with all the missions
                so that we can then add the participants to it*/
                if (training.id == mission.id) {
                  console.log("hello",training)
                  training.participants = [... value]
                  return training
                } else {
                  return training
                }
              })
              
              
              
              console.log("prev", prev)
              return prev
            })
          }}
          options={recruits.map((r) => {
            return {
              label: r.name,
              value: r.id,
            }
          
          })}
        />
      
      </Form.Item>
      
      
      
      
      <Form.Item label="Participants">
        <Select options={[
        
        {id:"north", value:"North"},
        {id:"south", value:"South"},
        {id:"east", value:"East"},
        ]}/>
      </Form.Item>
      
      <Form.Item label="Direction">
        <Select options={[
        {id:"north", value:"North"},
        {id:"south", value:"South"},
        {id:"east", value:"East"},
        ]}/>
      </Form.Item>
      
      <Form.Item label="DaysLong">
        <InputNumber />
      </Form.Item>
      <Form.Item label={null}>
        <Button>Depart</Button>
      </Form.Item>
    </Form>
  </>);
}

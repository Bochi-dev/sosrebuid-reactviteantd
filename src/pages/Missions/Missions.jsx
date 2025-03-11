import { Space,
Card,
Avatar,
Tooltip,
Input,
Button,
Form, 
Checkbox,
InputNumber,
Select} from "antd";
import { AntDesignOutlined, UserOutlined, MinusCircleOutlined} from '@ant-design/icons';
import  { useState } from "react"
import { MissionCard } from "../../components"




export function Missions ({operations}) {
  const [missions, setMissions, recruits, setRecruits, timeOperations] = operations.operations
  
  
  const onFinish = (values) => {
    console.log('Success:', values);
    let subs
    let rewards
    if ( values.subs == undefined){
      subs = []
    } else {
      subs = [... values.subs]
    }
    
    if ( values.rewards == undefined){
      rewards = []
    } else {
      rewards = [... values.rewards]
    }
   
    setMissions((previous) => {
      return [... previous, 
      {id:Math.floor(Math.random() * 300),
      name:values.name,
      subs: subs,
      reward: rewards, 
      progress: 0,
      turns: values.turns, 
      participants:[]}]
    })
    
    console.log(missions)
    
    
  
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  
  return <>
    
    <Space direction="vertical">
      <Form
        name="basic"
        
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 500,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item 
        label="Name" 
        name="name" 
        rules={[ { required: true, message: 'Please input your username!', }, ]} >
          <Input /> 
        </Form.Item>
        
        <Form.List name={"rewards"} label={null} >
          {(fields, {add, remove}) => (
            <>
              {fields.map((field, index) => {
                return (<Space key={field.key} direction="horizontal" size={6}>
                    <Form.Item 
                      name={[field.name, "type"]}
                      label={`${index+1}-Reward`}
                      rules={[ { required: true, message: 'Select the type', },]}
                    >
                      <Select
                          
                          style={{
                            width: 120,
                          }} 
                          options={[
                              {
                                value: 'food',
                                label: 'food',
                              },
                              {
                                value: 'happiness',
                                label: 'happiness',
                              },
                            ]}
                      />
                    </Form.Item>
                    
                    <Form.Item name={[field.name, "amount"]} rules={[ { required: true, message: 'Input a proper amount', },]} >
                        <InputNumber/>
                    </Form.Item>
                  <MinusCircleOutlined 
                    style={{color: "red", height:"40", }}
                    onClick={() => {
                      remove(field.name)
                    }}
                  />
                 
                  
                </Space>)
              })}
              <Form.Item
                  label={null}
                >
              <Button 
              type="primary" 
              block 
              icon="+"
              onClick={() => {
                add()
              }}>
              Add a new reward
              </Button>
              </Form.Item>
            </>
          )}
          
        </Form.List>
        
        <Form.Item name="turns" label={"Turns"}>
          <InputNumber/>
        </Form.Item>
        
        <Form.Item name="subs" label={"Sub Missions"}> 
        <Select
          mode="multiple"
          style={{
            width: '100%',
          }}
          placeholder="Please select"
          options={missions.map((mission) => {
            return {
              label: mission.name,
              value: mission.id,
            }
          
          })}
        />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Space>
    
    <div>
        <MissionCard 
        missions={missions} 
        setMisssions={setMissions} 
        operations={[recruits, setRecruits]}
        timeOperations={timeOperations}
        />
    </div>
    
  </>
}

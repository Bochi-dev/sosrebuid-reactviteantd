import { Button, Checkbox, Form, Input, Select, Space } from 'antd';
import { useState } from "react"
import { calculateTeamHealth } from "../../global"

export const TeamsForm = ({operations}) => {
    const [isModalOpen, setIsModalOpen] = operations.modalOpenOperations
    const [modalMessage, setModalMessage] = operations.modalMessageOperations
    const [recruits, setRecruits] = operations.recruitsOperations
    const [teams, setTeams] = operations.teamsOperations
    const includesAny = (arr, values) => values.some(v => arr.includes(v));
    const onFinish = values => {
      const members = values.recruits
      if (includesAny(inTeams(), members)){
        setIsModalOpen(true)
        setModalMessage(<h2>
            People of a team cannot be in another team
        </h2>)
        return 
      }
      
      const name = recruits.filter( el => el.id === members[0] )[0].name + "'s Team"
//      console.log(name)
      setTeams([
        ... teams, 
          { 
            id: Math.floor(Math.random()*500),
            name: name,
            recruitIds: members,
            get recruits(){
              return this.recruitIds.map( el => {
                return recruits.find( er => er.id === el )
              })
            },
            get powerLevel() {
              let total = 0
              for (let recruit of this.recruits) {
                  const recruitsLevel = recruit.level(recruit)
                  total += recruitsLevel
              }
              return total
            },
          }
        ])
        
      
    };
    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };
    
    const inTeams = () => {
        let inTeam = []
        teams.forEach(el =>{
            inTeam = [... inTeam, ... el.recruitIds]
        })
        return inTeam
    }
    
    const options = recruits.map(el => ({
        desc:el.level(el), 
        hp:el.stats.health, 
        maxhp:el.stats.maxHealth, 
        label: el.name, 
        value: el.id, 
        disabled: (inTeams().includes(el.id) || el.curr_actions !== null)}))
    
    return (
        <Form
          name="basic"
          labelCol={{ span: 30 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 800 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Select members"
            name="recruits"
            rules={[{ required: true, message: 'Please select a recruit' }]}
          >
            <Select
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder="Please select"
              maxCount={3}
              options={options}
              optionRender={option => {
                return (
                    <Space>
                      lvl: {option.data.desc}
                      {option.label}
                      hp: {option.data.hp}
                    </Space>
                )}}
              
            />
            
            
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
    
    )
    
}

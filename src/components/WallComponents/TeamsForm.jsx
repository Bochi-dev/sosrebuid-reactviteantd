import { Button, Checkbox, Form, Input, Select, Space } from 'antd';
import { useState } from "react"
import { calculateTeamHealth } from "../../global"

export const TeamsForm = ({teams, setTeams, recruits, setRecruits}) => {
    const [selectedValue, setSelectedValue] = useState([]);
    const onChange = (values) => {
        console.log("values: ", values)
        setSelectedValue(values)
    }
    const onFinish = values => {
      console.log('Success:', values, selectedValue);
      selectedValue
      setSelectedValue([]);
      const members = values.recruits
      const name = recruits.filter( el => el.id === members[0] )[0].name + "'s Team"
//      console.log(name)
      setTeams([
        ... teams, 
          { 
            id: Math.floor(Math.random()*500),
            name: name,
            recruitIds: members,
            maxHealth:10,
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
            } 
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
              onChange={onChange}
              defaultValue={selectedValue}
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

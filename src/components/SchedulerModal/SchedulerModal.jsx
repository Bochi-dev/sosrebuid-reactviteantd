import { Space, List, Avatar, Button, Modal, Progress } from "antd"
import { daysOfWeek } from "../../global"
import { red, green } from '@ant-design/colors';
import { CheckOutlined, CloseOutlined, } from "@ant-design/icons"
import { debuffByFatigue, getStat } from "../../global"

const requirements = (reqs, stats) => {
  if (reqs.length == 0){
    return <div>N/A</div>
  }
  
  return reqs.map((req, index) => {
    
    const stat = getStat(stats["curr_"+req.type], stats)
    let color
    let icon
    
    if (stat >= req.amount){
      color = green.primary
      icon = <CheckOutlined />
    } else {
      color = red.primary
      icon = <CloseOutlined />
    }
  
    return <div key={index} style={{color: color}}>({index+1}) - {req.label} {icon}</div> 
  })
}


const Schedule = ({modalData}) => {       
  return daysOfWeek.map((day) => {
    const [assigments, stats] = modalData
    const dayData = assigments.filter((el) => {
      if (el[1][0] == day){
        return el
      }          
    })                   
    const renderItem = (item, index) => {
      const [mission, timeops] = item     
      return <List.Item key={index}>
        <List.Item.Meta
          title={<a href="https://ant.design">{item[0].name}</a>}
          description={`
          ${timeops[0]} |
          day: ${timeops[1]} |
          hour: ${timeops[2]} |
          `}
        />
        <Space>
          <Space direction={"vertical"}>
            <p>
              <strong>Requirements</strong>
            </p>
            {requirements(mission.reqs, stats)}
          </Space>
          <Progress type="circle" percent={(mission.progress/mission.turns)*100} />            
        </Space>
                                                 
      </List.Item>                   
    }
                           
    return (<>
    <h2>{day}</h2>
    <List
    itemLayout="vertical"
    dataSource={dayData}
    renderItem={(item, index) => (
      renderItem(item, index)
    )}
    />
    </>)

  })
}




export function SchedulerModal({title, open, onOk, onCancel, modalData}) { 
  
  
  return (<Modal title={title} open={open} onOk={onOk} onCancel={onCancel}>
    <Schedule modalData={modalData}/>
  </Modal>)


}

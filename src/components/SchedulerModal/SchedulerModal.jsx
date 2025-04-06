import { Space, 
List, 
Avatar, 
Button, 
Modal, 
Progress, 
Select, Table } from "antd"
import { daysOfWeek, HOURS } from "../../global"
import { red, green } from '@ant-design/colors';
import { CheckOutlined, CloseOutlined, } from "@ant-design/icons"
import { debuffByFatigue, getStat } from "../../global"

const hoursArray = HOURS.map(time => ({
  hour: time,
  action: null
}));

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


const ScheduleOld = ({modalData}) => {       
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


const Schedule = ({schedule}) => {
    console.log(schedule)
    if (!schedule) return <h3>Nothing was scheduled 🙅🏻‍♂️</h3>
    
    const display = hoursArray.map((prev) => {
      const newPrev = { ... prev }       
      const actions = [ ... schedule.actions ]
      
      
      const action = actions.filter((el) => {
          const turn = el.turn
          const hour = HOURS[turn]
          const hourPrev = newPrev.hour
          if (hour == hourPrev){
              return el
          }
      })[0]

      newPrev.action = action?.name
      
      return newPrev
    })

    const columns = [
      {
        title: 'Hour',
        dataIndex: 'hour',
        key: 'hour',
      },
      {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
      },
    ];
    return (<>
        <h3>{schedule.title}</h3>
        <Table dataSource={display} columns={columns} />
    
    </>)
}




export function SchedulerModal({title, open, onOk, onCancel, modalData, operations}) {
  if (!modalData) return  <></>
 
  const [disableSelect, setDisableSelect] = operations.operationsDisableStuff
  const schedules = operations.schedules
  const [recruits, setRecruits] = operations.recruitsOperations
  const id = modalData.recruitId
  const clickedRecruit = recruits.find(el => el.id === id)
  const scheduleId = clickedRecruit.schedule
  const schedule = schedules.find((el) => el.id === scheduleId);
  
  return (<Modal title={title} open={open} onOk={onOk} onCancel={onCancel}>
    <h3>Select a schedule</h3>
    <Select
      disabled={disableSelect} 
      style={{
        width: '100%',
      }}
      defaultValue={scheduleId}
      placeholder="Select a schedule"
      
      
      onChange={(value) => {
        
        setRecruits((prev) => {
          return prev.map((recruit) => {
            if (recruit.id === id){
              return { ... recruit, schedule: value}
            }
            return recruit
          })
        })
        
        console.log("Recruit state after update: ", recruits)
        
        
        
        
      }}
      
      options={[{label:"None", value:null}, ... schedules.map((r) => {
        return {
          label: r.title,
          value: r.id,
        }
    
      })]}
    />
    <Schedule schedule={schedule}/>
  </Modal>)


}

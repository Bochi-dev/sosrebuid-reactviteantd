import { Space, 
List, 
Avatar, 
Button, 
Modal, 
Progress, 
Select, Table, Flex } from "antd"
import { daysOfWeek, HOURS } from "../../global"
import { red, green } from '@ant-design/colors';
import { CheckOutlined, CloseOutlined, } from "@ant-design/icons"
import { debuffByFatigue, getStat } from "../../global"

const hoursArray = HOURS.map(time => ({
  hour: time,
  action: null
}));

const Requirements = ({reqs, stats}) => {
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


const DisplayWork = ({currActions, stats}) => {       
    if (currActions === null) return <h3>I dont have a anything to do 🤷</h3>
    
    const mission = currActions.mission
    return (
      <Space direction={"vertical"}>
        <h2>Work/Activity: {mission.name}</h2>
        <Flex gap={16}>
          <div>
            <p>
              <strong>Requirements</strong>
            </p>
            <Requirements reqs={mission.reqs} stats={stats} />
          </div>
          <div>
            <Progress 
              type="circle" 
              percent={(mission.progress/mission.turns)*100}
              format={percent => `${mission.progress}/${mission.turns} Hours`}
               />   
          </div>
        </Flex>         
      </Space>
    )
}


const Schedule = ({schedule}) => {
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




export function SchedulerModal({modalData, operations}) {
  if (!modalData) return  <></>
    
  const [disableSelect, setDisableSelect] = operations.disabledOperations
  const schedules = operations.schedules
  const [recruits, setRecruits] = operations.recruitsOperations
  const id = modalData.recruitId
  const clickedRecruit = recruits.find(el => el.id === id)
  
  
  if (!clickedRecruit) return <></>
  
  const scheduleId = clickedRecruit.schedule
  const schedule = schedules.find((el) => el.id === scheduleId);
  
  return (<>
  
    <DisplayWork currActions={clickedRecruit.curr_actions} stats={clickedRecruit.stats}/>
  
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
      }}
      options={[{label:"None", value:null}, ... schedules.map((r) => {
        return {
          label: r.title,
          value: r.id,
        }
      })]}
    />

    <Schedule schedule={schedule}/>
  </>)


}

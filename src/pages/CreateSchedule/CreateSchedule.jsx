import { useState } from "react"
import { Button, Select, Card, Avatar, List } from "antd"
const hours = [
  "12:00 AM", "1:00 AM", "2:00 AM", "3:00 AM", "4:00 AM", "5:00 AM", "6:00 AM", "7:00 AM",
  "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM",
  "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM", "11:00 PM"
];


export const CreateSchedule = () => {

    const [schedule, setSchedule] = useState(
      {
        title: 'Schedule default',
        day: null,
        actions: [
            {type:"fatigue", turn: 0, amount: 1, name:"Sleep"},
            {type:"fatigue", turn: 1, amount: 1, name:"Sleep"},
            {type:"fatigue", turn: 2, amount: 1, name:"Sleep"},
            {type:"fatigue", turn: 3, amount: 1, name:"Sleep"},
            {type:"fatigue", turn: 4, amount: 1, name:"Sleep"},
            {type:"fatigue", turn: 5, amount: 1, name:"Sleep"},
            {type:"fatigue", turn: 6, amount: 1, name:"Sleep"},
            {type:"fatigue", turn: 7, amount: 1, name:"Sleep"},
            {type:"fatigue", turn: 8, amount: 1, name:"Sleep"},
            {type:"fatigue", turn: 9, amount: 1, name:"Sleep"},
            {type:"strength", turn: 10, amount: 1, name:"Excercise"},
        ]
        
      }
    )


    return <>
    
    <Button>create new one</Button><Select placeholder={"Select one to Edit"}/>
    
    <div>
        
        <Card>
            <h3>{schedule.title}</h3>
            <List
                itemLayout="horizontal"
                dataSource={schedule.actions}
                renderItem={(item, index) => (
                  <List.Item>
                    <p>{hours[item.turn]} {item.name}</p>
                    <Button>Change schedule</Button>
                    <Select placeholder={"Select one to Edit"}/>
                  </List.Item>
                )}
              />
            
        </Card>
        
    </div>
    
    </>
}

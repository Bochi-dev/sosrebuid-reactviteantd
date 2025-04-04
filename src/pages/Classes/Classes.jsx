import { useState } from "react"
import { Card, Select, Avatar, Flex, Button } from "antd"
import { MissionCard } from "../../components"
import { CloseOutlined } from "@ant-design/icons"
import brainImage from '/images/brain.jpg';
import bicepImage from '/images/bicep.jpg';
import treeImage from '/images/tree.jpg';





const ClassCard = ({ slot }) => {
    slot = slot[0]
    if (!slot) return ( <Card>
      <Avatar icon={<CloseOutlined/>}/> Empty Class Slot
    </Card> )
    
    return (
      <Card>
        <Avatar src={<img src={slot.icon} alt="avatar" />} /> {slot.label} - lv: {slot.level}
      </Card>
    )


}


const RecruitsListTemp = ({ recruits }) => {
    
    return recruits.map((r, index) => (
        <div key={index}>
          <p>{r.name}</p> 
          <Flex>{r.classes.map((slot) => <ClassCard slot={slot}/>)}</Flex>
        </div>
    ))
}



export const Classes = ({operations}) => {

    const [missions, setMissions, recruits, setRecruits, timeOperations] = operations.operations

    const [testRecruits, setTestRecruits] = useState(recruits.map(r => {
        return {... r, classes: [[],[],[]]}
    }))
    
    const [classes, setClasses] = useState([
        {id:1, name:"presecurer", label:"Pre-Securer", level: 1, icon:brainImage, benefitsDesc: [
            "Necesary to go in any exploration",
        ]},
        {id:2, name:"securer", label:"Securer", level: 1, icon:bicepImage, benefitsDesc: [
            "+30 to weight in explorations",
        ]},
        {id:3, name:"postsecurer", label:"Post-Securer", level: 1, icon:treeImage, benefitsDesc: [
            "more resources in explorations",
        ]},
    
    ])
    
    const [education, setEducation] = useState([
        {
          id:1,
          type:"education",
          name:"Pre Securer Master Class",
          reqs:[
            {type:"inteligence", amount: 20, label: "20 Inteligence"},
          ],
          reward:[{type:"education", id:1, label:"Pre Securer Class"}],
          progress:0,
          turns: 7,
          participants:[]
        },
        {
          id:2,
          type:"education",
          name:"Securer Master Class",
          reqs:[
            {type:"inteligence", amount: 10, label: "10 Inteligence"},
            {type:"strength", amount: 20, label: "20 Strength"},
          ],
          reward:[{type:"education", id:2, label:"Securer Class"}],
          progress:0,
          turns: 7,
          participants:[]
        },
        {
          id:3,
          type:"education",
          name:"Post Securer Master Class",
          reqs:[
            {type:"inteligence", amount: 10, label: "10 Inteligence"},
            {type:"strength", amount: 20, label: "20 Strength"},
          ],
          reward:[{type:"education", id:3, label:"Post Securer"}],
          progress:0,
          turns: 7,
          participants:[]
        },
    ])
    
    const levelUpClass = (clss) => {
      return [{ ... clss, level: Math.min(clss.level + 1, 3) }]
    }
    
    const classInSlots = (slots, reward) => {
      return slots.map( el => JSON.stringify((el.length === 0) ? [] : el[0].id)).includes(JSON.stringify(reward.id))
    }
    
    const pickAvailableSlot = (slots) => {
      for (let i = 0; i < slots.length; i++){
        const slot = slots[i]
        if (slot.length === 0) return i
      }
    }
    
    const assignClass = (slots, reward) => {
      reward = classes.filter(el => el.id === reward[0].id)[0]
      
      if (classInSlots(slots, reward)) {
        console.log("1")
        return slots.map((slot, index) => {
          if (slot.length > 0) {
            const clss = slot[0]
            if (clss.name === reward.name) return levelUpClass(clss)
            return slot         
          } else { 
            return slot
          }
        })
      }
      
      const availableSlot = pickAvailableSlot(slots)
      
      console.log("2")
      return slots.map((slot, index) => {
        if (availableSlot === index) return [ reward ]
        return slot
      })
    }
    
    const educationCompleted = (edu) => {
      const participants = edu.participants
      const newTestRecruits = testRecruits.map( r => {
          if (!participants.includes(r.id)) return r
          
          return { ... r, classes: assignClass(r.classes, edu.reward)}
      })
      setTestRecruits(newTestRecruits)
      
      return { ... edu, progress: 0, participants: []}
    }
    
    const progressEducation = (edu) => {
      if (edu.progress >= edu.turns) {
        return educationCompleted(edu)
      }
      return {
        ... edu, 
        progress: edu.progress + 1,
        
      }
    }
    
    const nextTurn = () => {
      setEducation(prev => {
        return prev.map((edu, index) => {
          if (edu.participants.length > 0){
             return progressEducation(edu)
          } else {
            return { ... edu, progress: 0}
          }
          return edu
        })
      })
    }
    

    return (<>
        
        <RecruitsListTemp recruits={testRecruits}/>
        
        <Button onClick={nextTurn}>
          Next Turn
        </Button>
    
        <h1>School</h1>
        
        <MissionCard 
        missions={education}
        setMisssions={setEducation}
        operations={[recruits, setRecruits]}
        timeOperations={timeOperations}/>
        
        
        
    </>)
}

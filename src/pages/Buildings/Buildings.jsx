import {useState} from "react"
import { MissionCard } from "../../components"


const buildBuildingsList = [
    {
      id:1,
      type:"buildingMission",
      name:"Build Tent",
      reqs:[
        {type:"people", got:0, amount: 2, label: "needs recruits to begin 2"},
        {type:"cloth", amount: 2, label: "2 Cloth"},
        {type:"strength", amount: 10, label: "10 Strength"},
        {type:"spirit", amount: 10, label: "10 Spirit"},
        
      ],
      reward:[{type:"building", id:1, label: "Construction of Tent"}],
      progress:0,
      turns: 20,
      participants:[],
      subs: []
    },

]


const buildingsList = [
    {
    id: 1,
    name: "Tent",
    recruits:[],
    /*WIP work in progress*/
    
    },
]


export const Buildings = ({operations}) => {
    const [trainings, setTrainings, recruits, setRecruits, timeOperations] = operations.operations
    const [buildings, setBuildings] = useState(buildingsList)
    const [buildBuildings, setBuildBuildings] = useState(buildBuildingsList)
    
    
    
    
    return (<>
    
    <h3>Buildings Options</h3>
    
    <MissionCard 
        missions={buildBuildings}
        setMisssions={setBuildBuildings}
        operations={[recruits, setRecruits]}
        timeOperations={timeOperations}
    />
    
    <h3>Buildings Owned</h3>
    
    </>)    
    
}

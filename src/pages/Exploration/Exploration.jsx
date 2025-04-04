import React, { useState } from 'react';
import { ExplorationForm } from "./ExplorationForm"
import { TestForm } from "./TestForm"
import { Space, Divider, List, Typography, Button, Modal, Statistic, Card, Col, Row, } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';

const postApocalypticLocations = [
  "Abandoned Metro Station",
  "Crumbling Skyscraper",
  "Overgrown Mall",
  "Sunken City",
  "Collapsed Highway",
  "Derelict Hospital",
  "Rusted Shipyard",
  "Deserted Military Bunker",
  "Radiation Zone",
  "Flooded Subway",
  "Ruined Cathedral",
  "Forsaken Theme Park",
  "Empty Oil Rig",
  "Deserted Research Facility",
  "Cracked Damsite",
  "Ghost Town Ranch",
  "Half-Sunken Prison",
  "Barren Farmhouse",
  "Lost Space Station",
  "Crashed Airplane Wreckage",
  "Decayed Power Plant",
  "Mutant-Infested Sewers",
  "Warlord-Occupied Fortress",
  "Forgotten Observatory",
  "Radioactive Swamp",
  "Sand-Covered Ghost City",
  "Cratered Battlefield",
  "Toxic Waste Dump",
  "Frozen Overpass",
  "Overgrown Botanical Lab",
  "Bunker-Turned-Colony",
  "Foggy Ruins of Suburbia",
  "Biohazard Quarantine Zone",
  "Abandoned Fishing Village",
  "Scavenger Market District",
  "Hacked Broadcast Station",
  "Desertified Metropolis",
  "Ash-Covered Volcano Base",
  "Train Graveyard",
  "Cave of the Last Survivors",
  "Blackout Cybernetic Lab",
  "Hollowed-Out Mountain Base",
  "Cursed Amusement Arcade",
  "Cracked Dystopian Dome",
  "Shattered Glass Tower",
  "Giant Sinkhole City",
  "Booby-Trapped Bunker",
  "Evacuation Camp Ruins",
  "Bridge to Nowhere",
  "Doomsday Cult Temple",
  "Pirate-Infested Cargo Ship",
  "Cybernetic Junkyard",
  "Parched Droughtlands",
  "Flooded Underpass",
  "War-Torn Corporate Tower",
  "Neon-Lit Ruins of Tokyo",
  "Ancient Ruined Space Elevator",
  "Hacker-Infested Underground Server Farm",
  "Twisted Metal Junkheap",
  "Ghoul-Occupied Library",
  "Dust Bowl Settlement",
  "Radio Tower Outpost",
  "Tainted Reservoir",
  "Broken Greenhouse Refuge",
  "Scorched Battlefield",
  "Sunken Cathedral",
  "Hollow Subway Tunnels",
  "Mutated Jungle Village",
  "Ruined Castle Fortress",
  "Abandoned Mine Shaft",
  "Underground Cannibal Lair",
  "Giant Crater Camp",
  "Burning Oil Fields",
  "Frozen Wasteland Depot",
  "Broken Ferris Wheel Plaza",
  "Half-Sunken Freighter",
  "Warped Science Lab",
  "Bandit-Controlled Airport Terminal",
  "Barren Nuclear Test Site",
  "Ruins of the Old Capitol",
  "Artificial Intelligence Vault",
  "Weather-Control Experiment Zone",
  "Lost Colony Ship Wreckage",
  "Deserted Highway Rest Stop",
  "Bone-Strewn Battlefield",
  "Waterlogged Sewer Maze",
  "Cannibal Fortress",
  "Shipwrecked Submarine",
  "Lightning-Struck Ghost Town",
  "Collapsed Luxury Hotel",
  "Charred Ruins of a Spaceport",
  "Scrapyard Settlement",
  "Cave of the Last Hermit",
  "Foggy Ruins of a Science Lab",
  "Hacked Drone Factory",
  "Fungal-Infected Warehouse",
  "Swamp-Consumed Prison Yard",
  "Underground Water Reservoir",
  "Bio-Dome Overrun with Mutants",
  "The Forgotten Vault"
];

const classes = [
        {id:1, name:"presecurer", label:"Pre-Securer", lvl: 1},
        {id:2, name:"securer", label:"Securer", lvl: 1},
        {id:3, name:"postsecurer", label:"Post-Securer", lvl: 1},
    ]

const randomListIndex = list => Math.floor(Math.random() * list.length)



export const Exploration = ({operations}) => {
  
//  console.log(operations)

  const [missions, setMissions, recruits, setRecruits, timeOperations] = operations.operations 
  const [testRecruits, setTestRecruits] = useState(recruits.map(r => {
  return {... r,
    class: [
      [classes[randomListIndex(classes)]],
      [],
      [],
    ],
    canCarry: Math.floor(r.stats.curr_strength / 2)
  }
  
  }))


  const [expeditions, setExpeditions] = useState([
    /*example {
    id:0,
    participants:[1,2],
    details: "",
    canCarry: 50 (asegurador) + 20(normal) + 20(normal),
    currCarry: []
    bonus: [
      {type: "materials", bonus:0.3, label: "30% more materials per location"} (stackable)
    ],
    progress: 0,
    duration: 7( in days ) in turns 24*7
    
    
    }*/
  ])
  
  
  const [locations, setLocations] = useState([
    /*example
      
      this will be found by the amount of the places (10) times (*) 2
      { id:0,
        expeditionId: id of expedition,
        locations:[
        {
          direction: random direction from the 3 directions
          resources: [
            {type:"material", name:"stick", weight: 10, amount:10}
          ],
          
        },
        {
          direction: random direction from the 3 directions
          resources: [
            {type:"material", name:"stick", weight: 10, amount:10}
          ],
          
        },
        ]
      }
    */
  ])
  
  const [visited, setVisited] = useState([
    /*
    example: only put it here if we weren't able to retrive all the resources of the place
    {
      distance: if in one of the days we found one of the locations, the day will be saved here
      
      aside from that it will be a copy of the location
      
    
    }
    
    */
  ])
  
  
  
  
  const [inExpedition, setInExpedition] = useState([])
  
  
  const calcBagWeight = (bag) => {
    let weight = 0
    for ( const re of bag ){
      weight += re.weight
    }
    return weight
  }
  
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({})
  
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  
  
  
  
  
  
  
  
  
  
  
  const goOnExpedition = () => {
    
    if (expeditions.length == 0) return 
    
    const newExpeditions = expeditions.map(exp => {
        const linkedLocations = locations.filter(l => l.expeditionId === exp.id)[0].locations
        const locationsAmount = linkedLocations.length
        const foundedIndex = Math.floor(Math.random()*(locationsAmount*2))
        console.log(foundedIndex, locationsAmount)
        const founded = foundedIndex < locationsAmount
        
        
        if ( exp.duration <= exp.progress ) exp.comingBack = true
        
        if (exp?.comingBack){
            setModalData(exp)
            showModal()
            
            return {... exp, DELETE:true}
        }       
        console.log(founded)
        if (founded) {
            console.log("FOUNDED")
            const foundedLocation = linkedLocations[foundedIndex]
            console.log(foundedLocation)
            const resources = foundedLocation.resources
            const canCarry = exp.canCarry - calcBagWeight(exp.currCarry)
            const cantCarryAll = foundedLocation.resourcesTotalWeight > canCarry
            
            /*move the resources to exp.currCarry before putting them
            in visited, after that, they have to come back with the resources 
            
            so they need an indicator of when they coming back
            
            */
             const moveResources = (expWeightLimit, resources) => {
              const bag = []
              let bagsWeight = 0
              let newResources = [ ... resources]
              for ( const re of resources ){
                const calc = bagsWeight + re.weight
                if (calc >= expWeightLimit){
                  continue
                }
                bagsWeight = calc
                bag.push({ ... re})
                newResources = newResources.filter( nre => JSON.stringify(nre) !== JSON.stringify(re))
                
              }
              
              return [bag, newResources]
            }
            
            const [recoveredResources, oldResources] = moveResources(canCarry, resources)
            console.log(recoveredResources, oldResources)
            
            const eraseLocation = (expeditionIndex, foundedIndex) => {
//              if (!cantCarryAll && recoveredResources.length < 0) {
  //              erase location with no resources
                setLocations(locations.filter(l => {
//                  if (l.expeditionId === exp.id){
                  if (l.expeditionId === expeditionIndex){
                    return {
                      ... l,
                      locations: [ ... l.locations.slice(1, foundedIndex)]
                    }
                  }
                  return l                
                  }))
//              }
            }
            
             
            
            if (cantCarryAll){
                setVisited([ ... visited, { ... foundedLocation, distance: exp.progress + 1, }])
                eraseLocation(exp.id, foundedIndex)      
                return { 
                  ... exp,
                  progress: exp.progress + 1, 
                  currCarry:[ ... exp.currCarry, ... recoveredResources],
                  comingBack: true,
                  }
            } else if (!cantCarryAll && recoveredResources.length > 0)  {
//            TODO
//the reason for the exploration not finding anything is because they are not reaching the max value capacity of weight they can carrying
//there is no function to load the things they found and then keep going
              eraseLocation(exp.id, foundedIndex)
              return { 
                    ... exp,
                    progress: exp.progress + 1, 
                    currCarry:[ ... exp.currCarry, ... recoveredResources],
                  }
            }
            
            return { ... exp, progress: exp.progress + 1}
//            if you didn't find anything then sum 24(a whole day) to progress
        } else {
            return { ... exp, progress: exp.progress + 1}
        
        }
     
      
    })
    
    
    
    setExpeditions([ ... newExpeditions.filter(el => (el?.DELETE == true) ? false : true)])
    
  }
  
  
  const ShowExpeditionResults = () => {
    if (!modalData.currCarry) return <></>
    
    if (modalData.currCarry.length === 0) return <h3>Recruits Found Nothing usefull</h3>
    
    const rewards = modalData.currCarry.map( (el, index) => {
        return <Col key={index} span={12}>
          <Card variant="borderless">
            <Statistic
              title={el.name}
              value={el.amount}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
              suffix="+"
            />
          </Card>
        </Col>})
        
    
        
    return <Row gutter={16}>{rewards}</Row>
  
  }
  
  
  


  return (<>
    <Button onClick={goOnExpedition}>Go On Expedition</Button>
    <div>
      <Space>
        <ExplorationForm 
        operations={[missions, setMissions, testRecruits, setTestRecruits, timeOperations]}
        expeditions={expeditions}
        setExpeditions={setExpeditions}
        inExpedition={inExpedition}
        setInExpedition={setInExpedition}
        locations={locations}
        setLocations={setLocations}
        />
      </Space>
      <Space>
      
        <List
          header={<div>Information</div>}
          bordered
          dataSource={expeditions}
          renderItem={(item, index) => (
            <List.Item key={index}>
              <Typography.Text>
              <p>id:{item.id}</p>
              <p>Duration:<br/>
              The expedition will lasts {item.duration} days,
              direction {item.direction}<br/>
              your team has been out for {item.progress} days.</p>
              
              <p>They can carry {item.canCarry}lbs of resources back to base.</p>
              
              <p>The partipants are:<br/>
              {item.participants.map(id => (
                <>{testRecruits.map(tr => {
                    if (tr.id === id){
                      return tr.name
                    }
                })}, </>
              ))}
              </p>
              
              
              
              <p>
               currently carrying {calcBagWeight(item.currCarry)}lbs of resources:<br/>
              
              
              {/*type:"material", name:"stick", weight: 10, amount:10*/}
              
              {/*(item.currCarry.length != 0) ? item.currCarry.map((re) => (
                <>
                {re.name} - weight: {re.weight} - amount: {re.amount} <br/>
                </>
              )) : <>Not carrying anything</>*/}
              </p>
              </Typography.Text>
              
            </List.Item>
          )}
        />
      
      </Space>
    </div>
    
    <Modal title="Results of Expedition" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      
      
      
        <ShowExpeditionResults />
        {/*<Col span={12}>
          <Card variant="borderless">
            <Statistic
              title="Idle"
              value={9.3}
              precision={2}
              valueStyle={{ color: '#cf1322' }}
              prefix={<ArrowDownOutlined />}
              suffix="%"
            />
          </Card>
        </Col>*/}
      
      
    </Modal>
  
  </>)
  
}

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
  const [recruits, setRecruits] = operations.recruitsOperations 
  const [missions, setMissions] = operations.pageOperations
  const timeOperations = operations.timeOperations
  const [expeditions, setExpeditions] = operations.expeditionOperations
  const [locations, setLocations] = operations.locationsOperations
  const [visited, setVisited] = operations.visitedOperations
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
    <div>
      <Space>
        <ExplorationForm 
        operations={operations}
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
                <>{recruits.map(tr => {
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

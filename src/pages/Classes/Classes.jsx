import { useState } from "react"
import { Card, Select, Avatar, Flex, Button } from "antd"
import { MissionCard, ClassCard } from "../../components"

import brainImage from '/images/brain.jpg';
import bicepImage from '/images/bicep.jpg';
import treeImage from '/images/tree.jpg';

//const RecruitsListTemp = ({ recruits }) => {
//    return recruits.map((r, index) => (
//        <div key={index}>
//          <p>{r.name}</p> 
//          <Flex>{r.classes.map((slot) => <ClassCard slot={slot}/>)}</Flex>
//        </div>
//    ))
//}

export const Classes = ({operations}) => {
    return (<>
        <h1>School</h1>
        <MissionCard 
            operations={operations}
        />
    </>)
}

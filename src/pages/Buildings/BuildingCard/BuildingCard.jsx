import { Space,
Card,
Avatar,
Tooltip,
Input,
Button,
Form, 
Checkbox,
InputNumber,
Flex, Progress,
Select} from "antd";

export const BuildingCard = ({buildings = []}) => {
    
    
    if (buildings.length == 0){
        return <>No Buildings Owned</>
    }
    
    return (<>
        {buildings.map((building, index) => {
            return <Card key={index} title={building.name} variant="borderless" style={{ width: 300 }} />
        
        })}
    
    </>)
}

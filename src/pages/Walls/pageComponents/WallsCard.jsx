import { Card, Space, Flex, Progress, Select } from 'antd';
import { green, red } from '@ant-design/colors';
import { ExclamationCircleOutlined,
CheckCircleOutlined,
ArrowUpOutlined} from "@ant-design/icons"
export const WallsCard = ({wall, setWalls, inWalls, teams, setRecruits}) => {
    const attacker = wall.attacker
    let style = {background: null}
    let color = green[6]
    let msg = <h3>SAFE</h3>
    let icon = <CheckCircleOutlined />
    if (wall?.attacked == true){
        style = {background: red[3]}
        color = red[6]
        msg = <h3>UNDER ATTACK!</h3>
        icon = <ExclamationCircleOutlined />
    }
    
    
    
    const AttackerDetails  = ({attacker}) => {
        if (!attacker) return <>no attacker</>
        
        return (
            <Card>
                level: {attacker.powerLevel}<br/>
                <Flex gap={6}>
                    HP
                    <Progress 
                        percent={(attacker.health/attacker.maxHealth)*100}
                        format={percent => `${attacker.health}`}
                    />
                </Flex>
            </Card>
        )
    }
    
    const onChange = (value) => {
        setWalls(prev => {
            return prev.map(el => {
                if (el.id !== wall.id) return el
                return {
                    ... el,
                    stationedTeam: value,
                }
            })
        })
            
    }

    return <div>
        {msg}
        <Card style={style}>
            {icon} <strong>{wall.name}</strong><br/>
            <Progress 
                percent={(wall.health/wall.maxHealth)*100}
                steps={3} 
                size={[20, 30]} 
                format={percent => `${wall.health}`}
                strokeColor={color} /><br/><br/>
            <strong>Assigned Squad</strong><br/>
            <Select 
            style={{ borderColor: 'red', color: 'red' }} 
            size={"100"}
            defaultValue={wall.stationedTeam}
            options={[ {label: "N/A", value:null}, ... teams.map(el => { return { label: el.name, value: el.id, disabled: inWalls().includes(el.id) } })]}
            onChange={onChange}
            />
        </Card>
        <AttackerDetails attacker={attacker}/>
    </div>

}

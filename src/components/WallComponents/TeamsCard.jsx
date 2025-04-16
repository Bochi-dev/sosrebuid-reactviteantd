import { Card, Space, Flex, Progress, Button} from 'antd';
import { green, red } from '@ant-design/colors';
import { useMemo } from 'react';
import { CloseOutlined } from "@ant-design/icons"
import { isTeamDead } from "../../global"

export const TeamsCard = ({team, deleteTeam, recruits}) => {
  const teamRecruits = recruits.filter(el => team.recruitIds.includes(el.id))
  
  return (
    <Space direction="vertical" size={16}>
      <Card title={team.name} style={{ width: 300 }} extra={<Button onClick={() => deleteTeam(team)} color="danger" variant="outlined" shape="circle" icon={<CloseOutlined />}/>}>
        Teams's Level: {team.powerLevel}<br/>
        {(!isTeamDead(team, recruits)) ? teamRecruits.map(el => {
        return <>
          {el.name} - level: {el.level(el)} 
          <Progress 
            percent={(el.stats.health / el.stats.maxHealth) * 100} 
            format={percent => el.stats.health} 
          />
        </>
       }) : <>
          <h2>{team.name} has been incapacitated</h2>
          <Button>heal?</Button>
        </>}
      </Card>
    </Space>
  );
}

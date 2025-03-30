import { Card, Space, Flex, Progress, Button} from 'antd';
import { green, red } from '@ant-design/colors';
import { useMemo } from 'react';
import { CloseOutlined } from "@ant-design/icons"

export const TeamsCard = ({team, deleteTeam, recruits}) => {
    
console.log("Rendering team:", team); // Debugging

  // Compute health dynamically to ensure reactivity
  const health = useMemo(() => {
    return team.recruitIds
      .map(id => recruits.find(r => r.id === id)?.health || 0)
      .reduce((sum, health) => sum + health, 0);
  }, [team.recruitIds, recruits]); // Recalculate when recruits change

  const maxHealth = team.maxHealth * team.recruitIds.length || 1; // Prevent division by zero

  return (
    <Space direction="vertical" size={16}>
      <Card title={team.name} style={{ width: 300 }} extra={<Button onClick={() => deleteTeam(team)} color="danger" variant="outlined" shape="circle" icon={<CloseOutlined />}/>}>
        Teams's Level: {team.powerLevel}<br/>
        
        HP <Progress  percent={(health / maxHealth) * 100}  format={percent => `${(health / maxHealth) * 10}`}  steps={10}  />
       <br/>
       { /*team.recruits.map(el => {
        return <>
          {el.name}
          <Progress 
            percent={(el.health / el.maxHealth) * 100} 
            format={percent => el.health} 
          />
        </>
       })*/ }
      </Card>
    </Space>
  );
}

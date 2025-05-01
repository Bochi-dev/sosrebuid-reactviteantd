import { Card, Space, Flex, Progress, Button} from 'antd';
import { green, red } from '@ant-design/colors';
import { useMemo } from 'react';
import { CloseOutlined, PlusOutlined } from "@ant-design/icons"
import { isTeamDead, checkAndSubstract } from "../../global"

export const TeamsCard = ({team, deleteTeam, operations, healRecruit, recapacitateTeam, modal, }) => {
  const [recruits, setRecruits] = operations.recruitsOperations
  const [resources, setResources] = operations.resourcesOperations
  const teamRecruits = recruits.filter(el => team.recruitIds.includes(el.id))
  return (
    <Space direction="vertical" size={16}>
      <Card title={team.name} style={{ width: 300 }} extra={<Flex gap={5}>
        <Button onClick={() => deleteTeam(team)} color="danger" variant="outlined" shape="circle" icon={<CloseOutlined />}/>
      </Flex>}>
        Teams's Level: {team.powerLevel}<br/>
        {(!isTeamDead(team, recruits)) ? teamRecruits.map(el => {
        return <>
          {el.name} - level: {el.level(el)}
          <Flex> 
            <Button onClick={() => { modal.confirm(
              {
                title: 'Use 2 food to heal this recruit?',
                onOk() {
                  if (checkAndSubstract(resources, setResources, "food", 2)){
                    healRecruit(el, setRecruits, 3)
                  } else {
                    modal.info({
                      title: "Not enough resources",
                      content: <div>
                        <p>You dont have enough food</p>
                      </div>
                    })
                  }
                },
                onCancel(){},
              })  
            }} size="small" type="text" icon={<PlusOutlined />} shape="circle"/>
            <Progress 
              percent={(el.stats.health / el.stats.maxHealth) * 100} 
              format={percent => el.stats.health} 
            />
          </Flex>
        </>
       }) : <>
          <h2>{team.name} has been incapacitated</h2>
          <Button onClick={() => { modal.confirm(
              {
                title: 'Use 6 food to heal to revive the team?',
                onOk() {
                  if (checkAndSubstract(resources, setResources, "food", 6)){
                   recapacitateTeam(team)
                  } else {
                    modal.info({
                      title: "Not enough resources",
                      content: <div>
                        <p>You dont have enough food</p>
                      </div>
                    })
                  }
                },
                onCancel(){},
              })  
            }} >heal?</Button>
        </>}
      </Card>
    </Space>
  );
}

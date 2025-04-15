import { CloseOutlined } from "@ant-design/icons" 
import { Avatar, Tooltip } from "antd"

export const ClassAvatar = ({slot}) => {
  if (slot.length === 0) return <Tooltip title="Empty Class Slot" placement="top"><Avatar icon={<CloseOutlined/>}/></Tooltip>
  slot = slot[0]
  return <Tooltip title={slot.name} placement="top">
    <Avatar src={<img src={slot.icon} alt="avatar" />} />
  </Tooltip>
}


export const ClassesAvatars = ({classes}) => (
    <Avatar.Group>
      {classes.map(e => <ClassAvatar slot={e}/>)}
    </Avatar.Group>
)


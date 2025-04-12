import { Space,
Card,
Avatar} from "antd";
import { CloseOutlined } from "@ant-design/icons"

export const ClassCard = ({ slot }) => {
    slot = slot[0]
    if (!slot) return ( <Card>
      <Avatar icon={<CloseOutlined/>}/> Empty Class Slot
    </Card> )
    
    return (
      <Card>
        <Avatar src={<img src={slot.icon} alt="avatar" />} /> {slot.label} - lv: {slot.level}
      </Card>
    )
}

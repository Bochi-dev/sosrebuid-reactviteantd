import {
  Tooltip,
} from 'antd';

export const NotAvailableMessage = ({curr_actions}) => {
  if (!curr_actions) return <></>
  return <Tooltip title={`Currently doing: ${curr_actions.mission.name}`} placement="top">
    NOT AVAILABLE
  </Tooltip>
}

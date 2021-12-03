import * as React from 'react';
import './AgentHeader.scss';
import {AgentItem, AgentStatus, AgentType} from '../../pages/Agent/Agent';

type IProps = {
  agents: AgentItem[],
}

const AgentHeader = (props: IProps) => {
  const {agents} = props;
  const physicalAgentsNum = agents.filter(agent => agent.type === AgentType.PHYSICAL).length
  const virtualAgentsNum = agents.filter(agent => agent.type === AgentType.VIRTUAL).length
  const buildingAgentsNum = agents.filter(agent => agent.status === AgentStatus.BUILDING).length
  const idleAgentsNum = agents.filter(agent => agent.status === AgentStatus.IDLE).length

  return (
    <div className="head-container">
      <div className="card building">
        <div className="iconfont icon-cog"/>
        <p className="content">{AgentStatus.BUILDING}</p>
        <p className="status-number">{buildingAgentsNum}</p>
      </div>
      <div className="card idle">
        <div className="iconfont icon-coffee"/>
        <p className="content">{AgentStatus.IDLE}</p>
        <p className="status-number">{idleAgentsNum}</p>
      </div>
      <div className="card overview">
        <p className="category all">ALL</p>
        <p className="category physical">{AgentType.PHYSICAL}</p>
        <p className="category virtual">{AgentType.VIRTUAL}</p>
        <p className="number all-number">{physicalAgentsNum + virtualAgentsNum}</p>
        <p className="number physical-number">{physicalAgentsNum}</p>
        <p className="number virtual-number">{virtualAgentsNum}</p>
      </div>
    </div>
  )
}

export default AgentHeader;

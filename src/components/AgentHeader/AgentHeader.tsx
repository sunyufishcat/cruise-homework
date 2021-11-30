import * as React from 'react';
import './AgentHeader.scss';
import {AgentItem, AgentStatus, AgentType} from '../../pages/Agent/Agent';

type IProps = {
  physicalAgents: AgentItem[],
  virtualAgents: AgentItem[],
  buildingNum: number,
  idleNum: number,
}

const AgentHeader = (props: IProps) => {
  const {physicalAgents, virtualAgents, buildingNum, idleNum} = props;

  return (
    <div className="head-container">
      <div className="card building">
        <div className="iconfont icon-cog"/>
        <p className="content">{AgentStatus.BUILDING}</p>
        <p className="status-number">{buildingNum}</p>
      </div>
      <div className="card idle">
        <div className="iconfont icon-coffee"/>
        <p className="content">{AgentStatus.IDLE}</p>
        <p className="status-number">{idleNum}</p>
      </div>
      <div className="card overview">
        <p className="category all">ALL</p>
        <p className="category physical">{AgentType.PHYSICAL}</p>
        <p className="category virtual">{AgentType.VIRTUAL}</p>
        <p className="number all-number">{physicalAgents.length + virtualAgents.length}</p>
        <p className="number physical-number">{physicalAgents.length}</p>
        <p className="number virtual-number">{virtualAgents.length}</p>
      </div>
    </div>
  )
}

export default AgentHeader;

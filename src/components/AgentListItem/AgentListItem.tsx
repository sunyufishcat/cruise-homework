import * as React from 'react';
import './AgentListItem.scss';
import {AgentItem, AgentStatus} from '../../pages/Agent/Agent';

type IProps = {
  agent: AgentItem,
  onSetPopup: (id: number) => void,
  onDeleteResource: (id: number, index: number) => void,
}

const AgentListItem = (props: IProps) => {

  const handlePopup = (id: number): void => {
    props.onSetPopup(id);
  }

  const handleDelete = (id: number, index: number) => {
    props.onDeleteResource(id, index);
  }

  const { agent } = props;
  return (
    <div className="agent-item">
      <img src={`../../assets/os-icons/${agent.os}.png`} alt={agent.os} />
      <div className="detail">
        <div className="info">
          <div className="info-icon">
            <span className="iconfont icon-desktop"/>
            <span className="icon-content blue-content">{agent.name}</span>
          </div>
          <div className={`info-label ${agent.status === 'building' ? 'orange' : 'green'}`}>{agent.status}</div>
          <div className="info-icon">
            <span className="iconfont icon-info"/>
            <span className="icon-content">{agent.ip}</span>
          </div>
          <div className="info-icon">
            <span className="iconfont icon-folder"/>
            <span className="icon-content">{agent.location}</span>
          </div>
        </div>
        <div className="operations">
          <div className="buttons">
            <button
              className="button-plus"
              onClick={() => handlePopup(agent.id)}
            >
              <span className="iconfont icon-plus"/>
            </button>
            {agent.resources.length &&
              agent.resources.map((resource: string, index: number) => (
                <button
                  className="button-resource"
                  onClick={() => handleDelete(agent.id, index)}
                >
                  <span>{resource}</span>
                  <span className="iconfont icon-trash"/>
                </button>
              ))
            }
          </div>

          {agent.status === AgentStatus.BUILDING &&
            <button className="button-deny">
              <span className="iconfont icon-deny"/>
              <span>Deny</span>
            </button>
          }

        </div>
      </div>
    </div>
  )
}

export default AgentListItem;

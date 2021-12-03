import * as React from 'react';
import {useEffect, useState} from 'react';
import Page from '../../components/Page/Page';
import './Agent.scss'
import cruiseApi from '../../actions/cruise';
import Tab from '../../components/Tab/Tab';
import AgentHeader from '../../components/AgentHeader/AgentHeader';
import AgentListItem from '../../components/AgentListItem/AgentListItem';
import Popup from '../../components/Popup/Popup';

export enum AgentType {
  PHYSICAL = 'physical',
  VIRTUAL = 'virtual',
}

export enum AgentStatus {
  BUILDING = 'building',
  IDLE = 'idle',
}

export type AgentItem = {
  id: number,
  name: string,
  os: string,
  status: 'building' | 'idle',
  type: 'physical' | 'virtual',
  ip: string,
  location: string,
  resources: string[],
}

const Agent = () => {
  const [agents, setAgents] = useState<AgentItem[]>([]);
  const [agentsList, setAgentsList] = useState<AgentItem[]>([]);
  const [isPopupDisplay, setIsPopupDisplay] = useState<boolean>(false);
  const [agentId, setAgentId] =useState<number>();
  const [errorPage, setErrorPage] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const existAgents = await cruiseApi.getAgents();
      setAgents(() => [...existAgents]);
      setAgentsList(() => [...existAgents])
    } catch (error) {
      if (!error) {
        return;
      }
      setErrorPage(true);
    }
  }

  const handleTabChange = (value: number): void => {
    switch (value) {
      case 0:
        setAgentsList(() => [...agents]);
        break;
      case 1:
        const physicalAgents = agents.filter(agent => agent.type === AgentType.PHYSICAL)
        setAgentsList(() => [...physicalAgents]);
        break;
      case 2:
        const virtualAgents = agents.filter(agent => agent.type === AgentType.VIRTUAL)
        setAgentsList(() => [...virtualAgents]);
        break;
      default:
        return;
    }
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue: string = event.target.value;
    const matched: AgentItem[] = [];
    for (const agent of agents) {
      if(agent.name.match(inputValue)) {
        matched.push(agent);
      }
    }
    setAgentsList(() => [...matched]);
  }

  const handleSetPopup = (agentId: number) => {
    setIsPopupDisplay(true);
    setAgentId(agentId);
  }

  const handleAddResources = async (value: string) => {
    const resources: Array<string> = value.split(',')
      .map(resource => resource.trim())
      .filter(resource => resource !== '');

    for (const agent of agents) {
      if (agent.id === agentId) {
        agent.resources = agent.resources.concat(resources);
        await cruiseApi.putAgents(agentId, agent);
      }
    }

    setAgents(agents);
    setAgentsList(agents);
    setIsPopupDisplay(false);
  }

  const handleDeleteResource = async (agentId: number, index: number) => {
    const updatedAgents: AgentItem[] = await cruiseApi.getAgents();

    for (const agent of updatedAgents) {
      if (agent.id === agentId) {
        agent.resources = agent.resources.filter((item, itemIndex) => itemIndex !== index);
        await cruiseApi.putAgents(agentId, agent);
      }
    }

    setAgentsList(updatedAgents);
    setAgents(updatedAgents);
  }

  return (
    errorPage ?
      <div className="errorPage">
        <p>Something went wrong!!!</p>
        <p>Please try again later!!!</p>
      </div> :
      <Page>
        <AgentHeader
          agents={agents}
        />

        <div className="nav">
          <Tab onClick={(value: number) => handleTabChange(value)} />
          <div className="search">
            <span className="iconfont icon-search"/>
            <input type="text" onChange={event => handleSearch(event)}/>
          </div>
          <div className="iconfont icon-th-card"/>
          <div className="iconfont icon-th-list active"/>
        </div>

        <div className="agents">
          {agentsList.length !== 0 && agentsList.map(agent => (
            <AgentListItem
              agent={agent}
              onSetPopup={(agentId: number) => handleSetPopup(agentId)}
              onDeleteResource={(agentId: number, index: number) => handleDeleteResource(agentId, index)}
            />
          ))}
        </div>

        <Popup
          isPopupDisplay={isPopupDisplay}
          onAddResources={(value: string) => handleAddResources(value)}
          onCancel={() => setIsPopupDisplay(false)}
        />
      </Page>
  )
}
export default Agent;

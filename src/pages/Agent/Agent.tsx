import * as React from 'react';
import Page from '../../components/Page/Page';
import './Agent.scss'
import {useEffect, useState} from 'react';
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
  const [buildingNum, setBuildingNum] = useState<number>(0);
  const [idleNum, setIdleNum] = useState<number>(0);
  const [agents, setAgents] = useState<AgentItem[]>([]);
  const [physicalAgents, setPhysicalAgents] = useState<AgentItem[]>([]);
  const [virtualAgents, setVirtualAgents] = useState<AgentItem[]>([]);
  const [agentsList, setAgentsList] = useState<AgentItem[]>([]);
  const [isPopupDisplay, setIsPopupDisplay] = useState<boolean>(false);
  const [agentId, setAgentId] =useState<number>();

  useEffect(() => {
    async function fetchData() {
      const existAgents = await cruiseApi.getAgents();
      setAgents(() => [...existAgents]);
      setAgentsList(() => [...existAgents]);

      existAgents.forEach((existAgent: AgentItem) => {
        existAgent.status === AgentStatus.BUILDING ?
          setBuildingNum(buildingNum => buildingNum + 1) :
          setIdleNum(idleNum => idleNum + 1);

        existAgent.type === AgentType.PHYSICAL ?
          setPhysicalAgents(physicalAgents => [...physicalAgents, existAgent]) :
          setVirtualAgents(virtualAgents => [...virtualAgents, existAgent]);
      })
    }
    fetchData();
  }, []);

  const handleTabChange = (value: number): void => {
    if (value === 0) {
      setAgentsList(() => [...agents]);
    }
    if (value === 1) {
      setAgentsList(() => [...physicalAgents]);
    }
    if (value === 2) {
      setAgentsList(() => [...virtualAgents]);
    }
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue: string = event.target.value;
    const matched: AgentItem[] = [];
    for (let agent of agents) {
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

    agents.forEach((agent: AgentItem) => {
      if (agent.id === agentId) {
        agent.resources = agent.resources.concat(resources);
      }
    })
    const updatedAgent = agents.find(agent => agent.id === agentId);

    if (agentId && updatedAgent) {
      await cruiseApi.putAgents(agentId, updatedAgent);
    }
    setAgents(agents);
    setAgentsList(agents);
    setIsPopupDisplay(false);
  }

  const handleDeleteResource = async (agentId: number, index: number) => {
    const updatedAgents: AgentItem[] = await cruiseApi.getAgents();
    updatedAgents.forEach((agent: AgentItem) => {
      if (agent.id === agentId) {
        agent.resources = agent.resources.filter((item, itemIndex) => itemIndex !== index);
      }
    })
    const updatedAgent = updatedAgents.find(agent => agent.id === agentId);

    if (updatedAgent) {
      await cruiseApi.putAgents(agentId, updatedAgent);
    }
    setAgentsList(updatedAgents);
    setAgents(updatedAgents);
  }

  return (
    <Page>
      <AgentHeader
        physicalAgents={physicalAgents}
        virtualAgents={virtualAgents}
        buildingNum={buildingNum}
        idleNum={idleNum}
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
        {agentsList.length && agentsList.map(agent => (
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

import * as React from 'react';
import Page from '../../components/Page/Page';
import './Agent.scss'
import {useEffect, useState} from 'react';
import cruiseApi from '../../actions/cruise';
import Tab from '../../components/Tab/Tab';

enum AgentType {
  PHYSICAL = 'physical',
  VIRTUAL = 'virtual',
}

enum AgentStatus {
  BUILDING = 'building',
  IDLE = 'idle',
}

type AgentItem = {
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

  useEffect(() => {
    async function fetchData() {
      const existAgents = await cruiseApi.getAgents();
      setAgents(() => [...existAgents]);

      existAgents.map((existAgent: AgentItem) => {
        existAgent.status === AgentStatus.BUILDING ?
          setBuildingNum(buildingNum => buildingNum + 1) :
          setIdleNum(idleNum => idleNum + 1);

        existAgent.type === AgentType.PHYSICAL ?
          setPhysicalAgents(physicalAgents => [...physicalAgents, existAgent]) :
          setVirtualAgents(virtualAgents => [...virtualAgents, existAgent]);
        return existAgent;
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

  return (
    <Page>
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
          <p className="category">ALL</p>
          <p className="category">{AgentType.PHYSICAL}</p>
          <p className="category">{AgentType.VIRTUAL}</p>
          <p className="number">{physicalAgents.length + virtualAgents.length}</p>
          <p className="number">{physicalAgents.length}</p>
          <p className="number">{virtualAgents.length}</p>
        </div>
      </div>
      <div className="nav">
        <Tab onClick={(value: number) => handleTabChange(value)} />
      </div>
    </Page>
  )
}
export default Agent;

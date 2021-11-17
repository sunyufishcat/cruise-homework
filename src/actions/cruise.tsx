import axios, {AxiosResponse} from "axios";
import {AgentItem} from '../pages/Agent/Agent';
const baseURL = 'http://localhost:3001'

const cruiseApi = {

  getAgents: async() => {
    const response: AxiosResponse = await axios.get(`${baseURL}/agents`);
    return response.data;
  },

  putAgents: async(agentId: number, resources: AgentItem) => {
    await axios.put(`${baseURL}/agents/${agentId}`, resources)
  }

}

export default cruiseApi;

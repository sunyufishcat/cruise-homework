import axios, {AxiosResponse} from "axios";
const baseURL = 'http://localhost:3001'

const cruiseApi = {
  getAgents: async() => {
    const response: AxiosResponse = await axios.get(`${baseURL}/agents`);
    return response.data;
  }
}

export default cruiseApi;

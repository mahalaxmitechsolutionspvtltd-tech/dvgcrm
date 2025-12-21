import axios from "axios";
import type { Netwoks } from "../lib/types";



const URI = import.meta.env.VITE_REACT_BACKEND_URI;
async function getNetworks() {
    console.log("network handler called");
    console.log("network handler called");

    const response = await axios.get(`${URI}/api/getnetworks`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    return response;
}

async function addNetwork(formdata: Partial<Netwoks>) {
    const reaponse = await axios.post(`${URI}/api/addnetwork`, formdata, {
        headers: {
            'Content-Type': 'applicaon/json',
            'Accept': 'application/json'
        }
    })
    return reaponse;
}


export { addNetwork, getNetworks };
import axios from "axios";
import type { Lead } from "../lib/types";





const URI = import.meta.env.VITE_REACT_BACKEND_URI;
async function addLeadHandler(formdata: Partial<Lead>) {

    try {
        const resp = await axios.post(
            `${URI}/api/addlead`,
            formdata,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            }
        );
        return resp;

    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return error.response;
        }
        throw error;
    }
}


async function getLeadsHandler() {

    const reaponse = await axios.get(`${URI}/api/getleads`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    return reaponse;

}

async function updateLeadHandler(formdata: Partial<Lead>) {

    const srNo = formdata.sr_no;

    const reaponse = await axios.put(`${URI}/api/updatelead/${srNo}`, formdata, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    })

    return reaponse;

}

async function convertDeal(lead: Lead) {
    const sr_no = lead.sr_no
    try {
        const response = await axios.post(`${URI}/api/createdeal/${sr_no}`, {
            headers: {
                'Content-Type': 'Application/jsonm',
                'Accept': 'Application/jsonm'
            }
        });
        if (response) {
            return response;

        }

    } catch (error) {
        console.log(error);

    }


}

export { getLeadsHandler, addLeadHandler, updateLeadHandler, convertDeal }
import type { Dispatch, SetStateAction } from "react";

export interface FormData {
    full_name?: string | null,
    email: string | null,
    password: string | null,
    mobile_no?: number | null | string
}

export interface LoginData {
    email?: string | null;
    password?: string | null;
}
export interface LoginErrors {
    email?: string | null;
    password?: string | null;
}


export interface FormErrors {
    full_name?: string;
    email?: string;
    password?: string;
    mobile_no?: string;
}


export interface AuthProviderProps {
    children: React.ReactNode;

}

export interface User {
    id: string;
    email: string;
    username: string;
    mobile: number | string;
    role: string

}

export interface AuthContextType {
    user: User | null;
    login: (user: User) => Promise<void>;
    logout: () => Promise<void>;
    isloading: boolean;
    setLoding: Dispatch<SetStateAction<boolean>>

}

export type LeadStatus =
    | 'Cold'
    | 'Warm'
    | 'Hot'
    | 'Quotation sent'
    | 'Deal done'
    | 'Lead dropped'

export type QuotationType =
    | 'onetime'
    | 'monthly';

export interface FollowUp {
    id: string;
    date: string;
    note: string;
    completed: boolean;
    timestamp: number;
    expenses: string | null;
}


export interface Lead {

    sr_no: string | null;
    date: string | null;
    company_name: string | null;
    company_type: string | null;
    nature_of_business: string | null;
    gst_no?: string | null;
    pan_number?: string | null;
    primary_person_name: string | null;         //this is required
    primary_person_contact: string | null;      //this is required
    primary_person_email: string | null;        //this is required

    secondary_person_name: string | null;
    secondary_person_contact: string | null;
    secondary_person_email: string | null;

    tertiary_person_name: string | null;
    tertiary_person_contact: string | null;
    tertiary_person_email: string | null;
    address_line1: string | null;
    city: string | null;
    problem_statement?: string | null;
    service_requirements: string[] | null;
    remarks?: string | null;
    status: LeadStatus;
    quotation_amount?: number | null;
    quotation_type?: QuotationType;
    follow_ups: FollowUp[] | null;
    expenses: string | null;
    last_updated: number | null;
}

export interface Deal {
    id?: string;
    lead_sr_no: string | null;
    company_name: string | null;
    company_type: string | null;
    nature_of_business: string | null;
    contact_name: string | null;
    contact_number: string | null;
    pan_number?: string | null;
    gst_no?: string | null;
    email: string | null;
    city: string | null;
    deal_title: string | null;
    deal_stage: string | null;
    deal_amount: string | null;
    quotation_type: string | null;
    problem_statement: string | null;
    service_requirements: string[] | null;
    drop_lead_reason: string | null
    status: string | null;
    last_updated: string | null;
    created_at: number | null;
    updated_at: number | null;
}



export interface Netwoks {
    full_name: string | null,
    email: string | null,
    mobile: string | null,
    remarks: string | null,
    type_of_industries: string[] | null
}
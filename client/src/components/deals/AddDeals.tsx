import { Button } from "../ui/button";
import { Asterisk, ChevronDown, CirclePlus, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem, SelectLabel } from "../ui/select";
import { MultiSelect, MultiSelectContent, MultiSelectGroup, MultiSelectItem, MultiSelectTrigger, MultiSelectValue } from "../ui/multi-select";
import { Textarea } from "../ui/textarea";
import { DialogClose } from "@radix-ui/react-dialog";
import { useState, type ChangeEventHandler } from "react";
import type { Deal, Lead } from "../../lib/types";


import { FieldLabel } from "../ui/field";
import { Spinner } from "../ui/spinner";
import { addDealHandler } from "../../apiHandlers/DealsHandler";
import axios from "axios";


const businessNatureOptions = [
    { lable: "Food Manufacturing", value: "Food Manufacturing" },
    { lable: "Clothing Brand & Cloth Manufacturing", value: "Clothing Brand & Cloth Manufacturing" },
    { lable: "Ad Agency", value: "Ad Agency" },
    { lable: "Marketing Agency", value: "Marketing Agency" },
    { lable: "Electrical, Engineering Goods Manufacturing", value: "Electrical, Engineering Goods Manufacturing" },
    { lable: "Agriculture Business", value: "Agriculture Business" },
    { lable: "Jwellery - Retailer & Wholeseller", value: "Jwellery - Retailer & Wholeseller" },
    { lable: "Service Industry", value: "Service Industry" },
];

const companyType = [
    { lable: 'Properitor', value: 'Properitor' },
    { lable: 'Partnership-deed', value: 'Partnership-deed' },
    { lable: 'Limited Liability Partnership (LLP)', value: 'Limited Liability Partnership (LLP)' },
    { lable: 'Private Limited (Pvt Ltd)', value: 'Private Limited (Pvt Ltd)' },
    { lable: 'Public Limited Company (PLC)', value: 'Public Limited Company (PLC)' },
    { lable: 'Hindu Undivided Family Firm (HUF)', value: 'Hindu Undivided Family Firm (HUF)' },
    { lable: 'Hindu Undivided Family Firm (HUF)', value: 'Government Organisation' },
];

const requirement = [
    { lable: 'Website Development', value: 'Website Development' },
    { lable: 'Software Development', value: 'Software Development' },
    { lable: 'WhatsApp Marketing', value: 'WhatsApp Marketing' },
    { lable: 'Search Engine Optimisation', value: 'Search Engine Optimisation' },
    { lable: 'WhatsApp Automation', value: 'WhatsApp Automation' },
    { lable: 'Social Media Marketing', value: 'Social Media Marketing' },
    { lable: 'Tracking Video', value: 'Tracking Video' },
    { lable: 'Lead Generation', value: 'Lead Generation' },
    { lable: 'Mobile Application Development', value: 'Mobile Application Development' },
    { lable: 'UI & UX Design', value: 'UI & UX Design' },
    { lable: 'Content Shooting & Edits', value: 'Content Shooting & Edits' },
    { lable: 'Logo, Branding & Guidelines', value: 'Logo, Branding & Guidelines' },
    { lable: 'Start-up Development (App + Software + ERP)', value: 'Start-up Development (App + Software + ERP)' },
    { lable: 'Enterprise Resources Planning Software', value: 'Enterprise Resources Planning Software' },
    { lable: 'HRMS Software', value: 'HRMS Software' },
    { lable: 'Customer Relationship Management - CRM Software', value: 'Customer Relationship Management - CRM Software' },
    { lable: 'Company Profile & Business Profile', value: 'Company Profile & Business Profile' },
];


interface childProps {
    onSuccess: (isSuccess: boolean) => void;
}

const form: Partial<Deal> = {
    problem_statement: "",
    company_name: "",
    company_type: "",
    contact_name: "",        //this is required
    contact_number: "",      //this is required
    email: "",       //this is required
    gst_no: "",
    pan_number: "",
    city: "",
    nature_of_business: "",
    service_requirements: [],
    deal_stage: "",
    deal_amount: "",
    quotation_type: "",
    status: undefined,  // or maybe "Cold" or a default
};


export default function AddDeals({ onSuccess }: childProps) {


    const [formdata, setFormData] = useState<Partial<Deal>>(form);
    const [isNewValue, setNewValue] = useState(false);
    // const [isDeal, setDeal] = useState(false);
    const [errors, setFormErrors] = useState<Deal>();
    const [open, setOpen] = useState(false);
    const [loader, setLoader] = useState(false);


    const handleInputChange: ChangeEventHandler<HTMLInputElement> | undefined = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev, [name]: ['pan_number', 'gst_no'].includes(name) ? value.toUpperCase() : value
        }))

    }

    const handleSelectChange = (name: string, value: string | string[],) => {
        setFormData((prev) => ({
            ...prev, [name]: value
        }))
    }

    const handleTextArea = (name: string, value: string,) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleSubmit = async () => {
        try {
            setLoader(true);
            const response = await addDealHandler(formdata);
            if (response?.data?.success) {
                setLoader(false);
                setOpen(false)
                onSuccess(true);
                setFormData(form);
            }

        } catch (error) {
            if (axios.isAxiosError(error)) {
                setLoader(false);
                setFormErrors(error.response?.data);
            } else {
                console.error("Unexpected error:", error);
            }
        }

    }


    return (

        <div className=" overflow-auto overflow-y-auto">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button
                        onClick={() => setOpen(true)}
                        className=" bg-blue-600 hover:bg-blue-700" variant={"default"}>
                        <CirclePlus />Deals
                    </Button>
                </DialogTrigger>
                <DialogContent className=" lg:max-w-7xl border bg-white border-gray-400 max-h-[95vh] overflow-y-auto  hide-scrollbar">

                    <DialogHeader>
                        <DialogTitle className="text-center">Add New Deal</DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-1 lg:grid-cols-12 xl:grid-cols-12 2xl:grid-cols-12 gap-5 overflow-y-auto h-xl ">
                        <div className="col-span-8 grid gap-1">
                            {/* company section */}
                            <section className="border border-gray-300 rounded-sm">
                                <div className="bg-gray-100 text-center  py-2">
                                    <h3 className="text-gray-900 font-medium">Company details</h3>
                                </div>
                                <div className="p-3">
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="my-3">

                                            <FieldLabel className="text-sm">Company name <Asterisk className="-mx-1.5 w-3 h-3 text-red-500" /></FieldLabel>
                                            <Input
                                                name="company_name"
                                                onChange={(e) => handleInputChange(e)}
                                                placeholder={errors?.company_name ? errors.company_name![0] : "company name.."}
                                                className={`${errors?.company_name ? "border-2 border-red-600 text-red-600" : ""}`}
                                                required
                                            />
                                        </div>

                                        <div className="my-3">
                                            <FieldLabel className="text-sm">Deal title <Asterisk className="-mx-1.5 w-3 h-3 text-red-500" /></FieldLabel>
                                            <Input
                                                name="deal_title"
                                                onChange={(e) => handleInputChange(e)}
                                                placeholder={errors?.company_name ? errors.company_name![0] : "deal title"}
                                                className={`${errors?.company_name ? "border-2 border-red-600 text-red-600" : ""}`}

                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-col-1 lg:grid-cols-2 xl:grid-cols-2 gap-2">
                                        {/* company type */}
                                        <div>

                                            <FieldLabel className="text-sm">Company type</FieldLabel>
                                            <Select

                                                onValueChange={(value) => handleSelectChange("company_type", value)}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select Company type" />
                                                </SelectTrigger>
                                                <SelectContent className="border border-gray-300">
                                                    <SelectGroup>
                                                        <SelectLabel>companies types</SelectLabel>
                                                        {
                                                            companyType.map((item, index) => (
                                                                <SelectItem key={index} value={item.value}>{item.lable}</SelectItem>
                                                            ))

                                                        }


                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        {/* company nature */}
                                        <div>

                                            <FieldLabel className="text-sm">Nature of Business</FieldLabel>
                                            {!isNewValue ? (
                                                <Select

                                                    name="nature_of_business"
                                                    onValueChange={(value) => {
                                                        value === "other" ? setNewValue(true) : handleSelectChange("nature_of_business", value)
                                                    }}
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="nature of business" />
                                                    </SelectTrigger>
                                                    <SelectContent className="border border-gray-300">

                                                        <SelectGroup>

                                                            <SelectLabel>Nature of Business</SelectLabel>
                                                            {
                                                                businessNatureOptions.map((opt, index) => (
                                                                    <SelectItem key={index} value={opt.value}>{opt.lable}</SelectItem>
                                                                ))
                                                            }
                                                            <SelectItem value="other">
                                                                <Button variant={"ghost"} >
                                                                    <Plus /> Add new business of nature....
                                                                </Button>
                                                            </SelectItem>

                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            )
                                                :
                                                (
                                                    <div className="relative">
                                                        <Input
                                                            placeholder="Add new nature of business"
                                                            name=" nature_of_business"
                                                            onChange={(e) => handleInputChange(e)}
                                                        />
                                                        <Button onClick={() => setNewValue(false)} className=" z-1 absolute right-1 top-0.5" type="button" variant={"ghost"}>  <ChevronDown className="text-gray-500" /></Button>
                                                    </div>
                                                )


                                            }

                                        </div>
                                    </div>

                                    {/* GST number & Pan car */}
                                    <div className="grid grid-col-1 lg:grid-cols-2 xl:grid-cols-2 gap-2">
                                        <div className="my-3">
                                            <label htmlFor="gstno"></label>
                                            <FieldLabel className="text-sm">GST Number</FieldLabel>
                                            <Input
                                                className=" uppercase text-blue-700 font-semibold"
                                                max={15}
                                                name="gst_no"
                                                onChange={(e) => handleInputChange(e)}
                                                placeholder="eg.27AAAAP0267H2ZN" />
                                        </div>
                                        <div className="my-3">

                                            <FieldLabel>PAN number<Asterisk className="-mx-1.5 w-3 h-3 text-red-500" /></FieldLabel>
                                            <Input

                                                required
                                                name={"pan_number"}
                                                max={10}
                                                onChange={(e) => handleInputChange(e)}
                                                placeholder={errors?.pan_number ? errors.pan_number![0] : "eg.ABCDE0123F"}
                                                className={`${errors?.pan_number ? "border-2 border-red-600 text-red-600" : ""}  uppercase text-blue-700 font-semibold`}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Contacts and kyes */}

                            <section className="border border-gray-300 rounded-sm">
                                <div className="bg-gray-100 text-center py-2">
                                    <h3 className="text-gray-900 font-medium">Key Contacts</h3>
                                </div>

                                {/*person contacts */}
                                <div className="p-3 grid gap-4 ">

                                    {/* primary person */}
                                    <div className="grid grid-cols-3 gap-2">
                                        <div>
                                            <FieldLabel className="text-sm">Contact Name <Asterisk className="-mx-1.5 w-3 h-3 text-red-500" /></FieldLabel>
                                            <Input
                                                type="text"
                                                name="contact_name"
                                                onChange={(e) => handleInputChange(e)}
                                                required
                                                placeholder={errors?.contact_name ? errors.contact_name![0] : "Full name"}
                                                className={` ${errors?.contact_name![0] ? "border-2 border-red-600 text-red-600" : ""}`}
                                            />
                                        </div>
                                        <div>

                                            <FieldLabel className="text-sm"> Contact number <Asterisk className="-mx-1.5 w-3 h-3 text-red-500" /></FieldLabel>
                                            <Input
                                                type="tel"
                                                name="contact_number"
                                                onChange={(e) => handleInputChange(e)}
                                                required
                                                placeholder={errors ? errors.contact_number![0] : "eg.98473xxxx"}
                                                className={` ${errors?.contact_number![0] ? "border border-red-600 text-red-600" : ""}`}
                                            />
                                        </div>
                                        <div>

                                            <FieldLabel className="text-sm"> Contact email <Asterisk className="-mx-1.5 w-3 h-3 text-red-500" /></FieldLabel>
                                            <Input
                                                type="email"
                                                name="email"
                                                onChange={(e) => handleInputChange(e)}
                                                required
                                                placeholder={errors?.email ? errors.email![0] : "email"}
                                                className={` ${errors?.email![0] ? "border border-red-600 text-red-600" : ""}`}
                                            />
                                        </div>
                                    </div>



                                </div>
                            </section>

                            {/* Location */}

                            <section className="border border-gray-300 rounded-sm">
                                <div className="bg-gray-100 text-center py-2">
                                    <h3 className="text-gray-900 font-medium">Location</h3>
                                </div>

                                {/*person contacts */}
                                <div className="p-3 grid gap-3">
                                    <div>

                                        <FieldLabel className="text-sm">Location</FieldLabel>
                                        <Input
                                            name="city"
                                            onChange={(e) => handleInputChange(e)}
                                            placeholder="e.g 123, Mumbai 400001,India" />
                                    </div>
                                </div>

                            </section>
                        </div>

                        {/* second column */}

                        <div className="col-span-4 grid gap-1">
                            {/* Status */}
                            <section className="border border-gray-300 rounded-sm">
                                <div className="bg-gray-100 text-center py-2">
                                    <h3 className="text-gray-900 font-medium">Status</h3>
                                </div>

                                {/*Status */}
                                <div className="p-3 grid gap-3">
                                    <div>

                                        <FieldLabel className="text-sm">Status</FieldLabel>
                                        <Select
                                            name="status"
                                            onValueChange={(value) => { handleSelectChange("status", value) }}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Status" />
                                            </SelectTrigger>
                                            <SelectContent className="border border-gray-300">
                                                <SelectGroup>
                                                    <SelectLabel>Select</SelectLabel>
                                                    <SelectItem value="New">New</SelectItem>
                                                    <SelectItem value="Repeat">Repeat </SelectItem>
                                                    <SelectItem value="In Progress">In Progress</SelectItem>
                                                    <SelectItem value="Won">Won</SelectItem>
                                                    <SelectItem value="Lost">Lost</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <FieldLabel className="text-sm">Deal stage</FieldLabel>
                                        <Select
                                            name="deal_stage"
                                            onValueChange={(value) => { handleSelectChange("deal_stage", value) }}

                                        >
                                            <SelectTrigger className={`w-full`}>
                                                <SelectValue placeholder="Deal stage" />
                                            </SelectTrigger>
                                            <SelectContent className="border border-gray-300">
                                                <SelectGroup>
                                                    <SelectLabel>stage</SelectLabel>
                                                    <SelectItem value="Discovery">Discovery</SelectItem>
                                                    <SelectItem value="Qualification">Qualification </SelectItem>
                                                    <SelectItem value="Proposal">Proposal</SelectItem>
                                                    <SelectItem value="Negotiation">Negotiation</SelectItem>
                                                    <SelectItem value="Closed Won">Closed Won</SelectItem>
                                                    <SelectItem value="Closed Lost">Closed Lost</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>

                                            <FieldLabel className="text-sm"> Deal amount<Asterisk className="-mx-1.5 w-3 h-3 text-red-500" /></FieldLabel>
                                            <Input
                                                type="number"
                                                name="deal_amount"
                                                onChange={(e) => handleInputChange(e)}
                                                required
                                                placeholder={errors ? errors.deal_amount![0] : "amount"}
                                                className={` ${errors?.deal_amount![0] ? "border border-red-600 text-red-600" : ""}`}
                                            />
                                        </div>
                                        <div>
                                            <FieldLabel className="text-sm"> quotation_type <Asterisk className="-mx-1.5 w-3 h-3 text-red-500" /></FieldLabel>
                                            <Select
                                                name="quotation_type"
                                                onValueChange={(value) => { handleSelectChange("quotation_type", value) }}
                                            >
                                                <SelectTrigger className={`${errors ? " border border-red-500" : ""} w-full`}>
                                                    <SelectValue placeholder="Quotation type" />
                                                </SelectTrigger>
                                                <SelectContent className="border border-gray-300">
                                                    <SelectGroup>
                                                        <SelectLabel>type</SelectLabel>
                                                        <SelectItem value="monthly">Monthly</SelectItem>
                                                        <SelectItem value="onetime">onetime </SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>

                                {/* {
                                    isDeal ? (
                                        <div className="p-3 grid gap-3">
                                            <Separator />
                                            <div>

                                                <FieldLabel className="text-sm">Deal</FieldLabel>
                                                <section className="flex gap-2">
                                                    <div>
                                                        <label className="text-sm" htmlFor="bussiess value">Bussiness value</label>
                                                        <Input onChange={handleInputChange} name="quotationAmount" id="bussiess value" placeholder="₹" type="number" className="" />
                                                    </div>
                                                    <div>

                                                        <FieldLabel className="text-sm">Steps</FieldLabel>
                                                        <Select
                                                            name="status"
                                                            onValueChange={(value) => handleSelectChange("quotationType", value)}
                                                        >
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="One time /monthly" />
                                                            </SelectTrigger>
                                                            <SelectContent className="border border-gray-300">
                                                                <SelectGroup>
                                                                    <SelectLabel>select one of them</SelectLabel>
                                                                    <SelectItem value="onetime">Onetime</SelectItem>
                                                                    <SelectItem value="monthly">Monthly</SelectItem>
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </section>

                                            </div>
                                        </div>
                                    ) : ""
                                } */}

                            </section>

                            {/* Requirements */}
                            <section className="border border-gray-300 rounded-sm  ">
                                <div className="bg-gray-100 text-center py-2">
                                    <h3 className="text-gray-900 font-medium">Requirements</h3>
                                </div>

                                <div className="p-3 grid gap-1">

                                    {/*Requirements */}
                                    <div className="">

                                        <FieldLabel className="text-sm">Required Services</FieldLabel>
                                        <MultiSelect

                                            onValuesChange={(e) => setFormData((prev) => ({
                                                ...prev,
                                                service_requirements: e
                                            }))}>
                                            <MultiSelectTrigger
                                                className="w-full max-h-20 "
                                            >
                                                <MultiSelectValue
                                                    className="max-h-20 grid grid-cols-1 overflow-y-scroll custom-scrollbar py-1"
                                                    placeholder="Select services..."
                                                />
                                            </MultiSelectTrigger>

                                            <MultiSelectContent className="border border-gray-300">

                                                <MultiSelectGroup className="border border-gray-300">
                                                    {
                                                        requirement.map((item, index) => (

                                                            <MultiSelectItem key={index} value={item.value}>{item.lable}</MultiSelectItem>
                                                        ))
                                                    }

                                                </MultiSelectGroup>

                                            </MultiSelectContent>
                                        </MultiSelect>

                                    </div>

                                    {/* problem statument  */}
                                    <div className="col-span-full ">
                                        <FieldLabel className="text-sm">Client's porblem statment</FieldLabel>
                                        <Textarea
                                            onChange={(e) => handleTextArea("problem_statement", e.target.value)}
                                            placeholder="porblem statment.." />
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                    <DialogFooter className="">
                        <DialogClose asChild>
                            <Button onClick={() => setOpen(false)} variant={"outline"}>Cancel</Button>
                        </DialogClose>
                        <Button onClick={handleSubmit} variant={"default"}>
                            {
                                loader ? <Spinner /> : "Generate Lead"
                            }
                        </Button>
                    </DialogFooter>
                </DialogContent >
            </Dialog >

        </div >
    )
}

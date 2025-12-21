

import { Button } from "../ui/button";
import { Asterisk, ChevronDown, Edit, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem, SelectLabel } from "../ui/select";
import { MultiSelect, MultiSelectContent, MultiSelectGroup, MultiSelectItem, MultiSelectTrigger, MultiSelectValue } from "../ui/multi-select";
import { Textarea } from "../ui/textarea";
import { DialogClose } from "@radix-ui/react-dialog";
import { useState } from "react";
import type { Lead } from "../../lib/types";
import type { FollowUp } from "../../lib/types";
import { updateLeadHandler } from "../../apiHandlers/LeadHandler";
import { Separator } from "../ui/separator";
import { FieldLabel } from "../ui/field";



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
    leads: Lead
}



export default function EditLead({ onSuccess, leads }: childProps) {
    const [formdata, setFormData] = useState<Lead>(leads);
    const [isNewValue, setNewValue] = useState(false);
    const [isDeal, setDeal] = useState(false);
    const [errors, setFormErrors] = useState<Lead>();
    const [open, setOpen] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev, [name]: value
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

    const handleFollowUpAdd = () => {
        // autoSaveForm();
        const newFollowUp: FollowUp = {
            id: Math.random().toString(36).substr(2, 9),
            date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
            note: '',
            completed: false,
            timestamp: Date.now()
        };

        setFormData((prev: any) => ({
            ...prev,
            follow_ups: [newFollowUp, ...(prev?.follow_ups || [])]
        }));

    };

    const updateFollowUp = (id: string, field: keyof FollowUp, value: any) => {
        setFormData((prev: any) => ({
            ...prev,
            follow_ups: prev.follow_ups.map((item: any) => item.id === id ? { ...item, [field]: value } : item)
        }));
    };



    const autoSaveForm = async (e: any) => {
        if (!e) {
            const resp = await updateLeadHandler(formdata);

            if (resp?.data.success) {
                onSuccess(true);
            }
            else {
                setFormErrors(resp.data.errors)
            }
        }

    }

    return (

        <div className=" overflow-auto overflow-y-auto">
            <Dialog open={open} >
                <DialogTrigger asChild>
                    <div className="flex gap-2" onClick={() => setOpen(true)}>
                        <Edit className="my-auto " />Edit lead
                    </div>
                </DialogTrigger>
                <DialogContent className="p-10 lg:max-w-7xl border bg-white border-gray-400 max-h-[95vh] overflow-y-auto  hide-scrollbar" >

                    <DialogHeader>
                        <DialogTitle className="text-center">Edit lead</DialogTitle>
                    </DialogHeader>

                    <div className="grid grid-cols-1 lg:grid-cols-12 xl:grid-cols-12 2xl:grid-cols-12 gap-5 overflow-y-auto h-xl ">

                        <div className="col-span-8 grid gap-5">
                            {/* company section */}
                            <section className="border border-gray-300 rounded-sm">
                                <div className="bg-gray-100 text-center  py-2">
                                    <h3 className="text-gray-900 font-medium">Company details</h3>
                                </div>
                                <div className="p-3">
                                    <div className="my-3">
                                        <label className="text-sm" htmlFor="cname">Company name</label>
                                        <Input
                                            value={formdata.company_name ?? ""}
                                            onKeyDown={(e) => e.stopPropagation()}
                                            name="company_name"
                                            onChange={(e) => handleInputChange(e)}
                                            placeholder="company name.."
                                            required />
                                    </div>

                                    <div className="grid grid-col-1 lg:grid-cols-2 xl:grid-cols-2 gap-2">
                                        {/* company type */}
                                        <div>
                                            <label className="text-sm" htmlFor="">Company type</label>
                                            <Select
                                                value={formdata.company_type ?? ""}
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
                                            <label className="text-sm" htmlFor="">Nature of Business</label>

                                            {!isNewValue ? (
                                                <Select
                                                    value={formdata.nature_of_business ?? ""}
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
                                                            name="nature_of_business"
                                                            onKeyDown={(e) => e.stopPropagation()}
                                                            onChange={(e) => handleInputChange(e)}
                                                        />
                                                        <Button onClick={() => setNewValue(false)} className=" z-1 absolute right-1 top-0.5" type="button" variant={"ghost"}>  <ChevronDown className="text-gray-500" /></Button>
                                                    </div>
                                                )


                                            }

                                        </div>
                                    </div>

                                    {/* GST number */}
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
                                                onKeyDown={(e) => e.stopPropagation()}
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
                                {/*person contacts */}
                                <div className="p-3 grid gap-4 ">

                                    {/* primary person */}
                                    <div className="grid grid-cols-3 gap-2">
                                        <div>
                                            <FieldLabel className="text-sm">Primary Contact Name <Asterisk className="-mx-1.5 w-3 h-3 text-red-500" /></FieldLabel>
                                            <Input

                                                type="text"
                                                name="primary_person_name"
                                                onChange={(e) => handleInputChange(e)}
                                                required
                                                placeholder={errors?.primary_person_name ? errors.primary_person_name![0] : "Full name"}
                                                className={` ${errors?.primary_person_name![0] ? "border-2 border-red-600 text-red-600" : ""}`}
                                            />
                                        </div>
                                        <div>

                                            <FieldLabel className="text-sm">Primary Contact number <Asterisk className="-mx-1.5 w-3 h-3 text-red-500" /></FieldLabel>
                                            <Input
                                                type="tel"
                                                name="primary_person_contact"
                                                onChange={(e) => handleInputChange(e)}
                                                required
                                                placeholder={errors?.primary_person_contact ? errors.primary_person_contact![0] : "eg.98473xxxx"}
                                                className={` ${errors?.primary_person_contact![0] ? "border border-red-600 text-red-600" : ""}`}
                                            />
                                        </div>
                                        <div>

                                            <FieldLabel className="text-sm">Primary contact email <Asterisk className="-mx-1.5 w-3 h-3 text-red-500" /></FieldLabel>
                                            <Input
                                                type="email"
                                                name="primary_person_email"
                                                onChange={(e) => handleInputChange(e)}
                                                required
                                                placeholder={errors?.primary_person_email ? errors.primary_person_email![0] : "Full name"}
                                                className={` ${errors?.primary_person_email![0] ? "border border-red-600 text-red-600" : ""}`}
                                            />
                                        </div>
                                    </div>

                                    {/* secondary person */}
                                    <div className="grid grid-cols-3 gap-2">
                                        <div>

                                            <FieldLabel className="text-sm">Secondary Contact Name </FieldLabel>
                                            <Input
                                                type="text"
                                                name="secondary_person_name"
                                                onChange={(e) => handleInputChange(e)}
                                                placeholder={"Full name"}

                                            />
                                        </div>
                                        <div>

                                            <FieldLabel className="text-sm">Secondary Contact number </FieldLabel>
                                            <Input
                                                type="tel"
                                                name="secondary_person_contact"
                                                onChange={(e) => handleInputChange(e)}
                                                placeholder={"number"}

                                            />
                                        </div>
                                        <div>

                                            <FieldLabel className="text-sm">Secondary contact email </FieldLabel>
                                            <Input
                                                type="email"
                                                name="secondary_person_email"
                                                onChange={(e) => handleInputChange(e)}

                                                placeholder={"email"}
                                            />
                                        </div>
                                    </div>

                                    {/* Teritiary person */}
                                    <div className="grid grid-cols-3 gap-2">
                                        <div>

                                            <FieldLabel className="text-sm">Tertiary Contact Name </FieldLabel>
                                            <Input
                                                type="text"
                                                name="tertiary_person_name"
                                                onChange={(e) => handleInputChange(e)}
                                                placeholder={"Full name"}
                                            />
                                        </div>
                                        <div>

                                            <FieldLabel className="text-sm">Tertiary Contact number</FieldLabel>
                                            <Input
                                                type="tel"
                                                name="tertiary_person_contact"
                                                onChange={(e) => handleInputChange(e)}
                                                placeholder={"number"}
                                            />
                                        </div>
                                        <div>

                                            <FieldLabel className="text-sm">Tertiary contact email </FieldLabel>
                                            <Input
                                                type="email"
                                                name="tertiary_person_email"
                                                onChange={(e) => handleInputChange(e)}
                                                placeholder={"email"}

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
                                        <label className="text-sm" htmlFor="location">Location</label>
                                        <Input
                                            value={formdata.address_line1 ?? ""}
                                            name="address_line1"
                                            onChange={(e) => handleInputChange(e)}
                                            onKeyDown={(e) => e.stopPropagation()}
                                            placeholder="e.g 123, Mumbai 400001,India"
                                        />
                                    </div>
                                </div>

                            </section>

                        </div>

                        {/* second column */}

                        <div className="col-span-4 grid gap-5">
                            {/* Status */}
                            <section className="border border-gray-300 rounded-sm">
                                <div className="bg-gray-100 text-center py-2">
                                    <h3 className="text-gray-900 font-medium">Status</h3>
                                </div>

                                {/*Status */}
                                <div className="p-3 grid gap-3">
                                    <div>
                                        <label className="text-sm" htmlFor="status">Status</label>
                                        <Select
                                            value={formdata?.status}
                                            name="status"
                                            onValueChange={(value) => {
                                                value === "Quotation sent" ? setDeal(true) : setDeal(false),

                                                    handleSelectChange("status", value)
                                            }}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Status" />
                                            </SelectTrigger>
                                            <SelectContent className="border border-gray-300">
                                                <SelectGroup>
                                                    <SelectLabel>Select</SelectLabel>
                                                    <SelectItem value="Cold">Cold</SelectItem>
                                                    <SelectItem value="Warm">Warm </SelectItem>
                                                    <SelectItem value="Hot">Hot</SelectItem>
                                                    <SelectItem value="Quotation sent">Quotation sent</SelectItem>

                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                </div>
                                {
                                    isDeal ? (
                                        <div className="p-3 grid gap-3">
                                            <Separator />
                                            <div>
                                                <label className="text-sm">Deal </label>

                                                <section className="flex gap-2">
                                                    <div>
                                                        <label className="text-sm" htmlFor="bussiess value">Bussiness value</label>
                                                        <Input onChange={handleInputChange} name="quotation_amount" id="bussiess value" placeholder="₹" type="number" className="" />
                                                    </div>
                                                    <div>
                                                        <label className="text-sm" htmlFor="bussiess value">Steps</label>
                                                        <Select
                                                            name="status"
                                                            onValueChange={(value) => handleSelectChange("quotation_type", value)}
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
                                }

                            </section>

                            {/* Requirements */}
                            <section className="border border-gray-300 rounded-sm grid ">
                                <div className="bg-gray-100 text-center py-2">
                                    <h3 className="text-gray-900 font-medium">Requirements</h3>
                                </div>

                                <div className="p-3 grid gap-5">

                                    {/*Requirements */}
                                    <div className="">
                                        <label className="text-sm" htmlFor="">Required Services</label>
                                        <MultiSelect

                                            onValuesChange={(e) => setFormData((prev) => ({
                                                ...prev,
                                                service_requirements: e
                                            }))}>
                                            <MultiSelectTrigger
                                                className="w-full max-h-20 overflow-y-auto"
                                            >
                                                <MultiSelectValue
                                                    className="flex flex-wrap gap-2"
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
                                        <label className="text-sm" htmlFor="gstno">Client's porblem statment</label>
                                        <Textarea
                                            value={formdata.problem_statement ?? ""}
                                            onChange={(e) => handleTextArea("problem_statement", e.target.value)}
                                            placeholder="porblem statment.."
                                            onKeyDown={(e) => e.stopPropagation()}
                                        />
                                    </div>

                                    <div className="col-span-full">
                                        <label className="text-sm" htmlFor="gstno">Remark</label>
                                        <Textarea
                                            value={formdata.remarks ?? ""}
                                            name="remarks"
                                            onChange={(e) => handleTextArea("remarks", e.target.value)}
                                            placeholder="Remark.."
                                            onKeyDown={(e) => e.stopPropagation()}
                                        />
                                    </div>

                                </div>
                            </section>

                            {/* Follow up's */}
                            <section className="border border-gray-300 rounded-sm">
                                <div className="bg-gray-100 text-center py-2">
                                    <h3 className="text-gray-900 font-medium">Follow up's</h3>
                                </div>

                                {/*Status */}
                                <div className="p-3 grid gap-3">
                                    <div>
                                        <Button
                                            onClick={handleFollowUpAdd}
                                            variant={"outline"} className="w-full"
                                        >
                                            <Plus />Add Follow up's
                                        </Button>
                                    </div>
                                    <div>
                                        {
                                            formdata.follow_ups?.length === 0 ? (
                                                <div>
                                                    <h4 className="text-gray-400 text-center">No follow up......</h4>
                                                </div>
                                            ) : (

                                                formdata.follow_ups?.map((item, index) => (
                                                    <div key={index} className="">
                                                        <div className="mt-2">
                                                            <Input
                                                                value={item.date}
                                                                type="date"
                                                                name="date"
                                                                onChange={(e) => updateFollowUp(item.id, 'date', e.target.value)}
                                                                className="border-b-0 rounded-b-none w-1/2"

                                                            />
                                                            <Textarea
                                                                cols={2}
                                                                value={item.note}
                                                                onChange={(e) => updateFollowUp(item.id, 'note', e.target.value)}
                                                                placeholder="Add your query.."
                                                                className="border-t-0 rounded-tl-none focus:border-0"
                                                                onKeyDown={(e) => e.stopPropagation()}
                                                            />
                                                        </div>
                                                    </div>
                                                ))

                                            )
                                        }
                                    </div>

                                </div>

                            </section>

                        </div>

                    </div>
                    <DialogFooter className=" mt-5">
                        <DialogClose asChild>
                            <Button variant={"default"}>Add</Button>
                        </DialogClose>
                    </DialogFooter>



                </DialogContent >
            </Dialog >

        </div >
    )
}


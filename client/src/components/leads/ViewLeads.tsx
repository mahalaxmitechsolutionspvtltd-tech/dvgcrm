import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";

import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";

import { EyeIcon } from "lucide-react";

import { Badge } from "../ui/badge";
import type { Lead } from "../../lib/types";
import { Separator } from "../ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { formateDate } from "../../lib/formateDate";




interface childProps {
    lead: Lead
}

export default function ViewLeads({ lead }: childProps) {

    return (
        <>
            <div>
                <Dialog>
                    <DialogTrigger asChild>
                        <div className="flex gap-2">
                            <EyeIcon className="my-auto " />View lead
                        </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md border border-gray-300 lg:max-w-4xl">
                        <DialogHeader >
                            <DialogTitle>Lead Details</DialogTitle>
                            <DialogDescription>
                                All the important information about this lead is listed below.
                            </DialogDescription>
                        </DialogHeader>
                        <Separator />
                        <div className=" items-center ">
                            <DialogHeader className=" rounded-md border border-gray-300 p-5 ">
                                <DialogTitle className="text-xl flex justify-between">
                                    <div>
                                        {lead.company_name}
                                        <DialogDescription>{lead.company_type}</DialogDescription>
                                        <DialogDescription className="text-sm font-medium">Applied on: {lead.date}</DialogDescription>
                                    </div>
                                    <div>
                                        <Badge className={` rounded-sm`}>
                                            {lead.status}
                                        </Badge>
                                    </div>
                                </DialogTitle>

                            </DialogHeader>
                            <div className="grid grid-cols-3 p-5">
                                <section className="col-span-1 flex flex-col gap-4">
                                    <div>
                                        <label className="text-gray-600">GST No</label>
                                        <span className=" block">{lead.gst_no ? lead.gst_no : "No data available.."}</span>
                                    </div>
                                    <div>
                                        <label className="text-gray-600">Nature of Business</label>
                                        <span className=" block">{lead.nature_of_business ? lead.nature_of_business : "No data available.."}</span>
                                    </div>
                                    <div>
                                        <label className="text-gray-600">Address</label>
                                        <span className=" block">{lead.address_line1 ? lead.address_line1 : "No data available.."}</span>
                                    </div>
                                </section>
                                <section className="col-span-1 flex flex-col gap-4">
                                    <div>
                                        <label className="text-gray-600">Email</label>
                                        <span className=" block">{lead.primary_person_email}</span>
                                    </div>
                                    <div>
                                        <label className="text-gray-600">Remarks </label>
                                        <span className=" block">{lead.remarks ? lead.remarks : "No data available.."}</span>
                                    </div>
                                    <div>
                                        <label className="text-gray-600">Problem Statement</label>
                                        <span className=" block">{lead.problem_statement ? lead.problem_statement : "No data available.."}</span>
                                    </div>


                                </section>
                                <section className="col-span-1 grid gap-4">

                                    <div>
                                        <label className="text-gray-600">Service Required</label>
                                        <ul className=" block">
                                            {
                                                lead.service_requirements?.map((item, index) => (
                                                    <Badge variant={"destructive"} key={index}>{item}</Badge>
                                                ))
                                            }
                                        </ul>
                                    </div>

                                </section>

                            </div>
                            <div>
                                <DialogDescription>Follow ups</DialogDescription>
                                <div className=" overflow-x-auto">
                                    <Table className="w-full border border-gray-50">
                                        <TableHeader>
                                            <TableRow className=" border-b border-b-gray-200 rounded-md">
                                                <TableHead>Date</TableHead>
                                                <TableHead>Note</TableHead>

                                            </TableRow>
                                        </TableHeader>
                                        <TableBody className=" relative">
                                            {
                                                lead.follow_ups?.length != 0 ? (
                                                    lead.follow_ups?.map((item, index) => (
                                                        <TableRow key={index} className=" border-0">
                                                            <TableCell>{formateDate(item.date)}</TableCell>
                                                            <TableCell>{item.note}</TableCell>

                                                        </TableRow>
                                                    ))
                                                ) : (
                                                    <TableRow className="h-20 text-center w-full">
                                                        <TableCell
                                                            colSpan={3}
                                                            className="h-20 text-center font-medium text-gray-500"
                                                        >
                                                            No Follow ups...
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            }

                                        </TableBody>

                                    </Table>


                                </div>
                            </div>

                        </div>
                        <DialogFooter className="sm:justify-start">
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                    Close
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent >
                </Dialog >
            </div >
        </>
    )
}

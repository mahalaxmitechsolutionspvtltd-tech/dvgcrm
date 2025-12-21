import { useLocation, Link } from "react-router-dom"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "../components/ui/breadcrumb";

import { Separator } from "../components/ui/separator";
import { LeadsTable } from "../components/leads/LeadsTable";
import AddLeads from "../components/leads/AddLeads";
import { useState } from "react";
import { Toaster, toast } from 'sonner'

export default function Leads() {
    const [refreshKey, setRefreshKey] = useState(false);

    const currentPath = useLocation();
    const path = currentPath.pathname.slice(1);


    const handleSuccess = (isSuccess: boolean) => {
        if (isSuccess) {
            setRefreshKey((prev: any) => !prev);
            toast.success("Lead added successfully...")
        }
    }

    return (
        <>
            <div>
                <Toaster className="text-xl" position="top-center" />

                <div>
                    <div className=" md:flex lg:flex xl:flex 2xl:flex justify-between">
                        <Breadcrumb className="my-auto">
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink asChild />
                                    <Link to={"/"} className=" text-blue-400">Dashboard</Link>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink asChild />
                                    <Link to={"#"} className=" text-gray-400">{path}</Link>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>

                        {/* Add Leads btn */}
                        <div className="my-auto">
                            <AddLeads onSuccess={handleSuccess} />
                        </div>
                    </div>
                </div>
                <Separator className="mt-5" />
                <div>
                    <LeadsTable refreshKey={refreshKey} />
                </div>

            </div >

        </>
    )
}



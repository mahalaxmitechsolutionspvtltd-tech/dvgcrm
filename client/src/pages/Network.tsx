
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '../components/ui/breadcrumb';
import { Link, useLocation } from 'react-router-dom';
import AddNetwok from '../components/network/AddNetwok';

import { toast, Toaster } from 'sonner';
import { useState } from 'react';
import { NetworkTable } from '../components/network/NetworkTable';



export default function Networks() {
  const currentPath = useLocation();
  const path = currentPath.pathname.slice(1);

  const [refreshKey, setRefreshKey] = useState(false);

  const handeleError = (msg: string) => {
    toast.error(msg);
  }

  const handleSuccess = (isSuccess: boolean) => {
    if (isSuccess) {
      if (isSuccess) {
        setRefreshKey((prev: any) => !prev);
        toast.success("Network added successfully...")
      }
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
                  <Link to={"#"} className=" text-gray-400 capitalize">{path}</Link>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            {/* Add Leads btn */}
            <div className="my-auto">
              <AddNetwok onSuccess={handleSuccess} errormsg={handeleError} />
            </div>
          </div>
        </div>
        <div>
          {/* Network table/> */}
          <NetworkTable refreshKey={refreshKey} />
        </div>
      </div>
    </>
  )
}

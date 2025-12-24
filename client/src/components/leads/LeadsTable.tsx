
import * as React from "react"
import {
    type ColumnDef,
    type ColumnFiltersState,
    type RowData,

    flexRender,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    type SortingState,
    useReactTable,
    type VisibilityState,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, Copy,Eye, Handshake, MoreHorizontal } from "lucide-react"

import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table"
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu"
import { formateDate } from "../../lib/formateDate"
import ViewLeads from "./ViewLeads"

import EditLead from "./EditLead"
import type { Lead } from "../../lib/types"
import { convertDeal, getLeadsHandler } from "../../apiHandlers/LeadHandler"
import ShowFollowup from "../showFollowup"
import { Skeleton } from "../ui/skeleton"

import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"
import { Spinner } from "../ui/spinner"
import { toast, Toaster } from "sonner"
import { useNavigate } from "react-router-dom"
import Filter from "../ui/Filter"


declare module '@tanstack/react-table' {
    interface ColumnMeta<TData extends RowData, TValue> {
        filterVariant?: 'text' | 'range' | 'select'
        options?: string[];
    }
}
interface childProps {
    refreshKey: boolean;
}

export const companyType = [
    "Properitor",
    "Partnership-deed",
    "Limited Liability Partnership (LLP)",
    "Private Limited (Pvt Ltd)",
    "Public Limited Company (PLC)",
    "Hindu Undivided Family Firm (HUF)",
    "Government Organisation"
]



export function LeadsTable({ refreshKey }: childProps) {

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({});
    const [data, setData] = React.useState<Lead[]>([]);
    const [loader, setLoader] = React.useState<boolean>(false);
    const [open, setOpen] = React.useState<boolean>(false);

    const navigate = useNavigate();


    const columns: ColumnDef<Lead>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    className="rounded-sm border border-gray-400"
                    checked={
                        table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    className="rounded-sm border border-gray-400"
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },

        {
            accessorKey: "date",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Date
                        <ArrowUpDown />
                    </Button>
                )
            },
            cell: ({ row }) => {

                const formatedDate = formateDate(row.getValue("date"));
                return <div className=" capitalize">{formatedDate}</div>
            }
        },
        {
            accessorKey: "company_name",
            header: "Company",
            cell: ({ row }) => (
                <div className=" capitalize">{row.getValue("company_name")}</div>
            )
        },
        {
            accessorKey: "company_type",
            header: "Company Type",
            cell: ({ row }) => (
                <div className=" capitalize">{row.getValue("company_type")}</div>
            ),
            meta: {
                filterVariant: 'select',
                options: companyType
            }
        },

        {
            id: "primary_person_email",
            accessorKey: "primary_person_name",
            header: "Contact 1",
            cell: ({ row }) => {
                const info = row.original;
                return (
                    <div className=" capitalize leading-4">
                        <p>  {info.primary_person_name}</p>
                        <small className="text-gray-900 font-semibold lowercase">{info.primary_person_email}</small>
                    </div>
                )
            }
        },


        {
            accessorKey: "address_line1",
            header: "Location",
            cell: ({ row }) => (
                <div className=" capitalize">{row.getValue("address_line1")}</div>
            )
        },
        {
            accessorKey: "service_requirements",
            header: "Services",
            cell: ({ row }) => (
                <div className=" capitalize">
                    <Tooltip delayDuration={100}>
                        <TooltipTrigger asChild>
                            <Button variant="outline" className="h-7 rounded-sm " >
                                <Eye />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="left" className=" rounded-sm leading-5">
                            {
                                row.original.service_requirements?.map((item, index) => (
                                    <p key={index} className="block"><span>{index + 1}</span>. {item}</p>
                                ))
                            }
                        </TooltipContent>
                    </Tooltip>

                </div>
            ),

        },

        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const Status = row.getValue("status");
                if (Status === "Cold") {

                    return <p className=" font-medium  text-blue-800 ">{Status}</p>

                }
                if (Status === "Hot") {
                    return <p className=" font-medium  text-red-600 ">{Status}</p>

                }
                if (Status === "Warm") {
                    return <p className=" font-medium  text-orange-500 ">{Status}</p>

                }
                if (Status === "Quotation sent" && "Quotation Sent") {
                    return <p className=" font-medium  text-green-600 ">{Status}</p>

                }
                if (Status === "Lead dropped") {
                    return <p className=" font-medium  text-red-900 ">{Status}</p>

                }
            },
            meta: {
                filterVariant: 'select',
                options: ['Cold', 'Hot', 'Warm', 'Quotation sent', 'Lost', 'Lead dropped']
            }
        },

        {
            accessorKey: "follow_ups",
            header: "Follow ups ",
            cell: ({ row }) => {
                return (
                    <div className=" capitalize">
                        <ShowFollowup lead={row.original} />
                    </div>
                )
            }
        },
        {
            id: "actions",
            header: "Deal Status",
            enableHiding: true,
            cell: ({ row }) => {
                const lead = row.original;
                return (
                    <>

                        <div className="flex gap-3">

                            {
                                lead.status === "Quotation sent" ?
                                    (
                                        <AlertDialog open={open}>
                                            <AlertDialogTrigger asChild>
                                                <Button onClick={() => setOpen(true)} className="bg-blue-500 hover:bg-blue-600" size={"sm"}>
                                                    <Handshake className="" />Deal done ?
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent className="border border-gray-300">
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Convert to deal</AlertDialogTitle>
                                                    <AlertDialogDescription>  This will  convert your
                                                        lead  into deal and remove from the existing lead table, onece you convert lead into deal then it will redirected to the deal table</AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel onClick={() => setOpen(false)}>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => handleConverDeal(lead)}>
                                                        {
                                                            loader ? (<Spinner />) : "Convert"
                                                        }
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    ) : (
                                        <Button variant={"outline"} disabled size={"sm"}>
                                            <Handshake className="" /> Pending
                                        </Button>
                                    )
                            }
                        </div>
                    </>
                )
            },

        },

        {
            id: "actions",
            header: "Actions",
            enableHiding: true,
            cell: ({ row }) => {
                const lead = row.original;
                return (
                    <>
                        <div className="flex gap-3">

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant={"outline"} size={"sm"} className=" rounded-sm ">
                                        <MoreHorizontal />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="border transition-all border-gray-300 w-[150px]">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        onClick={() => navigator.clipboard.writeText(lead.primary_person_email ? lead.primary_person_email : "not available")}
                                    >
                                        <Copy /> Copy Emial ID
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}
                                    >
                                        <ViewLeads lead={lead} />
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}
                                    >
                                        <EditLead leads={lead} onSuccess={handleRfresh} />
                                    </DropdownMenuItem>
                                    {/* <DropdownMenuItem onSelect={(e) => e.preventDefault()}>

                                        <Delete />
                                        Delete Lead
                                    </DropdownMenuItem> */}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </>
                )
            }
        },


    ]



    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    const handleGetData = async () => {
        const resp = await getLeadsHandler();
        if (resp.data.success) {
            setData(resp.data.data);
            setLoader(false);
        }
    }
    const handleRfresh = (isSuccess: boolean) => {
        if (isSuccess) {
            handleGetData();
        }
    }

    const handleConverDeal = async (lead: Lead) => {
        setLoader(true);
        const resp = await convertDeal(lead);
        if (resp?.data.success) {
            setLoader(false)
            setOpen(false)
            toast.success('New lead created successfully!', {
                style: {
                    '--normal-bg': 'light-dark(var(--color-green-600), var(--color-green-400))',
                    '--normal-text': 'var(--color-white)',
                    '--normal-border': 'light-dark(var(--color-green-600), var(--color-green-400))'
                } as React.CSSProperties
            })
            navigate("/business");
        }
    }
    React.useEffect(() => {
        setLoader(true);
        handleGetData();
    }, [refreshKey])

    return (
        <div className="w-full">
            <Toaster position="top-center" />
            <div className="flex justify-between py-4">
                <section className="grid grid-cols-4 gap-2">
                    <div>
                        <Filter column={table.getColumn('company_name')!} />
                    </div>
                    <div>
                        <Filter column={table.getColumn('status')!} />
                    </div>
                    <div>
                        <Filter column={table.getColumn('company_type')!} />
                    </div>

                </section>
                <section>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto">
                                Columns <ChevronDown />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="border border-gray-300">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) =>
                                                column.toggleVisibility(!!value)
                                            }
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    )
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </section>
            </div>
            {/* table */}
            <div className="overflow-hidden rounded-md border border-gray-300 overflow-x-auto custom-scrollbar">
                <Table className="">
                    <TableHeader className=" h-14">
                        {
                            table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id} className="border-b border-b-gray-300 ">
                                    {headerGroup.headers.map((header, index) => {
                                        return (
                                            <TableHead key={index} align="center" className="">
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </TableHead>
                                        )
                                    })}
                                </TableRow>
                            ))}
                    </TableHeader>
                    <TableBody >

                        {
                            loader ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <TableRow key={i} className="h-14 border-b text-center border-b-gray-300">
                                        {columns.map((_, index) => (
                                            <TableCell key={index} className=" py-2">
                                                <Skeleton className="h-4 w-full rounded" />
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (

                                table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        row.getValue('status') != "Deal done" ? <TableRow
                                            key={row.id}
                                            data-state={row.getIsSelected() && "selected"}
                                            className="border-b border-b-gray-300 border-r border-r-gray-300 h-14"
                                        >
                                            {row.getVisibleCells().map((cell, index) => (
                                                <TableCell key={index}>
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                                </TableCell>
                                            ))}
                                        </TableRow> : ""
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            align="center"
                                            colSpan={columns.length}
                                            className="h-24"
                                        >
                                            No results.
                                        </TableCell>
                                    </TableRow>
                                )
                            )

                        }
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="text-muted-foreground flex-1 text-sm">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}


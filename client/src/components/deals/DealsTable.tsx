
import * as React from "react"
import {

    flexRender,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    type RowData,
    type ColumnDef,
    type ColumnFiltersState,
    type SortingState,
    type VisibilityState,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
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
import { getDealsHandler } from "../../apiHandlers/DealsHandler"
import { useEffect } from "react"
import { type Deal } from "../../lib/types"
import { formateDate } from "../../lib/formateDate"
import { Badge } from "../ui/badge"
import { Skeleton } from "../ui/skeleton"
import Filter from "../ui/Filter"
import RepeatDeal from "./RepeatDeal"
import { toast, Toaster } from "sonner"
import ViewDeal from "./ViewDeal"
import EditDeals from "./EditDeal"


type DealStage =
    | "Discovery"
    | "Qualification"
    | "Proposal"
    | "Negotiation"
    | "Closed Won"
    | "Closed Lost";



declare module '@tanstack/react-table' {
    interface ColumnMeta<TData extends RowData, TValue> {
        filterVariant?: 'text' | 'range' | 'select'
        options?: string[];
    }
}

interface childProps {
    refreshKey: boolean;
}



export function DealsTable({ refreshKey }: childProps) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const [data, setDeals] = React.useState<Deal[]>([]);
    const [loader, setLoader] = React.useState<boolean>(false);



    const columns: ColumnDef<Deal>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    className="rounded-sm border"
                    checked={

                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    className="rounded-sm border"
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },

        {
            accessorKey: "created_at",
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
                return <div className="lowercase">{formateDate(row.getValue("created_at"))}</div>
            },
        },
        {
            accessorKey: "company_name",
            header: "Company Name",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("company_name")}</div>
            ),
        },
        {
            accessorKey: "contact_name",
            header: "Contact Name",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("contact_name")}</div>
            ),
        },
        {
            accessorKey: "email",
            header: "Email",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("email")}</div>
            ),
        },
        {
            accessorKey: "city",
            header: "Location",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("city")}</div>
            ),
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const Status = row.getValue("status");

                switch (Status) {
                    case "New":
                        return <Badge variant={"secondary"} className="px-5  bg-blue-400 text-white">{Status}</Badge>
                        break;
                    case "Repeat":
                        return <Badge variant={"secondary"} className="px-5  bg-blue-900 text-white">{Status}</Badge>
                        break;
                    case "In Progress":
                        return <Badge variant={"secondary"} className="px-5  bg-yellow-400 text-white">{Status}</Badge>
                        break;
                    case "Won":
                        return <Badge variant={"secondary"} className="px-5  bg-green-500 text-white">{Status}</Badge>
                        break;
                    case "Lost":
                        return <Badge variant={"secondary"} className="px-5  bg-red-400 text-white">{Status}</Badge>
                        break;

                    default:
                        break;
                }
            },
            meta: {
                filterVariant: 'select',
                options: ['New', 'Repeat', 'In Progress', 'Won', 'Lost', 'On Hold', 'Cancelled']
            }
        },
        {
            accessorKey: "deal_stage",
            header: "Stage",
            cell: ({ row }) => {

                const stage = row.original.deal_stage as DealStage | null;

                const DEAL_STAGE_STYLES: Record<DealStage, string> = {
                    Discovery:
                        "bg-blue-600/10 text-blue-600 dark:bg-blue-500/30 dark:text-blue-400",

                    Qualification:
                        "bg-purple-600/10 text-purple-600 dark:bg-purple-400/30 dark:text-purple-400",

                    Proposal:
                        "bg-amber-600/10 text-amber-600 dark:bg-amber-400/30 dark:text-amber-400",

                    Negotiation:
                        "bg-orange-600/10 text-orange-600 dark:bg-orange-400/30 dark:text-orange-400",

                    "Closed Won":
                        "bg-green-600/10 text-green-900 dark:bg-green-400/30 dark:text-green-400",

                    "Closed Lost":
                        "bg-red-600/10 text-red-900 font-medium dark:bg-red-500/20 dark:text-red-400",
                };


                const stageStyle =
                    stage && DEAL_STAGE_STYLES[stage]
                        ? DEAL_STAGE_STYLES[stage]
                        : "bg-gray-500/10 text-gray-500";


                return <Badge className={`${stageStyle}`}>{stage}</Badge>
              
            },
            meta: {
                filterVariant: 'select',
                options: ['Discovery', 'Qualification', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost']
            }
        },
        {
            accessorKey: "quotation_type",
            header: "Deal Type",
            cell: ({ row }) => (
                <div className="capitalize text-orange-700">{row.getValue("quotation_type")}</div>
            ),
        },

        {
            accessorKey: "deal_amount",
            header: () => <div className="text-right">Amount</div>,
            cell: ({ row }) => {
                const amount = parseFloat(row.getValue("deal_amount"))

                // Format the amount as a dollar amount
                const formatted = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "INR",
                }).format(amount)

                return <div className="text-right font-medium text-blue-500">{formatted}</div>
            },
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const deal = row.original;

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild >
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="border border-gray-300">

                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                <ViewDeal deal={deal} />
                            </DropdownMenuItem>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                <EditDeals deal={deal} onSuccess={handleEditSuccessFully} />
                            </DropdownMenuItem>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                <RepeatDeal deal={deal} onSuccess={handleSuccess} />
                            </DropdownMenuItem>


                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        }]

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

    const handleEditSuccessFully = (isSuccess: boolean) => {
        if (isSuccess) {
            handleGetallDeals()
            toast.success('Deal updated successfully!', {
                style: {
                    '--normal-bg': 'light-dark(var(--color-green-600), var(--color-green-400))',
                    '--normal-text': 'var(--color-white)',
                    '--normal-border': 'light-dark(var(--color-green-600), var(--color-green-400))'
                } as React.CSSProperties
            })
        }
    }


    const handleSuccess = (isSuccess: boolean) => {
        if (isSuccess) {
            handleGetallDeals()
            toast.success('Repeat deal created successfully!', {
                style: {
                    '--normal-bg': 'light-dark(var(--color-green-600), var(--color-green-400))',
                    '--normal-text': 'var(--color-white)',
                    '--normal-border': 'light-dark(var(--color-green-600), var(--color-green-400))'
                } as React.CSSProperties
            })
        }
    }

    const handleGetallDeals = async () => {
        const resp = await getDealsHandler();
        if (resp.data.success) {
            setDeals(resp.data.data)
            setLoader(false)
        }
    }

    useEffect(() => {
        setLoader(true);
        handleGetallDeals();
    }, [refreshKey])

    return (
        <div className="w-full">
            <Toaster position="top-center" />
            {/* table header */}
            <div className="flex justify-between py-4">
                <section className="grid grid-cols-3 gap-2">
                    <div>
                        <Filter column={table.getColumn('company_name')!} />
                    </div>
                    <div>
                        <Filter column={table.getColumn('status')!} />
                    </div>
                    <div>
                        <Filter column={table.getColumn('deal_stage')!} />
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
            <div className=" overflow-hidden rounded-md border border-gray-300">
                <Table >
                    <TableHeader className="border-b ">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}
                                className="border-b border-b-gray-300"
                            >
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
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
                            ) : (table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                        className="border-b border-b-gray-300"

                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}


                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        No results.
                                    </TableCell>
                                </TableRow>
                            ))

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



"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "../../components/ui/button"
import { Calendar } from "../../components/ui/calendar"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../../components/ui/popover"
import { cn } from "../../lib/utils"


type CalenderProps = {
    label?: string
    value?: Date
    onChange?: (date: Date | undefined) => void
    onClick?: () => void
    className?: string              // 👈 custom button classes
    wrapperClassName?: string
}

export function DatePicker({  value,  onClick, wrapperClassName }: CalenderProps) {
    const [open, setOpen] = React.useState(false)
    const [date, setDate] = React.useState<Date | undefined>(undefined)
    
    
    return (
        <div className={cn("flex flex-col gap-2", wrapperClassName)}>
            < Popover open={open} onOpenChange={setOpen} >
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        id="date"
                        onClick={onClick}
                        className="w-48 justify-between font-normal rounded-none"
                    >
                        {date ? date.toLocaleDateString() : "Select date"}
                        <ChevronDownIcon />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto rounde-none overflow-hidden p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={value}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                            setDate(date)
                            setOpen(false)
                        }}
                    />
                </PopoverContent>
            </Popover >
        </div >
    )
}

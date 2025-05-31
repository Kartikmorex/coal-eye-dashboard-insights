
import { useState } from "react";
import { CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface TimeRangePickerProps {
  onTimeRangeChange: (timeRange: string, startDate?: Date, endDate?: Date) => void;
  className?: string;
}

const TimeRangePicker = ({ onTimeRangeChange, className }: TimeRangePickerProps) => {
  const [selectedRange, setSelectedRange] = useState("24h");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [startTime, setStartTime] = useState("00:00");
  const [endTime, setEndTime] = useState("23:59");
  const [isCustomRange, setIsCustomRange] = useState(false);

  const presetRanges = [
    { value: "1h", label: "Last 1 Hour" },
    { value: "6h", label: "Last 6 Hours" },
    { value: "24h", label: "Last 24 Hours" },
    { value: "7d", label: "Last 7 Days" },
    { value: "30d", label: "Last 30 Days" },
    { value: "custom", label: "Custom Range" }
  ];

  const handleRangeChange = (value: string) => {
    setSelectedRange(value);
    setIsCustomRange(value === "custom");
    if (value !== "custom") {
      onTimeRangeChange(value);
    }
  };

  const handleCustomRangeApply = () => {
    if (startDate && endDate) {
      // Combine date and time
      const startDateTime = new Date(startDate);
      const endDateTime = new Date(endDate);
      
      const [startHour, startMinute] = startTime.split(':').map(Number);
      const [endHour, endMinute] = endTime.split(':').map(Number);
      
      startDateTime.setHours(startHour, startMinute);
      endDateTime.setHours(endHour, endMinute);
      
      onTimeRangeChange("custom", startDateTime, endDateTime);
    }
  };

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Clock className="h-4 w-4 text-muted-foreground" />
      <Select value={selectedRange} onValueChange={handleRangeChange}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Select time range" />
        </SelectTrigger>
        <SelectContent>
          {presetRanges.map((range) => (
            <SelectItem key={range.value} value={range.value}>
              {range.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {isCustomRange && (
        <div className="flex items-center space-x-2">
          <div className="flex flex-col space-y-2">
            <label className="text-xs text-muted-foreground">Start Date & Time</label>
            <div className="flex space-x-1">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-[120px] justify-start text-left font-normal",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "MMM dd") : "Start"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              <Input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-20"
              />
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-xs text-muted-foreground">End Date & Time</label>
            <div className="flex space-x-1">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-[120px] justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "MMM dd") : "End"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              <Input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-20"
              />
            </div>
          </div>

          <Button onClick={handleCustomRangeApply} size="sm" className="mt-6">
            Apply
          </Button>
        </div>
      )}
    </div>
  );
};

export default TimeRangePicker;

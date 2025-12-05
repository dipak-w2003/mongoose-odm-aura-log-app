import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateTimePickerProps {
  value?: Date;
  onChange?: (date: Date) => void;
  showTime?: boolean;
  dateFormat?: string;
  className?: string;
  calendarClassName?: string;
}

export default function DateTimePicker({
  value,
  onChange,
  showTime = true,
  dateFormat = "PPpp",
  className = "",
}: DateTimePickerProps) {
  const [selected, setSelected] = useState<Date>(value || new Date());

  const handleChange = (date: Date | null) => {
    if (!date) return;
    setSelected(date);
    onChange?.(date);
  };

  return (
    <DatePicker
      selected={selected}
      onChange={handleChange}
      showTimeSelect={showTime}
      timeIntervals={1}
      dateFormat={dateFormat}
      className={`w-full text-white px-3 py-3 rounded-md border-none 
                  focus:outline-none shadow-sm ${className}
                  bg-white/20 text-white placeholder:text-white/60 px-3 py-3
                border border-white/20`}
      calendarClassName={`
  bg-gray-800
  text-gray-100
  rounded-xl
  shadow-2xl
  border border-gray-700
  !p-2
  focus:outline-none
  [&_.react-datepicker__day--selected]:bg-teal-500
  [&_.react-datepicker__day--keyboard-selected]:bg-teal-600
  [&_.react-datepicker__navigation-icon::before]:border-white
  [&_.react-datepicker__header]:bg-gray-900
  [&_.react-datepicker__current-month]:text-gray-200
  [&_.react-datepicker__day]:hover:bg-gray-700
  [&_.react-datepicker__day--today]:text-teal-400
  transition-colors
`}
      popperClassName="z-50"
    />
  );
}

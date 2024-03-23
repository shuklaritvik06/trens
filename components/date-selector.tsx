import React, { useState } from "react";

const DateRangeSelector = ({
  defaultStartDate,
  defaultEndDate,
  onChange,
}: {
  defaultStartDate: string;
  defaultEndDate: string;
  onChange: (startDate: string, endDate: string) => void;
}) => {
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
    onChange(e.target.value, endDate);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
    onChange(startDate, e.target.value);
  };

  return (
    <div className="flex items-center space-x-4">
      <label htmlFor="start_date" className="text-gray-600">
        Start Date:
      </label>
      <input
        type="date"
        id="start_date"
        value={startDate}
        onChange={handleStartDateChange}
        className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500"
      />
      <label htmlFor="end_date" className="text-gray-600">
        End Date:
      </label>
      <input
        type="date"
        id="end_date"
        value={endDate}
        onChange={handleEndDateChange}
        className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500"
      />
    </div>
  );
};

export default DateRangeSelector;

"use client";

import { useState } from "react";

interface FilterBarProps {
  propertyTypes: string[];
  years: string[];
  onFilter: (propertyType: string | null, year: string | null) => void;
}
const FilterBar = ({ propertyTypes, years, onFilter }: FilterBarProps) => {
  const [selectedPropertyType, setSelectedPropertyType] = useState<
    string | null
  >(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  const handlePropertyTypeChange = (type: string | null) => {
    setSelectedPropertyType(type);
    onFilter(type, selectedYear);
  };

  const handleYearChange = (year: string | null) => {
    setSelectedYear(year);
    onFilter(selectedPropertyType, year);
  };

  const clearFilters = () => {
    setSelectedPropertyType(null);
    setSelectedYear(null);
    onFilter(null, null);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex-1">
          <p className="block text-sm font-bold text-gray-700 mb-1">
            Property Type
          </p>
          <div className="flex flex-wrap gap-2">
            {propertyTypes.map((type) => (
              <button
                key={type}
                onClick={() =>
                  handlePropertyTypeChange(
                    selectedPropertyType === type ? null : type
                  )
                }
                className={`px-3 py-1 text-sm rounded-full ${
                  selectedPropertyType === type
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1">
          <p className="block text-sm font-bold text-gray-700 mb-1">Year</p>
          <div className="flex flex-wrap gap-2">
            {years.map((year) => (
              <button
                key={year}
                onClick={() =>
                  handleYearChange(selectedYear === year ? null : year)
                }
                className={`px-3 py-1 text-sm rounded-full ${
                  selectedYear === year
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        {(selectedPropertyType || selectedYear) && (
          <button
            onClick={clearFilters}
            className="px-4 py-2 text-sm text-green-600 hover:text-green-800 hover:underline mt-2 md:mt-0"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterBar;

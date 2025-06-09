"use client";

import ExperienceList from "@/components/ExperienceList";
import FilterBar from "@/components/FilterBar";
import { Experience } from "@/types/types";
import { useState, useEffect } from "react";
import hospitalityData from "@/data/hospitality_assignment_data.json";

export default function Home() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [filteredExperiences, setFilteredExperiences] = useState<Experience[]>(
    []
  );
  const [propertyTypes, setPropertyTypes] = useState<string[]>([]);
  const [years, setYears] = useState<string[]>([]);

  useEffect(() => {
    //loading data from JSON file
    setExperiences(hospitalityData as Experience[]);
    setFilteredExperiences(hospitalityData as Experience[]);

    // extracting unique property types and years from the data
    const types = Array.from(
      new Set(hospitalityData.map((exp) => exp.propertyType))
    );
    setPropertyTypes(types);

    const allYears = Array.from(
      new Set(hospitalityData.map((exp) => exp.duration))
    );
    setYears(allYears);
  }, []);

  const handleFilter = (propertyType: string | null, year: string | null) => {
    let filtered = [...experiences];

    if (propertyType) {
      filtered = filtered.filter((exp) => exp.propertyType === propertyType);
    }

    if (year) {
      filtered = filtered.filter((exp) => exp.duration === year);
    }

    setFilteredExperiences(filtered);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-green-800 mb-2">
          Hospitality Experience Explorer
        </h1>
        <p className="text-gray-600 mb-4">
          Browse through professional experiences and projects in the
          hospitality industry
        </p>
        <p className="text-gray-600 mb-8 font-bold">Part 2</p>

        <FilterBar
          propertyTypes={propertyTypes}
          years={years}
          onFilter={handleFilter}
        />

        <ExperienceList experiences={filteredExperiences} />
      </div>
    </main>
  );
}

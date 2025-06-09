"use client"

import { useState } from "react"
import { MapPin, Award, Building, ArrowBigDown } from "lucide-react"
import { Experience } from "@/types/types"
import ProjectCard from "./ProjectCard"

interface ExperienceCardProps {
  experience: Experience
}

const ExperienceCard = ({ experience }: ExperienceCardProps) => {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-bold text-gray-800">{experience.property}</h2>
                {experience.isFlagship && (
                  <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full flex items-center">
                    <Award className="w-3 h-3 mr-1" />
                    Flagship
                  </span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600">
                <span className="flex items-center">
                  <Building className="w-4 h-4 mr-1" />
                  <span className="capitalize">{experience.propertyType}</span>
                </span>
                <span className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {experience.location}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-start md:items-end">
              <span className="text-gray-500 text-sm">{experience.duration}</span>
              <span className="font-bold text-green-600">{experience.role}</span>
            </div>
          </div>
  
          <div className="mt-4">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-green-600 hover:text-green-800 text-sm font-bold flex items-center"
            >
              {isExpanded ? "Hide" : "Show"} {experience.projects.length} project
              {experience.projects.length !== 1 ? "s" : ""}
              {isExpanded ? (<ArrowBigDown className="ml-1 w-4 h-4 rotate-180" />) : (
                <ArrowBigDown className="ml-1 w-4 h-4 " />
              )}
            </button>
          </div>
  
          {isExpanded && (
            <div className="mt-4 space-y-4">
              {experience.projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }
  

export default ExperienceCard
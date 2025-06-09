"use client"

import { useState } from "react"

import { Calendar, BarChart2, Users, ChevronDown, ChevronUp, Star, File } from "lucide-react"
import Image from "next/image"
import { Project } from "@/types/types"

interface ProjectCardProps {
  project: Project
}

const ProjectCard = ({ project }: ProjectCardProps) => {
    const [showDetails, setShowDetails] = useState(false)

    // Calculatimg average feedback rating
    // If guestFeedback is not present or empty, avgFeedback will be null
    const avgFeedback =
      project.guestFeedback && project.guestFeedback.length > 0
        ? (project.guestFeedback.reduce((sum, rating) => sum + rating, 0) / project.guestFeedback.length).toFixed(1)
        : null
  
    return (
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="p-4 bg-gray-50">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-gray-800">{project.title}</h3>
              <p className="text-gray-600 text-sm mt-1">{project.overview}</p>
            </div>
            {avgFeedback && (
              <div className="flex items-center bg-green-50 px-2 py-1 rounded text-sm">
                <Star className="w-4 h-4 text-amber-500 mr-1 fill-amber-500" />
                <span className="font-bold text-black">Average rating: {avgFeedback}</span>
              </div>
            )}
          </div>
  
          <div className="flex flex-wrap gap-2 mt-3">
            {project.tools &&
              project.tools.map((tool, index) => (
                <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                  {tool}
                </span>
              ))}
          </div>
  
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="mt-3 text-green-600 hover:text-green-800 text-sm font-bold flex items-center"
          >
            {showDetails ? "Hide details" : "Show details"}
            {showDetails ? <ChevronUp className="ml-1 w-4 h-4" /> : <ChevronDown className="ml-1 w-4 h-4" />}
          </button>
        </div>
  
        {showDetails && (
          <div className="p-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left colmn */}
              <div>
                {/* Launch Date */}
                {project.launchDate && (
                  <div className="mb-4">
                    <div className="flex items-center text-gray-700 mb-2">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="font-bold">Launch Date</span>
                    </div>
                    <p className="text-sm text-gray-600 ml-6">{new Date(project.launchDate).toLocaleDateString()}</p>
                  </div>
                )}
  
                {/* Metrics */}
                {project.metrics && Object.keys(project.metrics).length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center text-gray-700 mb-2">
                      <BarChart2 className="w-4 h-4 mr-2" />
                      <span className="font-bold">Metrics</span>
                    </div>
                    <div className="ml-6 space-y-1">
                      {Object.entries(project.metrics).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-sm">
                          <span className="text-gray-600">
                            {key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/_/g, " ")
                              .replace(/^./, (str) => str.toUpperCase())}
                          </span>
                          <span className="font-bold text-black">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
  
                {/* Team Members */}
                {project.team && project.team.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center text-gray-700 mb-2">
                      <Users className="w-4 h-4 mr-2" />
                      <span className="font-bold">Team</span>
                    </div>
                    <div className="ml-6 space-y-2">
                      {project.team.map((member, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-green-600 font-bold text-sm">
                            {member.name.charAt(0)}
                          </div>
                          <div className="ml-2">
                            <p className="text-sm font-bold text-black">{member.name}</p>
                            <p className="text-xs text-gray-600">
                              {member.role}
                              {member.lead && " (Lead)"}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
  
              {/* Right column */}
              <div>
                {/* Initiatives */}
                {project.initiatives && project.initiatives.length > 0 && (
                  <div className="mb-4">
                    <h4 className=" text-gray-700 mb-2 font-bold">Key Initiatives</h4>
                    <div className="space-y-2">
                      {project.initiatives.map((initiative, index) => (
                        <div key={index} className="bg-gray-50 p-3 rounded">
                          <p className="text-sm text-green-800 font-bold">{initiative.name}</p>
                          <p className="text-sm text-green-600">{initiative.result}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
  
                {/* Modules */}
                {project.modules && Object.keys(project.modules).length > 0 && (
                  <div className="mb-4">
                    <h4 className=" text-gray-700 mb-2 font-bold">Modules</h4>
                    <div className="space-y-3">
                      {Object.entries(project.modules).map(([key, module]) => (
                        <div key={key} className="bg-gray-50 p-3 rounded">
                          <p className="text-sm capitalize text-black font-bold">{key}</p>
                          <p className="text-sm text-gray-600 mt-1">{module.summary}</p>
                          {module.tags && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {module.tags.map((tag, i) => (
                                <span key={i} className="bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
  
            {/* Project Image */}
            {project.imageUrl && (
              <div className="mt-4">
                <div className="relative h-48 w-full rounded-md overflow-hidden">
                  <Image
                    src={project.imageUrl}
                    alt={project.title+" image loading failed!"}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}
  
            {/* Document Links */}
            {project.documentLinks && project.documentLinks.length > 0 && (
              <div className="mt-4">
                <h4 className="font-bold text-gray-700 mb-2">Documents</h4>
                <div className="space-y-1">
                  {project.documentLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:underline text-sm flex items-center"
                    >
                      <File className="w-4 h-4 mr-1" />
                      Document {index + 1}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
  

export default ProjectCard
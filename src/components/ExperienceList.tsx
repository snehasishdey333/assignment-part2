import { Experience } from "@/types/types";
import ExperienceCard from "./ExperienceCard";

interface ExperienceListProps {
  experiences: Experience[];
}

const ExperienceList = ({ experiences }: ExperienceListProps) => {
  if (experiences.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">
          There is no property matching your filter
        </p>
        <p className="text-gray-400">Search using other filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8">
      {experiences.map((experience) => (
        <ExperienceCard key={experience.id} experience={experience} />
      ))}
    </div>
  );
};

export default ExperienceList;

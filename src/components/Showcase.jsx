import { ProjectCard } from '@/components/ProjectCard'
import { projects } from '@/app/projects/page'

export function Showcase() {
  return (
    <div className="grid grid-cols-2 gap-8 gap-y-10">
      {projects.map((project) => {
        return (
          <ProjectCard
            key={project.title}
            title={project.title}
            description={project.description}
            status={project.status}
            images={project.images}
            githubLink={project.githubLink}
            liveLink={project.liveLink}
          />
        )
      })}
    </div>
  )
}

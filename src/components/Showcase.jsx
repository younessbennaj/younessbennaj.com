import { ProjectCard } from '@/components/ProjectCard'
import { projects } from '@/app/projects/page'

export function Showcase() {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-6">
      {projects.map((project) => {
        return (
          <ProjectCard
            key={project.title}
            title={project.title}
            description={project.description}
            status={project.status}
            image={project.image}
            // href={`/projects/${project.slug}`}
            href={project.githubLink}
          />
        )
      })}
    </div>
  )
}

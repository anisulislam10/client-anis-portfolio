import { useParams } from 'react-router-dom';
import { projects } from '../data/projects';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/common/Button';

const ProjectDetails = () => {
  const { id } = useParams();
  const project = projects.find(p => p.id === parseInt(id));

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <>
      <Header />
      <main className="pt-32 pb-20 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">{project.title}</h1>
            
            <div className="mb-8 h-64 bg-gray-300 rounded-lg flex items-center justify-center">
              {/* Replace with project image */}
              <span className="text-primary">Project Image</span>
            </div>
            
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Project Description</h2>
              <p className="text-lg">{project.description}</p>
            </div>
            
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Technologies Used</h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span key={tech} className="bg-accent text-primary px-3 py-1 rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex gap-4">
              {project.githubLink && (
                <Button href={project.githubLink} text="View on GitHub" target="_blank" />
              )}
              {project.liveLink && (
                <Button href={project.liveLink} text="Live Demo" isSecondary target="_blank" />
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProjectDetails;
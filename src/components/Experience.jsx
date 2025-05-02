import SectionTitle from './common/SectionTitle';
import { experience } from '../data/experience';

const Experience = () => {
  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4">
        <SectionTitle title="My Experience" />
        <div className="space-y-8">
          {experience.map((exp) => (
            <div key={exp.id} className="bg-secondary p-6 rounded-lg shadow-lg">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                <h3 className="text-xl font-semibold text-accent">{exp.role}</h3>
                <div className="text-gray-300">{exp.period}</div>
              </div>
              <h4 className="text-lg font-medium mb-4">{exp.company}</h4>
              <ul className="list-disc pl-5 space-y-2">
                {exp.description.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
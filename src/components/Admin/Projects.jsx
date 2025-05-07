import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    technologies: [],
    featured: false,
    githubUrl: '',
    liveDemoUrl: ''
  });

  const API_BASE = `${import.meta.env.VITE_BASE_URL}project`;

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE}/get`);
      setProjects(response.data.data || response.data || []);
    } catch (error) {
      alert('Failed to fetch projects');
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTechChange = (e) => {
    const techs = e.target.value.split(',').map(t => t.trim());
    setFormData(prev => ({ ...prev, technologies: techs }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      if (editingId) {
        await axios.put(`${API_BASE}/update/${editingId}`, formData);
        alert('Project updated successfully');
      } else {
        await axios.post(`${API_BASE}/post`, formData);
        alert('Project added successfully');
      }

      resetForm();
      fetchProjects();
    } catch (error) {
      alert(error.response?.data?.message || 'Operation failed');
      console.error('Error saving project:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      subtitle: '',
      description: '',
      technologies: [],
      featured: false,
      githubUrl: '',
      liveDemoUrl: ''
    });
    setEditingId(null);
  };

  const handleEdit = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE}/get/${id}`);
      const project = response.data.projects || response.data;

      if (project) {
        setFormData({
          title: project.title,
          subtitle: project.subtitle,
          description: project.description,
          technologies: Array.isArray(project.technologies) ? 
            project.technologies : 
            JSON.parse(project.technologies.replace(/'/g, '"')) || [],
          featured: project.featured || false,
          githubUrl: project.githubUrl || '',
          liveDemoUrl: project.liveDemoUrl || ''
        });
        setEditingId(id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (error) {
      alert('Failed to load project for editing');
      console.error('Error editing project:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        setLoading(true);
        await axios.delete(`${API_BASE}/delete/${id}`);
        alert('Project deleted successfully');
        setProjects(prev => prev.filter(p => p._id !== id));
      } catch (error) {
        alert('Failed to delete project');
        console.error('Delete error:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const toggleFeatured = async (id, featured) => {
    try {
      await axios.patch(`${API_BASE}/update/${id}`, { featured });
      fetchProjects();
    } catch (error) {
      alert('Failed to update featured status');
      console.error('Error updating featured status:', error);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h2>{editingId ? 'Edit Project' : 'Add New Project'}</h2>
      
      <form onSubmit={handleSubmit} style={{ marginBottom: '40px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label>Project Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Project Subtitle</label>
          <input
            type="text"
            name="subtitle"
            value={formData.subtitle}
            onChange={handleInputChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows="4"
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Technologies (comma separated)</label>
          <input
            type="text"
            value={formData.technologies.join(', ')}
            onChange={handleTechChange}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
            />
            Featured Project
          </label>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>GitHub URL</label>
          <input
            type="url"
            name="githubUrl"
            value={formData.githubUrl}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Live Project URL</label>
          <input
            type="url"
            name="liveDemoUrl"
            value={formData.liveDemoUrl}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div>
          <button type="submit" disabled={loading}>
            {loading ? 'Processing...' : editingId ? 'Update Project' : 'Add Project'}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <div style={{ marginTop: '40px' }}>
        <h2>Your Projects</h2>
        {loading ? (
          <p>Loading...</p>
        ) : projects.length === 0 ? (
          <p>No projects found</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #ddd' }}>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Title</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Subtitle</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Technologies</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Featured</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map(project => (
                  <tr key={project._id} style={{ borderBottom: '1px solid #ddd' }}>
                    <td style={{ padding: '12px' }}>{project.title}</td>
                    <td style={{ padding: '12px' }}>{project.subtitle}</td>
                    <td style={{ padding: '12px' }}>
                      {Array.isArray(project.technologies) 
                        ? project.technologies.join(', ') 
                        : project.technologies}
                    </td>
                    <td style={{ padding: '12px' }}>
                      <input
                        type="checkbox"
                        checked={project.featured}
                        onChange={(e) => toggleFeatured(project._id, e.target.checked)}
                      />
                    </td>
                    <td style={{ padding: '12px' }}>
                      <button onClick={() => handleEdit(project._id)}>Edit</button>
                      <button onClick={() => handleDelete(project._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
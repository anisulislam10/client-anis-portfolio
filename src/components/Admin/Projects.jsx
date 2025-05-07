import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Table, Space, Modal, message, Switch } from 'antd';
import { EditOutlined, DeleteOutlined, StarOutlined } from '@ant-design/icons';
import axios from 'axios';

const { TextArea } = Input;
const { confirm } = Modal;

const Projects = () => {
  const [form] = Form.useForm();
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_BASE = `${import.meta.env.VITE_BASE_URL}project`;

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE}/get`);
      const projectsData = response.data.data || response.data || [];
      setProjects(projectsData);
    } catch (error) {
      message.error('Failed to fetch projects');
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => a.title.localeCompare(b.title)
    },
    {
      title: 'Subtitle',
      dataIndex: 'subtitle',
      key: 'subtitle'
    },
    {
      title: 'Technologies',
      dataIndex: 'technologies',
      key: 'technologies',
      render: (techs) => (Array.isArray(techs) ? techs.join(', ') : techs)
    },
    {
      title: 'Featured',
      dataIndex: 'featured',
      key: 'featured',
      render: (featured, record) => (
        <Switch
          checked={featured}
          onChange={(checked) => handleToggleFeatured(record._id, checked)}
          checkedChildren={<StarOutlined />}
          unCheckedChildren={<StarOutlined />}
        />
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={() => handleEdit(record._id)}
          />
          <Button 
            type="text" 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => handleDelete(record._id)}
          />
        </Space>
      ),
    },
  ];

  const handleToggleFeatured = async (id, featured) => {
    try {
      await axios.patch(`${API_BASE}/update/${id}`, { featured });
      message.success(`Project ${featured ? 'marked as featured' : 'removed from featured'}`);
      fetchProjects();
    } catch (error) {
      message.error('Failed to update featured status');
      console.error('Error updating featured status:', error);
    }
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      
      const projectData = {
        title: values.title,
        subtitle: values.subtitle,
        description: values.description,
        technologies: values.technologies || [],
        featured: values.featured || false,
        githubUrl: values.githubUrl || '',
        liveDemoUrl: values.liveDemoUrl || ''
      };

      if (editingId) {
        await axios.put(`${API_BASE}/update/${editingId}`, projectData);
        message.success('Project updated successfully');
      } else {
        await axios.post(`${API_BASE}/post`, projectData);
        message.success('Project added successfully');
      }

      resetForm();
      fetchProjects();
    } catch (error) {
      message.error(error.response?.data?.message || 'Operation failed');
      console.error('Error saving project:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    form.resetFields();
    setEditingId(null);
  };

  const handleEdit = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE}/get/${id}`);
      const project = response.data.projects || response.data;

      if (project) {
        form.setFieldsValue({
          ...project,
          technologies: Array.isArray(project.technologies) ? 
            project.technologies : 
            JSON.parse(project.technologies.replace(/'/g, '"')) || []
        });
        setEditingId(id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (error) {
      message.error('Failed to load project for editing');
      console.error('Error editing project:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    confirm({
      title: 'Are you sure you want to delete this project?',
      content: 'This action cannot be undone',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          setLoading(true);
          await axios.delete(`${API_BASE}/delete/${id}`);
          message.success('Project deleted successfully');
          setProjects(prev => prev.filter(p => p._id !== id));
        } catch (error) {
          message.error(error.response?.data?.message || 'Failed to delete project');
          console.error('Delete error:', error);
        } finally {
          setLoading(false);
        }
      }
    });
  };

  return (
    <div style={{ padding: '24px' }}>
      <h2 style={{ marginBottom: '24px' }}>
        {editingId ? 'Edit Project' : 'Add New Project'}
      </h2>
      
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ maxWidth: '800px' }}
      >
        <Form.Item 
          label="Project Title" 
          name="title"
          rules={[{ required: true, message: 'Please enter project title' }]}
        >
          <Input placeholder="Enter project title" />
        </Form.Item>

        <Form.Item 
          label="Project Subtitle" 
          name="subtitle"
          rules={[{ required: true, message: 'Please enter project subtitle' }]}
        >
          <Input placeholder="Enter project subtitle" />
        </Form.Item>

        <Form.Item 
          label="Description" 
          name="description"
          rules={[{ required: true, message: 'Please enter project description' }]}
        >
          <TextArea rows={4} placeholder="Enter project description" />
        </Form.Item>

        <Form.Item 
          label="Technologies" 
          name="technologies"
          rules={[{ required: true, message: 'Please add at least one technology' }]}
        >
          <Select
            mode="tags"
            style={{ width: '100%' }}
            placeholder="Add technologies (press enter to add)"
            tokenSeparators={[',']}
          />
        </Form.Item>

        <Form.Item 
          label="Featured Project" 
          name="featured"
          valuePropName="checked"
        >
          <Switch checkedChildren="Yes" unCheckedChildren="No" />
        </Form.Item>

        <Form.Item 
          label="GitHub URL" 
          name="githubUrl"
          rules={[{ type: 'url', message: 'Please enter a valid URL' }]}
        >
          <Input placeholder="https://github.com/username/project" />
        </Form.Item>

        <Form.Item 
          label="Live Project URL" 
          name="liveDemoUrl"
          rules={[{ type: 'url', message: 'Please enter a valid URL' }]}
        >
          <Input placeholder="https://yourproject.com" />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              size="large"
            >
              {editingId ? 'Update Project' : 'Add Project'}
            </Button>
            {editingId && (
              <Button 
                onClick={resetForm} 
                size="large"
              >
                Cancel
              </Button>
            )}
          </Space>
        </Form.Item>
      </Form>

      <div style={{ marginTop: '40px' }}>
        <h2 style={{ marginBottom: '16px' }}>Your Projects</h2>
        <Table
          columns={columns}
          dataSource={projects}
          rowKey="_id"
          loading={loading}
          pagination={{ 
            pageSize: 5,
            showSizeChanger: false,
            hideOnSinglePage: true
          }}
          locale={{
            emptyText: 'No projects found'
          }}
          bordered
        />
      </div>
    </div>
  );
};

export default Projects;
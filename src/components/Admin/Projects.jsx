import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Upload, Select, Table, Space, Modal, message, Switch } from 'antd';
import { UploadOutlined, EditOutlined, DeleteOutlined, StarOutlined } from '@ant-design/icons';
import axios from 'axios';

const { TextArea } = Input;
const { confirm } = Modal;

const Projects = () => {
  const [form] = Form.useForm();
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);

  // API base URL
  const API_BASE = `${import.meta.env.VITE_BASE_URL}project`;

  // Fetch all projects on component mount
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE}/get`);
      setProjects(response.data);
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
    },
    {
      title: 'Subtitle',
      dataIndex: 'subtitle',
      key: 'subtitle',
    },
    {
      title: 'Technologies',
      dataIndex: 'technologies',
      key: 'technologies',
      render: (techs) => techs?.join(', ') || '-',
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
      ),
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
            disabled={loading}
          />
          <Button 
            type="text" 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => handleDelete(record._id)}
            disabled={loading}
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
      
      const formData = new FormData();
      
      // Append all required fields
      formData.append('title', values.title);
      formData.append('subtitle', values.subtitle);
      formData.append('description', values.description);
      formData.append('technologies', JSON.stringify(values.technologies || []));
      formData.append('featured', values.featured || false);
      formData.append('githubUrl', values.githubUrl);
      formData.append('liveDemoUrl', values.liveDemoUrl);
      
      // Append image file if exists
      if (fileList[0]?.originFileObj) {
        formData.append('image', fileList[0].originFileObj);
      }

      if (editingId) {
        await axios.put(`${API_BASE}/update/${editingId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        message.success('Project updated successfully');
      } else {
        await axios.post(`${API_BASE}/post`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
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
    setFileList([]);
    setEditingId(null);
  };

  const handleEdit = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE}/get/${id}`);
      const project = response.data;
      
      if (project) {
        form.setFieldsValue({
          ...project,
          technologies: project.technologies || [],
          liveDemoUrl: project.liveDemoUrl || ''
        });
        setEditingId(id);
        if (project.imageUrl) {
          setFileList([{
            uid: '-1',
            name: 'current-image',
            status: 'done',
            url: `${import.meta.env.VITE_BASE_URL.replace('/api/v1/', '')}/public${project.imageUrl}`,
          }]);
        }
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
          const response = await axios.delete(`${API_BASE}/delete/${id}`);
          
          if (response.status === 200 || response.status === 204) {
            message.success('Project deleted successfully');
            // Update UI immediately
            setProjects(prevProjects => prevProjects.filter(project => project._id !== id));
          } else {
            throw new Error('Failed to delete project');
          }
        } catch (error) {
          message.error(error.response?.data?.message || 'Failed to delete project');
          console.error('Delete error:', error);
        } finally {
          setLoading(false);
        }
      },
      onCancel: () => {
        console.log('Delete cancelled');
      },
    });
  };

  return (
    <div>
      <h2>{editingId ? 'Edit Project' : 'Add New Project'}</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        disabled={loading}
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
            tokenSeparators={[',', ' ']}
          />
        </Form.Item>
        
        <Form.Item 
          label="Featured Project" 
          name="featured"
          valuePropName="checked"
        >
          <Switch checkedChildren="Yes" unCheckedChildren="No" />
        </Form.Item>
        
        <Form.Item label="Project Image" name="imageUrl" hidden>
          <Input />
        </Form.Item>
        
        <Form.Item label="Project Image">
          <Upload
            name="image"
            listType="picture-card"
            fileList={fileList}
            onChange={({ fileList }) => setFileList(fileList)}
            beforeUpload={() => false}
            maxCount={1}
            accept="image/*"
          >
            {fileList.length >= 1 ? null : (
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
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
            >
              {editingId ? 'Update Project' : 'Add Project'}
            </Button>
            {editingId && (
              <Button onClick={resetForm} disabled={loading}>
                Cancel
              </Button>
            )}
          </Space>
        </Form.Item>
      </Form>

      <div style={{ marginTop: 32 }}>
        <h2>Your Projects</h2>
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
          scroll={{ x: true }}
        />
      </div>
    </div>
  );
};

export default Projects;
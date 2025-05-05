import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Upload, Select, Table, Space, Modal, message } from 'antd';
import { UploadOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';

const { TextArea } = Input;
const { confirm } = Modal;

const Blogs = () => {
  const [form] = Form.useForm();
  const [blogs, setBlogs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([
    'technology',
    'programming',
    'design',
    'business',
    'lifestyle'
  ]);

  // API base URL
  const API_BASE = `${import.meta.env.VITE_BASE_URL}blog`;

  // Fetch all blogs on component mount
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE}/get`);
      setBlogs(response.data);
    } catch (error) {
      message.error('Failed to fetch blogs');
      console.error('Error fetching blogs:', error);
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
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category) => category.charAt(0).toUpperCase() + category.slice(1),
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

  const onFinish = async (values) => {
    try {
      setLoading(true);
      
      const formData = new FormData();
      
      // Append all form values
      formData.append('title', values.title);
      formData.append('subTitle', values.subTitle);
      formData.append('description', values.description);
      formData.append('category', values.category);
      
      // Append image file if exists
      if (fileList[0]?.originFileObj) {
        formData.append('image', fileList[0].originFileObj);
      }

      if (editingId) {
        // Update existing blog
        await axios.put(`${API_BASE}/update/${editingId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        message.success('Blog updated successfully');
      } else {
        // Add new blog
        await axios.post(`${API_BASE}/post`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        message.success('Blog added successfully');
      }

      resetForm();
      fetchBlogs();
    } catch (error) {
      message.error(error.response?.data?.message || 'Operation failed');
      console.error('Error saving blog:', error);
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
      const blog = response.data;
      
      if (blog) {
        form.setFieldsValue({
          title: blog.title,
          subTitle: blog.subTitle,
          description: blog.description,
          category: blog.category
        });
        setEditingId(id);
        if (blog.imageUrl) {
          setFileList([{
            uid: '-1',
            name: 'current-image',
            status: 'done',
            url: `${import.meta.env.VITE_BASE_URL.replace('/api/v1/', '')}/public${blog.imageUrl}`,
          }]);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (error) {
      message.error('Failed to load blog for editing');
      console.error('Error editing blog:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    confirm({
      title: 'Are you sure you want to delete this blog?',
      content: 'This action cannot be undone',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      async onOk() {
        try {
          setLoading(true);
          await axios.delete(`${API_BASE}/delete/${id}`);
          message.success('Blog deleted successfully');
          // Optimistically update the UI
          setBlogs(blogs.filter(blog => blog._id !== id));
        } catch (error) {
          message.error('Failed to delete blog');
          console.error('Error deleting blog:', error);
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const onUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  return (
    <div>
      <h2>{editingId ? 'Edit Blog' : 'Add New Blog'}</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        disabled={loading}
      >
        <Form.Item 
          label="Title" 
          name="title"
          rules={[{ required: true, message: 'Please enter blog title' }]}
        >
          <Input placeholder="Enter blog title" />
        </Form.Item>
        
        <Form.Item 
          label="Sub Title" 
          name="subTitle"
          rules={[{ required: true, message: 'Please enter sub title' }]}
        >
          <Input placeholder="Enter sub title" />
        </Form.Item>
        
        <Form.Item 
          label="Category" 
          name="category"
          rules={[{ required: true, message: 'Please select a category' }]}
        >
          <Select placeholder="Select category">
            {categories.map(category => (
              <Select.Option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        
        <Form.Item label="Featured Image">
          <Upload
            name="image"
            listType="picture-card"
            fileList={fileList}
            onChange={onUploadChange}
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
          label="Description" 
          name="description"
          rules={[{ required: true, message: 'Please enter blog content' }]}
        >
          <TextArea rows={6} placeholder="Enter blog content" />
        </Form.Item>
        
        <Form.Item>
          <Space>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
            >
              {editingId ? 'Update Blog' : 'Publish Blog'}
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
        <h2>Your Blogs</h2>
        <Table 
          columns={columns} 
          dataSource={blogs} 
          rowKey="_id"
          loading={loading}
          pagination={{ 
            pageSize: 5,
            showSizeChanger: false,
            hideOnSinglePage: true
          }}
          locale={{
            emptyText: 'No blogs found'
          }}
          scroll={{ x: true }}
        />
      </div>
    </div>
  );
};

export default Blogs;
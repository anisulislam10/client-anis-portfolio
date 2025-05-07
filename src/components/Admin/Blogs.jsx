import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Editor } from '@tinymce/tinymce-react';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categories] = useState(['Technology', 'Business', 'Design', 'Marketing']);
  const [formData, setFormData] = useState({
    title: '',
    subTitle: '',
    category: '',
    description: ''
  });

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
      setBlogs(response.data || []); 
    } catch (error) {
      alert('Failed to fetch blogs');
      console.error('Error fetching blogs:', error);
      setBlogs([]); 
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditorChange = (content) => {
    setFormData(prev => ({
      ...prev,
      description: content
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      if (editingId) {
        // Update existing blog
        await axios.put(`${API_BASE}/update/${editingId}`, formData);
        alert('Blog updated successfully');
      } else {
        // Add new blog
        await axios.post(`${API_BASE}/post`, formData);
        alert('Blog added successfully');
      }

      resetForm();
      fetchBlogs();
    } catch (error) {
      alert(error.response?.data?.message || 'Operation failed');
      console.error('Error saving blog:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      subTitle: '',
      category: '',
      description: ''
    });
    setEditingId(null);
  };

  const handleEdit = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE}/get/${id}`);
      const blog = response.data;
      
      if (blog) {
        setFormData({
          title: blog.title,
          subTitle: blog.subTitle,
          description: blog.description,
          category: blog.category
        });
        setEditingId(id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (error) {
      alert('Failed to load blog for editing');
      console.error('Error editing blog:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog? This action cannot be undone.')) {
      try {
        setLoading(true);
        const response = await axios.delete(`${API_BASE}/delete/${id}`);
        
        if (response.data && (response.data.success || response.data.deletedCount > 0)) {
          alert('Blog deleted successfully');
          setBlogs(prev => prev.filter(blog => blog._id !== id));
        } else {
          alert(response.data?.message || 'Delete operation failed');
        }
      } catch (error) {
        console.error('Delete error:', error);
        alert('Failed to delete blog');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleFilePicker = (callback, value, meta) => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');

    input.onchange = () => {
      const file = input.files[0];
      const reader = new FileReader();
      
      reader.onload = () => {
        callback(reader.result, { title: file.name });
      };
      
      reader.readAsDataURL(file);
    };

    input.click();
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '20px' }}>{editingId ? 'Edit Blog' : 'Add New Blog'}</h2>
      
      <form onSubmit={handleSubmit} style={{ marginBottom: '40px' }}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            style={{ 
              width: '100%', 
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Sub Title</label>
          <input
            type="text"
            name="subTitle"
            value={formData.subTitle}
            onChange={handleInputChange}
            required
            style={{ 
              width: '100%', 
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
            style={{ 
              width: '100%', 
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              background: 'white'
            }}
          >
            <option value="">Select category</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Description</label>
          <div style={{ border: '1px solid #ddd', borderRadius: '4px' }}>
          <Editor
  apiKey={import.meta.env.VITE_EDITOR_API_KEY}
  value={formData.description}
  onEditorChange={handleEditorChange}
  init={{
    height: 400,
    menubar: false, // Simplified interface
    plugins: [
      'advlist autolink lists link image charmap preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste help wordcount',
      'quickbars' // For better mobile support
    ],
    toolbar: 'undo redo | ' +
      'bold italic underline | alignleft aligncenter alignright | ' +
      'bullist numlist outdent indent | link image media | ' +
      'removeformat help',
    // Image configuration
    image_title: true,
    automatic_uploads: true,
    images_upload_handler: (blobInfo, progress) => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result); // Returns base64 string
      };
      reader.onerror = () => {
        reject('Image upload failed');
      };
      reader.readAsDataURL(blobInfo.blob());
    }),
    // Media configuration
    media_live_embeds: true,
    media_url_resolver: function (data, resolve, reject) {
      // Support YouTube, Vimeo, and local files
      if (/youtube\.com|vimeo\.com/.test(data.url)) {
        resolve({
          html: `<div class="video-container">
            <iframe src="${data.url}" frameborder="0" allowfullscreen></iframe>
          </div>`,
          placeholder: true
        });
      } else if (data.url.startsWith('data:')) {
        // Handle base64 videos (not recommended for large files)
        resolve({
          html: `<video controls><source src="${data.url}" type="video/mp4"></video>`
        });
      } else {
        reject('Only YouTube/Vimeo URLs are supported');
      }
    },
    // File picker for both images and videos
    file_picker_callback: (callback, value, meta) => {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', meta.filetype === 'media' ? 'video/*' : 'image/*');
      
      input.onchange = () => {
        const file = input.files[0];
        const reader = new FileReader();
        
        reader.onload = () => {
          callback(reader.result, { 
            title: file.name,
            alt: file.name 
          });
        };
        
        reader.readAsDataURL(file);
      };
      
      input.click();
    },
    // Mobile-friendly setup
    mobile: {
      menubar: true,
      toolbar: [
        'undo redo | bold italic underline',
        'alignleft aligncenter alignright',
        'bullist numlist outdent indent',
        'link image media'
      ]
    },
    // Content styles
    content_style: `
      body { 
        font-family: Helvetica, Arial, sans-serif; 
        font-size: 14px;
        line-height: 1.4;
        margin: 1rem;
      }
      img { max-width: 100%; height: auto; }
      .video-container {
        position: relative;
        padding-bottom: 56.25%;
        height: 0;
        overflow: hidden;
      }
      .video-container iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    `,
    // Prevent content filtering that might remove images
    valid_elements: '*[*]',
    valid_children: '+body[style]',
    extended_valid_elements: 'img[class|src|border=0|alt|title|width|height|style]'
  }}
/>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              padding: '10px 20px', 
              background: '#1890ff', 
              color: 'white', 
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Processing...' : editingId ? 'Update Blog' : 'Publish Blog'}
          </button>
          {editingId && (
            <button 
              type="button" 
              onClick={resetForm}
              disabled={loading}
              style={{ 
                padding: '10px 20px', 
                background: '#f5f5f5', 
                border: '1px solid #d9d9d9',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div style={{ marginTop: '40px' }}>
        <h2 style={{ marginBottom: '20px' }}>Your Blogs</h2>
        {loading ? (
          <p>Loading...</p>
        ) : blogs.length === 0 ? (
          <p>No blogs found</p>
        ) : (
          <div style={{ overflowX: 'auto', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <table style={{ 
              width: '100%', 
              borderCollapse: 'collapse',
              backgroundColor: 'white'
            }}>
              <thead>
                <tr style={{ 
                  backgroundColor: '#f5f5f5',
                  borderBottom: '1px solid #ddd'
                }}>
                  <th style={{ 
                    padding: '12px 15px', 
                    textAlign: 'left',
                    fontWeight: 'bold'
                  }}>Title</th>
                  <th style={{ 
                    padding: '12px 15px', 
                    textAlign: 'left',
                    fontWeight: 'bold'
                  }}>Subtitle</th>
                  <th style={{ 
                    padding: '12px 15px', 
                    textAlign: 'left',
                    fontWeight: 'bold'
                  }}>Category</th>
                  <th style={{ 
                    padding: '12px 15px', 
                    textAlign: 'left',
                    fontWeight: 'bold'
                  }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map(blog => (
                  <tr key={blog._id} style={{ 
                    borderBottom: '1px solid #ddd',
                    '&:hover': {
                      backgroundColor: '#f9f9f9'
                    }
                  }}>
                    <td style={{ padding: '12px 15px' }}>{blog.title}</td>
                    <td style={{ padding: '12px 15px' }}>{blog.subTitle}</td>
                    <td style={{ padding: '12px 15px' }}>{blog.category}</td>
                    <td style={{ padding: '12px 15px' }}>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button 
                          onClick={() => handleEdit(blog._id)}
                          disabled={loading}
                          style={{ 
                            padding: '5px 10px',
                            background: '#f5f5f5',
                            border: '1px solid #d9d9d9',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(blog._id)}
                          disabled={loading}
                          style={{ 
                            padding: '5px 10px',
                            background: '#ff4d4f',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          Delete
                        </button>
                      </div>
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

export default Blogs;
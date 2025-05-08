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

  const handleEdit = async (slug) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE}/get/${slug}`);
      const blog = response.data;
      
      if (blog) {
        setFormData({
          title: blog.title,
          subTitle: blog.subTitle,
          description: blog.description,
          category: blog.category
        });
        setEditingId(slug);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (error) {
      alert('Failed to load blog for editing');
      console.error('Error editing blog:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug) => {
    if (window.confirm('Are you sure you want to delete this blog? This action cannot be undone.')) {
      try {
        setLoading(true);
        const response = await axios.delete(`${API_BASE}/delete/${slug}`);
        
        if (response.data && (response.data.success || response.data.deletedCount > 0)) {
          alert('Blog deleted successfully');
          setBlogs(prev => prev.filter(blog => blog._id !== slug));
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
    height: 500,
    menubar: 'file edit view insert format tools table help', // Single menubar definition
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount',
      'emoticons quickbars codesample',
      'hr pagebreak nonbreaking toc'
    ],
    toolbar: 'undo redo | formatselect | ' +
      'bold italic underline strikethrough | forecolor backcolor | ' +
      'alignleft aligncenter alignright alignjustify | ' +
      'bullist numlist outdent indent | removeformat | ' +
      'link image media table emoticons codesample | ' +
      'hr pagebreak nonbreaking toc | help',
    
    // Rest of your configuration remains the same...
    image_title: true,
    automatic_uploads: true,
    images_upload_handler: (blobInfo, progress) => new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blobInfo.blob());
    }),
    
    // File picker configuration
    file_picker_types: 'image media',
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
    
    // Media embedding
    media_live_embeds: true,
    media_alt_source: false,
    media_poster: false,
    media_url_resolver: function (data, resolve, reject) {
      // Support for YouTube, Vimeo, etc.
      if (/youtube\.com|youtu\.be|vimeo\.com/.test(data.url)) {
        const embedHtml = `<iframe src="${data.url}" frameborder="0" allowfullscreen></iframe>`;
        resolve({ html: embedHtml });
      } else {
        reject('Unsupported media URL');
      }
    },
    
    // Advanced formatting options
    style_formats: [
      { title: 'Headings', items: [
        { title: 'Heading 1', format: 'h1' },
        { title: 'Heading 2', format: 'h2' },
        { title: 'Heading 3', format: 'h3' },
        { title: 'Heading 4', format: 'h4' },
        { title: 'Heading 5', format: 'h5' },
        { title: 'Heading 6', format: 'h6' }
      ]},
      { title: 'Inline', items: [
        { title: 'Bold', icon: 'bold', format: 'bold' },
        { title: 'Italic', icon: 'italic', format: 'italic' },
        { title: 'Underline', icon: 'underline', format: 'underline' },
        { title: 'Strikethrough', icon: 'strikethrough', format: 'strikethrough' },
        { title: 'Superscript', icon: 'superscript', format: 'superscript' },
        { title: 'Subscript', icon: 'subscript', format: 'subscript' },
        { title: 'Code', icon: 'code', format: 'code' }
      ]},
      { title: 'Blocks', items: [
        { title: 'Paragraph', format: 'p' },
        { title: 'Blockquote', format: 'blockquote' },
        { title: 'Div', format: 'div' },
        { title: 'Pre', format: 'pre' }
      ]},
      { title: 'Alignment', items: [
        { title: 'Left', icon: 'alignleft', format: 'alignleft' },
        { title: 'Center', icon: 'aligncenter', format: 'aligncenter' },
        { title: 'Right', icon: 'alignright', format: 'alignright' },
        { title: 'Justify', icon: 'alignjustify', format: 'alignjustify' }
      ]}
    ],
    
    // Content styles
    content_style: `
      body { 
        font-family: Arial, sans-serif; 
        font-size: 14px;
        line-height: 1.6;
        color: #333;
        margin: 1rem;
      }
      img { max-width: 100%; height: auto; }
      table { border-collapse: collapse; width: 100%; }
      table, th, td { border: 1px solid #ddd; }
      th, td { padding: 8px; text-align: left; }
      blockquote { 
        border-left: 4px solid #ddd;
        padding-left: 1rem;
        color: #777;
        margin-left: 0;
      }
      pre {
        background: #f5f5f5;
        padding: 1rem;
        border-radius: 4px;
        overflow-x: auto;
      }
      .mce-preview-object {
        border: 1px dashed #888;
        background: #f5f5f5;
      }
    `,
    
    // Allow all content
    valid_elements: '*[*]',
    extended_valid_elements: 'img[src|alt|title|width|height|style|class],iframe[src|frameborder|allowfullscreen]',
    allow_conditional_comments: true,
    allow_html_in_named_anchor: true,
    allow_script_urls: true,
    
    // Advanced options
    branding: false,
    elementpath: true,
    resize: true,
    statusbar: true,
    browser_spellcheck: true,
    contextmenu: 'link image table',
    quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote',
    quickbars_insert_toolbar: 'quickimage quicktable',
    toolbar_mode: 'sliding',
    paste_data_images: true
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
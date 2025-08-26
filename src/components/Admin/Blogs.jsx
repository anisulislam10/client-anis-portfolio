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

  const API_BASE = `${import.meta.env.VITE_BASE_URL}blog`;

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
        await axios.put(`${API_BASE}/update/${editingId}`, formData);
        alert('Blog updated successfully');
      } else {
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
                menubar: 'file edit view insert format tools table help',
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount',
                  'emoticons quickbars codesample',
                  'hr pagebreak nonbreaking toc'
                ],
                toolbar:
                  'undo redo | formatselect | ' +
                  'bold italic underline strikethrough | forecolor backcolor | ' +
                  'alignleft aligncenter alignright alignjustify | ' +
                  'bullist numlist outdent indent | removeformat | ' +
                  'link image media table emoticons codesample | ' +
                  'hr pagebreak nonbreaking toc | help',
                image_title: true,
                automatic_uploads: true,
                images_upload_handler: (blobInfo, progress) => new Promise((resolve) => {
                  const reader = new FileReader();
                  reader.onload = () => {
                    resolve(reader.result);
                  };
                  reader.readAsDataURL(blobInfo.blob());
                }),
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
                media_live_embeds: true,
                media_url_resolver: function (data, resolve, reject) {
                  if (/youtube\.com|youtu\.be|vimeo\.com/.test(data.url)) {
                    const embedHtml = `<iframe src="${data.url}" frameborder="0" allowfullscreen></iframe>`;
                    resolve({ html: embedHtml });
                  } else {
                    reject('Unsupported media URL');
                  }
                }
              }}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {editingId ? 'Update Blog' : 'Add Blog'}
        </button>
      </form>

      <h3>All Blogs</h3>
      {loading ? <p>Loading...</p> : (
        blogs.length === 0 ? <p>No blogs found.</p> : (
          blogs.map(blog => (
            <div key={blog._id} style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>
              <h4>{blog.title}</h4>
              <p><strong>Category:</strong> {blog.category}</p>
              <p dangerouslySetInnerHTML={{ __html: blog.description }}></p>
              <button onClick={() => handleEdit(blog._id)} style={{ marginRight: '10px' }}>Edit</button>
              <button onClick={() => handleDelete(blog._id)}>Delete</button>
            </div>
          ))
        )
      )}
    </div>
  );
};

export default Blogs;

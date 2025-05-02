import { useParams } from 'react-router-dom';
import BlogPost from '../components/BlogPost';

const BlogPostPage = () => {
  const { id } = useParams();
  
  // In a real app, you would fetch the blog post data based on the ID
  const post = {
    id: id,
    title: 'Getting Started with React Hooks',
    content: `
      <p>React Hooks have revolutionized how we write React components. They allow you to use state and other React features without writing a class.</p>
      
      <h2>What are Hooks?</h2>
      <p>Hooks are functions that let you "hook into" React state and lifecycle features from function components. They don't work inside classes — they let you use React without classes.</p>
      
      <h2>Basic Hooks</h2>
      <p>Here are the most commonly used built-in Hooks:</p>
      <ul>
        <li><strong>useState</strong>: Returns a stateful value and a function to update it</li>
        <li><strong>useEffect</strong>: Performs side effects in function components</li>
        <li><strong>useContext</strong>: Accepts a context object and returns the current context value</li>
      </ul>
      
      <h2>Example: useState</h2>
      <pre><code>import React, { useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  return (
    &lt;div&gt;
      &lt;p&gt;You clicked {count} times&lt;/p&gt;
      &lt;button onClick={() =&gt; setCount(count + 1)}&gt;
        Click me
      &lt;/button&gt;
    &lt;/div&gt;
  );
}</code></pre>
      
      <p>This example renders a counter. When you click the button, it increments the value.</p>
    `,
    date: 'May 15, 2023',
    readTime: '5 min read',
    category: 'React',
    author: {
      name: 'John Doe',
      avatar: 'https://via.placeholder.com/100',
    },
  };

  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <BlogPost post={post} />
    </div>
  );
};

export default BlogPostPage;
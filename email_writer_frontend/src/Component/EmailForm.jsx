// ./Component/EmailForm.jsx
import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { FaSun, FaMoon } from 'react-icons/fa';

function EmailForm() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark(!isDark);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await axios.post(
        "https://emailreplayer-1.onrender.com/api/email/generate",
        { emailContent, tone }
      );

      if (res.status === 200 && res.data) {
        setGeneratedReply(typeof res.data === 'string' ? res.data : JSON.stringify(res.data, null, 2));
        setError('');
      } else {
        setError("Failed to generate email reply. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Error generating email reply.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: isDark ? '#121212' : '#f8f9fa',
        color: isDark ? '#f8f9fa' : '#212529',
        minHeight: '100vh',
        transition: 'all 0.3s',
      }}
    >
      {/* Header with Toggle */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          padding: '10px 20px',
          backgroundColor: isDark ? '#1f1f1f' : '#e9ecef',
        }}
      >
        <button
          onClick={toggleTheme}
          style={{
            fontSize: '24px',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            color: isDark ? '#f8f9fa' : '#212529',
          }}
          aria-label="Toggle theme"
        >
          {isDark ? <FaSun /> : <FaMoon />}
        </button>
      </div>

      {/* Form Section */}
      <div className="p-4 container">
        <h2 className="mt-3">Email Reply Generator</h2>
        <p>Enter the email content and select a tone to generate a reply.</p>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formEmailContent">
            <Form.Label>Email Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Enter email content..."
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formTone" className="mt-3">
            <Form.Label>Tone</Form.Label>
            <Form.Select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              required
            >
              <option value="">Select tone</option>
              <option value="friendly">Friendly</option>
              <option value="formal">Formal</option>
              <option value="professional">Professional</option>
              <option value="polite">Polite</option>
              <option value="casual">Casual</option>
            </Form.Select>
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="mt-3"
            disabled={!emailContent || loading}
          >
            {loading ? 'Generating...' : 'Generate Reply'}
          </Button>
        </Form>

        {generatedReply && (
          <div className="mt-4 border border-secondary rounded p-3">
            <h5>Generated Reply:</h5>
            <p>{generatedReply}</p>
            <Button
              variant="success"
              onClick={() => setGeneratedReply('')}
            >
              Clear Reply
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigator.clipboard.writeText(generatedReply)}
              className="ms-2"
            >
              Copy to Clipboard
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default EmailForm;

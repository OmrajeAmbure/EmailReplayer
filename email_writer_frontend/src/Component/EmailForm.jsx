// ./Component/EmailForm.jsx
import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

function EmailForm() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const payload = {
      emailContent,
      tone
    };

    try {
      const res = await axios.post("http://localhost:8080/api/email/generate", payload);
      setGeneratedReply(typeof res.data === 'string' ? res.data : JSON.stringify(res.data, null, 2));
      if (res.status === 200) {
        console.log("Email reply generated successfully:", res.data);
        setError('');
      } else {
        setError("Failed to generate email reply. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Error generating email reply.");
    } finally {
      setLoading(false);
      setGeneratedReply(res.data);
    }
  };

  return (
    <div className="p-4 container">
      <h2>Email Reply Generator</h2>
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
          <Form.Control
            as="select"
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
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3" onClick={handleSubmit} disabled={!emailContent || loading}>
          {loading ? 'Generating...' : 'Generate Reply'}
        </Button>
      </Form>
      {
        generatedReply && (
          <div className="mt-4 border border-secondary rounded p-3">
            <h5>Generated Reply:</h5>
            <p>{generatedReply}</p>
            <Button variant="success" onClick={() => setGeneratedReply('')}>Clear Reply</Button>
            <Button variant="copy" onClick={() => navigator.clipboard.writeText(generatedReply)} className="ms-2 btn-outline-secondary">
              Copy to Clipboard
            </Button>
          </div>
        )
      }
    </div>
  );
}

export default EmailForm;

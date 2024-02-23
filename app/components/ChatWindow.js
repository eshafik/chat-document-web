import React, { useState } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Page from './Page';

const ChatWindow = () => {
  const [messages, setMessages] = useState([
    { content: 'Hello!', sender: 'user' },
    { content: 'Hi there!', sender: 'bot' },
  ]);

  const handleMessageSend = () => {
    // Implement message sending logic here
  };

  return (
    <Page title="Chat" className="d-flex flex-column" style={{ height: '100vh' }}>
      <div className="flex-grow-1 overflow-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chat-message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
          >
            {message.content}
          </div>
        ))}
      </div>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Type your question"
          aria-label="Type your question"
          aria-describedby="basic-addon2"
        />
        <Button variant="outline-secondary" id="button-addon2" onClick={handleMessageSend}>
          Send
        </Button>
      </InputGroup>
    </Page>
  );
};

export default ChatWindow;

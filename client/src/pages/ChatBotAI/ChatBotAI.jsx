import React, { useState, useEffect, useRef } from 'react';
import './ChatBotAI.css';
import { postChatBot } from '../../utils/helper';

const ChatBotAI = ({ title = "Trợ lý AI", placeholder = "Nhập tin nhắn..." }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Xin chào! Tôi có thể giúp gì cho bạn?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    const text = inputValue.trim();
    if (!text || isLoading) return;

    setMessages(prev => [...prev, { id: Date.now(), text, sender: 'user' }]);
    setInputValue('');
    setIsLoading(true);

    try {
      const res = await postChatBot({ message: text });

      setMessages(prev => [
        ...prev,
        { id: Date.now() + 1, text: res.reply || "Không có phản hồi", sender: 'bot' }
      ]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { id: Date.now() + 1, text: "Lỗi server", sender: 'bot', isError: true }
      ]);
    }

    setIsLoading(false);
  };

  return (
    <>
      <div className="chatbot-float-button" onClick={() => setIsOpen(!isOpen)}>
        <img className="chatbot-icon" src="/logo/ChatBot.jpg" alt="chatbot" />
      </div>
      {isOpen && (
        <div className="chatbot-modal">
          <div className="chatbot-header">
            <h3>{title}</h3>
            <button onClick={() => setIsOpen(false)}>✕</button>
          </div>

          <div className="chatbot-messages">
            {messages.map(msg => (
              <div key={msg.id} className={`chatbot-message ${msg.sender}`}>
                <div className="message-bubble">{msg.text}</div>
              </div>
            ))}

            {isLoading && (
              <div className="chatbot-message bot">
                <div className="message-bubble">Đang trả lời...</div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input-area">
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder={placeholder}
            />
            <button onClick={sendMessage} disabled={isLoading}>
              Gửi
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBotAI;
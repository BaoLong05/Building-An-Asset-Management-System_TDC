// ChatBotAI.jsx
import React, { useState, useEffect, useRef } from 'react';
import './ChatBotAI.css';

const ChatBotAI = ({ apiUrl = null, title = "Trợ lý AI", placeholder = "Nhập tin nhắn..." }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Thêm tin nhắn chào mừng khi component mount
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: Date.now(),
          text: "Xin chào! Tôi có thể giúp gì cho bạn hôm nay?",
          sender: 'bot',
          timestamp: new Date()
        }
      ]);
    }
  }, []);

  // Tự động cuộn xuống tin nhắn cuối cùng
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus vào input khi modal mở
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Đóng modal khi nhấn phím ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Gọi API (hoặc giả lập nếu không có apiUrl)
  const callChatAPI = async (userMessage) => {
    // Nếu có API URL thật -> gọi fetch
    if (apiUrl) {
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: userMessage }),
        });
        
        if (!response.ok) throw new Error('API response failed');
        
        const data = await response.json();
        // Giả sử API trả về { reply: "..." }
        return data.reply || "Xin lỗi, không nhận được phản hồi hợp lệ.";
      } catch (error) {
        console.error('API Error:', error);
        throw new Error('Không thể kết nối đến máy chủ. Vui lòng thử lại sau.');
      }
    } 
    // Chế độ demo: giả lập phản hồi dựa trên từ khóa
    else {
      await new Promise(resolve => setTimeout(resolve, 800)); // delay giả lập
      const lowerMsg = userMessage.toLowerCase();
      if (lowerMsg.includes('xin chào') || lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
        return "Chào bạn! Rất vui được gặp bạn. Có điều gì tôi có thể hỗ trợ?";
      } else if (lowerMsg.includes('cảm ơn') || lowerMsg.includes('thanks')) {
        return "Không có gì! Nếu cần thêm gì bạn cứ hỏi nhé.";
      } else if (lowerMsg.includes('thời tiết')) {
        return "Tôi chưa được tích hợp dữ liệu thời tiết. Bạn hãy thử tính năng khác nhé!";
      } else {
        return `Cảm ơn bạn đã nhắn: "${userMessage}". Đây là phản hồi tự động từ bot demo. Bạn có thể cấu hình API thật qua prop "apiUrl".`;
      }
    }
  };

  const sendMessage = async () => {
    const trimmedMessage = inputValue.trim();
    if (!trimmedMessage || isLoading) return;

    // Thêm tin nhắn của user
    const userMsgObj = {
      id: Date.now(),
      text: trimmedMessage,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsgObj]);
    setInputValue('');
    setIsLoading(true);

    try {
      const botReply = await callChatAPI(trimmedMessage);
      const botMsgObj = {
        id: Date.now() + 1,
        text: botReply,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsgObj]);
    } catch (error) {
      const errorMsgObj = {
        id: Date.now() + 1,
        text: error.message || "Đã xảy ra lỗi, vui lòng thử lại.",
        sender: 'bot',
        isError: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsgObj]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Logo/Button nổi */}
      <div className="chatbot-float-button" onClick={() => setIsOpen(!isOpen)}>
       <img className="chatbot-icon"  src="/logo/ChatBot.jpg" alt="chatbot" />
      </div>

      {/* Modal Chat */}
      {isOpen && (
        <div className="chatbot-modal">
          <div className="chatbot-header">
            <h3>{title}</h3>
            <button className="chatbot-close-btn" onClick={() => setIsOpen(false)}>
              ✕
            </button>
          </div>
          
          <div className="chatbot-messages">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`chatbot-message ${msg.sender} ${msg.isError ? 'error' : ''}`}
              >
                <div className="message-bubble">
                  {msg.text}
                </div>
                <div className="message-time">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' })}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="chatbot-message bot loading">
                <div className="message-bubble typing-indicator">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="chatbot-input-area">
            <textarea
              ref={inputRef}
              className="chatbot-input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={placeholder}
              rows="1"
              disabled={isLoading}
            />
            <button 
              className="chatbot-send-btn" 
              onClick={sendMessage}
              disabled={isLoading || !inputValue.trim()}
            >
              {isLoading ? '...' : 'Gửi'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBotAI;
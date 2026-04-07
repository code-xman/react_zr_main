import { createOpenAI } from '@ai-sdk/openai';
import {
  CopyOutlined,
  FileSyncOutlined,
  OpenAIOutlined,
  PaperClipOutlined,
  ReloadOutlined,
  SearchOutlined,
  SendOutlined,
  ShareAltOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';
import { generateText, streamText } from 'ai';
import { Button, Input, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import styles from './index.less';

interface Message {
  id: number;
  type: 'user' | 'assistant';
  content: string;
  thinking?: boolean;
  thinkingTime?: number;
  timestamp: Date;
  isStreaming?: boolean;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [enableThinking, setEnableThinking] = useState<boolean>(false);
  const [enableSearch, setEnableSearch] = useState<boolean>(false);
  const [enableStreaming, setEnableStreaming] = useState<boolean>(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Vercel AI SDK
  const zhipu = createOpenAI({
    baseURL: 'https://open.bigmodel.cn/api/paas/v4',
    apiKey: process.env.ZHIPU_API_KEY || '',
  });

  const generateTextZZ = async (prompt: string) => {
    return await generateText({
      model: zhipu.chat('glm-4.7-flash'),
      prompt,
    });
  };

  const streamTextZZ = (prompt: string) => {
    return streamText({
      model: zhipu.chat('glm-4.7-flash'),
      prompt,
    });
  };

  const handleSend = async () => {
    try {
      if (!inputValue.trim()) return;

      // 检查 API Key 是否存在
      if (!process.env.ZHIPU_API_KEY) {
        throw new Error('API Key 未配置');
      }

      const userMessage: Message = {
        id: Date.now(),
        type: 'user',
        content: inputValue,
        timestamp: new Date(),
      };

      const assistantMessageId = userMessage.id + 1;
      const assistantMessage: Message = {
        id: assistantMessageId,
        type: 'assistant',
        content: '',
        timestamp: new Date(),
        isStreaming: true,
      };

      setMessages((prev) => [...prev, userMessage, assistantMessage]);
      setInputValue('');
      setLoading(true);

      if (enableStreaming) {
        const result = streamTextZZ(inputValue);

        let fullText = '';
        const updateStreamingMessage = (content: string) => {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessageId
                ? { ...msg, content }
                : msg
            )
          );
        };

        for await (const chunk of result.textStream) {
          fullText += chunk;
          updateStreamingMessage(fullText);
        }

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessageId
              ? { ...msg, isStreaming: false }
              : msg
          )
        );
      } else {
        const { text } = await generateTextZZ(inputValue);
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessageId
              ? { ...msg, content: text, isStreaming: false }
              : msg
          )
        );
      }
    } catch (error) {
      message.error('发送失败');
      console.log('发送失败', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content).then(() => {
      message.success('已复制到剪贴板');
    });
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.messagesArea}>
        {messages.length === 0 ? (
          <div className={styles.welcomeSection}>
            <div className={styles.welcomeTitle}>
              <span className={styles.welcomeIcon}>
                <OpenAIOutlined />
              </span>
              <h1>今天有什么可以帮到你？</h1>
            </div>
          </div>
        ) : (
          <div className={styles.messagesList}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`${styles.messageItem} ${styles[message.type]}`}
              >
                {message.type === 'assistant' && (
                  <div className={styles.assistantAvatar}>
                    <span className={styles.avatarIcon}>🐋</span>
                  </div>
                )}
                <div className={styles.messageContent}>
                  {message.type === 'assistant' && message.thinking && (
                    <div className={styles.thinkingIndicator}>
                      <ThunderboltOutlined />
                      <span>已思考（用时 {message.thinkingTime} 秒）</span>
                    </div>
                  )}
                  <div className={styles.messageBubble}>
                    {!message.content && <span>思考中...</span>}
                    {message.content.split('\n').map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
                  </div>
                  {message.type === 'assistant' && (
                    <div className={styles.messageActions}>
                      <Button
                        type="text"
                        size="small"
                        icon={<CopyOutlined />}
                        onClick={() => handleCopy(message.content)}
                      />
                      <Button
                        type="text"
                        size="small"
                        icon={<ShareAltOutlined />}
                      />
                      <Button
                        type="text"
                        size="small"
                        icon={<ReloadOutlined />}
                      />
                    </div>
                  )}
                </div>
                {message.type === 'user' && (
                  <div className={styles.userAvatar}>
                    <span className={styles.avatarIcon}>👤</span>
                  </div>
                )}
              </div>
            ))}
            {loading && !messages.some((m) => m.isStreaming) && (
              <div className={`${styles.messageItem} ${styles.assistant}`}>
                <div className={styles.assistantAvatar}>
                  <span className={styles.avatarIcon}>🐋</span>
                </div>
                <div className={styles.messageContent}>
                  <div className={styles.typingIndicator}>
                    <div className={styles.typingDot} />
                    <div className={styles.typingDot} />
                    <div className={styles.typingDot} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <div className={styles.inputArea}>
        <div className={styles.inputWrapper}>
          <Input.TextArea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="给 AI 发送消息"
            className={styles.inputField}
            autoSize={{ minRows: 1, maxRows: 6 }}
          />
          <div className={styles.inputActions}>
            <div className={styles.leftActions}>
              <Button
                type="text"
                variant="filled"
                icon={<ThunderboltOutlined />}
                className={styles.actionButton}
                color={enableThinking ? 'primary' : 'default'}
                onClick={() => setEnableThinking(!enableThinking)}
              >
                深度思考
              </Button>
              <Button
                type="text"
                variant="filled"
                icon={<SearchOutlined />}
                className={styles.actionButton}
                color={enableSearch ? 'primary' : 'default'}
                onClick={() => setEnableSearch(!enableSearch)}
              >
                智能搜索
              </Button>
              <Button
                type="text"
                variant="filled"
                icon={<FileSyncOutlined />}
                className={styles.actionButton}
                color={enableStreaming ? 'primary' : 'default'}
                onClick={() => setEnableStreaming(!enableStreaming)}
              >
                流式输出
              </Button>
            </div>
            <div className={styles.rightActions}>
              <Button
                type="text"
                icon={<PaperClipOutlined />}
                className={styles.iconButton}
              />
              <Button
                type="primary"
                shape="circle"
                icon={<SendOutlined />}
                onClick={() => handleSend()}
                loading={loading}
                disabled={!inputValue.trim()}
                className={styles.sendButton}
              />
            </div>
          </div>
        </div>
        {messages.length > 0 && (
          <div className={styles.disclaimer}>内容由 AI 生成，请仔细甄别</div>
        )}
      </div>
    </div>
  );
};

export default Chat;

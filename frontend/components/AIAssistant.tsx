'use client'

import { useState } from 'react'
import { MessageCircle, Send, Globe, Volume2, VolumeX } from 'lucide-react'
import { useNotification } from '@/contexts/NotificationContext'

interface Message {
  id: string
  type: 'user' | 'assistant'
  text: string
  timestamp: Date
  language?: string
}

const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
]

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      text: 'Hello! I\'m your AI safety assistant. I can help you with emergency information, tourist guidance, and safety tips. How can I assist you today?',
      timestamp: new Date(),
      language: 'en'
    }
  ])
  const [inputText, setInputText] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('en')
  const [isLoading, setIsLoading] = useState(false)
  const [speechEnabled, setSpeechEnabled] = useState(false)
  const { addNotification } = useNotification()

  const sendMessage = async () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: inputText,
      timestamp: new Date(),
      language: selectedLanguage
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsLoading(true)

    try {
      // Simulate AI response
      await new Promise(resolve => setTimeout(resolve, 1500))

      const responses = [
        "I understand your concern. For immediate emergencies, please call local emergency services. I can also help you locate the nearest hospital or police station.",
        "Here are some important safety tips for tourists: Stay in well-lit areas, keep copies of important documents, and always inform someone of your whereabouts.",
        "The current safety status in your area is good. However, please be aware of crowded areas and maintain situational awareness.",
        "I can help you with directions to safe zones, emergency contacts, and real-time safety updates. What specific information do you need?",
        "Based on current data, the area you're asking about has moderate foot traffic. I recommend staying with groups and avoiding isolated areas."
      ]

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        text: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
        language: selectedLanguage
      }

      setMessages(prev => [...prev, assistantMessage])

      if (speechEnabled) {
        speakMessage(assistantMessage.text)
      }

    } catch (error) {
      console.error('Failed to get AI response:', error)
      addNotification('error', 'AI Assistant Error', 'Failed to get response. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const speakMessage = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = selectedLanguage === 'en' ? 'en-US' : 
                      selectedLanguage === 'es' ? 'es-ES' :
                      selectedLanguage === 'fr' ? 'fr-FR' : 'en-US'
      speechSynthesis.speak(utterance)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="card h-96 flex flex-col">
      <div className="card-header">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <MessageCircle className="h-5 w-5 text-primary-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">AI Assistant</h2>
          </div>
          <div className="flex items-center space-x-2">
            {/* Language Selector */}
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="text-xs border border-gray-300 rounded px-2 py-1"
            >
              {SUPPORTED_LANGUAGES.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
            
            {/* Speech Toggle */}
            <button
              onClick={() => setSpeechEnabled(!speechEnabled)}
              className={`p-1 rounded ${
                speechEnabled ? 'text-primary-600' : 'text-gray-400'
              }`}
              title="Toggle speech output"
            >
              {speechEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-3 py-2 rounded-lg text-sm ${
                message.type === 'user'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p>{message.text}</p>
              <p className={`text-xs mt-1 ${
                message.type === 'user' ? 'text-primary-100' : 'text-gray-500'
              }`}>
                {message.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 px-3 py-2 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 pt-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about safety..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !inputText.trim()}
            className="btn-primary p-2 disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 mt-3">
          {[
            'Emergency contacts',
            'Safety tips',
            'Nearby hospitals',
            'Report incident'
          ].map((action) => (
            <button
              key={action}
              onClick={() => setInputText(action)}
              className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded transition-colors"
            >
              {action}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
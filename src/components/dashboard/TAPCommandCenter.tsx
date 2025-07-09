import React, { useState, useEffect, useCallback } from 'react';
import { MicrophoneIcon, SparklesIcon, CogIcon, BoltIcon, TagIcon, UsersIcon, ChartBarIcon, LightBulbIcon } from '@heroicons/react/24/outline';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { TAPConversationEngine, TAPResponse, TAPInsight } from '../../services/tap-conversation-engine';

interface TAPCommandCenterProps {
  onCommand?: (command: string) => Promise<string>;
  isProcessing?: boolean;
}

const TAPCommandCenter: React.FC<TAPCommandCenterProps> = ({ 
  onCommand, 
  isProcessing = false 
}) => {
  const [command, setCommand] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<Array<{
    role: 'user' | 'ai';
    content: string;
    timestamp: Date;
  }>>([]);
  const [insights, setInsights] = useState<TAPInsight[]>([]);
  const [platformAdaptation, setPlatformAdaptation] = useState({
    userPatterns: 0,
    aiAccuracy: 0,
    featureUsage: 0,
    conversionRate: 0
  });

  // T.A.P. Conversation Starter
  const conversationStarters = TAPConversationEngine.getConversationStarters();

  // AI-Powered Insights
  const generateInsights = useCallback(() => {
    const mockInsights: TAPInsight[] = [
      {
        type: 'opportunity',
        title: 'High-Value Lead Detected',
        description: 'Sarah Johnson from TechCorp shows 89% upgrade probability',
        confidence: 0.89,
        action: 'Schedule follow-up call',
        value: 2500,
        trend: 'up'
      },
      {
        type: 'recommendation',
        title: 'Package Optimization',
        description: 'Business Plus users are 3x more likely to convert',
        confidence: 0.92,
        action: 'Promote Business Plus tier',
        trend: 'up'
      },
      {
        type: 'prediction',
        title: 'Revenue Forecast',
        description: 'On track for £250k quarterly target (87% progress)',
        confidence: 0.87,
        value: 217500,
        trend: 'up'
      },
      {
        type: 'alert',
        title: 'User Engagement Drop',
        description: 'ME Profile completion rate down 12% this week',
        confidence: 0.78,
        action: 'Send completion reminders',
        trend: 'down'
      }
    ];
    setInsights(mockInsights);
  }, []);

  // Platform Adaptation Learning
  const updatePlatformAdaptation = useCallback(() => {
    setPlatformAdaptation({
      userPatterns: Math.floor(Math.random() * 30) + 70, // 70-100%
      aiAccuracy: Math.floor(Math.random() * 15) + 85, // 85-100%
      featureUsage: Math.floor(Math.random() * 25) + 75, // 75-100%
      conversionRate: Math.floor(Math.random() * 10) + 20 // 20-30%
    });
  }, []);

  useEffect(() => {
    generateInsights();
    updatePlatformAdaptation();
    
    // Simulate real-time platform learning
    const interval = setInterval(updatePlatformAdaptation, 30000);
    return () => clearInterval(interval);
  }, [generateInsights, updatePlatformAdaptation]);

  // Voice recognition setup
  const startListening = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-GB';
      
      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setCommand(transcript);
        handleCommand(transcript);
      };
      
      recognition.start();
    }
  };

  const handleCommand = async (cmd: string) => {
    if (!cmd.trim()) return;

    // Add user command to conversation history
    const userMessage = {
      role: 'user' as const,
      content: cmd,
      timestamp: new Date()
    };
    setConversationHistory(prev => [...prev, userMessage]);

    // Process command using T.A.P. Conversation Engine
    try {
      const tapResponse = await TAPConversationEngine.processCommand(cmd);
      
      const aiMessage = {
        role: 'ai' as const,
        content: tapResponse.response,
        timestamp: new Date()
      };
      setConversationHistory(prev => [...prev, aiMessage]);

      // Update insights if provided
      if (tapResponse.insights && tapResponse.insights.length > 0) {
        setInsights(tapResponse.insights);
      }

      // Update platform adaptation if provided
      if (tapResponse.platformAdaptation) {
        setPlatformAdaptation(tapResponse.platformAdaptation);
      }

    } catch (error) {
      console.error('T.A.P. Command processing error:', error);
      const aiMessage = {
        role: 'ai' as const,
        content: `I understand you want to "${cmd}". Let me help you with that using T.A.P.'s adaptive intelligence.`,
        timestamp: new Date()
      };
      setConversationHistory(prev => [...prev, aiMessage]);
    }

    setCommand('');
  };

  const getInsightIcon = (type: TAPInsight['type']) => {
    switch (type) {
      case 'opportunity': return <TagIcon className="h-5 w-5 text-green-500" />;
      case 'alert': return <BoltIcon className="h-5 w-5 text-red-500" />;
      case 'recommendation': return <LightBulbIcon className="h-5 w-5 text-blue-500" />;
      case 'prediction': return <ChartBarIcon className="h-5 w-5 text-purple-500" />;
      default: return <SparklesIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getTrendColor = (trend?: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      case 'stable': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* T.A.P. Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <CogIcon className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              T.A.P. Command Center
            </h1>
          </div>
          <p className="text-xl text-gray-600 mb-2">
            Totally Adaptable Platform - AI-First Business Intelligence
          </p>
          <p className="text-sm text-gray-500">
            Your platform learns, adapts, and grows with every interaction
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* AI Command Interface */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <SparklesIcon className="h-6 w-6 mr-2 text-blue-600" />
                  AI Command Interface
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Command Input */}
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleCommand(command)}
                    placeholder="What do you want to TAPinto today?"
                    className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    disabled={isProcessing}
                  />
                  <Button
                    onClick={() => handleCommand(command)}
                    disabled={isProcessing || !command.trim()}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3"
                  >
                    {isProcessing ? 'Processing...' : 'Ask AI'}
                  </Button>
                  <Button
                    onClick={startListening}
                    disabled={isProcessing}
                    variant="outline"
                    className={`px-4 py-3 ${isListening ? 'bg-red-500 text-white' : ''}`}
                  >
                    <MicrophoneIcon className="h-5 w-5" />
                  </Button>
                </div>

                {/* Conversation Starters */}
                <div className="grid grid-cols-2 gap-2">
                  {conversationStarters.map((starter, index) => (
                    <Button
                      key={index}
                      onClick={() => handleCommand(starter)}
                      variant="outline"
                      className="text-left justify-start h-auto py-2 px-3 text-sm"
                      disabled={isProcessing}
                    >
                      {starter}
                    </Button>
                  ))}
                </div>

                {/* Conversation History */}
                {conversationHistory.length > 0 && (
                  <div className="mt-6 space-y-3 max-h-64 overflow-y-auto">
                    {conversationHistory.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.role === 'user'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Platform Intelligence */}
          <div className="space-y-6">
            {/* Platform Adaptation */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <CogIcon className="h-5 w-5 mr-2 text-purple-600" />
                  Platform Adaptation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>User Pattern Recognition</span>
                    <span>{platformAdaptation.userPatterns}%</span>
                  </div>
                  <Progress value={platformAdaptation.userPatterns} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>AI Accuracy</span>
                    <span>{platformAdaptation.aiAccuracy}%</span>
                  </div>
                  <Progress value={platformAdaptation.aiAccuracy} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Feature Usage</span>
                    <span>{platformAdaptation.featureUsage}%</span>
                  </div>
                  <Progress value={platformAdaptation.featureUsage} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Conversion Rate</span>
                    <span>{platformAdaptation.conversionRate}%</span>
                  </div>
                  <Progress value={platformAdaptation.conversionRate} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* AI Insights */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <LightBulbIcon className="h-5 w-5 mr-2 text-yellow-600" />
                  AI Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {insights.map((insight, index) => (
                  <div key={index} className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      {getInsightIcon(insight.type)}
                      <Badge variant="secondary" className="text-xs">
                        {Math.round(insight.confidence * 100)}% confidence
                      </Badge>
                    </div>
                    <h4 className="font-medium text-sm mb-1">{insight.title}</h4>
                    <p className="text-xs text-gray-600 mb-2">{insight.description}</p>
                    {insight.value && (
                      <p className={`text-xs font-medium ${getTrendColor(insight.trend)}`}>
                        £{insight.value.toLocaleString()}
                      </p>
                    )}
                    {insight.action && (
                      <Button size="sm" variant="outline" className="w-full mt-2 text-xs">
                        {insight.action}
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* T.A.P. Vision Statement */}
        <div className="mt-8 text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">
                🚀 Revolutionary AI-First Business Ecosystem
              </h3>
              <p className="text-blue-100">
                T.A.P. (Totally Adaptable Platform) replaces traditional CRM with intelligent, 
                adaptive solutions that grow with your business. Every interaction teaches the 
                platform to serve you better.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TAPCommandCenter; 
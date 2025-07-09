import React from 'react';
import { useAuth } from '@/hooks/useAuth';

const MEProfile: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            My ME Profile®
          </h1>
          <p className="text-gray-600">
            Your professional digital identity - combining LinkedIn, Calendly, Social Media, and more
          </p>
        </div>

        {/* Profile Sections */}
        <div className="grid gap-6">
          {/* Contact Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              📞 Contact Information
              <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                From Package
              </span>
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <p className="text-gray-900">{user?.email || 'Not provided'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <p className="text-gray-900">+44 191 4862605</p>
              </div>
            </div>
            <div className="mt-4">
              <button className="bg-tapinto-blue text-white px-4 py-2 rounded-lg hover:bg-tapinto-blue/90">
                Download vCard
              </button>
            </div>
          </div>

          {/* Bio Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              👤 Bio & Experience
              <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                From Package
              </span>
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <p className="text-gray-900">{user?.name || 'Professional User'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Professional Bio
                </label>
                <p className="text-gray-600">
                  Experienced professional focused on delivering exceptional results and building meaningful connections.
                </p>
              </div>
            </div>
          </div>

          {/* Business Details */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              🏢 Business Details
              <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                From Package
              </span>
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company
                </label>
                <p className="text-gray-900">TAPintoME Ltd</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Industry
                </label>
                <p className="text-gray-900">Technology & Social Impact</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">
              🎯 Let's Connect
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <button className="bg-tapinto-blue text-white px-6 py-3 rounded-lg hover:bg-tapinto-blue/90 transition-colors">
                Book a Meeting
              </button>
              <button className="border border-tapinto-blue text-tapinto-blue px-6 py-3 rounded-lg hover:bg-tapinto-blue hover:text-white transition-colors">
                Send Message
              </button>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">
              🔗 Social & Professional Links
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <a href="#" className="flex items-center justify-center p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-blue-600">LinkedIn</span>
              </a>
              <a href="#" className="flex items-center justify-center p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-green-600">WhatsApp</span>
              </a>
              <a href="#" className="flex items-center justify-center p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-blue-400">Twitter</span>
              </a>
              <a href="#" className="flex items-center justify-center p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-gray-600">Website</span>
              </a>
            </div>
          </div>

          {/* Profile URL */}
          <div className="bg-gradient-to-r from-tapinto-blue to-blue-600 text-white rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">
              🌐 Your ME Profile URL
            </h2>
            <p className="text-blue-100 mb-4">
              Share your professional profile with anyone
            </p>
            <div className="bg-white/10 rounded-lg p-3 font-mono text-sm">
              tapinto.me/{user?.email?.split('@')[0] || 'your-name'}
            </div>
            <button className="mt-3 bg-white text-tapinto-blue px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
              Copy Link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MEProfile;

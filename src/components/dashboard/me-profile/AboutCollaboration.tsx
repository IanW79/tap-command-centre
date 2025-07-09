
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Star, 
  Plus, 
  Save,
  MessageSquare,
  Award,
  Trash2
} from 'lucide-react';

export function AboutCollaboration() {
  const [collaborationData, setCollaborationData] = useState({
    workingStyle: 'I believe in collaborative partnerships where clear communication and mutual respect drive exceptional results. I prefer regular check-ins and transparent progress updates.',
    idealProjects: 'B2B SaaS marketing campaigns, Digital transformation projects, Content strategy development, Growth marketing initiatives',
    communication: 'Slack for daily communication, Weekly video calls for strategy discussions, Email for formal updates and deliverables',
    timeline: 'I typically require 2-3 weeks lead time for new projects and prefer to work on 2-3 major projects simultaneously to ensure quality focus.'
  });

  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      company: 'TechStart Inc.',
      role: 'CEO',
      text: 'John transformed our marketing strategy and delivered a 300% increase in qualified leads within 3 months.',
      rating: 5,
      image: null
    },
    {
      id: 2,
      name: 'Mike Chen',
      company: 'GrowthCorp',
      role: 'Marketing Director',
      text: 'Professional, responsive, and results-driven. John exceeded our expectations and delivered on time.',
      rating: 5,
      image: null
    }
  ]);

  const [projectExamples, setProjectExamples] = useState([
    {
      id: 1,
      title: 'SaaS Product Launch Campaign',
      client: 'TechStart Inc.',
      results: '300% increase in qualified leads, 150% boost in trial signups',
      description: 'Comprehensive marketing strategy including content creation, email campaigns, and paid advertising.',
      image: null
    }
  ]);

  const addTestimonial = () => {
    const newTestimonial = {
      id: Date.now(),
      name: '',
      company: '',
      role: '',
      text: '',
      rating: 5,
      image: null
    };
    setTestimonials([...testimonials, newTestimonial]);
  };

  const addProjectExample = () => {
    const newProject = {
      id: Date.now(),
      title: '',
      client: '',
      results: '',
      description: '',
      image: null
    };
    setProjectExamples([...projectExamples, newProject]);
  };

  const removeTestimonial = (id: number) => {
    setTestimonials(testimonials.filter(t => t.id !== id));
  };

  const removeProject = (id: number) => {
    setProjectExamples(projectExamples.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Working Style & Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-tapinto-blue" />
            How to Work With Me
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Working Style & Approach</label>
            <Textarea
              value={collaborationData.workingStyle}
              onChange={(e) => setCollaborationData({...collaborationData, workingStyle: e.target.value})}
              placeholder="Describe your working style, values, and approach to collaboration..."
              rows={3}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Ideal Projects & Clients</label>
            <Textarea
              value={collaborationData.idealProjects}
              onChange={(e) => setCollaborationData({...collaborationData, idealProjects: e.target.value})}
              placeholder="What types of projects do you excel at? What clients do you work best with?"
              rows={3}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Communication Preferences</label>
            <Textarea
              value={collaborationData.communication}
              onChange={(e) => setCollaborationData({...collaborationData, communication: e.target.value})}
              placeholder="How do you prefer to communicate? What tools do you use?"
              rows={2}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Timeline & Availability</label>
            <Textarea
              value={collaborationData.timeline}
              onChange={(e) => setCollaborationData({...collaborationData, timeline: e.target.value})}
              placeholder="Lead times, project duration, availability..."
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      {/* Project Examples */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Project Examples</CardTitle>
          <Button variant="outline" size="sm" onClick={addProjectExample}>
            <Plus className="w-4 h-4 mr-1" />
            Add Project
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {projectExamples.map((project, index) => (
            <div key={project.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-start justify-between">
                <h4 className="font-medium">Project #{index + 1}</h4>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => removeProject(project.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Project Title</label>
                  <Input
                    value={project.title}
                    onChange={(e) => setProjectExamples(projectExamples.map(p => 
                      p.id === project.id ? {...p, title: e.target.value} : p
                    ))}
                    placeholder="e.g., SaaS Product Launch Campaign"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Client</label>
                  <Input
                    value={project.client}
                    onChange={(e) => setProjectExamples(projectExamples.map(p => 
                      p.id === project.id ? {...p, client: e.target.value} : p
                    ))}
                    placeholder="Client name"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Key Results</label>
                <Input
                  value={project.results}
                  onChange={(e) => setProjectExamples(projectExamples.map(p => 
                    p.id === project.id ? {...p, results: e.target.value} : p
                  ))}
                  placeholder="e.g., 300% increase in leads, 150% boost in sales"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Project Description</label>
                <Textarea
                  value={project.description}
                  onChange={(e) => setProjectExamples(projectExamples.map(p => 
                    p.id === project.id ? {...p, description: e.target.value} : p
                  ))}
                  placeholder="Describe the project scope, your role, and deliverables..."
                  rows={3}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Testimonials & Reviews */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-tapinto-blue" />
            Testimonials & Reviews
          </CardTitle>
          <Button variant="outline" size="sm" onClick={addTestimonial}>
            <Plus className="w-4 h-4 mr-1" />
            Add Testimonial
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-start justify-between">
                <h4 className="font-medium">Testimonial #{index + 1}</h4>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => removeTestimonial(testimonial.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Name</label>
                  <Input
                    value={testimonial.name}
                    onChange={(e) => setTestimonials(testimonials.map(t => 
                      t.id === testimonial.id ? {...t, name: e.target.value} : t
                    ))}
                    placeholder="Client name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Company</label>
                  <Input
                    value={testimonial.company}
                    onChange={(e) => setTestimonials(testimonials.map(t => 
                      t.id === testimonial.id ? {...t, company: e.target.value} : t
                    ))}
                    placeholder="Company name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Role</label>
                  <Input
                    value={testimonial.role}
                    onChange={(e) => setTestimonials(testimonials.map(t => 
                      t.id === testimonial.id ? {...t, role: e.target.value} : t
                    ))}
                    placeholder="Job title"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Testimonial Text</label>
                <Textarea
                  value={testimonial.text}
                  onChange={(e) => setTestimonials(testimonials.map(t => 
                    t.id === testimonial.id ? {...t, text: e.target.value} : t
                  ))}
                  placeholder="What did they say about working with you?"
                  rows={3}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium mb-1 block">Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setTestimonials(testimonials.map(t => 
                          t.id === testimonial.id ? {...t, rating: star} : t
                        ))}
                        className={`w-6 h-6 ${star <= testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      >
                        <Star className="w-full h-full fill-current" />
                      </button>
                    ))}
                  </div>
                </div>
                
                <Badge variant="outline" className="gap-1">
                  <Award className="w-3 h-3" />
                  {testimonial.rating}/5 Stars
                </Badge>
              </div>
            </div>
          ))}

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-medium text-yellow-900 mb-2">Request Testimonials</h4>
            <p className="text-sm text-yellow-700 mb-3">
              Great testimonials build trust. Consider reaching out to past clients for reviews.
            </p>
            <Button variant="outline" size="sm" className="gap-1">
              <MessageSquare className="w-3 h-3" />
              Generate Request Template
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="bg-tapinto-blue hover:bg-tapinto-blue/90 gap-2">
          <Save className="w-4 h-4" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}

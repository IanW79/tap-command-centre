import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Briefcase, 
  GraduationCap, 
  Award, 
  Plus, 
  Trash2, 
  Save,
  Upload,
  CheckCircle,
  Sparkles
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface PackageData {
  individual: any;
  organisation: any;
}

interface ExperienceSectionProps {
  packageData: PackageData | null;
}

export function ExperienceSection({ packageData }: ExperienceSectionProps) {
  const { user } = useAuth();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [workHistory, setWorkHistory] = useState([
    {
      id: 1,
      company: packageData?.organisation?.companyName || 'TechCorp Solutions',
      position: packageData?.individual?.profession || 'Senior Marketing Manager',
      startDate: '2021-01',
      endDate: '',
      current: true,
      description: packageData?.individual?.bio || 'Lead digital marketing initiatives for B2B SaaS products, managing a team of 5 marketers.',
      logo: null
    }
  ]);

  const [education, setEducation] = useState([
    {
      id: 1,
      institution: 'University of Technology',
      degree: 'MBA in Marketing',
      year: '2019',
      description: 'Specialized in Digital Marketing and Consumer Behavior'
    }
  ]);

  const [skills, setSkills] = useState(
    packageData?.individual?.interests || [
      'Digital Marketing', 'Team Leadership', 'Strategy Development', 
      'Data Analysis', 'Content Marketing', 'SEO/SEM'
    ]
  );

  const [achievements, setAchievements] = useState([
    {
      id: 1,
      title: 'Marketing Excellence Award',
      organization: 'Marketing Association',
      year: '2023',
      description: 'Recognized for innovative campaign that increased ROI by 300%'
    }
  ]);

  const [newSkill, setNewSkill] = useState('');

  useEffect(() => {
    if (packageData) {
      setWorkHistory(prev => prev.map((work, index) => 
        index === 0 ? {
          ...work,
          company: packageData.organisation?.companyName || work.company,
          position: packageData.individual?.profession || work.position,
          description: packageData.individual?.bio || work.description
        } : work
      ));

      if (packageData.individual?.interests?.length > 0) {
        setSkills(packageData.individual.interests);
      }
    }
  }, [packageData]);

  const addWorkHistory = () => {
    const newWork = {
      id: Date.now(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      logo: null
    };
    setWorkHistory([...workHistory, newWork]);
  };

  const removeWorkHistory = (id: number) => {
    setWorkHistory(workHistory.filter(work => work.id !== id));
  };

  const addEducation = () => {
    const newEdu = {
      id: Date.now(),
      institution: '',
      degree: '',
      year: '',
      description: ''
    };
    setEducation([...education, newEdu]);
  };

  const removeEducation = (id: number) => {
    setEducation(education.filter(edu => edu.id !== id));
  };

  const addAchievement = () => {
    const newAchievement = {
      id: Date.now(),
      title: '',
      organization: '',
      year: '',
      description: ''
    };
    setAchievements([...achievements, newAchievement]);
  };

  const removeAchievement = (id: number) => {
    setAchievements(achievements.filter(achievement => achievement.id !== id));
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const handleSave = async () => {
    setSaving(true);
    
    try {
      // Simulate save success
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      console.log('✅ Experience data ready for AWS integration!');
    } catch (error) {
      console.error('❌ Error:', error);
      alert('Failed to save changes. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {packageData && (
        <Card className="border-tapinto-blue/20 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-tapinto-blue rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="font-medium text-blue-900">Experience Pre-populated</h4>
                <p className="text-sm text-blue-700">
                  We've started with your package data. Add more details below to complete your professional story.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {saved && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <p className="text-green-800 font-medium">Experience data saved successfully!</p>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-tapinto-blue" />
            Work History
          </CardTitle>
          <Button variant="outline" size="sm" onClick={addWorkHistory}>
            <Plus className="w-4 h-4 mr-1" />
            Add Experience
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {workHistory.map((work, index) => (
            <div key={work.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-start justify-between">
                <h4 className="font-medium">Experience #{index + 1}</h4>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => removeWorkHistory(work.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Company</label>
                  <Input
                    value={work.company}
                    onChange={(e) => setWorkHistory(workHistory.map(w => 
                      w.id === work.id ? {...w, company: e.target.value} : w
                    ))}
                    placeholder="Company name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Position</label>
                  <Input
                    value={work.position}
                    onChange={(e) => setWorkHistory(workHistory.map(w => 
                      w.id === work.id ? {...w, position: e.target.value} : w
                    ))}
                    placeholder="Job title"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Start Date</label>
                  <Input
                    type="month"
                    value={work.startDate}
                    onChange={(e) => setWorkHistory(workHistory.map(w => 
                      w.id === work.id ? {...w, startDate: e.target.value} : w
                    ))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">End Date</label>
                  <Input
                    type="month"
                    value={work.endDate}
                    onChange={(e) => setWorkHistory(workHistory.map(w => 
                      w.id === work.id ? {...w, endDate: e.target.value} : w
                    ))}
                    disabled={work.current}
                  />
                </div>
                <div className="flex items-center gap-2 mt-6">
                  <input
                    type="checkbox"
                    checked={work.current}
                    onChange={(e) => setWorkHistory(workHistory.map(w => 
                      w.id === work.id ? {...w, current: e.target.checked, endDate: e.target.checked ? '' : w.endDate} : w
                    ))}
                  />
                  <label className="text-sm">Current role</label>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Description</label>
                <Textarea
                  value={work.description}
                  onChange={(e) => setWorkHistory(workHistory.map(w => 
                    w.id === work.id ? {...w, description: e.target.value} : w
                  ))}
                  placeholder="Describe your role, responsibilities, and achievements..."
                  rows={3}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Company Logo</label>
                <Button variant="outline" size="sm" className="gap-2">
                  <Upload className="w-4 h-4" />
                  Upload Logo
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Skills & Expertise</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add a skill..."
              onKeyPress={(e) => e.key === 'Enter' && addSkill()}
            />
            <Button onClick={addSkill} size="sm">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="gap-1">
                {skill}
                <button 
                  onClick={() => removeSkill(skill)}
                  className="ml-1 hover:text-red-500"
                >
                  ×
                </button>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-tapinto-blue" />
            Education
          </CardTitle>
          <Button variant="outline" size="sm" onClick={addEducation}>
            <Plus className="w-4 h-4 mr-1" />
            Add Education
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {education.map((edu) => (
            <div key={edu.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-start justify-between">
                <h4 className="font-medium">Education</h4>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => removeEducation(edu.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Institution</label>
                  <Input 
                    value={edu.institution} 
                    onChange={(e) => setEducation(education.map(item => 
                      item.id === edu.id ? {...item, institution: e.target.value} : item
                    ))}
                    placeholder="University name" 
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Degree</label>
                  <Input 
                    value={edu.degree} 
                    onChange={(e) => setEducation(education.map(item => 
                      item.id === edu.id ? {...item, degree: e.target.value} : item
                    ))}
                    placeholder="Degree/Qualification" 
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Year</label>
                <Input 
                  value={edu.year} 
                  onChange={(e) => setEducation(education.map(item => 
                    item.id === edu.id ? {...item, year: e.target.value} : item
                  ))}
                  placeholder="Graduation year" 
                  className="w-32" 
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Description</label>
                <Textarea 
                  value={edu.description} 
                  onChange={(e) => setEducation(education.map(item => 
                    item.id === edu.id ? {...item, description: e.target.value} : item
                  ))}
                  placeholder="Additional details..." 
                  rows={2} 
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-tapinto-blue" />
            Achievements & Awards
          </CardTitle>
          <Button variant="outline" size="sm" onClick={addAchievement}>
            <Plus className="w-4 h-4 mr-1" />
            Add Achievement
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {achievements.map((achievement) => (
            <div key={achievement.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-start justify-between">
                <h4 className="font-medium">Achievement</h4>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => removeAchievement(achievement.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Title</label>
                  <Input 
                    value={achievement.title} 
                    onChange={(e) => setAchievements(achievements.map(a => 
                      a.id === achievement.id ? {...a, title: e.target.value} : a
                    ))}
                    placeholder="Award/Achievement title" 
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Organization</label>
                  <Input 
                    value={achievement.organization} 
                    onChange={(e) => setAchievements(achievements.map(a => 
                      a.id === achievement.id ? {...a, organization: e.target.value} : a
                    ))}
                    placeholder="Awarding organization" 
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Year</label>
                <Input 
                  value={achievement.year} 
                  onChange={(e) => setAchievements(achievements.map(a => 
                    a.id === achievement.id ? {...a, year: e.target.value} : a
                  ))}
                  placeholder="Year received" 
                  className="w-32" 
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Description</label>
                <Textarea 
                  value={achievement.description} 
                  onChange={(e) => setAchievements(achievements.map(a => 
                    a.id === achievement.id ? {...a, description: e.target.value} : a
                  ))}
                  placeholder="Achievement details..." 
                  rows={2} 
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button 
          onClick={handleSave}
          disabled={saving}
          className="bg-tapinto-blue hover:bg-tapinto-blue/90 gap-2"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
}
  

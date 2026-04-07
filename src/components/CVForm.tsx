import React from 'react';
import { CVData, ExperienceLevel, Experience, Education, Project, Certification, Language } from '../types';
import { Plus, Trash2, Languages } from 'lucide-react';
import { translations } from '../constants';
import { RichTextEditor } from './RichTextEditor';

interface CVFormProps {
  data: CVData;
  onChange: (data: CVData) => void;
}

export const CVForm: React.FC<CVFormProps> = ({ data, onChange }) => {
  const t = translations[data.language];
  const updatePersonalInfo = (field: keyof CVData['personalInfo'], value: string) => {
    onChange({ ...data, personalInfo: { ...data.personalInfo, [field]: value } });
  };

  const addExperience = () => {
    onChange({
      ...data,
      experience: [
        ...data.experience,
        { id: Date.now().toString(), company: '', position: '', startDate: '', endDate: '', description: '' },
      ],
    });
  };

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    onChange({
      ...data,
      experience: data.experience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    });
  };

  const removeExperience = (id: string) => {
    onChange({ ...data, experience: data.experience.filter((exp) => exp.id !== id) });
  };

  const addEducation = () => {
    onChange({
      ...data,
      education: [
        ...data.education,
        { id: Date.now().toString(), institution: '', degree: '', startDate: '', endDate: '', description: '' },
      ],
    });
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    onChange({
      ...data,
      education: data.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    });
  };

  const removeEducation = (id: string) => {
    onChange({ ...data, education: data.education.filter((edu) => edu.id !== id) });
  };

  const addProject = () => {
    onChange({
      ...data,
      projects: [
        ...data.projects,
        { id: Date.now().toString(), name: '', role: '', startDate: '', endDate: '', demoLink: '', githubLink: '', details: '' },
      ],
    });
  };

  const updateProject = (id: string, field: keyof Project, value: string) => {
    onChange({
      ...data,
      projects: data.projects.map((proj) => (proj.id === id ? { ...proj, [field]: value } : proj)),
    });
  };

  const removeProject = (id: string) => {
    onChange({ ...data, projects: data.projects.filter((proj) => proj.id !== id) });
  };

  const addCertification = () => {
    onChange({
      ...data,
      certifications: [
        ...(data.certifications || []),
        { id: Date.now().toString(), name: '', date: '', link: '' },
      ],
    });
  };

  const updateCertification = (id: string, field: keyof Certification, value: string) => {
    onChange({
      ...data,
      certifications: (data.certifications || []).map((cert) => (cert.id === id ? { ...cert, [field]: value } : cert)),
    });
  };

  const removeCertification = (id: string) => {
    onChange({ ...data, certifications: (data.certifications || []).filter((cert) => cert.id !== id) });
  };

  return (
    <div className="space-y-8">
      {/* Settings */}
      <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">{t.settings}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.cvLanguage}</label>
            <div className="flex bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => onChange({ ...data, language: 'vi' })}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${data.language === 'vi' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
              >
                {t.vietnamese}
              </button>
              <button
                onClick={() => onChange({ ...data, language: 'en' })}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${data.language === 'en' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
              >
                {t.english}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.candidateLevel}</label>
            <select
              value={data.level}
              onChange={(e) => onChange({ ...data, level: e.target.value as ExperienceLevel })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="Entry Level">{t.entryLevel}</option>
              <option value="Mid Level">{t.midLevel}</option>
              <option value="Senior Level">{t.seniorLevel}</option>
            </select>
          </div>
        </div>
      </section>

      {/* Personal Info */}
      <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">{t.personalInfo}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.fullName}</label>
            <input
              type="text"
              value={data.personalInfo.fullName}
              onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder={t.placeholders?.fullName}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.jobTitle}</label>
            <input
              type="text"
              value={data.personalInfo.jobTitle}
              onChange={(e) => updatePersonalInfo('jobTitle', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder={t.placeholders?.jobTitle}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.email}</label>
            <input
              type="email"
              value={data.personalInfo.email}
              onChange={(e) => updatePersonalInfo('email', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder={t.placeholders?.email}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.phone}</label>
            <input
              type="text"
              value={data.personalInfo.phone}
              onChange={(e) => updatePersonalInfo('phone', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder={t.placeholders?.phone}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.linkedin}</label>
            <input
              type="text"
              value={data.personalInfo.linkedin}
              onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder={t.placeholders?.linkedin}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.githubLabel}</label>
            <input
              type="text"
              value={data.personalInfo.github}
              onChange={(e) => updatePersonalInfo('github', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder={t.placeholders?.github}
            />
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">{t.summaryTitle}</h2>
        </div>
        <RichTextEditor
          value={data.summary}
          onChange={(value) => onChange({ ...data, summary: value })}
          placeholder={t.summaryPlaceholder}
        />
      </section>

      {/* Projects */}
      <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">{t.projectsTitle}</h2>
          <button
            onClick={addProject}
            className="flex items-center gap-1 text-sm bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Plus size={16} />
            {t.add}
          </button>
        </div>
        <div className="space-y-6">
          {data.projects.map((proj) => (
            <div key={proj.id} className="p-4 border border-gray-200 rounded-lg relative group">
              <button
                onClick={() => removeProject(proj.id)}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={18} />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.projectName}</label>
                  <input
                    type="text"
                    value={proj.name}
                    onChange={(e) => updateProject(proj.id, 'name', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder={t.placeholders?.projectName}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.roleShortDesc}</label>
                  <input
                    type="text"
                    value={proj.role}
                    onChange={(e) => updateProject(proj.id, 'role', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder={t.placeholders?.role}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.startDate}</label>
                  <input
                    type="text"
                    value={proj.startDate}
                    onChange={(e) => updateProject(proj.id, 'startDate', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder={t.placeholders?.date}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.endDate}</label>
                  <input
                    type="text"
                    value={proj.endDate}
                    onChange={(e) => updateProject(proj.id, 'endDate', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder={t.placeholders?.present}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.demoLink}</label>
                  <input
                    type="text"
                    value={proj.demoLink}
                    onChange={(e) => updateProject(proj.id, 'demoLink', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder={t.placeholders?.link}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.githubLink}</label>
                  <input
                    type="text"
                    value={proj.githubLink}
                    onChange={(e) => updateProject(proj.id, 'githubLink', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder={t.placeholders?.link}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-medium text-gray-700">{t.projectDetails}</label>
                </div>
                <RichTextEditor
                  value={proj.details}
                  onChange={(value) => updateProject(proj.id, 'details', value)}
                  placeholder={t.placeholders?.projectDetails}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">{t.experienceTitle}</h2>
          <button
            onClick={addExperience}
            className="flex items-center gap-1 text-sm bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Plus size={16} />
            {t.add}
          </button>
        </div>
        <div className="space-y-6">
          {data.experience.map((exp, index) => (
            <div key={exp.id} className="p-4 border border-gray-200 rounded-lg relative group">
              <button
                onClick={() => removeExperience(exp.id)}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={18} />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.company}</label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder={t.placeholders?.company}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.position}</label>
                  <input
                    type="text"
                    value={exp.position}
                    onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder={t.placeholders?.position}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.startDate}</label>
                  <input
                    type="text"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder={t.placeholders?.date}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.endDate}</label>
                  <input
                    type="text"
                    value={exp.endDate}
                    onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder={t.placeholders?.present}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-medium text-gray-700">{t.jobDescription}</label>
                </div>
                <RichTextEditor
                  value={exp.description}
                  onChange={(value) => updateExperience(exp.id, 'description', value)}
                  placeholder={t.placeholders?.jobDescription}
                />
              </div>
            </div>
          ))}
          {data.experience.length === 0 && (
            <p className="text-center text-gray-500 py-4">{t.noExperience}</p>
          )}
        </div>
      </section>

      {/* Skills */}
      <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">{t.skillsTitle}</h2>
        <p className="text-sm text-gray-500 mb-2">{t.skillsDesc}</p>
        <RichTextEditor
          value={data.skills}
          onChange={(value) => onChange({ ...data, skills: value })}
          placeholder={t.placeholders?.skills}
        />
      </section>

      {/* Education */}
      <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">{t.educationTitle}</h2>
          <button
            onClick={addEducation}
            className="flex items-center gap-1 text-sm bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Plus size={16} />
            {t.add}
          </button>
        </div>
        <div className="space-y-6">
          {data.education.map((edu) => (
            <div key={edu.id} className="p-4 border border-gray-200 rounded-lg relative group">
              <button
                onClick={() => removeEducation(edu.id)}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={18} />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.institution}</label>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder={t.placeholders?.institution}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.degree}</label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder={t.placeholders?.degree}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.startDate}</label>
                  <input
                    type="text"
                    value={edu.startDate}
                    onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder={t.placeholders?.date}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.endDate}</label>
                  <input
                    type="text"
                    value={edu.endDate}
                    onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder={t.placeholders?.present}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.eduDetails}</label>
                <RichTextEditor
                  value={edu.description}
                  onChange={(value) => updateEducation(edu.id, 'description', value)}
                  placeholder={t.placeholders?.eduDetails}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">{t.certificationsTitle}</h2>
          <button
            onClick={addCertification}
            className="flex items-center gap-1 text-sm bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Plus size={16} />
            {t.add}
          </button>
        </div>
        <div className="space-y-6">
          {(data.certifications || []).map((cert) => (
            <div key={cert.id} className="p-4 border border-gray-200 rounded-lg relative group">
              <button
                onClick={() => removeCertification(cert.id)}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={18} />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.certName}</label>
                  <input
                    type="text"
                    value={cert.name}
                    onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder={t.placeholders?.certName}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.certDate}</label>
                  <input
                    type="text"
                    value={cert.date}
                    onChange={(e) => updateCertification(cert.id, 'date', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder={t.placeholders?.date}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.certLink}</label>
                  <input
                    type="text"
                    value={cert.link}
                    onChange={(e) => updateCertification(cert.id, 'link', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder={t.placeholders?.link}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

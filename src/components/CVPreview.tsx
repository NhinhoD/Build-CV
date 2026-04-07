import React, { forwardRef } from 'react';
import { CVData } from '../types';
import { translations } from '../constants';

interface CVPreviewProps {
  data: CVData;
}

export const CVPreview = forwardRef<HTMLDivElement, CVPreviewProps>(({ data }, ref) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, language } = data;
  const t = translations[language];

  const contactItems = [
    personalInfo.email && <a key="email" href={`mailto:${personalInfo.email}`} className="text-blue-600 hover:underline">{personalInfo.email}</a>,
    personalInfo.phone && <span key="phone">{personalInfo.phone}</span>,
    personalInfo.linkedin && <a key="linkedin" href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`} className="text-blue-600 hover:underline">{personalInfo.linkedin.replace(/^https?:\/\//, '')}</a>,
    personalInfo.github && <a key="github" href={personalInfo.github.startsWith('http') ? personalInfo.github : `https://${personalInfo.github}`} className="text-blue-600 hover:underline">{personalInfo.github.replace(/^https?:\/\//, '')}</a>,
    personalInfo.website && <a key="website" href={personalInfo.website.startsWith('http') ? personalInfo.website : `https://${personalInfo.website}`} className="text-blue-600 hover:underline">{personalInfo.website.replace(/^https?:\/\//, '')}</a>,
  ].filter(Boolean);

  return (
    <div className="bg-white shadow-lg mx-auto" style={{ width: '210mm', minHeight: '297mm' }}>
      <div ref={ref} className="p-12 bg-white text-black font-sans" style={{ width: '210mm', minHeight: '297mm' }}>
        
        {/* Header */}
        <header className="text-center mb-6">
          <h1 className="text-2xl font-bold uppercase tracking-wide mb-1">
            {personalInfo.fullName || <span className="text-gray-300">{t.placeholders?.fullName}</span>}
          </h1>
          <h2 className="text-[15px] uppercase tracking-wider mb-2">
            {personalInfo.jobTitle || <span className="text-gray-300">{t.placeholders?.jobTitle}</span>}
          </h2>
          
          <div className="flex flex-wrap justify-center items-center gap-2 text-[13px]">
            {contactItems.length > 0 ? (
              contactItems.map((item, index) => (
                <React.Fragment key={index}>
                  {item}
                  {index < contactItems.length - 1 && <span className="text-gray-400">|</span>}
                </React.Fragment>
              ))
            ) : (
              <span className="text-gray-300">
                {t.placeholders?.email} | {t.placeholders?.phone} | {t.placeholders?.linkedin}
              </span>
            )}
          </div>
        </header>

        {/* Summary */}
        <section className="mb-5">
          <h3 className="text-[15px] font-bold uppercase mb-2 border-b border-black pb-1">{t.summary}</h3>
          {summary ? (
            <div 
              className="text-[13px] leading-relaxed text-justify cv-html-content min-h-[20px]"
              dangerouslySetInnerHTML={{ __html: summary }}
            />
          ) : (
            <div className="text-[13px] leading-relaxed text-justify whitespace-pre-wrap min-h-[20px] text-gray-300">
              {t.summaryPlaceholder}
            </div>
          )}
        </section>

        {/* Experience */}
        <section className="mb-5">
          <h3 className="text-[15px] font-bold uppercase mb-2 border-b border-black pb-1">{t.experience}</h3>
          <div className="space-y-4 min-h-[20px]">
            {experience.length > 0 ? experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-bold text-[14px]">{exp.position}</h4>
                  <span className="text-[13px]">
                    {exp.startDate} {exp.startDate && exp.endDate ? '–' : ''} {exp.endDate}
                  </span>
                </div>
                <div className="text-[14px] mb-1">{exp.company}</div>
                <div 
                  className="text-[13px] leading-relaxed cv-html-content"
                  dangerouslySetInnerHTML={{ __html: exp.description }}
                />
              </div>
            )) : (
              <div className="text-gray-300">
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-bold text-[14px]">{t.placeholders?.position}</h4>
                  <span className="text-[13px]">{t.placeholders?.date} – {t.placeholders?.present}</span>
                </div>
                <div className="text-[14px] mb-1">{t.placeholders?.company}</div>
                <div className="text-[13px] leading-relaxed whitespace-pre-wrap">{t.placeholders?.jobDescription}</div>
              </div>
            )}
          </div>
        </section>

        {/* Projects */}
        <section className="mb-5">
          <h3 className="text-[15px] font-bold uppercase mb-2 border-b border-black pb-1">{t.projects}</h3>
          <div className="space-y-4 min-h-[20px]">
            {projects.length > 0 ? projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <div className="text-[14px]">
                    <span className="font-bold">{proj.name}</span>
                    {proj.role && <span> – {proj.role}</span>}
                  </div>
                  <span className="text-[13px] whitespace-nowrap ml-4">
                    {proj.startDate} {proj.startDate && proj.endDate ? '–' : ''} {proj.endDate}
                  </span>
                </div>
                
                <div className="text-[13px] mb-1">
                  {proj.demoLink && (
                    <div className="mb-0.5">
                      {t.demo}: <a href={proj.demoLink} className="text-blue-600 hover:underline">{proj.demoLink}</a>
                    </div>
                  )}
                  {proj.githubLink && (
                    <div>
                      {t.github}: <a href={proj.githubLink} className="text-blue-600 hover:underline">{proj.githubLink}</a>
                    </div>
                  )}
                </div>

                <div 
                  className="text-[13px] leading-relaxed cv-html-content"
                  dangerouslySetInnerHTML={{ __html: proj.details }}
                />
              </div>
            )) : (
              <div className="text-gray-300">
                <div className="flex justify-between items-baseline mb-1">
                  <div className="text-[14px]">
                    <span className="font-bold">{t.placeholders?.projectName}</span>
                    <span> – {t.placeholders?.role}</span>
                  </div>
                  <span className="text-[13px] whitespace-nowrap ml-4">{t.placeholders?.date} – {t.placeholders?.present}</span>
                </div>
                <div className="text-[13px] leading-relaxed whitespace-pre-wrap">{t.placeholders?.projectDetails}</div>
              </div>
            )}
          </div>
        </section>

        {/* Skills */}
        <section className="mb-5">
          <h3 className="text-[15px] font-bold uppercase mb-2 border-b border-black pb-1">{t.skills}</h3>
          {skills ? (
            <div 
              className="text-[13px] leading-relaxed cv-html-content min-h-[20px]"
              dangerouslySetInnerHTML={{ __html: skills }}
            />
          ) : (
            <div className="text-[13px] leading-relaxed whitespace-pre-wrap min-h-[20px] text-gray-300">
              {t.placeholders?.skills}
            </div>
          )}
        </section>

        {/* Education */}
        <section className="mb-5">
          <h3 className="text-[15px] font-bold uppercase mb-2 border-b border-black pb-1">{t.education}</h3>
          <div className="space-y-3 min-h-[20px]">
            {education.length > 0 ? education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="text-[14px] text-blue-600 underline">{edu.institution}</h4>
                  <span className="text-[13px]">
                    {edu.startDate} {edu.startDate && edu.endDate ? '–' : ''} {edu.endDate}
                  </span>
                </div>
                {edu.degree && <div className="text-[13px] font-bold mb-1">{edu.degree}</div>}
                {edu.description && (
                  <div 
                    className="text-[13px] leading-relaxed cv-html-content"
                    dangerouslySetInnerHTML={{ __html: edu.description }}
                  />
                )}
              </div>
            )) : (
              <div className="text-gray-300">
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="text-[14px] underline">{t.placeholders?.institution}</h4>
                  <span className="text-[13px]">{t.placeholders?.date} – {t.placeholders?.present}</span>
                </div>
                <div className="text-[13px] font-bold mb-1">{t.placeholders?.degree}</div>
                <div className="text-[13px] leading-relaxed whitespace-pre-wrap">{t.placeholders?.eduDetails}</div>
              </div>
            )}
          </div>
        </section>

        {/* Certifications */}
        <section className="mb-5">
          <h3 className="text-[15px] font-bold uppercase mb-2 border-b border-black pb-1">{t.certifications}</h3>
          <div className="text-[13px] leading-relaxed space-y-1 min-h-[20px]">
            {certifications && certifications.length > 0 ? (
              <ul className="list-disc list-inside ml-1">
                {certifications.map((cert) => (
                  <li key={cert.id} className="pl-2 -indent-2">
                    {cert.link ? (
                      <a href={cert.link} className="text-blue-600 hover:underline">{cert.name}</a>
                    ) : (
                      <span>{cert.name}</span>
                    )}
                    {cert.date && <span> ({cert.date})</span>}
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="list-disc list-inside ml-1 text-gray-300">
                <li className="pl-2 -indent-2">
                  <span>{t.placeholders?.certName}</span>
                  <span> ({t.placeholders?.date})</span>
                </li>
              </ul>
            )}
          </div>
        </section>

      </div>
    </div>
  );
});

CVPreview.displayName = 'CVPreview';

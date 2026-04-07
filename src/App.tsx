import React, { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { FileDown, LayoutTemplate, Loader2 } from 'lucide-react';
import { CVData } from './types';
import { initialCVData, translations } from './constants';
import { CVForm } from './components/CVForm';
import { CVPreview } from './components/CVPreview';

export default function App() {
  const [cvData, setCvData] = useState<CVData>(initialCVData);
  const [isExporting, setIsExporting] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);

  const t = translations[cvData.language];

  const handleExportPDF = async () => {
    const element = componentRef.current;
    if (!element) return;

    setIsExporting(true);
    try {
      // Capture the element as a high-quality PNG using html-to-image
      // This supports modern CSS features like oklch colors used by Tailwind v4
      const dataUrl = await toPng(element, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
      });
      
      // Initialize PDF (A4 size)
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      // Calculate height based on A4 aspect ratio and the captured image
      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      // Add image to PDF and save
      pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`CV_${cvData.personalInfo.fullName.replace(/\s+/g, '_')}.pdf`);
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert(t.pdfError);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-blue-600">
            <LayoutTemplate size={24} />
            <h1 className="text-xl font-bold text-gray-900">Smart CV Builder</h1>
          </div>
          <button
            onClick={handleExportPDF}
            disabled={isExporting}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm disabled:opacity-70"
          >
            {isExporting ? <Loader2 size={18} className="animate-spin" /> : <FileDown size={18} />}
            {isExporting ? t.exporting : t.exportPDF}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-[1600px] mx-auto w-full p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
          {/* Left Column: Form */}
          <div className="h-[calc(100vh-8rem)] overflow-y-auto pr-2 custom-scrollbar">
            <CVForm
              data={cvData}
              onChange={setCvData}
            />
          </div>

          {/* Right Column: Preview */}
          <div className="bg-gray-200 p-8 rounded-xl overflow-x-auto flex justify-center h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar shadow-inner">
            <div className="transform scale-[0.6] sm:scale-[0.8] lg:scale-90 xl:scale-100 origin-top">
              <CVPreview data={cvData} ref={componentRef} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

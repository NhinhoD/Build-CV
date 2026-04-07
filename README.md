# 📄 Smart CV Builder

A modern, responsive, and easy-to-use web application for building professional resumes/CVs. Create your CV with a rich text editor, preview it in real-time, and export it to a high-quality PDF.

## ✨ Features

- **Real-time Preview**: See your changes instantly as you type. The split-screen design ensures you always know what your final CV will look like.
- **Rich Text Editing**: Format your experience, projects, and skills with bold, italic, and bulleted/numbered lists using the integrated Tiptap rich text editor.
- **Multi-language Support**: Seamlessly switch between English and Vietnamese interfaces and CV templates.
- **High-Quality PDF Export**: Export your pixel-perfect CV to a standard A4 PDF document with a single click.
- **Comprehensive Sections**:
  - Personal Information & Contact Details
  - Professional Summary
  - Work Experience
  - Projects & Portfolio
  - Skills
  - Education
  - Certifications
- **Fully Responsive**: Works beautifully on desktop and large screens with an optimized layout.
- **Privacy First**: 100% client-side processing. Your data never leaves your browser.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) with [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Rich Text Editor**: [Tiptap](https://tiptap.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **PDF Generation**: `html-to-image` & `jspdf`

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/smart-cv-builder.git
   cd smart-cv-builder
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:3000`.

## 📁 Project Structure

```text
src/
├── components/
│   ├── CVForm.tsx        # The input form for CV data
│   ├── CVPreview.tsx     # The real-time A4 preview component
│   └── RichTextEditor.tsx# Tiptap wrapper for rich text input
├── constants.ts          # Initial state and translation dictionaries
├── types.ts              # TypeScript interfaces for CV data
├── App.tsx               # Main application layout and PDF export logic
└── index.css             # Global styles and Tailwind configuration
```

## 💡 Usage

1. **Select Language**: Choose your preferred language (English/Vietnamese) from the settings section.
2. **Fill in Details**: Enter your personal information, work experience, education, etc.
3. **Format Text**: Use the rich text editor toolbar to format your descriptions with bullet points or bold text for emphasis.
4. **Review**: Check the real-time preview on the right side of the screen.
5. **Export**: Click the "Export PDF" button in the top right corner to download your CV.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

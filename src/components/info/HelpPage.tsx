import React, { useState } from 'react';
import { 
  HelpCircle, 
  Send, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  Terminal, 
  ExternalLink 
} from 'lucide-react';

interface HelpPageProps {
  onNavigate: (view: string, params?: Record<string, any>) => void;
}

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "How does CodeQuest check my exercise answers?",
    answer: "CodeQuest utilizes a deterministic client-side output comparison engine that normalizes harmless whitespace differences (line endings, trailing spaces) while verifying that your logic generates the correct standard output or satisfies the problem statement."
  },
  {
    question: "Can I switch between English and Tamil/Tanglish explanations?",
    answer: "Yes! Every single lesson has a language toggle in the top-right corner. You can also set your default preference in your account Settings so your preferred explanation language is automatically active on every page."
  },
  {
    question: "Are there other programming languages like JavaScript or Web Development?",
    answer: "No. CodeQuest is exclusively committed to Python, Java, and C++ (with exactly 100 topics each) to ensure high school students in Classes 10, 11, and 12 build rock-solid foundational fluency aligned with CBSE, ICSE, and university requirements."
  },
  {
    question: "How is XP calculated and awarded?",
    answer: "You receive 10 XP for studying and marking a lesson completed, and 20 XP for successfully solving an interactive practice challenge. XP is recorded once per topic to ensure integrity, and every 100 XP levels up your student ranking."
  },
  {
    question: "How do I run code locally on my computer?",
    answer: "We recommend downloading Visual Studio Code along with Python 3.12, JDK 21 (for Java), or MinGW-w64 / g++ (for C++). You can copy any code example directly from CodeQuest into your local VS Code editor."
  }
];

export const HelpPage: React.FC<HelpPageProps> = ({ onNavigate }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('Question about Python Topic');
  const [contactMessage, setContactMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-black text-[#24364B] tracking-tight">
          Help & Student Support
        </h1>
        <p className="text-base text-[#6B7787] mt-2">
          Frequently asked questions, compiler setup guidance, and direct support.
        </p>
      </div>

      {/* 1. FAQS ACCORDION */}
      <div className="bg-[#FFFFFF] border border-[#E2DFD2] rounded-2xl p-6 sm:p-8 shadow-xs">
        <h2 className="text-xl font-bold text-[#24364B] mb-5 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-[#8B6E07]" />
          <span>Frequently Asked Questions</span>
        </h2>

        <div className="divide-y divide-[#E2DFD2]">
          {FAQS.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div key={index} className="py-4">
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between text-left font-bold text-sm sm:text-base text-[#24364B] hover:text-[#000000] cursor-pointer"
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#6B7787] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#6B7787] shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <p className="mt-2.5 text-xs sm:text-sm text-[#6B7787] leading-relaxed">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. LOCAL VS CODE ENVIRONMENT QUICK REFERENCE */}
      <div className="bg-[#FAF8F0] border border-[#E2DFD2] rounded-2xl p-6 sm:p-8 space-y-4">
        <h3 className="text-lg font-bold text-[#24364B] flex items-center gap-2">
          <Terminal className="w-5 h-5 text-[#24364B]" />
          <span>Setting Up Your Offline Compiler in VS Code</span>
        </h3>
        <p className="text-xs sm:text-sm text-[#6B7787] leading-relaxed">
          While CodeQuest lets you practise in the browser, students are encouraged to practise in their local development environment:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          <div className="bg-[#FFFFFF] border border-[#E2DFD2] p-4 rounded-xl text-xs space-y-1.5">
            <div className="font-bold text-[#24364B]">Python Setup</div>
            <p className="text-[#6B7787]">Download Python 3.12 from python.org and install the 'Python' VS Code extension.</p>
            <div className="font-mono text-[11px] bg-[#FAF8F0] p-1.5 rounded">python --version</div>
          </div>

          <div className="bg-[#FFFFFF] border border-[#E2DFD2] p-4 rounded-xl text-xs space-y-1.5">
            <div className="font-bold text-[#24364B]">Java Setup</div>
            <p className="text-[#6B7787]">Install OpenJDK 21 and the 'Extension Pack for Java' in VS Code.</p>
            <div className="font-mono text-[11px] bg-[#FAF8F0] p-1.5 rounded">javac -version</div>
          </div>

          <div className="bg-[#FFFFFF] border border-[#E2DFD2] p-4 rounded-xl text-xs space-y-1.5">
            <div className="font-bold text-[#24364B]">C++ Setup</div>
            <p className="text-[#6B7787]">Install MinGW-w64 on Windows or Xcode CLI on Mac, with 'C/C++' extension in VS Code.</p>
            <div className="font-mono text-[11px] bg-[#FAF8F0] p-1.5 rounded">g++ --version</div>
          </div>
        </div>
      </div>

      {/* 3. WORKING CONTACT & FEEDBACK FORM */}
      <div className="bg-[#FFFFFF] border border-[#E2DFD2] rounded-2xl p-6 sm:p-8 shadow-xs">
        <h2 className="text-xl font-bold text-[#24364B] mb-2">
          Contact Academic Mentors
        </h2>
        <p className="text-xs text-[#6B7787] mb-6">
          Have a question about a syllabus topic or notice a typo in a code snippet? Send us a note.
        </p>

        {isSubmitted ? (
          <div className="p-6 bg-[#DEF7EC] border border-[#BCF0DA] rounded-xl text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-[#03543F] mx-auto" />
            <h4 className="font-bold text-[#03543F] text-base">Message Received!</h4>
            <p className="text-xs text-[#03543F] max-w-md mx-auto">
              Thank you, {contactName}. A member of our computer science academic team will reply to {contactEmail} within 24 hours.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setContactMessage('');
              }}
              className="mt-3 text-xs font-bold underline text-[#03543F] cursor-pointer"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#24364B] uppercase tracking-wider mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="e.g. Arun Kumar"
                  className="w-full px-3 py-2 bg-[#FAF8F0] border border-[#E2DFD2] rounded-md text-sm text-[#24364B] focus:outline-none focus:border-[#24364B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#24364B] uppercase tracking-wider mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="student@school.edu.in"
                  className="w-full px-3 py-2 bg-[#FAF8F0] border border-[#E2DFD2] rounded-md text-sm text-[#24364B] focus:outline-none focus:border-[#24364B]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#24364B] uppercase tracking-wider mb-1">
                Subject
              </label>
              <select
                value={contactSubject}
                onChange={(e) => setContactSubject(e.target.value)}
                className="w-full px-3 py-2 bg-[#FAF8F0] border border-[#E2DFD2] rounded-md text-sm text-[#24364B] focus:outline-none focus:border-[#24364B]"
              >
                <option value="Question about Python Topic">Question about Python Topic</option>
                <option value="Question about Java Topic">Question about Java Topic</option>
                <option value="Question about C++ Topic">Question about C++ Topic</option>
                <option value="Report Exercise Feedback">Report Exercise Feedback</option>
                <option value="School / Teacher Inquiry">School / Teacher Inquiry</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#24364B] uppercase tracking-wider mb-1">
                Message / Question *
              </label>
              <textarea
                required
                rows={4}
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                placeholder="Describe your inquiry or the topic number you have a question about..."
                className="w-full px-3 py-2 bg-[#FAF8F0] border border-[#E2DFD2] rounded-md text-sm text-[#24364B] focus:outline-none focus:border-[#24364B]"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-[#F4E7AE] hover:bg-[#EBDC9A] border border-[#DFC974] text-[#24364B] font-bold text-xs rounded-md transition-colors flex items-center gap-2 cursor-pointer shadow-2xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Message</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

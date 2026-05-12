import { useState } from 'react';
import { FiArrowDownRight } from 'react-icons/fi';

const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: 'Do I need prior coding experience to apply?',
      answer:
        'No prior coding experience is required. Our program is designed for beginners and includes foundational programming modules to get you started. We focus on building skills progressively throughout the six-month fellowship.',
    },
    {
      question: 'What is the weekly time commitment?',
      answer:
        'The fellowship requires approximately 15-20 hours per week, including structured programming modules, mentorship sessions, and independent project work. The exact commitment may vary depending on your learning pace and project scope.',
    },
    {
      question: 'Is the fellowship remote or in-person?',
      answer:
        'The fellowship is primarily remote with optional in-person gatherings. Key milestones like the orientation and demo day may include in-person components. You can participate from anywhere with a stable internet connection.',
    },
    {
      question: 'Is there a fee to participate?',
      answer:
        'The fellowship is completely free to participate in. All resources, mentorship, and training materials are provided at no cost. We are committed to making this opportunity accessible to all qualified applicants.',
    },
    {
      question: 'What environmental topics can my capstone project cover?',
      answer:
        'Your capstone project can focus on any environmental topic that interests you, such as climate change, biodiversity, water resources, air quality, renewable energy, sustainable agriculture, or environmental policy. We encourage projects that address real-world environmental challenges in Nepal or globally.',
    },
    {
      question: 'Who are the community partners?',
      answer:
        'We work with leading environmental organizations, research institutions, and community groups. Our partners include international bodies like UNESCO and UNFCC, as well as local organizations committed to climate action and environmental conservation in Nepal.',
    },
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="faq-accordion">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="accordion-item"
          style={{
            borderBottom:
              index !== faqs.length - 1 ? '2px solid #EBF1F7' : 'none',
          }}
        >
          <button
            className={`accordion-question ${openIndex === index ? 'active' : ''}`}
            onClick={() => toggleAccordion(index)}
            aria-expanded={openIndex === index}
          >
            <span>{faq.question}</span>
            <FiArrowDownRight
              size={20}
              className={`accordion-icon ${openIndex === index ? 'open' : ''}`}
            />
          </button>
          {openIndex === index && (
            <div className="accordion-answer">{faq.answer}</div>
          )}
        </div>
      ))}

      <style>{`
        .faq-accordion {
          width: 100%;
        }

        .accordion-item {
          /* border applied conditionally via inline style */
        }

        .accordion-question {
          width: 100%;
          padding: 24px;
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          font-family: 'Zilla Slab', serif;
          font-size: 18px;
          font-weight: 600;
          line-height: 22px;
          color: #1A1B1E;
          text-align: left;
          transition: all 0.3s ease;
        }
          
        .accordion-question.active {
          color: #364FC7;
        }

        .accordion-question span {
          flex: 1;
        }

        .accordion-icon {
          flex-shrink: 0;
          color: #1A1B1E;
          transition: transform 0.3s ease;
        }

        .accordion-icon.open {
          transform: rotate(90deg);
        }

        .accordion-answer {
          padding: 0 24px 24px 24px;
          font-size: 16px;
          font-weight: 400;
          line-height: 24px;
          color: #A8A8A8;
          animation: slideDown 0.3s ease;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .accordion-question {
            padding: 20px;
            font-size: 16px;
            line-height: 20px;
          }

          .accordion-answer {
            padding: 0 20px 20px 20px;
            font-size: 14px;
            line-height: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default FAQAccordion;

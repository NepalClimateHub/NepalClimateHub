import { useState } from 'react';
import { FiArrowDownRight } from 'react-icons/fi';

const ErasmusMundusAccordion = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: 'Is the event free?',
      answer:
        'Yes, the Erasmus Mundus Connect event is completely free to attend. Registration is open to all interested participants from Nepal and the region.',
    },
    {
      question: 'Who can attend?',
      answer:
        'The event is open to anyone interested in learning about the Erasmus Mundus scholarship and international educational opportunities. Students, professionals, educators, and career changers are all welcome.',
    },
    {
      question: 'Is this event only for environmental students?',
      answer:
        'No, the event welcomes students from all academic backgrounds. While it focuses on environmental and sustainability-related Erasmus Mundus programs, students from various disciplines can benefit from the knowledge shared.',
    },
    {
      question: 'Will the sessions be recorded?',
      answer:
        'Recordings will be made available for those who cannot attend live sessions. Details about recording access will be provided to registered participants after the event.',
    },
    {
      question: 'Will I receive a certificate?',
      answer:
        'Yes, participants who attend the event will receive a participation certificate. Certificates will be issued to those who complete the registration process and attend the sessions.',
    },
    {
      question: 'How do I register?',
      answer:
        'You can register for the Erasmus Mundus Connect event through our website registration form. Simply fill in your details, select your preferred sessions, and submit. You will receive a confirmation email with further instructions.',
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
            type="button"
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

export default ErasmusMundusAccordion;

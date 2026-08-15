import { useState } from 'react';
import { FiArrowDownRight } from 'react-icons/fi';

const ErasmusMundusAccordion = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: 'What is Erasmus Mundus Connect Nepal 2026?',
      answer:
        "EMCN 2026 is a virtual awareness and capacity-building event on the Erasmus Mundus Joint Master's Programme.",
    },
    {
      question: 'Why is a climate non-profit organizing this event?',
      answer:
        "We believe investing in young people is key to solving global challenges. Erasmus Mundus offers fully funded master's programs in climate, environment, agriculture, technology, and many other fields, helping youth gain knowledge and experience to create positive impact.",
    },
    {
      question:
        'Is this scholarship available for technology, business, and other fields?',
      answer:
        "Yes. Erasmus Mundus offers over 220 master's programs across technology, business, engineering, social sciences, and more.",
    },
    {
      question: 'Will the event be virtual or in person?',
      answer:
        'The event will be fully virtual, making it accessible to participants across Nepal.',
    },
    {
      question: 'Who are the speakers?',
      answer:
        'All speakers are current or former Erasmus Mundus Scholars with firsthand experience of the program and application process.',
    },
    {
      question: 'When will the event take place?',
      answer:
        'The event is expected to take place in the third or fourth week of September. Follow our social media channels for updates and registration details.',
    },
    {
      question: 'Is this a free event?',
      answer:
        "As a youth-led climate non-profit, this event is part of our first fundraising effort to help cover the organization's operating costs. A nominal registration fee of NPR 150 will be charged to support event organization and our ongoing initiatives.",
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

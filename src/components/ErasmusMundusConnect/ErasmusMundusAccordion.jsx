import { useState } from "react";
import { FiArrowDownRight } from "react-icons/fi";

const ErasmusMundusAccordion = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question:
        "Is this scholarship available for technology, business, and other fields?",
      answer:
        "Yes. Erasmus Mundus offers over 220 master's programs across technology, business, engineering, social sciences, and more.",
    },
    {
      question:
        "I am already pursuing or have completed a master's degree. Can I apply?",
      answer:
        "Yes, absolutely. Many Erasmus Mundus scholars have already completed a master's degree. It can even be an advantage if presented effectively in your application.",
    },
    {
      question: "I am in my final semester. Can I apply?",
      answer:
        "Yes. Many programs allow conditional admission, provided you graduate before the program starts (September 2027).",
    },
    {
      question: "I am in my second or third year. Should I participate?",
      answer:
        "Yes! In fact, this is a great time to start preparing. Many successful applicants begin preparing as early as their third year.",
    },
    {
      question: "Will the event be virtual or in person?",
      answer:
        "The event will be fully virtual, making it accessible to participants across Nepal.",
    },
    {
      question: "Who are the speakers?",
      answer:
        "All speakers are current or former Erasmus Mundus Scholars with firsthand experience of the program and application process.",
    },
    {
      question: "Is this a free event?",
      answer:
        "The event has a nominal registration fee of NPR 100. As a youth-led climate nonprofit, we are making this second edition part of our first fundraising effort to help cover our organization's operating costs. The previous edition was free.",
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
              index !== faqs.length - 1 ? "2px solid #EBF1F7" : "none",
          }}
        >
          <button
            type="button"
            className={`accordion-question ${openIndex === index ? "active" : ""}`}
            onClick={() => toggleAccordion(index)}
            aria-expanded={openIndex === index}
          >
            <span>{faq.question}</span>
            <FiArrowDownRight
              size={20}
              className={`accordion-icon ${openIndex === index ? "open" : ""}`}
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

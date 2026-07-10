import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: "Who can participate?",
      answer:
        "LCOY Nepal 2026 is open to young people (typically ages 15-25) from all seven provinces of Nepal who are passionate about climate action and environmental issues. We welcome youth from diverse backgrounds and organizations.",
    },
    {
      question: "Is there a fee?",
      answer:
        "The conference is designed to be accessible to all. Please check our website for information about any potential registration fees and available scholarships.",
    },
    {
      question: "Will I get a certificate?",
      answer:
        "Yes, all participants will receive a certificate of participation from LCOY Nepal 2026 recognizing their attendance and engagement at the conference.",
    },
    {
      question: "Accommodation?",
      answer:
        "Details about accommodation options for participants from different provinces will be provided closer to the event date. We aim to make the conference accessible with support for travel and lodging.",
    },
    {
      question: "Can I volunteer?",
      answer:
        "Yes! We welcome volunteers to help organize and facilitate LCOY Nepal 2026. If you're interested in volunteering, please reach out to us for more information about available opportunities.",
    },
    {
      question: "How can my organization partner or sponsor?",
      answer:
        "We're looking for partner organizations and sponsors to help make this event a success. Please contact our team to discuss partnership and sponsorship opportunities that align with our mission.",
    },
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      {/* Injecting media queries directly into the component */}
      <style>{`
        .faq-section {
          padding-top: 96px;
          padding-bottom: 96px;
          background-color: #F2F4F0;
        }
        .faq-container {
          max-width: 1180px;
          margin: 0 auto;
          padding-left: 64px;
          padding-right: 64px;
        }
        .faq-title {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: 32px;
          line-height: 1.3;
          letter-spacing: 0px;
          text-align: center;
          margin: 48px 0;
          color: #00442D;
        }
        .faq-accordion-wrapper {
          display: flex;
          flex-direction: column;
          gap: 16px;
          max-width: 788px;
          margin: 0 auto;
          width: 100%;
        }
        .faq-btn {
          font-size: 20px;
          line-height: 1.5;
        }

        /* Responsive Breakpoint for Mobile Screens */
        @media (max-width: 768px) {
          .faq-section {
            padding-top: 48px;
            padding-bottom: 48px;
          }
          .faq-container {
            padding-left: 20px;
            padding-right: 20px;
          }
          .faq-title {
            font-size: 24px;
            margin: 24px 0;
          }
          .faq-accordion-wrapper {
            max-width: 100%; /* Forces full width on small screens */
          }
          .faq-btn {
            font-size: 16px; /* Scales down question text */
            line-height: 1.4;
          }
          .faq-answer {
            font-size: 12px; /* Scales down answer text */
            line-height: 1.4;
          }
          .faq-item-box {
            padding: 16px !important; /* Slightly reduces internal padding */
          }
        }
      `}</style>

      <div className="faq-container">
        {/* Title */}
        <h2 className="faq-title">Frequently Asked Questions</h2>

        {/* Accordion Container */}
        <div className="faq-accordion-wrapper">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="faq-item-box"
              style={{
                borderRadius: "16px",
                backgroundColor: "white",
                border: "1px solid #BFC9C1",
                padding: "24px",
              }}
            >
              {/* Accordion Button */}
              <button
                onClick={() => toggleAccordion(index)}
                className="faq-btn"
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "0",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 500,
                  letterSpacing: "0px",
                  color: "#00442D",
                  textAlign: "left",
                }}
              >
                <span>{faq.question}</span>
                <FiChevronDown
                  size={18} /* Adjusted size dynamically to match text better */
                  style={{
                    color: "#00442D",
                    flexShrink: 0,
                    transition: "transform 0.3s ease",
                    transform:
                      openIndex === index ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </button>

              {/* Accordion Answer */}
              {openIndex === index && (
                <div
                  className="faq-answer"
                  style={{
                    marginTop: "16px",
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "16px",
                    lineHeight: "24px",
                    color: "#404943",
                  }}
                >
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

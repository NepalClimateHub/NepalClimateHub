import { useState } from 'react';
import { FiArrowDownRight } from 'react-icons/fi';
import styles from '../styles/components/FAQAccordion.module.css';

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
    <div className={styles.faqAccordion}>
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
            className={`${styles.accordionQuestion} ${openIndex === index ? styles.active : ''}`}
            onClick={() => toggleAccordion(index)}
            aria-expanded={openIndex === index}
          >
            <span>{faq.question}</span>
            <FiArrowDownRight
              size={20}
              className={`${styles.accordionIcon} ${openIndex === index ? styles.open : ''}`}
            />
          </button>
          {openIndex === index && (
            <div className={styles.accordionAnswer}>{faq.answer}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQAccordion;

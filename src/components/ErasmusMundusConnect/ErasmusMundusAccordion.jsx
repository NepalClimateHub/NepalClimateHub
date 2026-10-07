import { useId, useState } from 'react';
import { FiArrowDownRight } from 'react-icons/fi';
import styles from '../../styles/components/ErasmusMundusAccordion.module.css';

const ErasmusMundusAccordion = () => {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question:
        'Is this scholarship available for technology, business, and other fields?',
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
      question: 'I am in my final semester. Can I apply?',
      answer:
        'Yes. Many programs allow conditional admission, provided you graduate before the program starts (September 2027).',
    },
    {
      question: 'I am in my second or third year. Should I participate?',
      answer:
        'Yes! In fact, this is a great time to start preparing. Many successful applicants begin preparing as early as their third year.',
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
      question: 'Is this a free event?',
      answer:
        "The event has a nominal registration fee of NPR 100. As a youth-led climate nonprofit, we are making this second edition part of our first fundraising effort to help cover our organization's operating costs. The previous edition was free.",
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
            id={`${baseId}-q${index}`}
            aria-expanded={openIndex === index}
            aria-controls={`${baseId}-a${index}`}
          >
            <span>{faq.question}</span>
            <FiArrowDownRight
              size={20}
              className={`${styles.accordionIcon} ${openIndex === index ? styles.open : ''}`}
            />
          </button>
          {openIndex === index && (
            <section
              id={`${baseId}-a${index}`}
              aria-labelledby={`${baseId}-q${index}`}
              className={styles.accordionAnswer}
            >
              {faq.answer}
            </section>
          )}
        </div>
      ))}
    </div>
  );
};

export default ErasmusMundusAccordion;

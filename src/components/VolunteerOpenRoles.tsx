import type React from 'react';
import { useEffect, useId, useRef, useState } from 'react';
import {
  type Vacancy,
  applyToVacancy,
  fetchVacancies,
} from '../api/vacancies.api';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

function useModalDialog(isOpen: boolean, onClose: () => void) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!isOpen) return;
    const trigger =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    headingRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onCloseRef.current();
        return;
      }
      if (e.key !== 'Tab' || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      const inside =
        active instanceof Node && dialogRef.current.contains(active);
      if (
        e.shiftKey &&
        (active === first || !inside || active === headingRef.current)
      ) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !inside)) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      trigger?.focus();
    };
  }, [isOpen]);

  return { dialogRef, headingRef };
}

interface VolunteerOpenRolesProps {
  initialVacancies?: Vacancy[];
}

export const VolunteerOpenRoles: React.FC<VolunteerOpenRolesProps> = ({
  initialVacancies = [],
}) => {
  const [vacancies, setVacancies] = useState<Vacancy[]>(initialVacancies);
  const [loading, setLoading] = useState<boolean>(
    initialVacancies.length === 0
  );
  const [error, setError] = useState<string | null>(null);

  // Selected vacancy for application modal
  const [selectedVacancy, setSelectedVacancy] = useState<Vacancy | null>(null);

  // Form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [currentAddress, setCurrentAddress] = useState('');
  const [message, setMessage] = useState('');
  const [cvUrl, setCvUrl] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const titleId = useId();

  useEffect(() => {
    const loadVacancies = async () => {
      try {
        if (vacancies.length === 0) setLoading(true);
        const res = await fetchVacancies();
        if (res?.data && Array.isArray(res.data)) {
          setVacancies(res.data);
        }
      } catch (err) {
        console.error('Error fetching vacancies client-side:', err);
        if (vacancies.length === 0) {
          setError('Failed to load open roles.');
        }
      } finally {
        setLoading(false);
      }
    };
    loadVacancies();
  }, []);

  const handleOpenApply = (vacancy: Vacancy) => {
    setSelectedVacancy(vacancy);
    setSubmitSuccess(false);
    setSubmitError(null);
  };

  const handleCloseModal = () => {
    setSelectedVacancy(null);
    setFullName('');
    setEmail('');
    setContact('');
    setCurrentAddress('');
    setMessage('');
    setCvUrl('');
    setSubmitSuccess(false);
    setSubmitError(null);
  };

  const { dialogRef, headingRef } = useModalDialog(
    selectedVacancy !== null,
    handleCloseModal
  );

  useEffect(() => {
    if (submitSuccess) headingRef.current?.focus();
  }, [submitSuccess, headingRef]);

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVacancy) return;

    if (
      !fullName ||
      !email ||
      !contact ||
      !currentAddress ||
      !message ||
      !cvUrl
    ) {
      setSubmitError('Please fill out all required fields.');
      return;
    }

    try {
      setSubmitting(true);
      setSubmitError(null);
      await applyToVacancy(selectedVacancy.id, {
        fullName,
        email,
        contact,
        currentAddress,
        message,
        cvUrl,
      });
      setSubmitSuccess(true);
    } catch (err: any) {
      console.error('Application submission error:', err);
      setSubmitError(
        err?.message || 'Failed to submit application. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="open-roles-wrapper">
      {loading ? (
        <div className="roles-loading">Loading open positions...</div>
      ) : error ? (
        <div className="roles-error">{error}</div>
      ) : vacancies.length === 0 ? (
        <div className="no-roles-card">
          <p className="no-roles-text">
            There are currently no open positions. If you are interested in
            volunteering, please check back soon or email us at{' '}
            <a href="mailto:info@nepalclimatehub.org">
              info@nepalclimatehub.org
            </a>
            .
          </p>
        </div>
      ) : (
        <div className="roles-grid">
          {vacancies.map((vacancy) => (
            <article key={vacancy.id} className="role-card">
              <header className="role-card__head">
                <div className="role-card__title-block">
                  <h3 className="role-title">{vacancy.title}</h3>
                  <div className="role-badges">
                    <span className="role-badge">
                      {vacancy.openings}{' '}
                      {vacancy.openings === 1 ? 'opening' : 'openings'}
                    </span>
                    {vacancy.duration && (
                      <span className="role-badge role-badge--muted">
                        ({vacancy.duration})
                      </span>
                    )}
                    {vacancy.hoursPerWeek && (
                      <span className="role-badge role-badge--muted">
                        ({vacancy.hoursPerWeek})
                      </span>
                    )}
                    {vacancy.type && (
                      <span className="role-badge role-badge--muted">
                        {vacancy.type}
                      </span>
                    )}
                  </div>
                </div>
              </header>

              {vacancy.overview && (
                <p className="role-lead">{vacancy.overview}</p>
              )}

              <div className="role-content">
                {vacancy.responsibilities &&
                  vacancy.responsibilities.length > 0 && (
                    <section className="role-panel">
                      <h4 className="role-panel__title">
                        What you&rsquo;ll do
                      </h4>
                      <ul className="role-list">
                        {vacancy.responsibilities.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </section>
                  )}

                {vacancy.requirements && vacancy.requirements.length > 0 && (
                  <section className="role-panel">
                    <h4 className="role-panel__title">
                      What we&rsquo;re looking for
                    </h4>
                    <ul className="role-list">
                      {vacancy.requirements.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </section>
                )}
              </div>

              <footer className="role-card__foot">
                <button
                  type="button"
                  onClick={() => handleOpenApply(vacancy)}
                  className="apply-button apply-button--wide"
                >
                  Apply for this role
                </button>
                <p className="role-footnote">
                  Questions? Email{' '}
                  <a href="mailto:info@nepalclimatehub.org">
                    info@nepalclimatehub.org
                  </a>
                </p>
              </footer>
            </article>
          ))}
        </div>
      )}

      {/* Application Modal */}
      {selectedVacancy && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div
            ref={dialogRef}
            className="modal-content"
            // biome-ignore lint/a11y/useSemanticElements: native <dialog> UA styles would alter existing modal visuals
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close"
              aria-label="Close"
              onClick={handleCloseModal}
            >
              &times;
            </button>

            {submitSuccess ? (
              <div className="modal-success-state">
                <div className="success-icon">&#10003;</div>
                <h3
                  ref={headingRef}
                  id={titleId}
                  tabIndex={-1}
                  className="success-title"
                >
                  Application Submitted!
                </h3>
                <p className="success-text">
                  Thank you for applying for the{' '}
                  <strong>{selectedVacancy.title}</strong> role at Nepal Climate
                  Hub. We have received your application and will reach out to
                  you soon.
                </p>
                <button
                  type="button"
                  className="apply-button"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="modal-header">
                  <h3
                    ref={headingRef}
                    id={titleId}
                    tabIndex={-1}
                    className="modal-title"
                  >
                    Apply for {selectedVacancy.title}
                  </h3>
                  <p className="modal-subtitle">
                    Fill in the details below to submit your application.
                  </p>
                </div>

                <div role="alert">
                  {submitError && (
                    <div className="modal-error-alert">{submitError}</div>
                  )}
                </div>

                <form
                  onSubmit={handleSubmitApplication}
                  className="vacancy-apply-form"
                >
                  <div className="form-group">
                    <label htmlFor="fullName">
                      Full Name <span className="req">*</span>
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>

                  <div className="form-group-row">
                    <div className="form-group">
                      <label htmlFor="email">
                        Email Address <span className="req">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="contact">
                        Contact Number <span className="req">*</span>
                      </label>
                      <input
                        id="contact"
                        type="text"
                        required
                        placeholder="+977 98XXXXXXXX"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="currentAddress">
                      Current Address <span className="req">*</span>
                    </label>
                    <input
                      id="currentAddress"
                      type="text"
                      required
                      value={currentAddress}
                      onChange={(e) => setCurrentAddress(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">
                      Message / Cover Letter <span className="req">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="cvUrl">
                      CV / Resume Link (Google Drive / Dropbox / Cloud URL){' '}
                      <span className="req">*</span>
                    </label>
                    <input
                      id="cvUrl"
                      type="url"
                      required
                      placeholder="https://drive.google.com/your-cv-link"
                      value={cvUrl}
                      onChange={(e) => setCvUrl(e.target.value)}
                    />
                  </div>

                  <div className="modal-actions">
                    <button
                      type="button"
                      className="cancel-button"
                      onClick={handleCloseModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="apply-button"
                    >
                      {submitting ? 'Submitting...' : 'Submit Application'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

import type React from 'react';
import { useEffect, useState } from 'react';
import { type Vacancy, fetchVacancies } from '../api/vacancies.api';

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

  useEffect(() => {
    const loadVacancies = async () => {
      try {
        if (vacancies.length === 0) setLoading(true);
        const res = await fetchVacancies();
        if (res?.data && Array.isArray(res.data)) {
          setVacancies(res.data);
        }
      } catch {
        if (vacancies.length === 0) {
          setError('Failed to load open roles.');
        }
      } finally {
        setLoading(false);
      }
    };
    loadVacancies();
  }, []);

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
                {vacancy.googleFormLink ? (
                  <a
                    href={vacancy.googleFormLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="apply-button apply-button--wide"
                  >
                    Apply for this role
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : (
                  <a
                    href={`mailto:info@nepalclimatehub.org?subject=${encodeURIComponent(`Application: ${vacancy.title}`)}`}
                    className="apply-button apply-button--wide"
                  >
                    Apply via email
                  </a>
                )}
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
    </div>
  );
};

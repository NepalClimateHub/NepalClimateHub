import type React from 'react';
import { useState, useEffect } from 'react';
import { CardContainer } from './CardContainer';
import styles from '../styles/components/Opportunities.module.css';

interface Opportunity {
  id: string | number;
  title: string;
  type: string;
  locationType: string;
  province: string;
  status: string;
  format: string;
  cost: string;
  organization: string;
  description: string;
  category: string[];
  bannerImage: string;
  applicationDeadline: string;
  duration: string;
  applicationDetail: string;
  contactEmail: string;
  website: string;
  socials: {
    facebook: string;
    linkedin: string;
    instagram: string;
  };
  contributedBy: string;
}

interface Props {
  opportunities: Opportunity[];
}

const OpportunityFilter: React.FC<Props> = ({ opportunities }) => {
  const [filteredOpportunities, setFilteredOpportunities] =
    useState(opportunities);
  const [filters, setFilters] = useState({
    type: '',
    locationType: '',
    province: '',
    status: '',
    format: '',
    cost: '',
  });

  useEffect(() => {
    let result = opportunities;

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        result = result.filter(
          (opportunity) => opportunity[key as keyof Opportunity] === value
        );
      }
    });

    setFilteredOpportunities(result);
  }, [filters, opportunities]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className={styles.eventFilterWrapper}>
      <div className={styles.filterContainer}>
        <div className={styles.filterGroup}>
          <label htmlFor="type">Opportunity Type</label>
          <select name="type" onChange={handleChange} value={filters.type}>
            <option value="">All Types</option>
            <option value="Internship">Internship</option>
            <option value="Fellowship">Fellowship</option>
            <option value="Volunteer">Volunteer</option>
            <option value="Job">Job</option>
            <option value="Grants">Grants</option>
            <option value="Scholarships">Scholarships</option>
            <option value="Research Assistantship">
              Research Assistantship
            </option>
            <option value="Postdoctoral Fellowships">
              Postdoctoral Fellowships
            </option>
            <option value="Exchange programs">Exchange programs</option>
            <option value="Training">Training</option>
            <option value="Online courses">Online courses</option>
            <option value="Awards/Competitions">Awards/Competitions</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="locationType">Location</label>
          <select
            name="locationType"
            onChange={handleChange}
            value={filters.locationType}
          >
            <option value="">All Locations</option>
            <option value="National">National</option>
            <option value="International">International</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="province">Province</label>
          <select
            name="province"
            onChange={handleChange}
            value={filters.province}
          >
            <option value="">All Provinces</option>
            <option value="Koshi">Koshi</option>
            <option value="Madhesh">Madhesh</option>
            <option value="Bagmati">Bagmati</option>
            <option value="Gandaki">Gandaki</option>
            <option value="Lumbini">Lumbini</option>
            <option value="Karnali">Karnali</option>
            <option value="Sudurpaschim">Sudurpaschim</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="status">Status</label>
          <select name="status" onChange={handleChange} value={filters.status}>
            <option value="">All Status</option>
            <option value="Open">Open</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="format">Format</label>
          <select name="format" onChange={handleChange} value={filters.format}>
            <option value="">All Formats</option>
            <option value="Physical">Physical</option>
            <option value="Online">Online</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="cost">Cost</label>
          <select name="cost" onChange={handleChange} value={filters.cost}>
            <option value="">All Cost Types</option>
            <option value="Fully Funded">Fully Funded</option>
            <option value="Partially Funded">Partially Funded</option>
            <option value="Paid">Paid</option>
            <option value="Free">Free</option>
          </select>
        </div>
      </div>

      {/* Card display */}
      <div className={styles.cardContainerWrapper}>
        <CardContainer
          cardsArray={filteredOpportunities}
          dataType="opportunities"
          cardProfilePictureBgSize="cover"
          cardPadding="0px"
          initialCardCount={8}
        />
      </div>
    </div>
  );
};

export default OpportunityFilter;

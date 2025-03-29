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

const filterOptions = [
  {
    name: 'type',
    label: 'Opportunity Type',
    defaultOption: 'All Types',
    options: [
      'Internship',
      'Fellowship',
      'Volunteer',
      'Job',
      'Grants',
      'Scholarships',
      'Research Assistantship',
      'Postdoctoral Fellowships',
      'Exchange programs',
      'Training',
      'Online courses',
      'Awards/Competitions',
    ],
  },
  {
    name: 'locationType',
    label: 'Location',
    defaultOption: 'All Locations',
    options: ['National', 'International'],
  },
  {
    name: 'province',
    label: 'Province',
    defaultOption: 'All Provinces',
    options: [
      'Koshi',
      'Madhesh',
      'Bagmati',
      'Gandaki',
      'Lumbini',
      'Karnali',
      'Sudurpaschim',
    ],
  },
  {
    name: 'status',
    label: 'Status',
    defaultOption: 'All Status',
    options: ['Open', 'Upcoming', 'Closed'],
  },
  {
    name: 'format',
    label: 'Format',
    defaultOption: 'All Formats',
    options: ['Physical', 'Online', 'Hybrid'],
  },
  {
    name: 'cost',
    label: 'Cost',
    defaultOption: 'All Cost Types',
    options: ['Fully Funded', 'Partially Funded', 'Paid', 'Free'],
  },
];

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
        {filterOptions.map(({ name, label, defaultOption, options }) => (
          <div className={styles.filterGroup} key={name}>
            <label htmlFor={name}>{label}</label>
            <select
              name={name}
              onChange={handleChange}
              value={filters[name as keyof typeof filters]}
            >
              <option value="">{defaultOption}</option>
              {options.map((option) => (
                <option value={option} key={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}
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

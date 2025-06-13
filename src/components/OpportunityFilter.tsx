import type React from 'react';
import { useEffect, useState } from 'react';
import styles from '../styles/components/Opportunities.module.css';
import { CardContainer } from './CardContainer';

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
      'Scholarship',
      'Training',
      'Grant',
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
  {
    name: 'category',
    label: 'Category',
    defaultOption: 'All Categories',
    options: [
      'Climate Mitigation',
      'Climate Adaptation',
      'Climate Activism & Advocacy',
      'Climate Justice',
      'Social Equity',
      'Gender and Climate',
      'Youth Empowerment',
      'Climate Litigation',
      'Research & Education',
      'Science Communication',
      'Media Communication',
      'Indigenous Knowledge',
      'Climate and Mental Health',
      'Ecosystem Conservation',
      'Wildlife & Biodiversity',
      'Renewable Energy',
      'Environment',
      'Sustainability',
      'Pollution & Waste Management',
      'Circular Economy',
      'Transportation & Mobility',
      'Nature-Based Solutions',
      'Carbon Sequestration',
      'Food, Water & Agriculture',
      'Disaster Risk Management',
      'Community Resilience',
      'Climate Finance',
      'Carbon Markets',
      'Loss & Damage',
      'Climate Technology',
      'Digital Solutions',
      'Climate Policy',
      'Climate Diplomacy',
    ],
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
    category: '',
  });

  useEffect(() => {
    let result = opportunities;

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        if (key === 'category') {
          result = result.filter((opportunity) =>
            opportunity.category.some((cat) => cat.trim() === value.trim())
          );
        } else {
          result = result.filter(
            (opportunity) => opportunity[key as keyof Opportunity] === value
          );
        }
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

      {/* Check if no opportunities are found */}
      <div className={styles.cardNotFoundMessage}>
        {filteredOpportunities.length === 0 ? (
          <p className={styles.noResults}> No opportunities found.</p>
        ) : (
          <CardContainer
            cardsArray={filteredOpportunities}
            dataType="opportunities"
            cardProfilePictureBgSize="cover"
            cardPadding="0px"
            initialCardCount={8}
          />
        )}
      </div>
    </div>
  );
};

export default OpportunityFilter;

import type React from 'react';
import { useEffect, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import styles from '../styles/components/EventFilter.module.css';
import { CardContainer } from './CardContainer';

interface Event {
  id: string | number;
  title: string;
  type: string;
  location: string;
  province: string;
  status: string;
  format: string;
  cost: string;
  category: string[];
}

interface Props {
  events: Event[];
}

const filterOptions = [
  {
    name: 'type',
    label: 'Event Type',
    defaultOption: 'All Types',
    options: [
      'Conference',
      'Side Event',
      'Seminar',
      'Summit',
      'Symposium',
      'Webinar',
      'Workshop',
    ],
  },
  {
    name: 'location',
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
    options: ['In-person', 'Virtual', 'Hybrid'],
  },
  {
    name: 'cost',
    label: 'Cost',
    defaultOption: 'All Cost Types',
    options: [
      'Fully Funded',
      'Partially Funded',
      'Paid',
      'Free',
      'Invite only',
    ],
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

const EventFilter: React.FC<Props> = ({ events }) => {
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [filters, setFilters] = useState({
    type: '',
    location: '',
    province: '',
    status: '',
    format: '',
    cost: '',
    category: '',
  });

  useEffect(() => {
    let result = events;

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        if (key === 'category') {
          result = result.filter((event) =>
            event.category.some((cat) => cat === value)
          );
        } else {
          result = result.filter(
            (event) => event[key as keyof Event] === value
          );
        }
      }
    });

    setFilteredEvents(result);
  }, [filters, events]);

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
            <span className={styles.menuDropdown}>
              <FaChevronDown />
            </span>
          </div>
        ))}
      </div>

      {/* Check if no events are found */}
      <div className={styles.cardNotFoundMessage}>
        {filteredEvents.length === 0 ? (
          <p className={styles.noResults}> No events found.</p>
        ) : (
          <CardContainer
            cardsArray={filteredEvents}
            dataType="events"
            cardProfilePictureBgSize="cover"
            cardPadding="0px"
            initialCardCount={8}
          />
        )}
      </div>
    </div>
  );
};

export default EventFilter;

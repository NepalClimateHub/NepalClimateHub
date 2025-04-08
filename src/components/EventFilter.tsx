import type React from 'react';
import { useState, useEffect } from 'react';
import { CardContainer } from './CardContainer';
import styles from '../styles/components/EventFilter.module.css';

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
    options: ['Fully Funded', 'Partially Funded', 'Paid', 'Free'],
  },
  {
    name: 'category',
    label: 'Category',
    defaultOption: 'All Categories',
    options: [
      'Climate Action',
      'Youth Leadership',
      'Sustainability',
      'Climate Policy',
      'Environmental Advocacy',
      'Public Engagement',
      'Renewable Energy',
      'Technology',
      'Innovation',
      'Community Engagement',
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
          </div>
        ))}
      </div>

      {/* Card display */}
      <div className={styles.cardContainerWrapper}>
        <CardContainer
          cardsArray={filteredEvents}
          dataType="events"
          cardProfilePictureBgSize="cover"
          cardPadding="0px"
          initialCardCount={8}
        />
      </div>
    </div>
  );
};

export default EventFilter;

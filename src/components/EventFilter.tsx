import type React from 'react';
import { useEffect, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import styles from '../styles/components/EventFilter.module.css';
import { CardContainer } from './CardContainer';

interface Event {
  id: string | number;
  title: string;
  type: string;
  locationType: string;
  status: string;
  format: string;
  cost: string;
  category: string[];
  address: {
    street: string | null;
    city: string | null;
    state: string | null;
    zip: string | null;
    country: string | null;
  };
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
      'March',
      'Event',
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
      'All 7 provinces',
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
  console.log('Raw events data:', events);
  const [filteredEvents, setFilteredEvents] = useState(events);
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
    console.log(
      'Event statuses:',
      events.map((event) => ({
        id: event.id,
        status: event.status,
      }))
    );
    console.log('Current filters:', filters);

    let result = events;

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        console.log(`Applying filter: ${key} = "${value}"`);
        if (key === 'category') {
          result = result.filter((event) =>
            event.category.some((cat) => cat.trim() === value.trim())
          );
        } else if (key === 'province') {
          result = result.filter(
            (event) => event.address?.state?.trim() === value.trim()
          );
        } else if (key === 'locationType') {
          result = result.filter(
            (event) => event.locationType?.trim() === value.trim()
          );
        } else if (key === 'cost') {
          result = result.filter((event) => {
            const eventCost = event.cost ? event.cost.trim() : '';
            return (
              eventCost === value.trim() ||
              (eventCost === '' && value === 'Free')
            );
          });
        } else if (key === 'type') {
          result = result.filter((event) => {
            const eventType = event.type ? event.type.trim() : '';
            return eventType === value.trim();
          });
        } else {
          result = result.filter((event) => {
            const eventValue = event[key as keyof Event] as string;
            const isMatch = eventValue
              ? eventValue.trim() === value.trim()
              : false;
            console.log(
              `Event ${event.id} ${key}: "${eventValue}" vs "${value}" -> Match: ${isMatch}`
            );
            return isMatch;
          });
        }
        console.log(`After ${key} filter:`, result);
      }
    });

    setFilteredEvents(result);
    console.log('Filtered events:', result);
  }, [filters, events]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    console.log(`Filter changed: ${name} = "${value}"`);
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetFilters = () => {
    console.log('Resetting filters');
    setFilters({
      type: '',
      locationType: '',
      province: '',
      status: '',
      format: '',
      cost: '',
      category: '',
    });
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
        <button onClick={resetFilters} className={styles.resetButton}>
          Reset Filters
        </button>
      </div>

      <div className={styles.cardNotFoundMessage}>
        {filteredEvents.length === 0 ? (
          <p className={styles.noResults}>No events found.</p>
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

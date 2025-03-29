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
}

interface Props {
  events: Event[];
}

const EventFilter: React.FC<Props> = ({ events }) => {
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [filters, setFilters] = useState({
    type: '',
    location: '',
    province: '',
    status: '',
    format: '',
    cost: '',
  });

  useEffect(() => {
    let result = events;

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        result = result.filter((event) => event[key as keyof Event] === value);
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
        <div className={styles.filterGroup}>
          <label htmlFor="type">Event Type</label>
          <select name="type" onChange={handleChange} value={filters.type}>
            <option value="">All Types</option>
            <option value="Conference">Conference</option>
            <option value="Side Event">Side Event</option>
            <option value="Seminar">Seminar</option>
            <option value="Summit">Summit</option>
            <option value="Symposium">Symposium</option>
            <option value="Webinar">Webinar</option>
            <option value="Workshop">Workshop</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="location">Location</label>
          <select
            name="location"
            onChange={handleChange}
            value={filters.location}
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
            <option value="In-person">In-person</option>
            <option value="Virtual">Virtual</option>
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

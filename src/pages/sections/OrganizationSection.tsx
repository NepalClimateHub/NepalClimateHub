import { CardContainer } from '../../components/CardContainer';

interface OrganizationListing {
  id: number;
  name: string;
  description: string;
  address: string;
  tags: string[];
  logoUrl: string;
  slug: string;
}

interface OrganizationSectionProps {
  cardsArray: OrganizationListing[];
}

const Organization = ({ cardsArray }: OrganizationSectionProps) => {
  return (
    <section className="organization-cards-section">
      <CardContainer
        cardsArray={cardsArray}
        dataType="organization"
        initialCardCount="12/"
      />
    </section>
  );
};

export const OrganizationSection = Organization;

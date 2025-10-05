import { NuqsAdapter } from 'nuqs/adapters/react';
import { CardContainer } from '../../components/CardContainer';
import OrganizationsJSON from '../../data/organizations.json';
import { usePagination } from '../../hooks/use-pagination';
import { withNuqsAdapter } from '../../provider/nuqsProvider';

const Organization = () => {
  const paginationOptions = usePagination();
  const { pagination, currentPage } = paginationOptions;
  const totalCount = 300;

  return (
    <>
      <NuqsAdapter>
        <section className="organization-cards-section">
          <CardContainer
            cardsArray={OrganizationsJSON}
            dataType="organization"
            initialCardCount="12/"
          />
        </section>
        {/* <div className="!py-4">
          <Paginator
            paginationOptions={paginationOptions}
            totalCount={totalCount}
          />
        </div> */}
      </NuqsAdapter>
    </>
  );
};

export const OrganizationSection = withNuqsAdapter(Organization);

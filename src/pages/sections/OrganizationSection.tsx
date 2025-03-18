import { CardContainer } from '@components/CardContainer';
import { Paginator } from '@components/Paginator';
import { NuqsAdapter } from 'nuqs/adapters/react';
import { usePagination } from 'src/hooks/use-pagination';
import { withNuqsAdapter } from 'src/provider/nuqsProvider';
import OrganizationsJSON from '../../data/organizations.json';

const Organization = () => {
  const paginationOptions = usePagination();
  const { pagination, currentPage } = paginationOptions;
  const totalCount = 300;

  console.log({
    pagination,
    currentPage,
  });

  return (
    <>
      <NuqsAdapter>
        <section className="organization-cards-section">
          <CardContainer
            cardsArray={OrganizationsJSON}
            dataType="organization"
            cardProfilePictureBgSize="contain"
            cardPadding="4px 8px"
            initialCardCount="12/"
          />
        </section>
        <div className="!py-4">
          <Paginator
            paginationOptions={paginationOptions}
            totalCount={totalCount}
          />
        </div>
      </NuqsAdapter>
    </>
  );
};

export const OrganizationSection = withNuqsAdapter(Organization);

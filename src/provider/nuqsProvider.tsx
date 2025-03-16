import { NuqsAdapter } from "nuqs/adapters/react";

type WrappedComponentProps = React.ComponentProps<any>;

export const withNuqsAdapter = <P extends WrappedComponentProps>(
  WrappedComponent: React.ComponentType<P>,
) => {
  return function WithWrapper(props: P) {
    return (
      <NuqsAdapter>
        {/* @ts-expect-error wrong types */}
        <WrappedComponent {...props} />
      </NuqsAdapter>
    );
  };
};

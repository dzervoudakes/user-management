import React, { lazy, Suspense } from 'react';
import LoadingIndicator from '@shared/LoadingIndicator';

const dynamicImport = (ImportComponent: () => any): any => {
  const C: React.ComponentType = lazy(ImportComponent);

  const DynamicImport = (props: any): React.ReactElement => (
    <Suspense fallback={<LoadingIndicator />}>
      <C {...props} />
    </Suspense>
  );

  const displayName = C.displayName || C.name || 'Component';
  DynamicImport.displayName = `dynamicImport(${displayName})`;

  return DynamicImport;
};

export default dynamicImport;

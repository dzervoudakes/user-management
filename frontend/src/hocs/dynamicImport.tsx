/**
 * HOC that dynamically imports new component bundles when needed.
 * @packageDocumentation
 */
import React, { lazy, Suspense } from 'react';
import LoadingIndicator from '@src/components/LoadingIndicator';

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

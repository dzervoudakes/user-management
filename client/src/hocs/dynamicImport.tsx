/**
 * HOC that dynamically imports component chunks.
 * @packageDocumentation
 */
import { lazy, Suspense } from 'react';
import LoadingIndicator from '@src/components/LoadingIndicator';

type ImportComponentType = () => Promise<{ default: React.ComponentType }>;

export const dynamicImport = (
  ImportComponent: ImportComponentType
): React.ComponentType => {
  const C: React.ComponentType = lazy(ImportComponent);

  const DynamicImport = (props: Record<string, unknown>): React.ReactElement => (
    <Suspense fallback={<LoadingIndicator />}>
      <C {...props} />
    </Suspense>
  );

  const displayName = C.displayName || C.name || 'Component';
  DynamicImport.displayName = `dynamicImport(${displayName})`;

  return DynamicImport;
};

export default dynamicImport;

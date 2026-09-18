'use client';

import { useEffect } from 'react';
import { captureAndPersistUtm } from '@/lib/utm/storage';

export const UtmInitializer: React.FC = () => {
  useEffect(() => {
    captureAndPersistUtm();
  }, []);

  return null;
};

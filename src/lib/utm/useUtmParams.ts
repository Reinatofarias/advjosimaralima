'use client';

import { useState, useEffect } from 'react';
import { captureAndPersistUtm, getSavedUtm, UtmParams } from './storage';

export function useUtmParams(): UtmParams {
  const [params, setParams] = useState<UtmParams>({});

  useEffect(() => {
    const data = captureAndPersistUtm();
    setParams(data);
  }, []);

  return params;
}

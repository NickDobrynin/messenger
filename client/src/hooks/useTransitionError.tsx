import {useState, useEffect} from 'react';

const useTransitionError = (errorName: string | undefined, errorTouched: boolean | undefined): [(string | undefined), (boolean | undefined)] => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>(errorName);
  const [hasError, setHasError] = useState<boolean | undefined>(Boolean(errorName && errorTouched));

  useEffect(() => {
    setHasError(Boolean(errorName && errorTouched));
    if (errorName && errorTouched) {
      if (!errorMessage) {
        setErrorMessage(errorName);
      } else {
        setTimeout(() => {
          setErrorMessage(errorName);
        }, 500);
      }
    } else if (!errorName) {
      if (!errorMessage) {
        setErrorMessage(errorName);
      } else {
        setTimeout(() => {
          setErrorMessage(errorName);
        }, 500);
      }
    }
  }, [errorMessage, errorName, errorTouched]);

  return [errorMessage, hasError];
};

export default useTransitionError;
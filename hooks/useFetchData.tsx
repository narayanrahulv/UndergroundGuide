import {useEffect, useState} from 'react';
import {useFetchDataProps} from '../dataFolder/appTypes';
import {useFetchHookReturnedData} from '../dataFolder/appTypes';

export function useFetchData(
  props: useFetchDataProps,
): useFetchHookReturnedData {
  const {apiURL} = props;

  const [dataLoadingState, setIsDataLoading] = useState(true);
  const [dataRetrievalErrorState, setDataRetrievalError] = useState(null);
  const [dataRetrievedState, setDataRetrieved] = useState();

  useEffect(() => {
    fetch(apiURL)
      .then(resp => resp.json())
      .then(data => {
        setDataRetrieved(data);
      })
      .catch(error => {
        setDataRetrievalError(error);
      })
      .finally(() => {
        setIsDataLoading(false);
      });
  }, [apiURL]);

  return {
    dataLoading: dataLoadingState,
    dataRetrievalError: dataRetrievalErrorState,
    dataRetrieved: dataRetrievedState,
  };
}

import {useState, useEffect} from 'react';
import {useFetchDataProps, HighLevelLineStatus} from '../dataFolder/appTypes';

const useFetchData = (props: useFetchDataProps) => {
  const {apiURL, section} = props;

  const initLineStatus: HighLevelLineStatus[] = [];

  const [dataLoading, setIsDataLoading] = useState(true);
  const [dataRetrievalError, setDataRetrievalError] = useState(null);
  const [dataRetrieved, setDataRetrieved] = useState(
    section === 'status' ? initLineStatus : null,
  );

  useEffect(() => {
    fetch(apiURL)
      .then(resp => resp.json())
      .then(data => setDataRetrieved(data))
      .catch(error => setDataRetrievalError(error))
      .finally(() => setIsDataLoading(false));
  }, [apiURL]);

  return {dataLoading, dataRetrievalError, dataRetrieved};
};

export default useFetchData;

import {useState, useEffect} from 'react';
import {useFetchDataProps} from '../dataFolder/appTypes';
import {LineStatusDetails} from '../dataFolder/models/lineStatusModels';

const useFetchData = (props: useFetchDataProps) => {
  const {apiURL} = props;

  const initLineStatus: LineStatusDetails[] = [];

  const [dataLoading, setIsDataLoading] = useState(true);
  const [dataRetrievalError, setDataRetrievalError] = useState(null);

  const [dataRetrieved, setDataRetrieved] = useState(initLineStatus);

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

import {useState, useEffect} from 'react';
import {
  useFetchDataProps,
  HighLevelLineStatus,
  lineSummarySections,
  LineModeTubeNames,
} from '../dataFolder/appTypes';

const useFetchData = (props: useFetchDataProps) => {
  const {apiURL, section} = props;

  const initLineStatus: HighLevelLineStatus[] = [];

  const initLineNames: LineModeTubeNames[] = [];

  const initStatusBySection = (
    sectionName: lineSummarySections | undefined,
  ): LineModeTubeNames[] | HighLevelLineStatus[] | null => {
    switch (sectionName) {
      case 'status':
        return initLineStatus;
      case 'basic':
        return initLineNames;
    }

    return null;
  };

  const [dataLoading, setIsDataLoading] = useState(true);
  const [dataRetrievalError, setDataRetrievalError] = useState(null);

  const [dataRetrieved, setDataRetrieved] = useState(
    initStatusBySection(section),
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

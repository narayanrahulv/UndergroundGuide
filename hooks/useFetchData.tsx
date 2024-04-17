import axios from 'axios';
import {useQuery} from 'react-query';
import {useFetchDataProps} from '../dataFolder/appTypes';

export function useFetchData(props: useFetchDataProps): any {
  const {apiURL, section} = props;

  const {isLoading, error, data} = useQuery(
    section === 'lineStatus' ? 'fetchLineData' : 'fetchLineStops',
    () => axios(apiURL),
  );

  return {
    isLoading: isLoading,
    error: error,
    data: data,
  };
}

import { Country, State, City }  from 'country-state-city';


const countryCode = 'PT';
const country = Country.getCountryByCode(countryCode);
const states = State.getStatesOfCountry(countryCode);

const formatteStates = states.map((state) => ({
  value : state.isoCode,
  label : state.name,
  latitude : state.latitude,
  longitude : state.longitude
}));


const useStateCities = () => {
  const getAll = () => formatteStates;

  const getByValue = (value : string) => {
    return formatteStates.find((item) => item.value === value);
  }

  return {
    getAll,
    getByValue,
  }

}; 

export default useStateCities
  
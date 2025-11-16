const CountryCard = ({ countryList }) => {
  return (
    <div className='country-container'>
      {countryList?.length > 0 &&
        countryList.map((country) => (
          <div className='country-card' key={country.name}>
            <img src={country.flag} alt={country.name} />
            <div className='country-text'>
              <div className='country-name'>{country.name}</div>
              <div className='country-region'>{country.region}</div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default CountryCard;

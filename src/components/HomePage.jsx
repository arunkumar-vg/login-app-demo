import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { updateRegion } from '../redux/authSlice';
import ImageIcon from '../assets/image-icon.jpg';
import ImageIcon2 from '../assets/image-icon2.jpg';
import Slider from './Slider';
import CountryCard from './CountryCard';
import SocialMediaGroup2 from './SocialMediaGroup2';

const Home = () => {
  const dispatch = useDispatch();

  const [region, setRegion] = useState('all');
  const [countryList, setCountryList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCountryCount, setVisibleCountryCount] = useState(0);

  const regions = [
    { label: 'All', key: 'all' },
    { label: 'Asia', key: 'asia' },
    { label: 'Europe', key: 'europe' },
  ];

  const imageArray = [
    { id: 0, image: ImageIcon },
    { id: 1, image: ImageIcon2 },
    { id: 2, image: ImageIcon },
    { id: 3, image: ImageIcon2 },
  ];

  const getCountries = async (continentName = 'all') => {
    const URL =
      continentName === 'all'
        ? 'https://restcountries.com/v2/all?fields=name,region,flag'
        : `https://restcountries.com/v2/region/${continentName}?fields=name,region,flag`;

    axios
      .get(URL)
      .then((response) => {
        setCountryList(response.data);
        setVisibleCountryCount(12);
        setRegion(continentName);
      })
      .catch((error) => {
        alert(error?.response?.data?.message || 'Failed to load region data');
      });
  };

  const showCountries = countryList.slice(0, visibleCountryCount);

  const loadMore = () => {
    setVisibleCountryCount((prev) => prev + 12);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imageArray.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === imageArray.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const updateCountryList = (value) => {
    getCountries(value);
    dispatch(updateRegion(value));
  };

  const selectedRegion = useSelector((state) => state.auth.region);

  useEffect(() => {
    getCountries(selectedRegion);
  }, [selectedRegion]);

  return (
    <div className='listing-page'>
      <div className='header d-flex align-items-center'>
        <span className='heading'>Countries</span>

        <Button className='menu-btn'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='30'
            height='30'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='lucide lucide-menu-icon lucide-menu'
          >
            <path d='M4 5h16' />
            <path d='M4 12h16' />
            <path d='M4 19h16' />
          </svg>
          <div className='dropdown-menu'>
            {regions?.map((item) => {
              return (
                <div
                  className={`dropdown-item ${
                    item.key === region ? 'active' : ''
                  }`}
                  key={item.key}
                  onClick={() => {
                    updateCountryList(item.key);
                  }}
                >
                  <span>{item.label}</span>
                </div>
              );
            })}
          </div>
        </Button>

        <div className='region-tabs'>
          {regions?.map((item) => {
            return (
              <div
                className={`tab-name ${item.key === region ? 'active' : ''}`}
                key={item.key}
                onClick={() => {
                  updateCountryList(item.key);
                }}
              >
                <span>{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className='welcome-header'>WELCOME</div>

      <Slider
        imageArray={imageArray}
        currentIndex={currentIndex}
        goToPrevious={goToPrevious}
        goToSlide={goToSlide}
        goToNext={goToNext}
      />

      <CountryCard countryList={showCountries} />

      {(visibleCountryCount < countryList?.length) && (
        <div className='d-flex justify-content-center'>
          <Button type='button' className='load-more-btn' onClick={loadMore}>
            Load more
          </Button>
        </div>
      )}

      <div className='contact-container'>
        <SocialMediaGroup2 />
        <div className='copy-right-text'>
          <div>Example@email.com</div>
          <div>Copyright © 2020 Name. All rights reserved.</div>
        </div>
      </div>
    </div>
  );
};

export default Home;

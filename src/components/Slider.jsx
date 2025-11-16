import { Button } from 'react-bootstrap';

const Slider = ({
  imageArray,
  currentIndex,
  goToPrevious,
  goToSlide,
  goToNext,
}) => {
  return (
    <>
      <div className='img-slider'>
        {imageArray?.map((item) => {
          return (
            <div
              className={`img-container ${
                item.id === currentIndex ? '' : 'd-none'
              }`}
              key={item.id}
            >
              <img src={item.image} width='15%' alt='' />
            </div>
          );
        })}
        <div className='img-container small'>
          <img
            src={imageArray[(currentIndex + 1) % imageArray.length].image}
            width='50%'
            alt=''
          />
        </div>
      </div>

      <div className='slider-btn-group'>
        <Button onClick={goToPrevious} className='slider-btn'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='lucide lucide-arrow-left-icon lucide-arrow-left'
          >
            <path d='m12 19-7-7 7-7' />
            <path d='M19 12H5' />
          </svg>
        </Button>

        <div className='dot-group'>
          {imageArray.map((_, index) => (
            <Button
              key={index}
              onClick={() => goToSlide(index)}
              className={`slider-btn dot ${
                index === currentIndex ? 'active' : ''
              }`}
            />
          ))}
        </div>

        <Button onClick={goToNext} className='slider-btn last-btn'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='lucide lucide-arrow-right-icon lucide-arrow-right'
          >
            <path d='M5 12h14' />
            <path d='m12 5 7 7-7 7' />
          </svg>
        </Button>
      </div>
    </>
  );
};

export default Slider;

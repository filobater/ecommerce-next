import { Carousel } from 'antd';

const ProductsCarousel = () => {
  const commonContentStyle = {
    margin: 0,

    height: '80vh',

    color: '#fff',
    textAlign: 'center',
    borderRadius: '4px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    fontSize: '6rem',
    textTransform: 'capitalize',
  };

  const contentStyleLap = {
    backgroundImage:
      'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(0,0,0,0.5) 0%),url(/assets/lap.jpg)',
  };
  const contentStyleMobile = {
    backgroundImage:
      'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(0,0,0,0.5) 0%),url(/assets/mobile.jpg)',
  };
  const contentStyleShoes = {
    backgroundImage:
      'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(0,0,0,0.5) 0%),url(/assets/shoes.jpg)',
  };
  const contentStyleCosmetic = {
    backgroundImage:
      'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(0,0,0,0.5) 0%),url(/assets/cosmetic.jpg)',
  };

  return (
    <Carousel autoplay>
      <div>
        <p style={{ ...commonContentStyle, ...contentStyleLap }}>laptops</p>
      </div>
      <div>
        <p style={{ ...commonContentStyle, ...contentStyleMobile }}>phones</p>
      </div>
      <div>
        <p style={{ ...commonContentStyle, ...contentStyleShoes }}>shoes</p>
      </div>
      <div>
        <p style={{ ...commonContentStyle, ...contentStyleCosmetic }}>makeup</p>
      </div>
    </Carousel>
  );
};

export default ProductsCarousel;

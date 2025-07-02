import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules'; 
const slides = [
  {
    title: 'Welcome to Our Library',
    description: 'Explore a wide range of knowledge and stories.',
    img: 'https://i.ibb.co/svdPjbqB/books-2617938-1280.jpg'
  },
  {
    title: 'Borrow Books with Ease',
    description: 'Track borrowed and returned books online.',
    img: 'https://i.ibb.co/sJszY615/book-2593398-1280.jpg'
  },
  {
    title: 'Expand Your Mind',
    description: 'Discover books from all categories.',
    img: 'https://i.ibb.co/gM356C9m/writing-923882-1280.jpg'
  }
];

const Banner = () => {
  return (
    <Swiper
      navigation={true}
      autoplay={{ delay: 3000, disableOnInteraction: false }} 
      modules={[Navigation, Autoplay]} 
      className="mySwiper h-[400px] rounded-xl overflow-hidden mb-8"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div
            className="w-full h-full bg-cover bg-center flex flex-col justify-center items-center text-white text-center p-4"
            style={{ backgroundImage: `url(${slide.img})` }}
          >
            <div className="bg-black/60 p-6 rounded">
              <h2 className="text-3xl font-bold">{slide.title}</h2>
              <p className="text-lg mt-2">{slide.description}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Banner;

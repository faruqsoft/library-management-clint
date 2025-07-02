import { useEffect, useState } from 'react';
import Banner from '../components/Banner';
import BookCategories from '../components/BookCategories';
import Spinner from '../components/Spinner';
import WhyChoose from '../components/WhyChoose';
import FAQ from '../components/FAQ';
import CustomerFed from '../components/CustomerFed';

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay (e.g., waiting for data fetch or animations)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // adjust duration if needed

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="p-4">
      <Banner />
      <BookCategories />
      <FAQ />
      <WhyChoose />
      <CustomerFed />
     
    </div>
  );
};

export default Home;

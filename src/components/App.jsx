import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchQuery } from '../api/api';
import ImageGallery from './ImageGallery/ImageGallery';
import '../styles.css';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import Button from './Button/Button';

export default function App() {
  const [imageName, setImageName] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);


    const handleSearch = ({ imageName }) => {
    setImageName(imageName);
    setItems([]);
    setPage(1);
  };

  // useEffect(() => {
  //   if (!imageName) {
  //     return;
  //   }
  //   // setLoading(true);
  //   fetchImages(imageName, page);
  // }, [imageName, page]);

  // const fetchImages = async (imageName, page) => {
  //   setLoading(true);
  //   const list = await fetchQuery(imageName, page);
  //   setItems(prevState => [...prevState, ...list.hits]);
  //   console.log('list.hits.length', list.hits.length);
  //   // setImageName(imageName);
  //   setLoading(false);
  //   const total = list.totalHits;
  //   const noRenderImage = total - 12 * page;

  //   noRenderImage > 0 ? setShowBtn(true) : setShowBtn(false);
    
  // };
useEffect(() => {
    if (!imageName) return;

    const fetchGallery = async (imageName,page) => {
      try {
        setLoading(true);
        const response = await fetchQuery(imageName, page);
        setItems(prevState => [...prevState, ...response]);
        if (response.length < 12) {
          setShowBtn(false);
        }
        if (response.length === 12) {
          setShowBtn(true);
        }
        if (response.length === 0) {
          alert('No matches found!');
        }
      } catch (error) {
        console.log('Error');
      } finally {
        setLoading(false);
      }
  };
  
    fetchGallery();
  }, [page, imageName]);

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);

  };

  const onClickImage = url => {
    setShowModal(true);
    setLargeImageURL(url);
  };

  const onModalClose = () => {
    setShowModal(false);
    setLargeImageURL('');
  };

  return (
    <div>
      <Searchbar onSearch={handleSearch} />
      <ImageGallery list={items} onClickImage={onClickImage} />
      {showModal && (
        <Modal largeImageURL={largeImageURL} onModalClose={onModalClose} />
      )}
      {loading && <Loader />}
      {showBtn && <Button onClick={onLoadMore} />}
    </div>
  );
}

import { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
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

  useEffect(() => {
    if (!imageName) {
      return;
    }
    // setLoading(true);
    handleFormSearch(imageName, page);
  }, [imageName, page]);

  const handleFormSearch = async (imageName, page) => {
    setLoading(true);
    const list = await fetchQuery(imageName, page);
    setItems(prevState => [...prevState, ...list.hits]);
    setImageName(imageName);
    setLoading(false);
    const total = list.totalHits;
    const noRenderImage = total - 12 * page;

    noRenderImage > 0 ? setShowBtn(true) : setShowBtn(false);
  };

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);

    //  fetchQuery(imageName, page).then(resp => {
    //    const total = resp.totalHits;
    //    const noRenderImage = total - 12 * page;

    //   noRenderImage > 0
    //     ? setShowBtn(true)
    //      : setShowBtn(false);

    //    setItems(prevState => [...prevState, ...resp.hits]);
    //   })
    //  setLoading(false);
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
      <Searchbar onSearch={handleFormSearch} />
      <ImageGallery list={items} onClickImage={onClickImage} />
      {showModal && (
        <Modal largeImageURL={largeImageURL} onModalClose={onModalClose} />
      )}
      {loading && <Loader />}
      {showBtn && <Button onClick={onLoadMore} />}
    </div>
  );
}

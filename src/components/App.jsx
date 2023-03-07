import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { fetchQuery } from '../api/api';
import ImageGallery from './ImageGallery/ImageGallery';
import '../styles.css';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import Button from './Button/Button';

export class App extends Component {
  state = {
    imageName: '',
    loading: false,
    items: [],
    showModal: false,
    largeImageURL: '',
    showBtn: false,
  };

  handleFormSearch = async (imageName, page = 1) => {
    this.setState({ loading: true });
    const list = await fetchQuery(imageName, page);
    this.setState({
      items: list.hits,
      imageName,
      page,
      loading: false,
      showBtn: true,
    });
  };

  onLoadMore = async () => {
    await this.setState(state => ({ page: (state.page += 1), loading: true }));

    const { imageName, page } = this.state;
    const resp = await fetchQuery(imageName, page);

    const total = resp.totalHits;
    const noRenderImage = total - 12 * this.state.page;

    noRenderImage > 0
      ? this.setState({ showBtn: true })
      : this.setState({ showBtn: false });

    this.setState(state => ({
      items: [...state.items, ...resp.hits],
      loading: false,
    }));
  };

  onClickImage = url => {
    this.setState({ showModal: true, largeImageURL: url });
  };

  onModalClose = () => {
    this.setState({ showModal: false, largeImageURL: '' });
  };

  render() {
    const { items, showModal, largeImageURL, loading, showBtn } = this.state;
    return (
      <div>
        <Searchbar onSearch={this.handleFormSearch} />
        <ImageGallery list={items} onClickImage={this.onClickImage} />
        {showModal && (
          <Modal
            largeImageURL={largeImageURL}
            onModalClose={this.onModalClose}
          />
        )}
        {loading && <Loader />}
        {showBtn && <Button onClick={this.onLoadMore} />}
      </div>
    );
  }
}

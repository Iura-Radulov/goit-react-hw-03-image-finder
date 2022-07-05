import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import axios from 'axios';
import Notiflix from 'notiflix';
import ImageGallery from './ImageGallery';
import Modal from './Modal';
import Loader from './Loader';
import Button from './Button';

const API_KEY = '27514319-3f71a34bdf3e844d254f7bad1';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export class App extends Component {
  state = {
    images: [],
    value: '',
    page: 1,
    largeImage: '',
    showModal: false,
    loading: false,
    showLoadMore: false,
  };

  componentDidUpdate(_, prevState) {
    const { page, value, images } = this.state;
    if (prevState.page !== page || prevState.value !== value) {
      this.setState({ loading: true });
      this.fetchData()
        .then(resivedData => {
          const data = resivedData;
          this.setState(prevState => ({
            images: [...prevState.images, ...data.hits],
            loading: false,
          }));
          if (data.total !== data.hits.length) {
            this.setState({ showLoadMore: true });
          }
          if (data.total <= images.length + 12) {
            this.setState({ showLoadMore: false });
            Notiflix.Notify.info(
              "We're sorry, but you've reached the end of search results."
            );
          }
        })
        .catch(this.onApiError);
    }
  }

  searchValue = inputValue => {
    this.setState({
      value: inputValue,
      page: 1,
      images: [],
      showLoadMore: false,
    });
  };

  fetchData = async () => {
    this.setState({ loading: true });
    const { value, page } = this.state;
    const response = await axios.get(
      `/?q=${value}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );
    const responseData = await response.data;
    if (!responseData.total) {
      return Promise.reject(new Error(`No image with name ${value}`));
    }
    return responseData;
  };

  onApiError = () => {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    this.setState({ loading: false, showLoadMore: false });
  };

  showMore = () => {
    this.setState(prevStep => ({ page: prevStep.page + 1 }));
  };
  handleModal = image => {
    this.setState({ showModal: true, largeImage: image });
  };
  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { images, showModal, largeImage, loading, showLoadMore } = this.state;
    return (
      <div className="app">
        <Searchbar onSubmit={this.searchValue} />
        {images.length > 0 && (
          <ImageGallery images={images} onModal={this.handleModal} />
        )}
        {showModal && (
          <Modal largeImage={largeImage} closeModal={this.closeModal} />
        )}
        {showLoadMore && <Button onShowMore={this.showMore} />}
        {loading && <Loader />}
      </div>
    );
  }
}

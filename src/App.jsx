import React, { Component } from 'react';
import Searchbar from './components/Searchbar/Searchbar';
import Notiflix from 'notiflix';
import * as Scroll from 'react-scroll';
import ImageGallery from './components/ImageGallery';
import Modal from './components/Modal';
import Loader from './components/Loader';
import Button from './components/Button';
import FetchData from './services/Api';

const perPage = 12;

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
      FetchData(value, page, perPage)
        .then(data => {
          this.setState(prevState => ({
            images: [...prevState.images, ...data.hits],
            loading: false,
          }));
          if (data.total > perPage) {
            this.setState({ showLoadMore: true });
          } else if (data.total <= images.length + perPage) {
            this.setState({ showLoadMore: false });
            Notiflix.Notify.info(
              "We're sorry, but you've reached the end of search results."
            );
          }
        })
        .catch(this.onApiError);
    }
  }

  onSearch = inputValue => {
    this.setState({
      value: inputValue,
      page: 1,
      images: [],
      showLoadMore: false,
    });
  };

  onApiError = () => {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    this.setState({ loading: false, showLoadMore: false });
  };

  showMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
    this.scrollSlowly();
  };
  openModal = image => {
    this.setState({ showModal: true, largeImage: image });
  };
  closeModal = () => {
    this.setState({ showModal: false });
  };
  scrollSlowly = () => {
    Scroll.animateScroll.scrollToBottom({
      duration: 1500,
      delay: 100,
      smooth: true,
      containerId: 'ContainerElementID',
      offset: 50,
    });
  };

  render() {
    const { images, showModal, largeImage, loading, showLoadMore } = this.state;

    return (
      <div className="app">
        <Searchbar onSubmit={this.onSearch} />
        {images.length > 0 && (
          <ImageGallery images={images} onModal={this.openModal} />
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

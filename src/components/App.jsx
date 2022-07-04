import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import axios from 'axios';
import ImageGallery from './ImageGallery';
import Modal from './Modal';

const API_KEY = '27514319-3f71a34bdf3e844d254f7bad1';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export class App extends Component {
  state = {
    images: [],
    showModal: false,
    largeImage: '',
  };

  componentDidMount() {}

  SearchValue = inputValue => {
    axios
      .get(
        `/?q=${inputValue}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
      .then(response => response.data)
      .then(images => this.setState({ images: images.hits }));
  };

  showModal = image => {
    this.setState({ showModal: true, largeImage: image });
  };
  closeModal = () => {
    this.setState({ showModal: false });
  };
  render() {
    const { images, showModal, largeImage } = this.state;
    return (
      <div className="app">
        <Searchbar onSubmit={this.SearchValue} />
        {images.length > 0 && (
          <ImageGallery images={images} showModal={this.showModal} />
        )}
        {showModal && (
          <Modal largeImage={largeImage} closeModal={this.closeModal} />
        )}
      </div>
    );
  }
}

import { Component } from 'react';

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.hendelKey);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.hendelKey);
  }

  hendelKey = e => {
    if (e.code === 'Escape') {
      this.props.onModalClose();
    }
  };

  hendelClickBackdrop = e => {
    if (e.target === e.currentTarget) this.props.onModalClose();
  };

  render() {
    const { largeImageURL } = this.props;
    return (
      <div className="Overlay" onClick={this.hendelClickBackdrop}>
        <div className="Modal">
          <img src={largeImageURL} alt="" />
        </div>
      </div>
    );
  }
}


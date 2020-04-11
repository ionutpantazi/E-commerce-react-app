import React from 'react';
import { Row, Col, Modal, Layout, Rate } from 'antd';
class Produse extends React.Component {
  state = { visible: false, modal: [] };
  showModal = (produs) => {
    this.setState({
      visible: true,
      modalImagine: produs.imagine,
      modalDescriere: produs.descriere,
      modalNume: produs.nume,
      modalRating: produs.rating,
      modalData: produs.data
    });
  }
  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };
  render() {
    const { Footer } = Layout;
    const { modalImagine, modalDescriere, modalNume, modalRating, modalData } = this.state
    const listaProduse = this.props.produse.map(produs => (
      <Col xs={{ span: 12 }} lg={{ span: 8 }} >
        <div className = "card">
          <img
            src={produs.imagine}
            alt={produs.nume}
            style={{ width: '80%', margin: '20px' }}
          />
          <h2 onClick={() => this.showModal(produs)} className = "name">{produs.nume}</h2>
          <p className = "price">{produs.pret + ' $'}</p>
          <p><button onClick={() => this.props.handleAdauga(produs)}>Add to Cart</button></p>
        </div>
      </Col>
    ))
    return (
      <div>
        <Row justify="space-around" align="middle" gutter={[24, 24]}>
          {listaProduse}
        </Row>
        <Modal
          title={modalNume}
          visible={this.state.visible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <Layout>
            <div style={{ backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <img src={modalImagine} alt={modalImagine} style={{ width: '30vmin', height: 'auto' }} />
              <div style={{ textAlign: "center" }}>
                {modalDescriere}
              </div>
            </div>
          </Layout>
          <Footer style={{ backgroundColor: "white", height: "110px", textAlign: "center" }}>
            <span>Rating:{' '}<Rate disabled value={modalRating} /></span><br />
            <span>Added on: {modalData}</span>
          </Footer>
        </Modal>
      </div>
    )
  }
}

export default Produse
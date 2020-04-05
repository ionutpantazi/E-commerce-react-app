import React from 'react';
import { Row, Col, Card, Tooltip, Modal, Layout, Rate } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
class Produse extends React.Component {
  state = { visible: false, modal: [] };
  showModal = (produs) => {
    this.setState({ 
      visible: true , 
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
    const { Meta } = Card;
    const IconFont = createFromIconfontCN({
      scriptUrl: '//at.alicdn.com/t/font_1697557_irzp4mqx6t8.js',
    });
    const listaProduse = this.props.produse.map(produs => (
      <Col xs={{ span: 12 }} lg={{ span: 8 }} >
        <Card
          size="small"
          hoverable
          cover={
            <img
              src={produs.imagine}
              alt={produs.nume}
              style={{ width: '80%', margin: '20px' }}
            />
          }
          actions={[
            <Tooltip title="adauga in cos" trigger="hover , click">
              <div className="responsive"><IconFont type="icon-iconaddtocart" onClick={() => this.props.handleAdauga(produs)} /></div>
            </Tooltip>,
            <Tooltip title="detalii" trigger="hover , click">
              <div className="responsive"><IconFont type="icon-tariffdetails" onClick={() => this.showModal(produs)} /></div>
            </Tooltip>
          ]}
        >
          <Meta
            title={produs.nume}
            description={produs.pret + ' lei/kg'}
          />
        </Card>
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
          <Footer style={{ backgroundColor: "white", height: "80px", textAlign: "center" }}>
            <span>Rating:{' '}<Rate disabled value={modalRating} /></span><br />
            <span>Data adaugata: {modalData}</span>
          </Footer>
        </Modal>
      </div>
    )
  }
}

export default Produse
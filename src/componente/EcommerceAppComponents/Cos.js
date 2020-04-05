import React from 'react';
import { Row, Empty, Card } from 'antd';
import { DeleteOutlined, PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';

class Cos extends React.Component {
  render() {
    const { cosProduse } = this.props;
    const { Meta } = Card;
    return (
      <div>
        {cosProduse.length === 0 &&
          <Empty
            description={
              <span>Cosul de cumparaturi este gol</span>
            }
          />
        }
        {cosProduse.map(item => (
          <div>
            <Row justify="space-around" align="middle">
              <Card
                hoverable
                actions={[
                  <PlusCircleOutlined style={{ fontSize: '20px' }} onClick={() => this.props.handlePlus(item)} />,
                  <DeleteOutlined style={{ fontSize: '20px' }} onClick={() => this.props.handleSterge(item)} />,
                  <MinusCircleOutlined style={{ fontSize: '20px' }} onClick={() => this.props.handleMinus(item)} />
                ]}
              >
                <Meta
                  avatar={<img src={item.imagine} alt={item.title} style={{ width: 50, height: 50 }} />}
                  title={item.nume}
                  description={
                    <div>
                      Pret: {(Math.round(item.pret * item.totalProduse * 100) / 100).toFixed(2)} lei<br />
                      Cantitate : {item.totalProduse}
                    </div>
                  }
                />
              </Card>
            </Row>
            <br />
          </div>
        ))}
      </div>
    );
  }
}

export default Cos
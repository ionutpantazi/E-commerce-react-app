import React from 'react'
import { Badge } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
class Numar extends React.Component {
    render() {
        const { cosProduse } = this.props;
        const IconFont = createFromIconfontCN({
            scriptUrl: '//at.alicdn.com/t/font_1697557_4fog8sw7kul.js',
          });
        return (
            <span>
                <Badge count={cosProduse.length}> 
                    <IconFont type="icon-cart-actived" className="icons"/>
                </Badge>
            </span>
        )
    }
}

export default Numar
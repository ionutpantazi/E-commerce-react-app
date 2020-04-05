import React from 'react'
import { Badge } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
class Numar extends React.Component {
    render() {
        const { cosProduse } = this.props;
        const IconFont = createFromIconfontCN({
            scriptUrl: '//at.alicdn.com/t/font_1697557_vei6hao6e59.js',
          });
        return (
            <span>
                <Badge count={cosProduse.length}> 
                    <IconFont type="icon-Shoppingcartfinancebusiness" style={{ fontSize: '30px' }}/>
                </Badge>
            </span>
        )
    }
}

export default Numar
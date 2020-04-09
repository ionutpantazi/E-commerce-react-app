import React from 'react';
import { Select } from 'antd'
class Filtru extends React.Component {
    render(){
        const { Option } = Select;
        return(
            <div>
                <span>Order by: </span>
                <Select defaultValue="nume" style={{ width: 100, zIndex: 2 }} value={this.props.sortat} onChange={this.props.handleSortare}>
                    <Option value="pret">price</Option>
                    <Option value="nume">name</Option>
                    <Option value="data">date</Option>
                </Select>
            </div>
        )
    }
}

export default Filtru
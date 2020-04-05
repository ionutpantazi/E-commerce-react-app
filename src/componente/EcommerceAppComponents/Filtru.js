import React from 'react';
import { Select } from 'antd'
class Filtru extends React.Component {
    render(){
        const { Option } = Select;
        return(
            <div>
                <span>ordoneaza dupa: </span>
                <Select defaultValue="nume" style={{ width: 150, zIndex: 2 }} value={this.props.sortat} onChange={this.props.handleSortare}>
                    <Option value="pret">pret</Option>
                    <Option value="nume">nume</Option>
                    <Option value="data">data adaugata</Option>
                </Select>
            </div>
        )
    }
}

export default Filtru
import React, { useState, useEffect } from 'react'
import { Table , Container } from "react-bootstrap";
import { FaSort } from "react-icons/fa";

const Bill = ({data}) => {
    let products = data
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    
    if (products === null){
        return (
            <>
            <p>loading</p>
            </>
        )
    }
    
    const sortedProducts = [...products].sort((a, b) => {
        if (sortConfig.key) {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];
            if (aValue < bValue) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
        }
        return 0;
    });

    const requestSort = key => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    return (
        <Container className="my-4">
            <Table striped bordered hover responsive>
                <thead className="table-light" style={{ backgroundColor: '#28a745', color: 'white'} }>
                    <tr>
                        <th onClick={() => requestSort('name')}>
                            商品名稱 <FaSort />
                        </th>
                        <th onClick={() => requestSort('unitPrice')}>
                            單價 <FaSort />
                        </th>
                        <th onClick={() => requestSort('quantity')}>
                            數量 <FaSort />
                        </th>
                        <th>小計</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedProducts.map((product, index) => (
                        <tr key={index} className="table-row">
                            <td>{product.goods_info.product_name}</td>
                            <td>{product.goods_info.price}</td>
                            <td>{product.quantity}</td>
                            <td>{(product.subtotal)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};


export default Bill
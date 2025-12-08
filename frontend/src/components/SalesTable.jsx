import React from 'react';

const SalesTable = ({ sales }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="sales-table">
      <table>
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Date</th>
            <th>Customer ID</th>
            <th>Customer name</th>
            <th>Phone Number</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Product Category</th>
            <th>Quantity</th>
            <th>Total Amount</th>
            <th>Customer region</th>
            <th>Product ID</th>
            <th>Employee name</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale, index) => (
            <tr key={index}>
              <td>{sale.customerId?.substring(0, 7) || index + 1}</td>
              <td>{sale.date}</td>
              <td>{sale.customerId}</td>
              <td>{sale.customerName}</td>
              <td>{sale.phoneNumber}</td>
              <td>{sale.gender}</td>
              <td>{sale.age}</td>
              <td>{sale.productCategory}</td>
              <td>{sale.quantity}</td>
              <td>{formatCurrency(sale.finalAmount || 0)}</td>
              <td>{sale.customerRegion}</td>
              <td>{sale.productId}</td>
              <td>{sale.employeeName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesTable;

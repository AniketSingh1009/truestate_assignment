import React from 'react';

const LoadingSkeleton = () => {
  return (
    <>
      <div className="summary-cards">
        {[1, 2, 3].map(i => (
          <div key={i} className="summary-card skeleton">
            <div className="skeleton-text" style={{ width: '60%', height: '14px', marginBottom: '8px' }}></div>
            <div className="skeleton-text" style={{ width: '40%', height: '24px' }}></div>
          </div>
        ))}
      </div>

      <div className="main">
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
              {[...Array(10)].map((_, index) => (
                <tr key={index}>
                  {[...Array(13)].map((_, colIndex) => (
                    <td key={colIndex}>
                      <div className="skeleton-text" style={{ width: '80%', height: '14px' }}></div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <div className="pagination-controls">
            <div className="skeleton-text" style={{ width: '200px', height: '36px' }}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoadingSkeleton;

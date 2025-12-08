import React from 'react';

const SummaryCards = ({ totalUnits, totalAmount, totalDiscount, recordCount }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const discountPercentage = totalAmount > 0 ? ((totalDiscount / totalAmount) * 100).toFixed(1) : 0;

  return (
    <div className="summary-cards">
      <div className="summary-card">
        <div className="summary-card-header">
          <span>Total units sold</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="summary-card-value">{totalUnits}</div>
      </div>

      <div className="summary-card">
        <div className="summary-card-header">
          <span>Total Amount</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="summary-card-value">{formatCurrency(totalAmount)}</div>
        <div className="summary-card-subtitle">({recordCount} {recordCount === 1 ? 'SR' : 'SRs'})</div>
      </div>

      <div className="summary-card">
        <div className="summary-card-header">
          <span>Total Discount</span>
          {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"> */}
            {/* <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /> */}
          {/* </svg> */}
        </div>
        <div className="summary-card-value">{formatCurrency(totalDiscount)}</div>
        <div className="summary-card-subtitle">({discountPercentage} {discountPercentage === 1 ? 'SR' : 'SRs'})</div>
      </div>
    </div>
  );
};

export default SummaryCards;

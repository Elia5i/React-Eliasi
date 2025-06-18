// PortfolioContext.js

import React, { createContext, useState } from 'react';

export const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [portfolio, setPortfolio] = useState({});
  const [balance, setBalance] = useState(100000); // 100k euros, as requested

  const addToPortfolio = (coinId, quantity, price, name) => {
    setPortfolio((prev) => {
      const currentQty = prev[coinId]?.quantity || 0;
      const currentAvgPrice = prev[coinId]?.avgBuyPrice || 0;

      // Calculate new average buy price if coin exists
      const newQty = currentQty + quantity;
      const newAvgPrice =
        currentQty === 0
          ? price
          : (currentAvgPrice * currentQty + price * quantity) / newQty;

      return {
        ...prev,
        [coinId]: {
          quantity: newQty,
          name,
          avgBuyPrice: newAvgPrice,
        },
      };
    });

    setBalance((prev) => prev - quantity * price);
  };

  const sellFromPortfolio = (coinId, quantity, price) => {
    setPortfolio((prev) => {
      const currentQty = prev[coinId]?.quantity || 0;
      const newQty = currentQty - quantity;

      if (newQty <= 0) {
        const updated = { ...prev };
        delete updated[coinId];
        return updated;
      }

      return {
        ...prev,
        [coinId]: {
          ...prev[coinId],
          quantity: newQty,
        },
      };
    });

    setBalance((prev) => prev + quantity * price);
  };

  return (
    <PortfolioContext.Provider
      value={{ portfolio, balance, addToPortfolio, sellFromPortfolio }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

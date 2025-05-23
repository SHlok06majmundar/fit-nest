import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from '../../config';

const Dashboard = () => {
  const [CurrentMonthSales, setCurrentMonthSales] = useState(null);
  const [YearlySales, setYearlySales] = useState(null);
  const [inactiveMembers, setInactiveMembers] = useState(null);
  const [salesByProduct, setSalesByProduct] = useState(null);
  const [productsMap, setProductsMap] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(API.PRODUCTS.ALL_PRODUCTS, { withCredentials: true });
      const map = {};
      response.data.forEach(product => {
        map[product._id] = product;
      });
      setProductsMap(map);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  /**
   * Fetches total sales for a given date range and updates the corresponding state.
   *
   * Sends a GET request to the server to retrieve total sales data for the 
   * specified start and end dates. Depending on the 'type' parameter, it updates
   * the state for either the current month's sales or the current year's sales.
   *
   * @param {string} startDate - The start date for the sales data query.
   * @param {string} endDate - The end date for the sales data query.
   * @param {string} type - The type of sales data to update ('monthly' or 'yearly').
   */
  const fetchTotalSales = async (startDate, endDate, type) => {
    try {
      const response = await axios.get(
        `${API.ORDER.TOTAL_SALES}/${startDate}/${endDate}`, { withCredentials: true }
      );
      if (type === 'monthly') {
        setCurrentMonthSales(response.data.totalSales);
      } else if (type === 'yearly') {
        setYearlySales(response.data.totalSales);
      }
    } catch (err) {
      console.error('Error fetching total sales:', err);
    }
  };

  // ... rest of the component code remains the same ...
}; 
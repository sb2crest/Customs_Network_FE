import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useAdminContext } from '../../context/AdminContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        boxWidth: 10,
        boxHeight: 10,
        font: {
          size: 12
        },
        color: '#fff'
      }
    },
    title: {
      display: true,
      text: 'Line Chart ',
      color: '#fff',
      position: 'bottom',
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: '#fff',
      },
    },
    y: {
      grid: {
        display: false,
      },
      ticks: {
        color: '#fff',
      },
    },
  },
};

const LineChart = () => {
  const { adminTrendsData } = useAdminContext();

  if (!adminTrendsData || !Array.isArray(adminTrendsData.totalTransactionCountDtos)) {
    console.error('Invalid adminTrendsData:', adminTrendsData);
    return null; // or handle the error appropriately
  }

  const { totalTransactionCountDtos } = adminTrendsData;

  const labels = totalTransactionCountDtos.map(dataItem => dataItem.date);
  const acceptedData = totalTransactionCountDtos.map(dataItem => dataItem.acceptedCount);
  const pendingData = totalTransactionCountDtos.map(dataItem => dataItem.pendingCount);
  const rejectedData = totalTransactionCountDtos.map(dataItem => dataItem.rejectedCount);
  const cbpDownData = totalTransactionCountDtos.map(dataItem => dataItem.cbpDownCount);
  const data = {
    labels,
    datasets: [
      {
        label: 'Accepted',
        data: acceptedData,
        borderColor: '#38E54D',
        backgroundColor: '#38E54D',
      },
      {
        label: 'Pending',
        data: pendingData,
        borderColor: '#f5b212',
        backgroundColor: '#f5b212',
      },
      {
        label: 'Rejected',
        data: rejectedData,
        borderColor: '#bf302f',
        backgroundColor: '#bf302f',
      },
      {
        label: 'CBP Down',
        data: cbpDownData,
        borderColor: 'yellow',
        backgroundColor: 'yellow',
      },
    ],
  };

  return (
    <Line options={options} data={data} />
  );
};

export default LineChart;

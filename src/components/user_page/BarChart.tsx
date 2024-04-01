import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useUserContext } from '../../context/UserContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
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
        boxWidth: 14,
        boxHeight: 13,
        font: {
          size: 13
        },
        color: '#fff'
      }
    },
    title: {
      display: true,
      text: 'Bar Chart',
      position: 'bottom',
      color: '#fff'
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

const BarChart = () => {
  const { trendsData } = useUserContext();
  const [responseData, setResponseData] = useState([]);

  useEffect(() => {
    if (trendsData && trendsData.dailyAuditDTOS && trendsData.dailyAuditDTOS.length > 0) {
      setResponseData(trendsData.dailyAuditDTOS);
    }
  }, [trendsData]);

  const labels = responseData.map(dataItem => dataItem.date);
  const acceptedData = responseData.map(dataItem => dataItem.acceptedCount);
  const pendingData = responseData.map(dataItem => dataItem.pendingCount);
  const rejectedData = responseData.map(dataItem => dataItem.rejectedCount);
  const cbpDownData = responseData.map(dataItem => dataItem.cbpDownCount);

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
    <Bar options={options} data={data} />
  );
};

export default BarChart;

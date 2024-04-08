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
import { useAdminContext } from '../../context/AdminContext';
import { useEffect, useState } from 'react';

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
  const { adminTrendsData } = useAdminContext();
  const [responseData, setResponseData] = useState([]);

  useEffect(() => {
    if (adminTrendsData && adminTrendsData.totalTransactionCountDtos) {
      setResponseData(adminTrendsData.totalTransactionCountDtos);
    }
    else if (adminTrendsData && adminTrendsData.trendsData) {
      const monthNames = Object.keys(adminTrendsData.trendsData);
      const data = monthNames.map((month) => {
        const monthData = adminTrendsData.trendsData[month];
        return {
          date: month,
          acceptedCount: monthData.acceptedCount,
          pendingCount: monthData.pendingCount,
          rejectedCount: monthData.rejectedCount,
          cbpDownCount: monthData.cbpDownCount,
        };
      });
      setResponseData(data);
    }
  }, [adminTrendsData]);

  const labels = responseData.map((dataItem) => dataItem.date);
  const acceptedData = responseData.map((dataItem) => dataItem.acceptedCount);
  const pendingData = responseData.map((dataItem) => dataItem.pendingCount);
  const rejectedData = responseData.map((dataItem) => dataItem.rejectedCount);
  const cbpDownData = responseData.map((dataItem) => dataItem.cbpDownCount);
  const validationErrorData = responseData.map((dataItem) => dataItem.validationErrorCount);

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
        label: "Pending",
        data: pendingData,
        borderColor: "#CD5C08",
        backgroundColor: "#CD5C08",
      },
      {
        label: "Rejected",
        data: rejectedData,
        borderColor: "#bf302f",
        backgroundColor: "#bf302f",
      },
      {
        label: "Validation Error",
        data: validationErrorData,
        borderColor: "#F8DE22",
        backgroundColor: "#F8DE22",
      },
      {
        label: "CBP Down",
        data: cbpDownData,
        borderColor: "#12CAD6",
        backgroundColor: "#12CAD6",
      },
    ],
  };

  return <Bar options={options} data={data} />;
};


export default BarChart;

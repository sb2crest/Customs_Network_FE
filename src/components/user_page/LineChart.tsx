import { useEffect, useState } from 'react';
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
import { useUserContext } from '../../context/UserContext';

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

interface LineChartData {
  date: number;
  acceptedCount: number;
  pendingCount: number;
  rejectedCount: number;
  cbpDownCount: number;
}

const LineChart = () => {
  const { trendsData } = useUserContext();
  const [responseData, setResponseData] = useState<LineChartData[]>([]);

  useEffect(() => {
    if (trendsData && trendsData.dailyAuditData && trendsData.dailyAuditData.length > 0) {
      setResponseData(trendsData.dailyAuditData);
    }
    else if (trendsData && trendsData.trendsData) {
      const monthNames = Object.keys(trendsData.trendsData);
      const data = monthNames.map((month) => {
        const monthData = trendsData.trendsData[month];
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
  }, [trendsData]);

  const labels = responseData.map((dataItem) => dataItem.date);
  const acceptedData = responseData.map((dataItem) => dataItem.acceptedCount);
  const pendingData = responseData.map((dataItem) => dataItem.pendingCount);
  const rejectedData = responseData.map((dataItem) => dataItem.rejectedCount);
  const cbpDownData = responseData.map((dataItem) => dataItem.cbpDownCount);

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

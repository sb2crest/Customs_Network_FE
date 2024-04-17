import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

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
      position: "top",
      labels: {
        boxWidth: 14,
        boxHeight: 13,
        font: {
          size: 13,
        },
        color: "#000",
      },
    },
    title: {
      display: true,
      text: "Bar Chart",
      position: "bottom",
      color: "#000",
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: "#000",
      },
    },
    y: {
      grid: {
        display: false,
       
      },
      ticks: {
        color: "#000",
      },
    },
  },
};

interface BarChartProps {
  responseData: BarChartData[];
}

interface BarChartData {
  date: number;
  acceptedCount: number;
  pendingCount: number;
  rejectedCount: number;
  cbpDownCount: number;
  validationErrorCount: number;
}

const PortBarChart = ({ portTrendsResponseData }: BarChartProps) => {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const labels = portTrendsResponseData.map((dataItem) => dataItem.date);
    const acceptedData = portTrendsResponseData.map((dataItem) => dataItem.acceptedCount);
    const pendingData = portTrendsResponseData.map((dataItem) => dataItem.pendingCount);
    const rejectedData = portTrendsResponseData.map((dataItem) => dataItem.rejectedCount);
    const cbpDownData = portTrendsResponseData.map((dataItem) => dataItem.cbpDownCount);
    const validationErrorData = portTrendsResponseData.map((dataItem) => dataItem.validationErrorCount);

    const data = {
      labels: labels.length ? labels : ['No data'],
      datasets: [
        {
          label: "Accepted",
          data: portTrendsResponseData.length ? acceptedData : [0], 
          borderColor: "#4ecdc4",
          backgroundColor: "#4ecdc4",
        },
        {
          label: "Pending",
          data: pendingData,
          borderColor: "#00A8E8",
          backgroundColor: "#00A8E8",
        },
        {
          label: "Rejected",
          data: portTrendsResponseData.length ? rejectedData : [0],
          borderColor: "#DB7A6B",
          backgroundColor: "#DB7A6B",
        },
        {
          label: "Validation Error",
          data: validationErrorData,
          borderColor: "#6A8EAE",
          backgroundColor: "#6A8EAE",
        },
        {
          label: "CBP Down",
          data: cbpDownData,
          borderColor: "#004D66",
          backgroundColor: "#004D66",
        },
      ],
    };

    setChartData(data);
  }, [portTrendsResponseData]);

  return chartData ? <Bar options={options} data={chartData} style={{background:"#fff"}}/> : null;
};

export default PortBarChart;

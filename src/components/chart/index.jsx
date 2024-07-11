import { useEffect, useRef, useState } from "react";
// import Chart from "chart.js/auto";
import api from "../../config/axios";

function SaleComparision() {
  const [data, setdata] = useState();
  const chartRef = useRef(null);
  const chartInstance = useRef(null); // Ref to hold the Chart instance
  const [dataRevenue, setDataRevenue] = useState([]);
  const fetchData = async () => {
    try {
      const response = await api.get("admin/ProfitByMonth");
      console.log(response.data);
      setdata(response.data.map((data) => data.revenuePortal));
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    console.log("hi");
    fetchData();
  }, []);
  console.log(data);
  useEffect(() => {
    document.title = "So sánh giữa các năm";
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: [1, 2, 3, 4, 5, 6, 7],
          datasets: [
            {
              label: "Doanh thu",
              data: data,
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              title: {
                display: true,
                text: "Doanh thu",
              },
              type: "linear",
              position: "left",
              beginAtZero: true,
            },

            x: {
              title: {
                display: true,
                text: "Month",
              },
            },
          },
        },
      });
    }
  }, [data]);

  return (
    <div className="w-full h-[500px]">
      <canvas ref={chartRef} id="myChart"></canvas>
    </div>
  );
}

export default SaleComparision;

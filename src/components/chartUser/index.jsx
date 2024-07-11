import React, { useEffect, useRef, useState } from "react";
import api from "../../config/axios";
import { Chart } from "chart.js";

function ChartUser() {
  const [data, setdata] = useState();
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const fetchDataUser = async () => {
    try {
      const response = await api.get("/admin/countUser");
      console.log(response.data.data);
      setdata(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchDataUser();
  }, []);
  console.log(data);
  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: [
            "buyerQuantity",
            "sellerQuantity",
            "staffQuantity",
            "managerQuantity",
          ],
          datasets: [
            {
              data: [
                data.buyerQuantity,
                data.sellerQuantity,
                data.staffQuantity,
                data.managerQuantity,
              ],
              backgroundColor: ["#FF6384", "#36A2EB", "#FFFFFF", "#FF00FF"],
            },
          ],
        },
      });
    }
  }, [data]);
  return (
    <div>
      <canvas ref={chartRef} id="myChart"></canvas>
    </div>
  );
}

export default ChartUser;

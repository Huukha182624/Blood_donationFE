    import { useEffect, useRef } from "react";
    import {
    Chart,
    BarController,
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    type ChartConfiguration
    } from "chart.js";

    Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

    const BloodDonationChart = () => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstance = useRef<Chart | null>(null);

    useEffect(() => {
        if (chartRef.current) {
        const config: ChartConfiguration = {
            type: "bar",
            data: {
            labels: ["T1", "T2", "T3", "T4", "T5", "T6"],
            datasets: [
                {
                label: "Số lượng hiến máu (Lít)",
                backgroundColor: "#E74C3C",
                data: [500, 700, 800, 650, 900, 1000],
                },
            ],
            },
            options: {
            responsive: true,
            plugins: {
                legend: {
                display: false,
                },
                title: {
                display: true,
                text: "Lượng máu thu được theo tháng",
                },
            },
            scales: {
                y: {
                beginAtZero: true,
                },
            },
            },
        };

        chartInstance.current = new Chart(chartRef.current, config);
        }

        return () => {
        chartInstance.current?.destroy();
        };
    }, []);

    return <canvas ref={chartRef}></canvas>;
    };

    export default BloodDonationChart;

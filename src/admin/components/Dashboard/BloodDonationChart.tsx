import { useEffect, useState, useMemo } from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { fetchAllBloodUnits } from '../../../services/BloodUnit/bloodUnitService';

// Định nghĩa kiểu dữ liệu cho biểu đồ
interface ChartData {
  name: string; // Ví dụ: "T7/2025"
  "Nhập kho": number;
  "Xuất kho": number;
}

const BloodDonationChart = () => {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiData = await fetchAllBloodUnits();
        
        const monthlyData = apiData.reduce((acc: Record<string, { inflow: number, outflow: number }>, item: any) => {
          try {
            // Xử lý Lượng Nhập kho (dựa trên ngày hiến)
            if (item && typeof item.donationDate === 'string') {
              const date = new Date(item.donationDate);
              if (!isNaN(date.getTime())) {
                const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
                if (!acc[key]) acc[key] = { inflow: 0, outflow: 0 };
                acc[key].inflow += Number(item.volume) || 0;
              }
            }
            
            // Xử lý Lượng Xuất kho (dựa trên ngày xuất kho)
            if (item && typeof item.issueDate === 'string') {
                const date = new Date(item.issueDate);
                if (!isNaN(date.getTime())) {
                    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
                    if (!acc[key]) acc[key] = { inflow: 0, outflow: 0 };
                    acc[key].outflow += Number(item.volume) || 0;
                }
            }
          } catch (e) {
            console.error("Lỗi khi xử lý một bản ghi:", item, e);
          }
          return acc;
        }, {});

        // Sắp xếp và chuyển đổi sang định dạng mà Recharts yêu cầu
        const sortedKeys = Object.keys(monthlyData).sort();
        const processedData: ChartData[] = sortedKeys.map(key => {
          const [year, month] = key.split('-');
          return {
            name: `T${month}/${year}`,
            "Nhập kho": monthlyData[key].inflow,
            "Xuất kho": monthlyData[key].outflow,
          };
        });

        setChartData(processedData);
      } catch (e: any) {
        console.error("Failed to process chart data:", e);
        setError("Không thể xử lý dữ liệu biểu đồ.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="chart-loading">Đang tải dữ liệu biểu đồ...</div>;
  }

  if (error) {
    return <div className="chart-error">{error}</div>;
  }

  return (
    <div className="chart-container">
      <h3 className="chart-title">Xu hướng Nhập/Xuất máu (ml)</h3>
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="name" stroke="#666" />
          <YAxis stroke="#666" />
          <Tooltip
            formatter={(value: number) => `${value.toLocaleString()} ml`}
          />
          <Legend />
          <Bar dataKey="Nhập kho" barSize={20} fill="#4CAF50" radius={[4, 4, 0, 0]} />
          <Line type="monotone" dataKey="Xuất kho" stroke="#d32f2f" strokeWidth={2} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BloodDonationChart;

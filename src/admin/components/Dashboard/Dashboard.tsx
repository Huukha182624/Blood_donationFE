import React, { useEffect, useState, useRef, useMemo } from "react";
import {
  Chart, BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, type ChartConfiguration
} from "chart.js";
import api from "../../../services/api";

// Register Chart.js components
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

// =================================================================
// API SERVICE FUNCTIONS (Nên được tách ra các file service riêng)
// =================================================================

const fetchAllUsers = async () => {
    const response = await api.get('/users');
    return response.data;
};

const fetchAllBloodUnits = async () => {
    const response = await api.get('/blood-units');
    return response.data;
};

const fetchAllCampaignRegistrations = async () => {
    const response = await api.get('/campaign-registrations');
    return response.data;
};

const fetchAllCampaigns = async () => {
    const response = await api.get('/blood-donation-campaigns');
    return response.data;
};


// =================================================================
// BLOOD DONATION CHART COMPONENT
// =================================================================

interface BloodDonationChartProps {
  chartData: { labels: string[]; data: number[] } | null;
  loading: boolean;
  error: string | null;
}

const BloodDonationChart: React.FC<BloodDonationChartProps> = ({ chartData, loading, error }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current || !chartData) return;

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    chartInstance.current?.destroy();

    const config: ChartConfiguration = {
      type: "bar",
      data: {
        labels: chartData.labels,
        datasets: [{
          label: "Lượng máu hiến (ml)",
          backgroundColor: "#E74C3C",
          borderColor: "#C0392B",
          borderWidth: 1,
          borderRadius: 5,
          data: chartData.data,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: "Lượng máu thu được theo tháng",
            font: { size: 18, weight: 'bold' },
            padding: { top: 10, bottom: 20 }
          },
          tooltip: {
            callbacks: {
              label: (context) => `Lượng máu: ${context.parsed.y.toLocaleString()} ml`
            }
          }
        },
        scales: {
          y: { beginAtZero: true, title: { display: true, text: 'Thể tích (ml)' } },
          x: { title: { display: true, text: 'Thời gian' } }
        },
      },
    };

    chartInstance.current = new Chart(ctx, config);

    return () => chartInstance.current?.destroy();
  }, [chartData]);

  if (loading) return <div style={styles.loading}>Đang tải dữ liệu biểu đồ...</div>;
  if (error) return <div style={styles.error}>{error}</div>;

  return <div style={styles.chartWrapper}><canvas ref={chartRef}/></div>;
};


// =================================================================
// MAIN DASHBOARD COMPONENT
// =================================================================

const MainInforPage: React.FC = () => {
  const [stats, setStats] = useState({
    totalDonors: 0,
    totalVolume: 0,
    upcomingAppointments: 0,
    upcomingCampaigns: 0,
    firstCampaignName: null,
  });
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const [users, bloodUnits, registrations, campaigns] = await Promise.all([
          fetchAllUsers(),
          fetchAllBloodUnits(),
          fetchAllCampaignRegistrations(),
          fetchAllCampaigns()
        ]);

        // --- BẮT ĐẦU XỬ LÝ DỮ LIỆU ---
        
        // 1. Tính toán các chỉ số thống kê
        const totalDonors = users.filter((user: any) => user.role === 'Member').length;
        const totalVolume = bloodUnits.reduce((sum: number, unit: any) => sum + unit.volume, 0) / 1000;
        const upcomingAppointments = registrations.filter((reg: any) => reg.status === 'Confirmed').length;
        
        const upcomingCampaigns = campaigns.filter((campaign: any) => campaign.status !== 'Finished');
        
        setStats({
          totalDonors,
          totalVolume,
          upcomingAppointments,
          upcomingCampaigns: upcomingCampaigns.length,
          firstCampaignName: upcomingCampaigns[0]?.name || null,
        });

        // 2. Xử lý dữ liệu cho biểu đồ
        const monthlyData = bloodUnits.reduce((acc: Record<string, number>, item: any) => {
          if (!item || typeof item.donationDate !== 'string') return acc;
          const date = new Date(item.donationDate);
          if (isNaN(date.getTime())) return acc;
          
          const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
          acc[key] = (acc[key] || 0) + Number(item.volume || 0);
          return acc;
        }, {});

        const sortedKeys = Object.keys(monthlyData).sort();
        const processedChartData = {
          labels: sortedKeys.map(key => {
            const [year, month] = key.split('-');
            return `T${month}/${year}`;
          }),
          data: sortedKeys.map(key => monthlyData[key]),
        };
        setChartData(processedChartData);
        
        // --- KẾT THÚC XỬ LÝ DỮ LIỆU ---

      } catch (e: any) {
        console.error("Failed to fetch dashboard data:", e);
        setError("Không thể tải dữ liệu. Vui lòng đăng nhập lại hoặc kiểm tra kết nối.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  const renderStat = (value: number, unit: string) => (
    loading ? "..." : `${value.toLocaleString()}${unit}`
  );

  return (
    <div style={styles.page}>
      <h1 style={styles.header}>
        <span role="img" aria-label="dashboard-icon">📊</span> Tổng quan
      </h1>

      {error && <p style={styles.errorText}>{error}</p>}

      <div style={styles.grid}>
        <InfoCard
          title="Tổng người hiến máu"
          value={renderStat(stats.totalDonors, "+")}
          description="(Thành viên đã đăng ký)"
          loading={loading}
        />
        <InfoCard
          title="Lượng máu thu được"
          value={renderStat(stats.totalVolume, " Lít")}
          description="(Tổng từ trước đến nay)"
          loading={loading}
        />
        <InfoCard
          title="Lịch hẹn sắp tới"
          value={renderStat(stats.upcomingAppointments, "")}
          description="(Lịch hẹn đã xác nhận)"
          loading={loading}
        />
        <InfoCard
          title="Sự kiện sắp diễn ra"
          value={renderStat(stats.upcomingCampaigns, "")}
          description={loading ? "..." : 
            stats.firstCampaignName 
              ? `(${stats.firstCampaignName}${stats.upcomingCampaigns > 1 ? ` + ${stats.upcomingCampaigns - 1} khác` : ''})` 
              : '(Không có sự kiện nào)'}
          loading={loading}
        />

        <div style={styles.chartContainer}>
          <BloodDonationChart chartData={chartData} loading={loading} error={error} />
        </div>
      </div>
    </div>
  );
};

// =================================================================
// REUSABLE INFO CARD COMPONENT
// =================================================================

const InfoCard: React.FC<{
  title: string;
  value: string;
  description: string;
  loading: boolean;
}> = ({ title, value, description, loading }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{ ...styles.card, transform: isHovered ? "translateY(-5px)" : "none", opacity: loading ? 0.7 : 1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h2 style={styles.cardTitle}>{title}</h2>
      <p style={styles.cardValue}>{value}</p>
      <p style={styles.cardDescription}>{description}</p>
    </div>
  );
};

// =================================================================
// STYLES
// =================================================================

const styles = {
  page: { flexGrow: 1, padding: "20px 40px", backgroundColor: "#F5F5F5", minHeight: "100vh" } as React.CSSProperties,
  header: { color: "#333333", marginBottom: "30px", fontSize: "2rem", fontWeight: 600, borderBottom: "2px solid #E74C3C", paddingBottom: "10px" } as React.CSSProperties,
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "25px" } as React.CSSProperties,
  card: { backgroundColor: "#FFFFFF", padding: "25px", borderRadius: "8px", boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)", transition: "all 0.3s ease" } as React.CSSProperties,
  cardTitle: { color: "#E74C3C", fontSize: "1.5rem", marginBottom: "10px" } as React.CSSProperties,
  cardValue: { fontSize: "2.5rem", fontWeight: "bold", color: "#333333", minHeight: "48px", margin: "10px 0" } as React.CSSProperties,
  cardDescription: { fontSize: "0.9rem", color: "#666666" } as React.CSSProperties,
  chartContainer: { gridColumn: "1 / -1", backgroundColor: "#FFFFFF", padding: "25px", borderRadius: "8px", boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)" } as React.CSSProperties,
  chartWrapper: { height: "400px", width: "100%" } as React.CSSProperties,
  loading: { textAlign: "center", padding: "2rem" } as React.CSSProperties,
  error: { textAlign: "center", padding: "2rem", color: "red" } as React.CSSProperties,
  errorText: { color: "red", textAlign: "center", marginTop: "20px", fontSize: "1.2rem" } as React.CSSProperties,
};

export default MainInforPage;

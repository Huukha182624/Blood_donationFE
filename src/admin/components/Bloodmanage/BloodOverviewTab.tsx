import React, { useState, useEffect, useMemo } from 'react';
import {
  PieChart, Pie, Cell,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import InfoCard from './InfoCard';
import type { BloodUnit as BloodUnitType } from '../../../types/types'; // Đổi tên để tránh xung đột
import './BloodOverviewTab.css';
import { fetchAllBloodUnits } from '../../../services/BloodUnit/bloodUnitService'; // Import service mới

// --- CÁC HÀM HELPER ---

// Hàm helper để map status từ API (PascalCase) sang frontend (lowercase)
const mapApiStatusToFrontend = (apiStatus: string): BloodUnitType['status'] => {
  const statusMap: { [key: string]: BloodUnitType['status'] } = {
    AwaitingTesting: 'pending_qa',
    InStock: 'available',
    Used: 'issued',
    Expired: 'expired',
    Disposed: 'disposed',
    TestingFailed: 'testing_failed',
  };
  return statusMap[apiStatus] || 'available';
};

// Hàm helper để hiển thị nhóm máu
const mapBloodTypeToDisplay = (bloodType: string): string => {
    if (!bloodType || bloodType === 'None') return 'Chưa rõ';
    return bloodType.replace('_POS', '+').replace('_NEG', '-');
};


const BloodOverviewTab: React.FC = () => {
  const [bloodUnits, setBloodUnits] = useState<BloodUnitType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // SỬA LỖI: Gọi API thông qua service đã được đồng bộ
        const apiData = await fetchAllBloodUnits();

        // SỬA LỖI: Ánh xạ dữ liệu từ backend .NET với đúng tên thuộc tính (camelCase)
        const mappedUnits: BloodUnitType[] = apiData.map((unit: any) => ({
          id: String(unit.id),
          bloodGroup: unit.bloodType,
          collectionDate: unit.donationDate,
          expiryDate: unit.expiryDate,
          status: mapApiStatusToFrontend(unit.status),
          storageLocation: unit.hospital?.name || 'N/A',
          qaStatus: unit.status === 'TestingFailed' ? 'failed' : (unit.verifier ? 'passed' : 'pending'),
          issueDate: unit.issueDate,
        }));
        setBloodUnits(mappedUnits);
      } catch (err: any) {
        console.error("Lỗi khi tải dữ liệu tổng quan:", err);
        setError(err.message || "Đã xảy ra lỗi không xác định.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = useMemo(() => {
    if (bloodUnits.length === 0) {
      return {
        totalUnits: 0,
        expiringSoon: 0,
        lowStockGroups: [],
        quickExpiringList: [],
        pieChartData: [],
        lineChartData: [],
      };
    }

    const today = new Date();
    const in30Days = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);

    // SỬA LỖI: Tính tổng số đơn vị máu có trong kho
    const inStockUnits = bloodUnits.filter(unit => unit.status === 'available');
    const totalUnits = inStockUnits.length;

    const expiringSoon = inStockUnits.filter(unit =>
      new Date(unit.expiryDate) > today &&
      new Date(unit.expiryDate) <= in30Days
    ).length;

    const availableByGroup = inStockUnits.reduce<Record<string, number>>((acc, unit) => {
      const displayBloodGroup = mapBloodTypeToDisplay(unit.bloodGroup);
      acc[displayBloodGroup] = (acc[displayBloodGroup] || 0) + 1;
      return acc;
    }, {});

    const lowStockGroups = Object.entries(availableByGroup)
      .filter(([, count]) => count < 5) // Cảnh báo khi dưới 5 đơn vị
      .map(([group]) => group);

    const quickExpiringList = inStockUnits
      .filter(unit => new Date(unit.expiryDate) > today)
      .sort((a, b) => new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime())
      .slice(0, 5);

    const pieChartData = Object.entries(availableByGroup).map(([name, value]) => ({
      name,
      value,
    }));

    const getMonthYear = (dateString: string) => {
      if (!dateString) return null;
      const date = new Date(dateString);
      return `${date.getMonth() + 1}/${date.getFullYear()}`;
    };

    const trendDataMap = new Map<string, { month: string; inflow: number; outflow: number }>();

    bloodUnits.forEach(unit => {
      const inflowMonthYear = getMonthYear(unit.collectionDate);
      if (inflowMonthYear) {
        if (!trendDataMap.has(inflowMonthYear)) {
          trendDataMap.set(inflowMonthYear, { month: inflowMonthYear, inflow: 0, outflow: 0 });
        }
        trendDataMap.get(inflowMonthYear)!.inflow += 1;
      }
      
      if (unit.status === 'issued' && unit.issueDate) {
        const outflowMonthYear = getMonthYear(unit.issueDate);
        if (outflowMonthYear) {
          if (!trendDataMap.has(outflowMonthYear)) {
            trendDataMap.set(outflowMonthYear, { month: outflowMonthYear, inflow: 0, outflow: 0 });
          }
          trendDataMap.get(outflowMonthYear)!.outflow += 1;
        }
      }
    });

    const lineChartData = Array.from(trendDataMap.values()).sort((a, b) => {
      const [m1, y1] = a.month.split('/').map(Number);
      const [m2, y2] = b.month.split('/').map(Number);
      return new Date(y1, m1 - 1).getTime() - new Date(y2, m2 - 1).getTime();
    });

    return { totalUnits, expiringSoon, lowStockGroups, quickExpiringList, pieChartData, lineChartData };
  }, [bloodUnits]);

  const PIE_COLORS = ['#c0392b', '#e74c3c', '#e67e22', '#f39c12', '#27ae60', '#3498db', '#9b59b6', '#34495e'];

  if (loading) {
    return <div className="loading-message">Đang tải dữ liệu tổng quan...</div>;
  }

  if (error) {
    return <div className="error-message">Lỗi: {error}</div>;
  }

  return (
    <div className="container">
      <h2 className="title">Tổng quan Kho máu</h2>

      <div className="cards">
        <InfoCard title="Tổng số đơn vị máu (có sẵn)" value={stats.totalUnits} color="primary-red" />
        <InfoCard title="Máu sắp hết hạn (30 ngày)" value={stats.expiringSoon} color="orange" />
        <InfoCard
          title="Nhóm máu đang thiếu (<5)"
          value={stats.lowStockGroups.length > 0 ? stats.lowStockGroups.join(', ') : 'Không có'}
          color="danger-red"
        />
      </div>

      <div className="card-section">
        <div className="card chart-card">
          <h3 className="card-title">Phân bố nhóm máu hiện có</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={stats.pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              >
                {stats.pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="card chart-card">
          <h3 className="card-title">Xu hướng nhập/xuất máu</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={stats.lineChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="inflow" stroke="#e74c3c" name="Nhập máu" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="outflow" stroke="#3498db" name="Xuất máu" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="table-wrapper">
        <h3 className="table-title">Các đơn vị máu sắp hết hạn nhất</h3>
        {stats.quickExpiringList.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Mã Đơn vị</th>
                <th>Nhóm máu</th>
                <th>Ngày hết hạn</th>
              </tr>
            </thead>
            <tbody>
              {stats.quickExpiringList.map(unit => (
                <tr key={unit.id}>
                  <td>{unit.id}</td>
                  <td>{mapBloodTypeToDisplay(unit.bloodGroup)}</td>
                  <td className={'expiring'}>
                    {new Date(unit.expiryDate).toLocaleDateString('vi-VN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-data-message">Không có đơn vị máu nào sắp hết hạn.</p>
        )}
      </div>
    </div>
  );
};

export default BloodOverviewTab;

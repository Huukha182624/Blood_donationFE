// src/components/BloodOverviewTab.tsx
import React from 'react';
import {
  PieChart, Pie, Cell,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'; // Import Recharts components
import InfoCard from './InfoCard';
import type { BloodUnit } from '../../../types/types';
import './BloodOverviewTab.css';

// Mock data (thực tế sẽ lấy từ API)
const mockBloodUnits: BloodUnit[] = [
  { id: 'BU001', bloodGroup: 'A+', componentType: 'Hồng cầu lắng', collectionDate: '2025-05-01', expiryDate: '2025-06-15', status: 'available', storageLocation: 'Kệ A-01, Ngăn 1', qaStatus: 'passed' },
  { id: 'BU002', bloodGroup: 'O-', componentType: 'Huyết tương', collectionDate: '2025-05-10', expiryDate: '2025-06-08', status: 'available', storageLocation: 'Kệ B-02, Ngăn 2', qaStatus: 'passed' },
  { id: 'BU003', bloodGroup: 'B+', componentType: 'Tiểu cầu', collectionDate: '2025-05-20', expiryDate: '2025-06-12', status: 'available', storageLocation: 'Kệ C-03, Ngăn 3', qaStatus: 'passed' },
  { id: 'BU004', bloodGroup: 'A+', componentType: 'Hồng cầu lắng', collectionDate: '2025-05-15', expiryDate: '2025-06-20', status: 'issued', storageLocation: 'Kệ A-01, Ngăn 2', qaStatus: 'passed' },
  { id: 'BU005', bloodGroup: 'O-', componentType: 'Hồng cầu lắng', collectionDate: '2025-05-25', expiryDate: '2025-06-05', status: 'available', storageLocation: 'Kệ B-02, Ngăn 3', qaStatus: 'passed' },
  { id: 'BU006', bloodGroup: 'AB+', componentType: 'Máu toàn phần', collectionDate: '2025-05-28', expiryDate: '2025-06-10', status: 'available', storageLocation: 'Kệ D-04, Ngăn 1', qaStatus: 'passed' },
  // Add some more mock data for trend analysis
  { id: 'BU010', bloodGroup: 'A+', componentType: 'Hồng cầu lắng', collectionDate: '2025-04-01', expiryDate: '2025-05-15', status: 'issued', storageLocation: 'Kệ A-01, Ngăn 1', qaStatus: 'passed' },
  { id: 'BU011', bloodGroup: 'O-', componentType: 'Huyết tương', collectionDate: '2025-04-05', expiryDate: '2025-05-08', status: 'available', storageLocation: 'Kệ B-02, Ngăn 2', qaStatus: 'passed' },
  { id: 'BU012', bloodGroup: 'B+', componentType: 'Tiểu cầu', collectionDate: '2025-04-10', expiryDate: '2025-05-12', status: 'available', storageLocation: 'Kệ C-03, Ngăn 3', qaStatus: 'passed' },
  { id: 'BU013', bloodGroup: 'A+', componentType: 'Hồng cầu lắng', collectionDate: '2025-05-05', expiryDate: '2025-06-19', status: 'available', storageLocation: 'Kệ A-01, Ngăn 2', qaStatus: 'passed' },
  { id: 'BU014', bloodGroup: 'O-', componentType: 'Hồng cầu lắng', collectionDate: '2025-05-12', expiryDate: '2025-06-22', status: 'issued', storageLocation: 'Kệ B-02, Ngăn 3', qaStatus: 'passed' },
  { id: 'BU015', bloodGroup: 'AB+', componentType: 'Máu toàn phần', collectionDate: '2025-05-18', expiryDate: '2025-06-28', status: 'available', storageLocation: 'Kệ D-04, Ngăn 1', qaStatus: 'passed' },
  { id: 'BU016', bloodGroup: 'A-', componentType: 'Tiểu cầu', collectionDate: '2025-04-20', expiryDate: '2025-05-30', status: 'available', storageLocation: 'Kệ E-05, Ngăn 1', qaStatus: 'passed' },
  { id: 'BU017', bloodGroup: 'O+', componentType: 'Hồng cầu lắng', collectionDate: '2025-05-03', expiryDate: '2025-06-18', status: 'available', storageLocation: 'Kệ F-06, Ngăn 1', qaStatus: 'passed' },
];


const BloodOverviewTab: React.FC = () => {
  const today = new Date();
  const in30Days = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);

  const totalUnits = mockBloodUnits.length;

  const expiringSoon = mockBloodUnits.filter(unit =>
    unit.status === 'available' &&
    new Date(unit.expiryDate) > today &&
    new Date(unit.expiryDate) <= in30Days
  ).length;

  const availableByGroup = mockBloodUnits.reduce<Record<string, number>>((acc, unit) => {
    if (unit.status === 'available') {
      acc[unit.bloodGroup] = (acc[unit.bloodGroup] || 0) + 1;
    }
    return acc;
  }, {});

  const lowStockGroups = Object.entries(availableByGroup)
    .filter(([, count]) => count < 2) // Assuming <2 is "low stock" for demo
    .map(([group]) => group);

  const quickExpiringList = mockBloodUnits
    .filter(unit => unit.status === 'available' && new Date(unit.expiryDate) > today)
    .sort((a, b) => new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime())
    .slice(0, 5);

  // --- Chart Data Preparation ---

  // Data for Blood Group Distribution (Pie Chart)
  const pieChartData = Object.entries(availableByGroup).map(([name, value]) => ({
    name,
    value,
  }));

  const PIE_COLORS = ['#c0392b', '#e74c3c', '#e67e22', '#f39c12', '#27ae60', '#3498db', '#9b59b6', '#34495e']; // Red, orange, green, blue, purple tones

  // Data for Blood In/Out Trends (Line Chart)
  // This is a simplified mock. In a real app, you'd aggregate by date from actual inflow/outflow records.
  const getMonthYear = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const trendDataMap = new Map<string, { month: string; inflow: number; outflow: number }>();

  // Collect inflow data (using collectionDate as a proxy for inflow)
  mockBloodUnits.forEach(unit => {
    const monthYear = getMonthYear(unit.collectionDate);
    if (!trendDataMap.has(monthYear)) {
      trendDataMap.set(monthYear, { month: monthYear, inflow: 0, outflow: 0 });
    }
    trendDataMap.get(monthYear)!.inflow += 1;
  });

  // Collect outflow data (using issued status as a proxy for outflow)
  mockBloodUnits.filter(unit => unit.status === 'issued').forEach(unit => {
    const monthYear = getMonthYear(unit.collectionDate); // Or date of issue if available
    if (!trendDataMap.has(monthYear)) {
      trendDataMap.set(monthYear, { month: monthYear, inflow: 0, outflow: 0 });
    }
    trendDataMap.get(monthYear)!.outflow += 1;
  });

  // Sort by month and convert to array
  const lineChartData = Array.from(trendDataMap.values()).sort((a, b) => {
    const [m1, y1] = a.month.split('/').map(Number);
    const [m2, y2] = b.month.split('/').map(Number);
    return new Date(y1, m1 - 1).getTime() - new Date(y2, m2 - 1).getTime();
  });


  return (
    <div className="container">
      <h2 className="title">Tổng quan Kho máu</h2>

      <div className="cards">
        <InfoCard title="Tổng số đơn vị máu" value={totalUnits} color="primary-red" />
        <InfoCard title="Máu sắp hết hạn (30 ngày)" value={expiringSoon} color="orange" />
        <InfoCard
          title="Nhóm máu đang thiếu"
          value={lowStockGroups.length > 0 ? lowStockGroups.join(', ') : 'Không có'}
          color="danger-red"
          onClick={() => alert('Chuyển đến chi tiết nhóm máu thiếu')}
        />
      </div>

      <div className="card-section">
        <div className="card chart-card"> {/* Added chart-card class for specific styling */}
          <h3 className="card-title">Phân bố nhóm máu hiện có</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="card chart-card"> {/* Added chart-card class for specific styling */}
          <h3 className="card-title">Xu hướng nhập/xuất máu</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart
              data={lineChartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" /> {/* Lighter grid */}
              <XAxis dataKey="month" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="inflow" stroke="#e74c3c" name="Nhập máu" activeDot={{ r: 8 }} /> {/* Red for inflow */}
              <Line type="monotone" dataKey="outflow" stroke="#3498db" name="Xuất máu" /> {/* Blue for outflow */}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="table-wrapper">
        <h3 className="table-title">Các đơn vị máu sắp hết hạn nhất</h3>
        {quickExpiringList.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Mã Đơn vị</th>
                <th>Nhóm máu</th>
                <th>Ngày hết hạn</th>
              </tr>
            </thead>
            <tbody>
              {quickExpiringList.map(unit => (
                <tr key={unit.id}>
                  <td>{unit.id}</td>
                  <td>{unit.bloodGroup}</td>
                  <td className={new Date(unit.expiryDate) < today ? 'expired' : 'expiring'}>
                    {unit.expiryDate}
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
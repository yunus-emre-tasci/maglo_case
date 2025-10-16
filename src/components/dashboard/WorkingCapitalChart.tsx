"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { formatCurrency } from "@/lib/utils";
import { WorkingCapitalChartSkeleton } from "@/components/ui/Skeleton";
import { useState } from "react";
import { errorHandler } from "@/lib/errorHandler";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  ReferenceLine,
} from "recharts";
import { TrendingUp, AlertCircle, ChevronDown } from "lucide-react";

export function WorkingCapitalChart() {
  const [timeRange, setTimeRange] = useState("6months");

  const {
    data: workingCapital,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["working-capital"],
    queryFn: () => apiClient.getWorkingCapital(),
  });

  if (isLoading) {
    return <WorkingCapitalChartSkeleton />;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-red-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              Error loading working capital data
            </h3>
            <p className="mt-1 text-sm text-red-700">
              Please try refreshing the page.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const data = workingCapital?.data;

  if (!data) {
    return null;
  }

  // Turkish to English month mapping
  const monthMap: { [key: string]: string } = {
    Ocak: "Jan",
    Şubat: "Feb",
    Mart: "Mar",
    Nisan: "Apr",
    Mayıs: "May",
    Haziran: "Jun",
    Temmuz: "Jul",
    Ağustos: "Aug",
    Eylül: "Sep",
    Ekim: "Oct",
    Kasım: "Nov",
    Aralık: "Dec",
  };

  // Filter data based on time range
  const getFilteredData = () => {
    const allData = data.data.map((item) => ({
      period: monthMap[item.month] || item.month,
      income: item.income,
      expense: item.expense,
      net: item.net,
    }));

    switch (timeRange) {
      case "3months":
        return allData.slice(-3);
      case "6months":
        return allData.slice(-6);
      case "12months":
        return allData;
      default:
        return allData.slice(-6);
    }
  };

  const filteredData = getFilteredData();

  // Recharts data format
  const chartData = filteredData.map((item) => ({
    period: item.period,
    income: item.income,
    expense: item.expense,
    net: item.income - item.expense,
  }));

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const income = data.income;
      const expense = data.expense;
      const net = income - expense;
      const profitMargin = ((net / income) * 100).toFixed(1);

      return (
        <div className="bg-white p-4 rounded-xl shadow-2xl border border-gray-200 min-w-[280px]">
          <div className="text-center mb-3">
            <h3 className="text-lg font-bold text-gray-900">📊 {label}</h3>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm font-medium text-gray-700">
                  📈 Income
                </span>
              </div>
              <span className="text-sm font-bold text-green-600">
                ₺{income.toLocaleString("tr-TR")}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <span className="text-sm font-medium text-gray-700">
                  📉 Expenses
                </span>
              </div>
              <span className="text-sm font-bold text-yellow-600">
                ₺{expense.toLocaleString("tr-TR")}
              </span>
            </div>

            <div className="border-t pt-2 mt-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm font-medium text-gray-700">
                    💰 Net Profit
                  </span>
                </div>
                <span
                  className={`text-sm font-bold ${
                    net >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {net >= 0 ? "📈" : "📉"} ₺
                  {Math.abs(net).toLocaleString("tr-TR")}
                </span>
              </div>

              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-gray-500">📊 Profit Margin</span>
                <span className="text-xs font-medium text-gray-600">
                  {profitMargin}%
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Working Capital
          </h3>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: "#29A073" }}
            ></div>
            <span className="text-xs font-normal" style={{ color: "#1B212D" }}>
              Income
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: "#C8EE44" }}
            ></div>
            <span className="text-xs font-normal" style={{ color: "#1B212D" }}>
              Expenses
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="text-xs font-normal bg-gray-50 px-3 py-1 rounded-lg cursor-pointer border-0 focus:ring-2 focus:ring-green-500"
              style={{ color: "#1B212D" }}
            >
              <option value="3months">Last 3 months</option>
              <option value="6months">Last 6 months</option>
              <option value="12months">Last 12 months</option>
            </select>
          </div>
        </div>
      </div>

      <div className="h-64 relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <defs>
              <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#29A073" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#29A073" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#C8EE44" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#C8EE44" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />

            <XAxis
              dataKey="period"
              stroke="#6B7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              stroke="#6B7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) =>
                value >= 1000 ? `${(value / 1000).toFixed(0)}K ₺` : `${value} ₺`
              }
            />

            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="income"
              stroke="#29A073"
              strokeWidth={3}
              fill="url(#incomeGradient)"
              dot={{ fill: "#29A073", stroke: "#fff", strokeWidth: 2, r: 5 }}
              activeDot={{
                r: 8,
                stroke: "#29A073",
                strokeWidth: 2,
                fill: "#fff",
              }}
            />

            <Area
              type="monotone"
              dataKey="expense"
              stroke="#C8EE44"
              strokeWidth={3}
              fill="url(#expenseGradient)"
              dot={{ fill: "#C8EE44", stroke: "#fff", strokeWidth: 2, r: 5 }}
              activeDot={{
                r: 8,
                stroke: "#C8EE44",
                strokeWidth: 2,
                fill: "#fff",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

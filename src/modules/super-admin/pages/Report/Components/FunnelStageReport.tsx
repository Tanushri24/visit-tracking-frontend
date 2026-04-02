import React, { useEffect, useState } from "react";
import { Download, Filter, RefreshCw } from "lucide-react";

const FunnelStageReportPage: React.FC = () => {

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    employee: "",
  });

  const fetchReport = async () => {
    try {
      setLoading(true);
      // Mock data for now
      const mockData = [
        {
          stageName: "Lead",
          totalVisits: 100,
          expectedValue: 50000,
          actualValue: 45000,
          conversionRate: 90
        },
        {
          stageName: "Qualified",
          totalVisits: 80,
          expectedValue: 40000,
          actualValue: 38000,
          conversionRate: 95
        },
        {
          stageName: "Proposal",
          totalVisits: 60,
          expectedValue: 30000,
          actualValue: 28000,
          conversionRate: 93.33
        },
        {
          stageName: "Negotiation",
          totalVisits: 45,
          expectedValue: 22500,
          actualValue: 21000,
          conversionRate: 93.33
        },
        {
          stageName: "Closed Won",
          totalVisits: 30,
          expectedValue: 15000,
          actualValue: 15000,
          conversionRate: 100
        }
      ];
      setData(mockData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  const handleExportCSV = () => {
    const rows = [
      ["Stage", "Total Visits", "Expected Value", "Actual Value", "Conversion %"],
      ...data.map((d) => [
        d.stageName,
        d.totalVisits,
        d.expectedValue,
        d.actualValue,
        d.conversionRate,
      ]),
    ];

    const csvContent =
      "data:text/csv;charset=utf-8," +
      rows.map((e) => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "funnel_stage_report.csv";
    link.click();
  };

  return (
    <div className="p-6">

      <h2 className="text-xl font-semibold mb-4">
        Funnel Stage Report
      </h2>

      {/* Filters */}
      <div className="flex gap-4 mb-4">

        <input
          type="date"
          value={filters.startDate}
          onChange={(e) =>
            setFilters({ ...filters, startDate: e.target.value })
          }
          className="border rounded px-3 py-2"
        />

        <input
          type="date"
          value={filters.endDate}
          onChange={(e) =>
            setFilters({ ...filters, endDate: e.target.value })
          }
          className="border rounded px-3 py-2"
        />

        <button
          onClick={fetchReport}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          <Filter size={16} /> Apply
        </button>

        <button
          onClick={fetchReport}
          className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          <RefreshCw size={16} /> Refresh
        </button>

        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          <Download size={16} /> Export
        </button>

      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded">

        <table className="min-w-full text-sm">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Stage</th>
              <th className="p-2 text-left">Total Visits</th>
              <th className="p-2 text-left">Expected Value</th>
              <th className="p-2 text-left">Actual Value</th>
              <th className="p-2 text-left">Conversion %</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center p-4">
                  Loading...
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr key={index} className="border-t hover:bg-gray-50">
                  <td className="p-2">{row.stageName}</td>
                  <td className="p-2">{row.totalVisits}</td>
                  <td className="p-2">{row.expectedValue}</td>
                  <td className="p-2">{row.actualValue}</td>
                  <td className="p-2">{row.conversionRate}%</td>
                </tr>
              ))
            )}
          </tbody>

        </table>

      </div>

    </div>
  );
};

export default FunnelStageReportPage;
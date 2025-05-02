/** @format */

"use client";
import { useEffect, useState } from "react";
import API from "@/api/axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import styles from "../../styles/staff_dashboard.css";
import ProtectedRoute from "@/components/ProtectedRoute";
export default function AdminDashboard() {
  const { access, user } = useAuth();
  const router = useRouter();
  const [valueStats, setValueStats] = useState([]);
  const [categoryStats, setCategoryStats] = useState([]);
  const [avgPriceStats, setAvgPriceStats] = useState([]);
  const [topSellers, setTopSellers] = useState([]);
  const [logs, setLogs] = useState([]);
  useEffect(() => {
    // if (!access || !user || !user.is_staff) return;
    // Load all stats
    API.get("/total_value_per_seller/").then((res) => setValueStats(res.data));

    API.get("/watches_per_category/").then((res) => setCategoryStats(res.data));

    API.get("/avg_price_by_condition/").then((res) =>
      setAvgPriceStats(res.data)
    );

    API.get("/top_sellers/").then((res) => setTopSellers(res.data));
    API.get("/logs_list/").then((res) => setLogs(res.data));
  }, []);

  if (!access || !user || !user.is_staff) {
    return <p>Access denied</p>;
  }

  return (
    <div className='admin-container'>
      <h1 className='admin-heading'>Admin Dashboard</h1>

      <Section title='💰 Total Value Per Seller'>
        <StatsTable
          data={valueStats}
          columns={["id", "username", "total_value"]}
        />
      </Section>

      <Section title='⌚ Watches Per Category'>
        <StatsTable data={categoryStats} columns={["category", "total"]} />
      </Section>

      <Section title='⚙️ Avg. Price by Condition'>
        <StatsTable data={avgPriceStats} columns={["condition", "avg_price"]} />
      </Section>

      <Section title='📈 Top 5 Sellers by Listings'>
        <StatsTable data={topSellers} columns={["username", "total"]} />
      </Section>

      <Section title='📝 Recent Logs'>
        <LogsTable data={logs} />
      </Section>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className='section'>
      <h2 className='section-title'>{title}</h2>
      {children}
    </section>
  );
}

function StatsTable({ data, columns }) {
  return (
    <div className='table-container'>
      <table className='stats-table'>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col}>{col.replace("_", " ")}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className='placeholder'>
                No data available
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr key={i}>
                {columns.map((col) => (
                  <td key={col}>
                    {typeof row[col] === "number"
                      ? Number(row[col]).toFixed(2)
                      : row[col] ?? "-"}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

function LogsTable({ data }) {
  return (
    <div className='table-container'>
      <table className='stats-table'>
        <thead>
          <tr>
            <th>User</th>
            <th>Action</th>
            <th>Model</th>
            <th>Object ID</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={5} className='placeholder'>
                No logs available
              </td>
            </tr>
          ) : (
            data.map((log, i) => (
              <tr key={i}>
                <td>{log.user || "Anonymous"}</td>
                <td>{log.action}</td>
                <td>{log.model_name}</td>
                <td>{log.object_id ?? "-"}</td>
                <td>{new Date(log.timestamp).toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

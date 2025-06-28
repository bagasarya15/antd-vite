import React, { useEffect, useState } from "react";
import {
	Card,
	Statistic,
	DatePicker,
	Row,
	Col,
	Typography,
	Progress,
	Avatar,
	ConfigProvider,
	theme,
	Grid,
} from "antd";
import {
	ArrowUpOutlined,
	ArrowDownOutlined,
	AreaChartOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { Column, Pie, Line } from "@ant-design/charts";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;
const { defaultAlgorithm, darkAlgorithm } = theme;
const { useBreakpoint } = Grid;

const DashboardIndex = ({ isDarkMode }) => {
	const token = localStorage.getItem("token");
	const navigate = useNavigate();

	useEffect(() => {
		if (!token) {
			navigate("/login");
		}
	}, []);

	const [dateRange, setDateRange] = useState([]);
	const screens = useBreakpoint();
	const isMobile = !screens.md;

	const income = 4200000;
	const expense = 3300000;
	const balance = income - expense;
	const goal = 5000000;

	const chartData = [
		{ date: "2025-06-01", income: 1500000, expense: 1000000 },
		{ date: "2025-06-08", income: 1800000, expense: 1600000 },
		{ date: "2025-06-15", income: 900000, expense: 700000 },
	];

	const categoryExpense = [
		{ type: "Transport", value: 1000000 },
		{ type: "Food", value: 800000 },
		{ type: "Utilities", value: 600000 },
		{ type: "Shopping", value: 900000 },
	];

	// Chart theme configuration
	const chartTheme = {
		theme: isDarkMode ? "dark" : "light",
		color: isDarkMode
			? [
					"#5B8FF9",
					"#5AD8A6",
					"#5D7092",
					"#F6BD16",
					"#E8684A",
					"#6DC8EC",
					"#9270CA",
					"#FF9D4D",
					"#269A99",
					"#FF99C3",
			  ]
			: undefined,
		components: {
			axis: {
				label: {
					style: {
						fill: isDarkMode
							? "rgba(255, 255, 255, 0.85)"
							: "rgba(0, 0, 0, 0.85)",
						fontSize: isMobile ? 10 : 12,
					},
				},
				line: {
					style: {
						stroke: isDarkMode ? "#434343" : "#d9d9d9",
					},
				},
				grid: {
					line: {
						style: {
							stroke: isDarkMode ? "#434343" : "#f0f0f0",
						},
					},
				},
			},
			legend: {
				itemName: {
					style: {
						fill: isDarkMode
							? "rgba(255, 255, 255, 0.85)"
							: "rgba(0, 0, 0, 0.85)",
						fontSize: isMobile ? 10 : 12,
					},
				},
			},
			tooltip: {
				domStyles: {
					"g2-tooltip": {
						backgroundColor: isDarkMode ? "#1f1f1f" : "#ffffff",
						color: isDarkMode
							? "rgba(255, 255, 255, 0.85)"
							: "rgba(0, 0, 0, 0.85)",
						boxShadow:
							"0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)",
					},
				},
			},
		},
	};

	const columnConfig = {
		data: chartData.flatMap((item) => [
			{ type: "Income", date: item.date, value: item.income },
			{ type: "Expense", date: item.date, value: item.expense },
		]),
		xField: "date",
		yField: "value",
		seriesField: "type",
		isGroup: true,
		columnStyle: { radius: [6, 6, 0, 0] },
		color: ({ type }) => (type === "Income" ? "#52c41a" : "#f5222d"),
		height: isMobile ? 250 : 320,
		padding: isMobile ? [16, 16, 32, 16] : [32, 32, 64, 32],
		legend: {
			position: "top",
			itemSpacing: isMobile ? 8 : 16,
		},
		...chartTheme,
	};

	const pieConfig = {
		data: categoryExpense,
		angleField: "value",
		colorField: "type",
		radius: 0.9,
		innerRadius: 0.5,
		label: {
			type: "outer",
			content: "{name} ({percentage})",
			style: {
				fill: isDarkMode ? "rgba(255, 255, 255, 0.85)" : "rgba(0, 0, 0, 0.85)",
				fontSize: isMobile ? 10 : 12,
				fontWeight: 500,
			},
		},
		color: isDarkMode
			? ["#5B8FF9", "#5AD8A6", "#5D7092", "#F6BD16"]
			: ["#fb923c", "#3b82f6", "#6366f1", "#ec4899"],
		legend: {
			position: isMobile ? "bottom" : "right",
			itemSpacing: isMobile ? 8 : 16,
		},
		height: isMobile ? 250 : 300,
		...chartTheme,
	};

	const lineConfig = {
		data: chartData,
		xField: "date",
		yField: "income",
		point: { size: isMobile ? 3 : 5, shape: "diamond" },
		color: isDarkMode ? "#5B8FF9" : "#1677ff",
		height: isMobile ? 180 : 200,
		label: {
			style: {
				fill: isDarkMode ? "rgba(255, 255, 255, 0.85)" : "rgba(0, 0, 0, 0.85)",
				fontSize: isMobile ? 10 : 12,
				fontWeight: 500,
			},
		},
		...chartTheme,
	};

	return (
		<ConfigProvider
			theme={{
				algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
				components: {
					Card: {
						colorBgContainer: isDarkMode ? "#1f1f1f" : "#ffffff",
						colorBorderSecondary: isDarkMode ? "#434343" : "#f0f0f0",
					},
					DatePicker: {
						colorBgContainer: isDarkMode ? "#1f1f1f" : "#ffffff",
						colorText: isDarkMode
							? "rgba(255, 255, 255, 0.85)"
							: "rgba(0, 0, 0, 0.85)",
						colorBorder: isDarkMode ? "#434343" : "#d9d9d9",
					},
					Statistic: {
						colorText: isDarkMode
							? "rgba(255, 255, 255, 0.85)"
							: "rgba(0, 0, 0, 0.85)",
						colorTextDescription: isDarkMode
							? "rgba(255, 255, 255, 0.45)"
							: "rgba(0, 0, 0, 0.45)",
					},
				},
			}}
		>
			<div
				style={{
					padding: isMobile ? 12 : 24,
					background: isDarkMode ? "#141414" : "#f5f5f5",
					minHeight: "100vh",
				}}
			>
				<Row
					justify="space-between"
					align="middle"
					style={{ marginBottom: isMobile ? 12 : 24 }}
				>
					<Title
						level={isMobile ? 4 : 3}
						style={{
							color: isDarkMode
								? "rgba(255, 255, 255, 0.85)"
								: "rgba(0, 0, 0, 0.85)",
							margin: 0,
						}}
					>
						Financial Overview
					</Title>
					<DatePicker.RangePicker
						onChange={(value) => setDateRange(value)}
						allowClear
						size={isMobile ? "small" : "middle"}
					/>
				</Row>

				<Row
					gutter={isMobile ? 8 : 16}
					style={{ marginBottom: isMobile ? 12 : 24 }}
				>
					<Col
						xs={24}
						sm={12}
						md={6}
						style={{ marginBottom: isMobile ? 8 : 0 }}
					>
						<Card bordered size={isMobile ? "small" : "default"}>
							<Statistic
								title="Total Income"
								value={income}
								prefix={<ArrowUpOutlined />}
								valueStyle={{ color: "#52c41a", fontSize: isMobile ? 18 : 24 }}
								suffix="IDR"
							/>
						</Card>
					</Col>
					<Col
						xs={24}
						sm={12}
						md={6}
						style={{ marginBottom: isMobile ? 8 : 0 }}
					>
						<Card bordered size={isMobile ? "small" : "default"}>
							<Statistic
								title="Total Expense"
								value={expense}
								prefix={<ArrowDownOutlined />}
								valueStyle={{ color: "#f5222d", fontSize: isMobile ? 18 : 24 }}
								suffix="IDR"
							/>
						</Card>
					</Col>
					<Col
						xs={24}
						sm={12}
						md={6}
						style={{ marginBottom: isMobile ? 8 : 0 }}
					>
						<Card bordered size={isMobile ? "small" : "default"}>
							<Statistic
								title="Balance"
								value={balance}
								prefix={<AreaChartOutlined />}
								valueStyle={{
									color: balance >= 0 ? "#52c41a" : "#f5222d",
									fontSize: isMobile ? 18 : 24,
								}}
								suffix="IDR"
							/>
						</Card>
					</Col>
					<Col xs={24} sm={12} md={6}>
						<Card bordered size={isMobile ? "small" : "default"}>
							<Text strong style={{ fontSize: isMobile ? 14 : 16 }}>
								Savings Goal
							</Text>
							<Progress
								percent={Math.round((income / goal) * 100)}
								status="active"
								strokeColor={isDarkMode ? "#5B8FF9" : "#1677ff"}
								size={isMobile ? "small" : "default"}
							/>
							<Text type="secondary" style={{ fontSize: isMobile ? 12 : 14 }}>
								Goal: {goal.toLocaleString()} IDR
							</Text>
						</Card>
					</Col>
				</Row>

				<Card
					title="Income Growth"
					bordered
					size={isMobile ? "small" : "default"}
					style={{ marginBottom: isMobile ? 12 : 24 }}
					headStyle={{ padding: isMobile ? "8px 16px" : "16px 24px" }}
					bodyStyle={{ padding: isMobile ? 8 : 16 }}
				>
					<Line {...lineConfig} />
				</Card>

				<Card
					title="Income vs Expense"
					bordered
					size={isMobile ? "small" : "default"}
					style={{ marginBottom: isMobile ? 12 : 24 }}
					headStyle={{ padding: isMobile ? "8px 16px" : "16px 24px" }}
					bodyStyle={{ padding: isMobile ? 8 : 16 }}
				>
					<Column {...columnConfig} />
				</Card>

				<Card
					title="Expense Categories"
					bordered
					size={isMobile ? "small" : "default"}
					style={{ marginBottom: isMobile ? 12 : 24 }}
					headStyle={{ padding: isMobile ? "8px 16px" : "16px 24px" }}
					bodyStyle={{ padding: isMobile ? 8 : 16 }}
				>
					{categoryExpense.length > 0 ? (
						<Pie {...pieConfig} />
					) : (
						<div
							style={{
								textAlign: "center",
								padding: isMobile ? "16px" : "32px",
							}}
						>
							No category data available.
						</div>
					)}
				</Card>

				<Card
					title="Top Spenders"
					bordered
					size={isMobile ? "small" : "default"}
					headStyle={{ padding: isMobile ? "8px 16px" : "16px 24px" }}
					bodyStyle={{ padding: isMobile ? 8 : 16 }}
				>
					<Row gutter={[isMobile ? 8 : 16, isMobile ? 8 : 16]}>
						{["Alice", "Bob", "Charlie"].map((name, idx) => (
							<Col key={idx} xs={24} sm={12} md={8}>
								<Card
									bordered
									hoverable
									size="small"
									style={{ marginBottom: isMobile ? 8 : 0 }}
								>
									<Row align="middle" gutter={isMobile ? 8 : 16}>
										<Col>
											<Avatar
												size={isMobile ? 40 : 48}
												icon={<UserOutlined />}
											/>
										</Col>
										<Col>
											<Text strong style={{ fontSize: isMobile ? 14 : 16 }}>
												{name}
											</Text>
											<br />
											<Text
												type="secondary"
												style={{ fontSize: isMobile ? 12 : 14 }}
											>
												Spent{" "}
												{Math.floor(Math.random() * 1500000).toLocaleString()}{" "}
												IDR
											</Text>
										</Col>
									</Row>
								</Card>
							</Col>
						))}
					</Row>
				</Card>
			</div>
		</ConfigProvider>
	);
};

export default DashboardIndex;

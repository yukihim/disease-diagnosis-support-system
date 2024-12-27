import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const PATIENT_ITEMS = [
	{ name: "Patients Checkin", roles: ["receptionist"] },
	{ name: "Incoming Patient", roles: ["doc"] },
	{ name: "Patient Sent to Test", roles: ["doc"] },
    { name: "Inpatients", roles: ["doc"] },
];

const userGrowthData = [
	{ month: "Jan", patients: 1000 },
	{ month: "Feb", patients: 1500 },
	{ month: "Mar", patients: 2000 },
	{ month: "Apr", patients: 3000 },
	{ month: "May", patients: 4000 },
	{ month: "Jun", patients: 5000 },
];

const IncomingPatientsChart = () => {
	return (
		<motion.div
			className='p-6 bg-gray-800 bg-opacity-50 border border-gray-700 shadow-lg backdrop-blur-md rounded-xl lg:col-span-2'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.3 }}
		>
			<h2 className='mb-4 text-xl font-semibold text-gray-100'>Incoming Patients</h2>
			<div className='h-[320px]'>
				<ResponsiveContainer width='100%' height='100%'>
					<LineChart data={userGrowthData}>
						<CartesianGrid strokeDasharray='3 3' stroke='#374151' />
						<XAxis dataKey='month' stroke='#9CA3AF' />
						<YAxis stroke='#9CA3AF' />
						<Tooltip
							contentStyle={{
								backgroundColor: "rgba(31, 41, 55, 0.8)",
								borderColor: "#4B5563",
							}}
							itemStyle={{ color: "#E5E7EB" }}
						/>
						<Line
							type='monotone'
							dataKey='patients'
							stroke='#8B5CF6'
							strokeWidth={2}
							dot={{ fill: "#8B5CF6", strokeWidth: 2, r: 4 }}
							activeDot={{ r: 8 }}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};
export default IncomingPatientsChart;

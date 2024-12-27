import { UserCheck, UserPlus, UsersIcon, UserX } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";




import UsersTable from "../components/users/UsersTable";
import UserGrowthChart from "../components/users/UserGrowthChart";
import UserActivityHeatmap from "../components/users/UserActivityHeatmap";
import UserDemographicsChart from "../components/users/UserDemographicsChart";


// This is for Doctor
import IncomingPatientChart from "../components/patients/IncomingPatientsChart";


const patientStats = {
	totalPatients: 152845,
	newPatientsToday: 243,
	activePatients: 98520,
	churnRate: "2.4%",
};

const PatientsPage = () => {
	return (
		<div className='relative z-10 flex-1 overflow-auto'>
			<Header title='Patients' />

			<main className='px-4 py-6 mx-auto max-w-7xl lg:px-8'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 mb-8 sm:grid-cols-2 lg:grid-cols-4'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard
						name='Total Patients'
						icon={UsersIcon}
						value={patientStats.totalPatients.toLocaleString()}
						color='#6366F1'
					/>
					<StatCard name='New Patients Today' icon={UserPlus} value={patientStats.newPatientsToday} color='#10B981' />
					<StatCard
						name='Active Patients'
						icon={UserCheck}
						value={patientStats.activePatients.toLocaleString()}
						color='#F59E0B'
					/>
					<StatCard name='Churn Rate' icon={UserX} value={patientStats.churnRate} color='#EF4444' />
				</motion.div>

				{/* <UsersTable /> */}

				{/* USER CHARTS */}
				{/* <div className='grid grid-cols-1 gap-6 mt-8 lg:grid-cols-2'>
					<UserGrowthChart />
					<UserActivityHeatmap />
					<UserDemographicsChart />
				</div> */}

				{/* PATIENT CHARTS */}
				<div className='grid grid-cols-1 gap-6 mt-8 lg:grid-cols-2'>
					<IncomingPatientChart />
				</div>
			</main>
		</div>
	);
};
export default PatientsPage;

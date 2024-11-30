import Header from "../components/common/Header";

const OverviewPage = () => {
	return (
		<div className='relative z-10 flex-1 overflow-auto'>
			<Header title='Homepage' />

			<main className='px-4 py-6 mx-auto max-w-7xl lg:px-8'>
				{/* HOMEPAGE */}
				{/* <p>
					<h1>Disease Diagnose Support System</h1><br />
					<h2>Developed by Phuong Xuong Thinh and Pham Le Quan - This system will provide direct support to the diagnosing phase of the doctor for the patients</h2><br /><hr /><br />
				</p> */}

				{/* Introduction */}
                <section className='mb-8'>
                    <h1 className='text-3xl font-bold'>Disease Diagnose Support System</h1>
                    <p className='mt-4 text-lg'>
                        Developed by Phuong Xuong Thinh and Pham Le Quan, this system provides direct support to the diagnosing phase of the doctor for the patients.
                    </p>
                    <hr className='my-6' />
                </section>

                {/* Features */}
                <section className='mb-8'>
                    <h2 className='text-2xl font-semibold'>Features</h2>
                    <ul className='mt-4 list-disc list-inside'>
                        <li>Accurate disease diagnosis based on patient symptoms and medical history.</li>
                        <li>Integration with electronic health records (EHR) for seamless data access.</li>
                        <li>Real-time updates and notifications for critical patient conditions.</li>
                        <li>Comprehensive reporting and analytics for better decision-making.</li>
                        <li>User-friendly interface for easy navigation and usage.</li>
                    </ul>
                </section>

                {/* Benefits */}
                <section className='mb-8'>
                    <h2 className='text-2xl font-semibold'>Benefits</h2>
                    <ul className='mt-4 list-disc list-inside'>
                        <li>Improves diagnostic accuracy and reduces human error.</li>
                        <li>Enhances patient care and treatment outcomes.</li>
                        <li>Saves time for doctors by automating routine tasks.</li>
                        <li>Provides valuable insights through data analytics.</li>
                        <li>Facilitates better communication between healthcare providers.</li>
                    </ul>
                </section>

                {/* How It Works */}
                <section className='mb-8'>
                    <h2 className='text-2xl font-semibold'>How It Works</h2>
                    <p className='mt-4'>
                        The Disease Diagnose Support System leverages advanced algorithms and machine learning techniques to analyze patient data and provide accurate diagnoses. Doctors can input patient symptoms and medical history into the system, which then processes the information and suggests possible diagnoses. The system also integrates with electronic health records (EHR) to access comprehensive patient data, ensuring a holistic approach to diagnosis.
                    </p>
                </section>

                {/* Contact Information */}
                <section className='mb-8'>
                    <h2 className='text-2xl font-semibold'>Contact Information</h2>
                    <p className='mt-4'>
                        For more information or support, please contact us at:
                    </p>
                    <ul className='mt-4 list-disc list-inside'>
                        <li>Email: support@diseasediagnose.com</li>
                        <li>Phone: +84-900-900-900</li>
                        <li>Address: 268 Lý Thường Kiệt, Phường 14, Quận 10 , Thành phố Hồ Chí Minh , Việt Nam</li>
                    </ul>
                </section>
			</main>
		</div>
	);
};
export default OverviewPage;

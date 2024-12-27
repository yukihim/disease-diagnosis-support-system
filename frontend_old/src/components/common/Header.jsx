const Header = ({ title }) => {
	return (
		<header className='bg-gray-800 bg-opacity-50 border-b border-gray-700 shadow-lg backdrop-blur-md'>
			<div className='px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
				<h1 className='text-2xl font-semibold text-gray-100'>{title}</h1>
			</div>
		</header>
	);
};
export default Header;

import img from '../../img/foxbel-music.png'
import { IconUserFilled } from '@tabler/icons-react'

const Header = () => {
	return (
		<header className='bg-white shadow-md mb-4'>
			<div className='container max-w-screen-xl m-auto py-3 flex items-center'>
				<div>
					<img src={img} alt='foxbel music logo' />
				</div>
				<div className='w-full flex justify-end items-center'>
					<IconUserFilled
						size={20}
						stroke={1.5}
						className='mr-1 text-red-principal'
					/>{' '}
					<span className='text-sm font-semibold text-gray-2'>Carlos Mayo</span>
				</div>
			</div>
		</header>
	)
}

export default Header

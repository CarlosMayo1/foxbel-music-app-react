import { Outlet } from 'react-router-dom'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer.jsx/Footer'

const Content = ({ audioRef }) => {
	return (
		<div>
			<Header audioRef={audioRef} />
			<main>
				<Outlet />
			</main>
			<Footer audioRef={audioRef} />
		</div>
	)
}

export default Content

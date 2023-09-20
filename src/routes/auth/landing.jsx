import logoWhite from '../../assets/icons/logoWhite.svg';
import landingImg from '../../assets/images/landingImg.png';
import * as Icon from 'react-icons/fa6';
import { Button } from '../../components/global/button';
import { useNavigate } from 'react-router-dom';

export const Landing = () => {
    const navigate = useNavigate();

    return (
        <section className="bg-gray-900 w-full lg:h-[100dvh] text-white flex flex-col lg:flex-row lg:items-start justify-between overflow-hidden lg:py-24 lg:pl-24 py-8">
            <div className='flex flex-col justify-center items-center gap-5 text-center'>
                <img src={logoWhite} alt="logo" className="lg:w-full w-60" />
                <p className='text-gray-300 lg:text-xl text-lg'>your moments on <br /> the ‘inter-webs’</p>
                <Button children="Get Started" variant="solid" widthFit onClick={() => navigate('/login', { replace: true })} />
                <p className='lg:mt-[40%]'>made with <Icon.FaHeart className='inline' /> <br /> <Icon.FaGithub className='inline' /> tanthehack </p>
            </div>
            <div>
                <img src={landingImg} alt='landing image of the application' />
            </div>
        </section>
    )
}
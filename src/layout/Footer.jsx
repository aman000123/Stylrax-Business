import { Stack } from 'react-bootstrap';
import Logo from '../ux/Logo';
import './layout.css';


const CopyRight = () => {
    return (
        <p>
            © 2023-2024, Stylrax.com, Inc. or its affiliates
        </p>
    )
}

const FooterMenu = () => {
    return (
        <ul className='d-sm-flex flex-sm-row list-unstyled mb-1 gap-5'>
            <li>Business</li>
            <li>Customer service</li>
            <li>Conditions of use</li>
            <li>Privacy Policy</li>
        </ul>
    )
}

export default function Footer() {
    return (
        <footer className="layout__footer bg-black text-white px-5 py-3">
             <Stack className='flex-sm-row align-items-center'>
                <Stack>
                    <FooterMenu/>
                    <CopyRight/>
                </Stack>
                <Logo className="ms-sm-auto me-auto layout_footer_logo" />
            </Stack>
        </footer>
    )
}
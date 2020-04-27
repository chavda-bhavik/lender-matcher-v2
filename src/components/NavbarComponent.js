import React, { useState } from 'react';
import { Container, Collapse, Navbar, NavbarToggler } from 'reactstrap';
import { Link } from "react-scroll";

const NavbarComponent = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = (value=false) => setIsOpen(value);
    const brandNameClicked = () => {
        toggle();
        props.resetList();
    }
    // const scrollToBottom = () => {
    //     scroll.scrollToBottom();
    // }
    // const scrollToTop = () => {
    //     scroll.scrollToTop({ offset: -70 })
    // }
    return (
        <Navbar color="light" light expand="lg" fixed="top" className="py-2 shadow-lg bg-white" >
            <Container>
                <Link 
                    to="app" 
                    spy={true} 
                    smooth={true} 
                    offset={-70} 
                    duration={500} 
                    className="navbar-brand"
                    onClick={brandNameClicked}
                >Small Business Loan Finder</Link>
                {/* <button class="navbar-brand" onClick={scrollToTop()} >Lender Matcher App</button> */}
                <NavbarToggler onClick={() => toggle(true)} />
                <Collapse isOpen={isOpen} navbar>
                    <ul className="navbar-nav ml-auto my-2 my-lg-0">
                        <li className="nav-item">
                            <Link 
                                activeClass="active"
                                to="about" 
                                spy={true} 
                                smooth={true} 
                                offset={-70} 
                                duration={500} 
                                className="nav-link"
                                onClick={ () => toggle(false)}
                            >About</Link>
                            {/* <a href="#about" className="nav-link" onClick={toggle}>About</a> */}
                        </li>
                        <li className="nav-item">
                            <Link
                                activeClass="active"
                                to="faq" 
                                spy={true} 
                                smooth={true} 
                                offset={-70} 
                                duration={500} 
                                className="nav-link"
                                onClick={() => toggle(false)}
                            >FAQ</Link>
                        </li>
                    </ul>
                </Collapse>
            </Container>
        </Navbar>
    )
}
export default NavbarComponent
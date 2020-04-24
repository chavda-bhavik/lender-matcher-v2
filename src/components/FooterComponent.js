import React from 'react'
import { Container } from "reactstrap";
const Footer = (props) => {
    return (
        <footer className="bg-light py-2" style={{ 'boxShadow': 'rgba(0,0,0,0.20) 0px -2px' }}>
            <Container>
                <div className="small text-center">Small Business Loan Finder</div>
            </Container>
        </footer>
    )
}
export default Footer
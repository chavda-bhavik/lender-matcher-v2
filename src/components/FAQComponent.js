import React from 'react'
import { Container,Row,Col } from "reactstrap";
import './AboutComponent.css'
const FAQ = (props) => {
    return (
        <section className="bg-light" id="faq">
            <Container>
                <h2 className="my-3">FAQ</h2>
                <hr className="divider light mb-3" />
                <Row>
                    <Col xs={11} md={9}>
                        <p className="Disclaimer mb-0">How do we match you to lenders?</p>
                        <p className="site-info">xyz looks at SBA (7a) lending history since 2010 to identify active lenders. Users will be matched to lenders based on industry, location, lending volume, and the desire for Express Loans.</p>

                        <p className="Disclaimer mt-3 mb-0">What data are we using?</p>
                        <p className="site-info">United States Small Business Administration SBA 7(a) <a href="www.google.com">loan data reports</a>.</p>

                        <p className="Disclaimer mt-3 mb-0">Who are you?</p>
                        <p className="site-info mb-4">We are a volunteer, pro bono team of engineers, designers, data analysts, and business analysts who come together to support business owners during the current crisis. Participating individuals include:</p>

                        <p className="site-info mb-1"><a href="www.google.com">Ali Baghshomali</a> - Product and data science</p>
                        <p className="site-info mb-1"><a href="www.google.com">Wolasi Konu</a> - Designer</p>
                        <p className="site-info mb-1"><a href="www.google.com">Bhavik Chavda</a> - Developer</p>
                        <p className="site-info mb-1"><a href="www.google.com">Nico Gimenez</a> - Finance</p>
                        <p className="site-info mb-1"><a href="www.google.com">Ryan Lenchner</a> - Product and marketing</p>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}
export default FAQ
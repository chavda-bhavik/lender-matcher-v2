import React from 'react'
import { Container,Row,Col } from "reactstrap";
import './AboutComponent.css'
const About = (props) => {
    return (
        <section className="about-section bg-light" id="about">
            <Container>
                <h2 className="my-3">Disclaimer</h2>
                <hr className="divider light mb-3" />
                <Row>
                    <Col xs={12} md={10}>
                        <p className="site-info"><span className="font-weight-bold">Small Business Loan Finder</span> is a volunteer effort to support small businesses during the economics crisis created by COVID-19. This site makes no claims or gurantees of data accuracy, lending availability, or any other material facts. This site is intended only for informational purposes and has no profit motive. By using this site, you assume responsibility for verifying the accurcacy of this data. Please consult with a professional small business service provider to assist your lending process.</p>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}
export default About
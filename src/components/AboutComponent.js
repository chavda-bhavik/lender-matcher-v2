import React from 'react'
import { Container,Row,Col } from "reactstrap";
import './AboutComponent.css'
const About = (props) => {
    return (
        <section className="bg-light" id="about" style={{'marginTop':'300px'}}>
            <Container>
                <Row>
                    <Col xs={11} md={9}>
                        <p className="Disclaimer">Disclaimer</p>
                        <hr className="divider light my-2" />
                        <p className="site-info mb-4">Lender Matcher is a volunteer effort to support small businesses during the economics crisis created by COVID-19. This site makes no claims or gurantees of data accuracy, lending availability, or any other material facts. This site is intended only for informational purposes and has no profit motive. By using this site, you assume responsibility for verifying the accurcacy of this data. Please consult with a professional small business service provider to assist your lending process.</p>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}
export default About
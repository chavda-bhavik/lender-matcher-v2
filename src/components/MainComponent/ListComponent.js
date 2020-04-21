import React, { useState } from 'react'
import { Row, Col, ListGroup, ListGroupItem, Button, Badge } from "reactstrap";
import './ListComponent.css'

const renderBank = (bank, index, industry, employee) => (
    <ListGroupItem className="BankListItem" key={index}>
        <Row className="p-1">
            <Col xs={7} md={6} className="pr-1">
                <p className="BankListBankName">{bank.c[0].v}</p>
                <p className="BankListAddress">{bank.c[3].v}</p>
            </Col>
            <Col xs={5} md={2} className="p-0">
                <p className="BankListBankName">${bank.c[5].v}</p>
                <p className="BankListAddress">average loan amount</p>
            </Col>
            <Col xs={12} md={2} className="text-left">
                <p className="BankListPhoneNumber">{ bank.c[15] === null ? "Not Available" : bank.c[15].v }</p>
            </Col>
            <Col xs={12} md={2} className="text-left">
                <p className="BankListWebsite">
                    {
                        bank.c[16] === null ? "Not Available" : 
                        <a target="blank" rel="noopener noreferrer" href={bank.c[16].v}>Visit Website</a>
                    }
                </p>
            </Col>
        </Row>
        <Row className="p-1">
            <Col>
                <ul id="criteria">
                    <li className="mc-heading">Matching criteria</li>
                    <li>{employee === "" ? "" : employee+" employees"}</li>
                    <li>{industry}</li>
                </ul>
            </Col>
        </Row>
    </ListGroupItem>
)

const List = React.memo((props) => {
    let banks = props.bankList || [];
    let totalBanks = banks.length;
    let showingBanks = [];
    let bankPerPage = 5;

    const [currentIndex, setCurrentIndex] = useState(0)
    // const [selectedBank, setSelectedBank] = useState(null);
    // const [isBankSelected, setIsBankSelected] = useState(false);

    let isPrevDisabled = currentIndex === 0 ? true : false;
    let isNextDisabled = (currentIndex + bankPerPage >= totalBanks - 1) ? true : false;

    for(var i=currentIndex;i<=Math.min(totalBanks - 1, currentIndex+bankPerPage-1);i++) {
        showingBanks.push(banks[i]);
    }

    const next = () => {
        setCurrentIndex( currentIndex + bankPerPage);
    }
    const prev = () => {
        setCurrentIndex( currentIndex - bankPerPage);
    }

    return (
        <section className="list-section bg-light">
            <div className="container">
                <div className="d-flex justify-content-between p-2">
                    <p className="BanksHeading">{totalBanks} lenders found</p>
                    <Button onClick={props.resetSearch} color="link" className="SearchAgainBtn">Search Again</Button>
                </div>
                <div className="list-box">
                    <ListGroup flush>
                        { 
                            showingBanks.map( (bank, index) => {
                                return renderBank(bank, index, props.industry, props.employee);
                            })
                        }
                    </ListGroup>
                </div>
                <div className="d-flex justify-content-between p-2">
                    <Button className="bg-dark-blue" disabled={isPrevDisabled} onClick={() => prev()}>Prev</Button>
                        <p className="PaginationText">
                         <Badge className="bg-dark-blue">{currentIndex + 1}</Badge> - <Badge className="bg-dark-blue">{ Math.min(totalBanks, currentIndex+bankPerPage) }</Badge>
                        </p>
                    <Button className="bg-dark-blue" disabled={isNextDisabled} onClick={() => next()}>Next</Button>
                </div>
            </div>
        </section>
    )
})
export default List
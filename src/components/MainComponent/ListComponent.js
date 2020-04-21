import React, { useState } from 'react'
import { Row, Col, ListGroup, ListGroupItem, Button, Badge } from "reactstrap";
import './ListComponent.css'

const renderBank = (bank, index) => (
    <ListGroupItem className="p-0" key={index}>
        <Row className="p-2">
            <Col xs={7} md={6} className="pr-1">
                <p className="BankListBankName">{bank.c[0].v}</p>
                <p className="BankListAddress">{bank.c[3].v}</p>
            </Col>
            <Col xs={5} md={2} className="p-0">
                <p className="BankListBankName">${bank.c[5].v}</p>
                <p className="BankListAddress">average loan amount</p>
            </Col>
            <Col xs={12} md={2} className="text-left">
                <p className="BankListPhoneNumber">{bank.c[15].v}</p>
            </Col>
            <Col xs={12} md={2} className="text-left">
                <p className="BankListWebsite">
                    <a target="blank" rel="noopener noreferrer" href={bank.c[16].v}>Visit Website</a>
                </p>
            </Col>
        </Row>
    </ListGroupItem>
)

const List = React.memo((props) => {
    let banks = props.bankList || [];
    let totalBanks = banks.length;
    let showingBanks = [];
    let bankPerPage = 6;

    const [currentIndex, setCurrentIndex] = useState(0)

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
        <section className="list-section bg-light" id="#app">
            <div className="container">
                <p className="BanksHeading">{totalBanks} Banks Found</p>
                <ListGroup>
                    { 
                        showingBanks.map( (bank, index) => {
                            return renderBank(bank, index)
                        })
                    }
                </ListGroup>
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
import React, { useState } from 'react'
import { Row, Col, ListGroup, ListGroupItem, Button } from "reactstrap";
import './ListComponent.css'

const renderBank = (bank, index, industry, employee) => (
    <ListGroupItem className="BankListItem" key={index}>
        <Row className="p-1">
            <Col xs={12} md={5}>
                <p className="BankListBankName">{bank.c[0].v}</p>
                <p className="BankListAddress">{bank.c[3].v}</p>
            </Col>
            <Col xs={12} md={3} className="average-loan-col">
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
    let bankPerPage = 5;
    let totalBanks = banks.length;
    let totalLinks = Math.ceil(totalBanks / bankPerPage);
    
    let showingBanks = [];
    

    const [currentIndex, setCurrentIndex] = useState(1)
    let isNextDisabled = (currentIndex === totalLinks) ? true : false;

    for(var i=(currentIndex * bankPerPage - bankPerPage);i<=Math.min(totalBanks - 1, currentIndex*bankPerPage-1);i++) {
        showingBanks.push(banks[i]);
    }

    const jumpTo = (i) => {
        setCurrentIndex(i);
    }
    let nextBtn = <button className="custom-rounded active" onClick={() => setCurrentIndex(currentIndex + 1)} >Next</button>
    if(isNextDisabled) nextBtn = <button className="custom-rounded active" disabled>Next</button>

    return (
        <section className="list-section bg-light" id="app">
            <div className="container">
                <div className="d-flex justify-content-between p-2">
                    <p className="BanksHeading">{totalBanks} lenders found</p>
                    <Button color="link" onClick={props.resetSearch} className="SearchAgainBtn">Search Again</Button>
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
                <div>
                    {
                        [...Array(totalLinks).keys()].map( item => {
                            item = item + 1;
                            if(currentIndex === item) {
                                return <span key={item} className="custom-rounded active">{item}</span>
                            } else {
                                return <span key={item} onClick={() => jumpTo(item)} className="custom-rounded">{item}</span>
                            }   
                        })
                    }
                    {nextBtn}
                </div>
            </div>
        </section>
    )
})
export default List
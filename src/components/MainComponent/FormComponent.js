import React, { useState } from 'react'
import * as utils from '../../utils/data'
import Select from 'react-select';
import './FormComponent.css'
import Loading from './Loading';

import { Form, Row, Col, FormGroup, Label, Input, Button, FormFeedback, Alert } from "reactstrap";

const FormComponent = (props) => {
    let industries = utils.Industries.sort( (a, b) => a.localeCompare(b) ).map( inds => ({ value: inds, label: inds }) );
    
    // const latLongIncrease = 4;
    // const latIncrease = 3;
    // const longIncrease = 4;
    const [zipcode, setZipcode] = useState('');
    const [employees, setEmployees] = useState("");
    const [industry, setIndustry] = useState("");
    const [needExpressLoan, setNeedExpressLoan] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isZipcodeValid, setIsZipcodeValid] = useState(true);
    const [zipcodeError, setZipcodeError] = useState("")
    const [alertVisible, setAlertVisible] = useState(false);
    // const [errorAlertVisible, setErrorAlertVisible] = useState(false);

    const zipcodeChanged = (value) => {
        if(/^\d*$/.test(value) && value.length <= 6 && value.length >= 3) {
            setIsZipcodeValid(true);
        } else {
            if(zipcode === "") {
                setZipcodeError("Zipcode is Required!")
            } else {
                setZipcodeError("Zipcode is Invalid!")
            }
            setIsZipcodeValid(false);
        }
        setZipcode(value);
    }
    const submit = async () => {
        // Constants
        let lenderData = [];
        let zipcodeData = [];
        let us_zipcodes_id = '1gbtej3UZhL7TjZzXaegbCxg-K0P9Qgvl4UNYVsrgv6A';
        let lender_table_id = '1vA9L-u__7yvkByn2Oi8M_zBWP3DH0DlrHAwPBPEUxqI';

        if(zipcode === "") {
            zipcodeChanged("");
            return;
        }
        setIsLoading(true);

        // Zipcode Data retriving
        zipcodeData = await getZipcodeData(us_zipcodes_id);
        if(zipcodeData.length === 0) {
            setIsLoading(false);
            setIsZipcodeValid(false);
            setZipcodeError("No State Found! Try with Different ZipCode.")
            return;
        }

        // Data Retriving based on Lat/Long and other criteria
        lenderData = await getLenderData(zipcodeData, lender_table_id);
        if(industry !== "") {
            lenderData = filterLendersByIndustry(lenderData, industry.value);
        }
        if(lenderData.length === 0) {
            // Data retriving based on only Lat/Long
            lenderData = await getOnlyZipcodeData(zipcodeData, lender_table_id);
        }
        lenderData = sortLendersByZipcode(lenderData, zipcode);
        setIsLoading(false);
        props.setList(lenderData);
        props.setMainZipcode(zipcode);
        props.setMainIndustry(industry.value);
        props.setMainEmployee(employees)
        props.setMainNeed(needExpressLoan);
    }
    const getZipcodeData = async (us_zipcodes_id) => {
        let zipcodeQuery = createZipcodeFetchQuery();
        let zipcodeData = await fetchData(us_zipcodes_id, zipcodeQuery);
        return zipcodeData;
    }
    const createZipcodeFetchQuery = () => {
        let query = `select * where A=${zipcode}`
        return encodeURIComponent(query);
    }

    // get lenders with only zipcode
    const getOnlyZipcodeData = async (zipcodeData, lender_table_id) => {
        // let lat = zipcodeData[0].c[3].v
        // let long = zipcodeData[0].c[4].v;
        let state = zipcodeData[0].c[2].v;
        let onlyZipCodeQuery = createOnlyZipcodeFetchQuery(state);
        let lenderData = await fetchData(lender_table_id, onlyZipCodeQuery);
        return lenderData;
    }
    const createOnlyZipcodeFetchQuery = (state) => {
        let query = `select * where B='${state}'`;
        return encodeURIComponent(query);
    }

    // get lenders with selected criteria
    const getLenderData = async (zipcodeData, lender_table_id) => {
        // let lat = zipcodeData[0].c[3].v
        // let long = zipcodeData[0].c[4].v;
        let state = zipcodeData[0].c[2].v;
        let lenderDataQuery = createLenderFetchQuery(state);
        let lenderData = await fetchData(lender_table_id, lenderDataQuery);
        return lenderData;
    }
    const createLenderFetchQuery = (state) => {
        let query = "select * where";
        // query += ` ${lat-latIncrease}>R and R<${lat+latIncrease} and ${long-longIncrease}>S and S<${long+longIncrease}`;
        query += ` B='${state}'`
        if(employees !== "") {
            if(employees === "100+") query += " and G>100"
            else {
                query += ` and G>${employees.split("-")[0]} and G<${employees.split("-")[1]}`
            }
        }
        // if(industry !== "") {
        //     query += ` and (J like '${industry.value}' or K like '${industry.value}' or L like '${industry.value}')`
        // }
        if(needExpressLoan) {
            query += ` and O=TRUE`
        }

        return encodeURIComponent(query);
    }
    const filterLendersByIndustry = (array, ind) => {
        return array.reduce( 
            (list, bank) => {
                if(bank.c[9].v === ind || bank.c[10].v === ind || bank.c[11].v === ind) {
                    list.push(bank);
                }
                return list;
            },
        [])
    }
    const sortLendersByZipcode = (array, number) => array.sort((a, b) => Math.abs(a.c[2].v - number) - Math.abs(b.c[2].v - number))

    const fetchData = async (id, query) => {
        let data = await fetch(`https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tq=${query}`).then(data => data.text())
        data = data.substr(8,)
        data = data.replace(/(^google\.visualization\.Query\.setResponse\(|\);$)/g,'')
        data = JSON.parse(data);
        return data.table.rows;
    }
    let zipcodeInput = <Input 
        type="text" 
        className="form-control" 
        placeholder="E.g. 90012" 
        value={zipcode} 
        onChange={(e) => zipcodeChanged(e.target.value) }
    />
    if(!isZipcodeValid) {
        zipcodeInput =<Input 
            type="text" 
            className="form-control" 
            placeholder="E.g. 90012" 
            value={zipcode} 
            onChange={(e) => zipcodeChanged(e.target.value) }
            invalid
        />  
    }
    let processControl = <Button className="bg-dark-blue" onClick={() => submit()} size="lg">Search for lender</Button>
    if(isLoading) {
        processControl = <Loading />
    }
    return (
        <section className="app-section bg-light" id="app">
            <div className="container">
                <p className="PageHeading">Find local lenders that help businesses like yours</p>
                <p className="PageSubHeading">Describe your Business</p>
                <Form>
                    {/* <Row className="p-0 mb-3">
                        <Col xs={12} md={10}>
                            <Alert color="danger" isOpen={errorAlertVisible} toggle={() => setErrorAlertVisible(!errorAlertVisible)}>
                                No banks found! Please try with different Criteria.
                            </Alert>
                        </Col>
                    </Row> */}
                    <Row className="p-0 mb-3">
                        <Col xs={12} md={6}>
                            <FormGroup>
                                <Label className="site-info">Industry</Label>
                                <Select
                                    value={industry}
                                    onChange={setIndustry}
                                    options={industries}
                                    placeholder="Select industry type"
                                />
                            </FormGroup>
                        </Col>
                        <Col xs={12} md={3}>
                            <FormGroup>
                                <Label className="site-info">Number of Employees</Label>
                                <Input type="select" id="emps" value={employees} onChange={(e) => setEmployees(e.target.value) }>
                                    <option value="">Select Range</option>
                                    <option value="0-10">0 - 10</option>
                                    <option value="11-25">11 - 25</option>
                                    <option value="25-50">25 - 50</option>
                                    <option value="51-100">51 - 100</option>
                                    <option value="100+">100+</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col xs={12} md={3}>
                            <div className="form-group">
                                <label htmlFor="zipcode" className="site-info">Zipcode <span className="text-danger">*</span></label>
                                { zipcodeInput }
                                <FormFeedback>{zipcodeError}</FormFeedback>
                            </div>
                        </Col>
                    </Row>
                    <Row className="p-0 mb-3">
                        <Col xs={12} md={10}>
                            <FormGroup check inline>
                                <Label check>
                                    <Input type="checkbox" value={needExpressLoan} onChange={ () => setNeedExpressLoan(!needExpressLoan) } /> Need an express loan&nbsp;
                                </Label><a href="#" onClick={ () => setAlertVisible(!alertVisible) }>What is this?</a>
                            </FormGroup>
                            {/* <Label check>
                                <Input type="checkbox" value={needExpressLoan} onChange={ () => setNeedExpressLoan(!needExpressLoan) } />  <NavLink href="#">What is it?</NavLink>
                            </Label> */}
                        </Col>
                    </Row>
                    <Row className="p-0 mb-3">
                        <Col xs={12} md={10}>
                        <Alert color="secondary" isOpen={alertVisible} toggle={() => setAlertVisible(!alertVisible)}>
                            <p className="site-info">
                                <span className="font-weight-bold">Express loans</span> provides up to $350,000 capital for no more than 7 years with an option to revolve. There is turnaround time of 36 hours for approval or denial of a completed application. The uses of proceeds are the same as the standard 7(a) loan.
                            </p>
                        </Alert>
                        </Col>
                    </Row>
                    {processControl}
                </Form>     
            </div>
        </section>
    )
}
export default FormComponent
import React, { useState } from 'react'

import Form from './FormComponent'
import List from './ListComponent'

const Main = (props) => {
    const [bankList, setBankList] = useState([]);
    const [mainIndustry, setMainIndustry] = useState('')
    const [mainEmployee, setMainEmployee] = useState('');
    const [mainZipcode, setMainZipcode] = useState('');
    let content = <Form setList={setBankList} setMainIndustry={setMainIndustry} setMainEmployee={setMainEmployee} setMainZipcode={setMainZipcode} />
    if(bankList.length > 0) {
        content = <List bankList={bankList} resetSearch={ () => setBankList([]) } industry={mainIndustry} employee={mainEmployee} zipcode={mainZipcode} />
    }
    return content
}
export default Main
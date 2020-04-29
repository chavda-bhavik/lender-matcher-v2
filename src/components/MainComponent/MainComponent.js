import React, { useState } from 'react'

import Form from './FormComponent'
import List from './ListComponent'

const Main = (props) => {
    const [mainIndustry, setMainIndustry] = useState('')
    const [mainEmployee, setMainEmployee] = useState('');
    const [mainZipcode, setMainZipcode] = useState('');
    const [mainNeed, setMainNeed] = useState(false);
    let content = <Form setList={props.setList} setMainIndustry={setMainIndustry} setMainEmployee={setMainEmployee} setMainZipcode={setMainZipcode} setMainNeed={setMainNeed} />
    if(props.bankList.length > 0) {
        content = <List bankList={props.bankList} resetSearch={ () => props.setList([]) } industry={mainIndustry} employee={mainEmployee} zipcode={mainZipcode} need={mainNeed} />
    }
    return content
}
export default Main
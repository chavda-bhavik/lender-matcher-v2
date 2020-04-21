import React, { useState } from 'react'

import Form from './FormComponent'
import List from './ListComponent'

const Main = (props) => {
    const [bankList, setBankList] = useState([]);
    let content = <Form setList={setBankList} />
    if(bankList.length > 0) {
        content = <List bankList={bankList} />
    }
    return content
}
export default Main
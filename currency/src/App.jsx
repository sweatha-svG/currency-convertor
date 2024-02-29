
import logo from '/im2.jpeg';
import './App.css'
import axios from 'axios';
import { useEffect,useState } from 'react';
const App=()=> {
  const[amount,setAmount]=useState(1);
  const[from,setFrom]=useState('USD');
  const[to,setTo]=useState("INR");
  const[convert,setConvert]=useState(null);
  const[exchangerate,setExchangeRate]=useState(null);
  useEffect(()=>{
    const getExchangeRate= async ()=>{
      try{
 let url=`https://api.exchangerate-api.com/v4//latest/${from}`;
 const response=await axios.get(url);
 setExchangeRate(response.data.rates[to])
 //console.log(response);
      }
      catch(error){
        console.error("error");
      }
    }
    getExchangeRate();//for mount for default
  }, [from,to])
  
  
  useEffect(()=>{
    if(exchangerate !==null){
      setConvert((amount * exchangerate).toFixed(2))
    }
  },[amount,exchangerate])
  const handleAmountchange=(e)=>{
    const value=parseFloat(e.target.value);
    setAmount(isNaN(value)?  0 :value);
  }
  const handleFromchange=(e)=>{
    setFrom(e.target.value);
  }
  const handleTochange=(e)=>{
    setTo(e.target.value);
  }
  return (
    <>
      <div className='App'>
      <div className='converter'>
      <div className='header'>
<h3><img src={logo} alt='' className='logo'/>currency convertor</h3>
        </div>
        <div className='container'>
          <div className='left' >
          <h4> Amount</h4>
          <input type='text' placeholder="Enter Amounts" value={amount} onChange={handleAmountchange}/>
          </div>
          <div className='middle'>
          <h4>From</h4>
          <select value={from} onChange={handleFromchange}>
            <option value="USD">USD-United states dollar</option>
            <option value="EUR">EUR-Euro</option>
            <option value="GBP">GBP-British pound streling</option>
            <option value="JPY">JPY-japaganese Yen</option>
            <option value="AUD">AUD-Australian Dollar</option>
            <option value="CAD">CAD-Canadian Dollar</option>
            <option value="INR">INR-Indian Rupee</option>
            <option value="BRL">BRL-Brazilizn Real</option>
          </select>
        </div>
          <div className='right'>
          <h4>To</h4>
          <select value={to} onChange={handleTochange}>
          <option value="USD">USD-United states dollar</option>
            <option value="EUR">EUR-Euro</option>
            <option value="GBP">GBP-British pound streling</option>
            <option value="JPY">JPY-japaganese Yen</option>
            <option value="AUD">AUD-Australian Dollar</option>
            <option value="CAD">CAD-Canadian Dollar</option>
            <option value="INR">INR-Indian Rupee</option>
            <option value="BRL">BRL-Brazilizn Real</option>
          </select>
          </div>
          <div className='result'>
          <p>{amount}{from} INR is equal to {convert}{to}</p>
          
          </div>

        </div>
        </div>
        </div>

        
      
        
    </>
  )
}

export default App;

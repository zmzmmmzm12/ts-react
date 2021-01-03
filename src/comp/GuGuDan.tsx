import * as React from 'react';
import {useState, useRef, useEffect} from 'react';

function GuGuDan (){
    const [first, setFirst]=useState(Math.ceil(Math.random()*9));
    const [second, setSecond]=useState(Math.ceil(Math.random()*9));
    const [value, setValue]=useState('');
    const inputEl=useRef<HTMLInputElement>(null); //타입추론 꼭 필요하면 제너릭 써주기

    const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const input=inputEl.current;
        if(parseInt(value)===first*second){
            console.log('정답');
            setFirst(Math.ceil(Math.random()*9));
            setSecond(Math.ceil(Math.random()*9));
            setValue('');
            input!.focus(); //input이 존재한다는 확신을 가졌을때 !쓸것
        }
        else{
            console.log('땡');
            setValue('');
            input!.focus();
        }
    }

    return(
        <>
            <div key='first'>{first}곱하기 {second}는 ?</div>
            <form key='second' onSubmit={onSubmitForm}>
                <input key='inp'
                    ref={inputEl}
                    type="number"
                    value={value}
                    onChange= {(e)=> setValue(e.target.value)}
                />
            </form>
        </>
    )
}

export default GuGuDan;
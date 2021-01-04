import * as React from 'react';
import Try from './Try';
import {TryInfo} from './types';
import {useState, useRef, useCallback} from 'react';
import { triggerAsyncId } from 'async_hooks';

const getNumbers=()=>{
    const candidates=[1,2,3,4,5,6,7,8,9];
    const array=[];
    for(let i=0;i<4;i++){
        const chosen=candidates.splice(Math.floor(Math.random()*(9-i)),1)[0];
        array.push(chosen);
    }
    return array;
}



function NumberBaseball(){
    const [answer, setAnswer] = useState(getNumbers());
    const [value,setValue]=useState('');
    const [result,setResult]=useState('');
    const [tries, setTries]=useState<TryInfo[]>([]);
    const inputEl=useRef<HTMLInputElement>(null);

    const onSubmitForm = useCallback((e:React.FormEvent)=>{
        e.preventDefault();
        const input=inputEl.current;
        if(value===answer.join('')){
            setTries((t)=>([
                ...t,
                {
                    try:value,
                    result: '홈런!',
                },
            ]));
            setResult('홈런!');
            alert("게임 재생성");
            setValue('');
            setAnswer(getNumbers());
            setTries([]);
            if(input) input.focus();
        }
        else{
            const answerArray=value.split('').map((v)=>parseInt(v));
            let st=0, ball=0;
            if(tries.length>=9){
                setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다`);
                alert("게임 재생성");
                setValue('');
                setAnswer(getNumbers());
                setTries([]);
                if(input) input.focus();
            }
            else{
                console.log('답은',answer.join(''));
                for(let i=0;i<4;i++){
                    if(answerArray[i]===answer[i]){
                        console.log('strike',answerArray[i],answer[i]);
                        st+=1;
                    }
                    else if(answer.includes(answerArray[i])){
                        console.log('ball', answerArray[i], answer.indexOf(answerArray[i]));
                        ball+=1;
                    }
                }
                setTries((t)=>([
                    ...t,
                    {
                        try:value,
                        result: `${st}스트라이크, ${ball}볼입니다.`,
                    },
                ]));
                setValue('');
                if(input) input.focus();
            }
        }
    }, [value, answer])
    return(
        <>
        <h1 key='first'>{result}</h1>
        <form key='second' onSubmit={onSubmitForm}>
                <input key='inp'
                    ref={inputEl}
                    maxLength={4}
                    value={value}
                     onChange= {useCallback((e:React.ChangeEvent<HTMLInputElement>)=> setValue(e.target.value),[])}
                />
                <button key='btn'>입력!</button>
            </form>
        <div key='try'> 시도: {tries.length}</div>
        <ul key='try_'>
            {tries.map((v,i)=>(
                <Try key={`${i+1}차 시도: ${v.try}`} tryInfo={v}/>
            ))}
        </ul>
        </>
    )
}
export default NumberBaseball;
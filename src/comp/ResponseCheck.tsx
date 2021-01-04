import * as React from 'react';
import {useState, useRef, useCallback} from 'react';
import './ResponseCheck.scss';

function ResponseCheck (){
    const [state,setState]=useState('wating');
    const [message,setMessage]=useState('클릭해서 시작하세요');
    const [result,setResult]=useState<number[]>([]);
    
    const timeout=useRef<number|null>(null);
    const startTime=useRef(0);
    const endTime=useRef(0);

    const onClickScreen=useCallback(()=>{
        if(state==='wating'){
            timeout.current=window.setTimeout(()=>{
                setState('now');
                setMessage('지금클릭');
                startTime.current=new Date().getTime();
            }, Math.floor(Math.random()*1000)+2000);
            setState('ready');
            setMessage('초록색이 되면 눌러주세요');
        }
        else if(state==='ready'){
            if(timeout.current){
                clearTimeout(timeout.current);
            }
            setState('waiting');
            setMessage('너무 성급하시군요! 초록색이 된 후에 클릭하세요');
        }
        else if(state==='now'){
            endTime.current=new Date().getTime();
            setState('waiting');
            setMessage('클릭해서 시작하세요');
            setResult((prevResult)=>{
                return [...prevResult, endTime.current-startTime.current];
            })
        }
    }, [state])

    const onReset=useCallback(()=>{
        setResult([]);
    }, [state])

    const renderAverage=()=>{
        return result.length===0
            ?null
            :<>
                <div>평균시간: {result.reduce((a,c)=>a+c)/result.length}ms</div>
                <button onClick={onReset}>리셋</button>
            </>
    }

    return(
        <>
            <div
            id='screen'
            className={state}
            onClick={onClickScreen}>
                {message}
            </div>
            {renderAverage()}
        </>
    )
}

export default ResponseCheck;
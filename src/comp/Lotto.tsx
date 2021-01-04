import { time } from 'console';
import * as React from 'react';
import {useState, useRef, useCallback, useEffect, useMemo} from 'react';
import Ball from './Ball';

function getWinNumbers(){
    const candidate=Array(45).fill(null).map((v,i)=>i+1);
    const shuffle=[];
    while(candidate.length>0){
        shuffle.push(candidate.splice(Math.floor(Math.random()*candidate.length),1)[0]);
    }
    const bonusNumber=shuffle[shuffle.length-1];
    const winNumber=shuffle.slice(0,6).sort((p,c)=> p-c);
    return [...winNumber, bonusNumber];
}


function Lotto(){
    const lottoNumbers=useMemo( ()=>getWinNumbers(),[]);
    const [winNumbers, setWinNumbers]=useState(lottoNumbers);
    const [winBalls, setWinBalls]=useState<number[]>([]); //빈배열쓰는경우 항상 제너릭으로 타이핑해주기
    const [bonus, setBonus]=useState<number|null>(null);
    const [redo, setRedo] = useState(false);
    const timeouts=useRef<number[]>([]);

    useEffect(()=>{
        for(let i=0;i<6;i++){
            timeouts.current[i]=window.setTimeout(()=>{
                setWinBalls((prevBalls)=>[...prevBalls, winNumbers[i]]);
            }, (i+1)*1000);
        }
        timeouts.current[6]=window.setTimeout(()=>{
            setBonus(winNumbers[6]);
            setRedo(true);
        }, 7000);
        return ()=>{
            timeouts.current.forEach((v)=>{
                clearTimeout(v);
            });
        };
    }, [timeouts.current]);

    const onclickRedo=useCallback( ()=>{
        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
        timeouts.current=[];
    }, [winNumbers]);

    return(
        <>
        <div>당첨숫자</div>
        <div id="결과창">
            {winBalls.map((v)=> <Ball key={v} number={v}/>)}
        </div>
        <div>보너스!</div>
        {bonus&&<Ball number={bonus}/>}
        {redo && <button onClick={onclickRedo}>한번 더</button>}
        </>
    )
}

export default Lotto;
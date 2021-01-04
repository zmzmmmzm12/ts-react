import * as React from 'react';
import {useState, useRef} from 'react';

const rspCoords={바위:'0', 가위:'-142px', 보:'-284px'} as const; //as const써주면 read only로 값고정
const scores={바위:0, 가위:1, 보:-1} as const;

type ImgCoords=typeof rspCoords[keyof typeof rspCoords]; //0|-142px|-284px
const computerChoice= (imgCoords: ImgCoords)=>{
    return (Object.keys(rspCoords) as ['바위','가위','보']).find((k)=>{
        return rspCoords[k]===imgCoords;
    })!
}


function RSP(){
    const [result,setResult]=useState('');
    const [score,setScore]=useState(0);
    const[imgCoord, setImgCoord]=useState<ImgCoords>(rspCoords.바위);
    const interval = useRef<number>();

    React.useEffect(()=>{
        console.log("재실행");
        interval.current=window.setInterval(changeHand,100);
        return ()=>{
            console.log('종료');
            clearInterval(interval.current);
        }
    }, [imgCoord]);

    const changeHand=()=>{
        if(imgCoord===rspCoords.바위){
            setImgCoord(rspCoords.가위);
        }
        else if(imgCoord===rspCoords.가위){
            setImgCoord(rspCoords.보);
        }
        else if(imgCoord===rspCoords.보){
            setImgCoord(rspCoords.바위);
        }
    }

    const onClickBtn= (choice: keyof typeof rspCoords)=> ()=>{
        clearInterval(interval.current);
        const myScore=scores[choice];
        const comScore=scores[computerChoice(imgCoord)];
        const diff=myScore-comScore;
        if(diff===0){
            setResult('비김');
        }
        else if([-1,2].includes(diff)){
            setResult('이김!');
            setScore( (prevScore)=> prevScore+1);
        }
        else{
            setResult('짐');
            setScore((prevScore)=>prevScore-1);
        }
        setTimeout( ()=>{
            interval.current=window.setInterval(changeHand,100);
        },1000);
    }
    
    return(
        <>
        <div id="computer" style={{background:`url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}}></div>
        <div>
            <button id="rock" className="btn" onClick={onClickBtn('바위')}>바위</button>
            <button id="scissor" className="btn" onClick={onClickBtn('가위')}>가위</button>
            <button id="paper" className="btn" onClick={onClickBtn('보')}>보</button>
        </div>
        <div>{result}</div>
        <div>현재 {score}점</div>
        </>
    )
    

}

export default RSP;
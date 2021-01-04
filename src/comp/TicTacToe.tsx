import * as React from 'react';
import {useReducer,useCallback, useEffect} from 'react';
import Table from './Table';

interface ReducerState{ //state에 대한 타이핑필요
    winner: 'O'|'X'|'',
    turn:'O'|'X',
    tableData:string[][],
    recentCell:[number,number],
}

const init: ReducerState={ //state한번에 관리
    winner:'',
    turn:'O',
    tableData:[
        ['','',''],
        ['','',''],
        ['','',''],
    ],
    recentCell:[-1,-1]
}

export const SET_WINNER='SET_WINNER' as const; //액션이름 만들기
export const CLICK_CELL='CLICK_CELL' as const;
export const CHANGE_TURN='CHANGE_TURN' as const;
export const RESET_GAME='RESET_GAME' as const;

interface SetWinnerAction{ //실제 액션은 객체로
    type: typeof SET_WINNER;
    winner: 'O'|'X';
}

const setWinner=(winner:'O'|'X'): SetWinnerAction=>{ //액션크리에이터
    return {type:SET_WINNER,winner};
}

interface ClickCellAction{
    type: typeof CLICK_CELL;
    row:number;
    cell:number;
}

const clickCell=(row:number,cell:number): ClickCellAction=>{
    return {type:CLICK_CELL, row, cell};
}

interface ChangeTurnAction{
    type: typeof CHANGE_TURN;
}

interface ResetGameAction{
    type: typeof RESET_GAME;
}

type ReducerActions=SetWinnerAction|ClickCellAction|ChangeTurnAction|ResetGameAction;

const reducer=(state:ReducerState,action:ReducerActions): ReducerState=>{
    switch (action.type){
        case SET_WINNER:
            return{
                ...state,
                winner:action.winner,
            };
        case CLICK_CELL: {
            const tableData=[...state.tableData];
            tableData[action.row]=[...tableData[action.row]];
            tableData[action.row][action.cell]=state.turn;
            return{
                ...state,
                tableData,
                recentCell: [action.row, action.cell]
            }
        }
        case CHANGE_TURN:{
            return{
                ...state,
                turn:state.turn==='O'?'X':'O',
            }
        }
        case RESET_GAME: {
            return{
                ...state,
                turn:'O',
                tableData:[
                    ['','',''],
                    ['','',''],
                    ['','',''],
                ],
                recentCell:[-1,-1]
            }
        }
        default:
            return state;
    }
}

function TicTacToe(){
    const [state,dispatch]=useReducer(reducer,init);
    const{tableData,turn,winner,recentCell}=state;

    useEffect(()=>{
        const [row,cell]=recentCell;
        if(row<0) return;
        let win=false;
        if(tableData[row][0]===turn && tableData[row][1]===turn && tableData[row][2]===turn){
            win=true;
        }
        if(tableData[0][cell]===turn && tableData[1][cell]===turn && tableData[2][cell]===turn){
            win=true;
        }
        if(tableData[0][0]===turn && tableData[1][1]===turn && tableData[2][2]===turn){
            win=true;
        }
        if(tableData[0][2]===turn && tableData[1][1]===turn && tableData[2][0]===turn){
            win=true;
        }
        if(win){
            dispatch({type:SET_WINNER, winner:turn});
            dispatch({type:RESET_GAME});
        }
        else{
            let all=true;
            tableData.forEach((row)=>{
                row.forEach((cell)=>{
                    if(!cell) all=false;
                })
            })
            if(all){
                dispatch({type:RESET_GAME});
            }
            else{
                dispatch({type:CHANGE_TURN});
            }
        }
    },[recentCell]);

    const onClickTable=useCallback(()=>{
        dispatch(setWinner('O'));
    },[]);
    
    return (
        <>
        <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch}/>
        {winner&&<div>{winner}님의 승리</div>}
        </>
    )
}

export default TicTacToe;
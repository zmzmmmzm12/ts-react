import *as React from 'react';
import {FunctionComponent, Dispatch, useMemo} from 'react';
import Td from './Td';

interface Props{
    rowData:string[];
    rowIndex: number;
    dispatch: Dispatch<any>;
}

const Tr:FunctionComponent<Props>= ({ rowData,rowIndex,dispatch})=>{
    return(
        <table>
            {Array(rowData.length).fill(null).map((td,i)=>{
                useMemo(
                    ()=><Td key={i} dispatch={dispatch} rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]}>{''}</Td>,
                    [rowData[i]])
            })}
        </table>
    )
}

export default Tr;
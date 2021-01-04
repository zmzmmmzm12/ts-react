import React from 'react';
import GuGuDan from './comp/GuGuDan';
import WordRelay from './comp/WordRelay';
import NumberBaseball from './comp/NumberBaseball';
import ResponseCheck from './comp/ResponseCheck';
import RSP from './comp/RSP';


function App() {
  return (
    <div className="App">
      구구단
      <GuGuDan/> <br/>
      끝말잇기
      <WordRelay/><br/>
      숫자야구
      <NumberBaseball/><br/>
      반응속도체크
      <ResponseCheck/><br/>
      가위바위보
      <RSP/><br/>
    </div>
  );
}

export default App;

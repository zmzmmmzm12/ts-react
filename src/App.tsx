import React from 'react';
import GuGuDan from './comp/GuGuDan';
import WordRelay from './comp/WordRelay';

function App() {
  return (
    <div className="App">
      구구단
      <GuGuDan/> <br/>
      끝말잇기
      <WordRelay/><br/>
    </div>
  );
}

export default App;

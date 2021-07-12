import {useState} from 'react';
import ReactDOM from 'react-dom';
import {
  OpaqueString,
  UsernameCaseMapped,
  UsernameCasePreserved,
} from '@tynor/precis';

const App = () => {
  const [text, setText] = useState('');
  const [profile, setProfile] = useState('username-case-mapped');
  return (
    <div>
      <div>
        <select value={profile}
                style={{marginRight: '10px'}}
                onChange={e => {
                  setProfile(e.target.value);
                }}>
          <option value="username-case-mapped">UsernameCaseMapped</option>
          <option value="username-case-preserved">UsernameCasePreserved</option>
          <option value="opaque-string">OpaqueString</option>
        </select>
        <input type="text" onChange={e => { setText(e.target.value); }} />
      </div>
      <hr />
      <div style={{marginTop: '60px'}}>
        {text.length > 0
          ? <Result text={text} profile={profile} />
          : null}
      </div>
    </div>
  );
};

const Result = ({text, profile}) => {
  let result;
  try {
    result = selectProfile(profile).enforce(text);
  } catch (e) {
    return <p>{e.message}</p>;
  }
  const enc = new TextEncoder();
  const encoded = enc.encode(result);
  const ss = [...encoded].map(x => x.toString(16).padStart(2, '0'));
  return (
    <div>
      <label>Result:</label>
      <p>{result}</p>
      <label>UTF-8:</label>
      <p>{ss.join(' ')}</p>
    </div>
  );
};

const selectProfile = name => {
  switch (name) {
    case 'username-case-mapped':
      return UsernameCaseMapped;
    case 'username-case-preserved':
      return UsernameCasePreserved;
    case 'opaque-string':
      return OpaqueString;
  }
};

ReactDOM.render(<App />, document.getElementById('app'));

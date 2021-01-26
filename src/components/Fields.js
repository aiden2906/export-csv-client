import React from 'react';

function Fields(props) {
  const { fields, handleChooseKey } = props;
  console.log('-->', fields);
  return (
    <div>
      {(Object.keys(fields) || []).map((field, index) => {
        return <div key={index} onClick={() => handleChooseKey(field)}>{field}</div>;
      })}
    </div>
  );
}

export default Fields;

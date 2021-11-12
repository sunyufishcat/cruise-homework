import * as React from 'react';
import './History.scss';

type historyItem = {
  name: string,
  status: string,
}
const History = () => {
   const history: historyItem[] = [
     {name: "bjstdmngbgr01", status: "Acceptance_test"},
     {name: "bjstdmngbgr02", status: "Acceptance_test"},
     {name: "bjstdmngbgr03", status: "Acceptance_test"},
     {name: "bjstdmngbgr04", status: "Acceptance_test"},
     {name: "bjstdmngbgr05", status: "Acceptance_test"},
     {name: "bjstdmngbgr06", status: "Acceptance_test"},
   ]

  return (
    <div className="history">
      <p>History</p>
      <ul className="list">
        {history.map((item, index) =>
          <li key={index}>
            {item.name}/{item.status}
          </li>
        )}
      </ul>
    </div>
  )
}

export default History;

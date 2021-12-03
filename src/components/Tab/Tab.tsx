import * as React from 'react';
import './Tab.scss'
import {useState} from 'react';

type tab = {
  name: string,
  value: number,
}

type IProps = {
  onClick: (value: number) => void;
}

const Tab = (props: IProps) => {

  const tabList: tab[] = [
    {name: 'All', value: 0},
    {name: 'Physical', value: 1},
    {name: 'Virtual', value: 2},
  ]

  const [activeNumber, setActiveNumber] = useState<number>(0);

  const handleClick = (value: number): void => {
    setActiveNumber(() => value);
    props.onClick(value);
  }

  return (
    <div className="tab">
      {tabList.map(tab => (
        <div
          className={`item ${activeNumber === tab.value ? 'active' : ''}`}
          onClick={() => handleClick(tab.value)}
        >
          <span>{tab.name}</span>
        </div>
      ))}
    </div>
  )
}

export default Tab;

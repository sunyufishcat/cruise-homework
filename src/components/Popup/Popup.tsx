import * as React from 'react';
import './Popup.scss';
import ReactDOM from 'react-dom';
import {useState} from 'react';

type IProps = {
  isPopupDisplay: boolean,
  onCancel: () => void,
  onAddResources: (value: string) => void,
}

const Popup = (props: IProps) => {

  const [inputValue, setInputValue] = useState<string>('');

  const handleInputInfo = (value: string): void => {
    setInputValue(value);
  }

  const handleAdd = (): void => {
    if (inputValue.trim()) {
      props.onAddResources(inputValue);
    }
  }

  const handleCancel = (): void => {
    props.onCancel();
    setInputValue('');
  }

  const popup = props.isPopupDisplay ? (
    <div className="popup">
      {/*<span className="iconfont icon-angle-up"/>*/}
      <span onClick={() => handleCancel()} className="iconfont icon-close" />
      <p>Separate multiple resource name with commas</p>
      <input type="text"
             placeholder="e.g.Chrome,Firefox"
             value={inputValue}
             onChange={(event) => handleInputInfo(event.target.value)} />
      <div className="popup-buttons">
        <button className="add-resources-button" onClick={() => handleAdd()}>
          Add Resources
        </button>
        <button className="cancel-button" onClick={() => handleCancel()}>
          Cancel
        </button>
      </div>
    </div>
  ) : null;

  return ReactDOM.createPortal(popup, document.getElementById('portal')!);
}

export default Popup;

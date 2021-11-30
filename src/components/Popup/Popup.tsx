import * as React from 'react';
import './Popup.scss';
import ReactDOM from 'react-dom';
import {useEffect, useRef, useState} from 'react';

type IProps = {
  isPopupDisplay: boolean,
  onCancel: () => void,
  onAddResources: (value: string) => void,
}

const Popup = (props: IProps) => {

  const [inputValue, setInputValue] = useState<string>('');
  const [top, setTop] = useState<number>(0);
  const [left, setLeft] = useState<number>(0);
  const popupRef: any = useRef(null);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        props.onCancel();
        setInputValue('');
      }
    }

    function handlePopupPosition(event: any) {
      if (popupRef.current && popupRef.current.contains(event.target)) {
        return;
      }
      const addButton = event.target.getBoundingClientRect();
      setTop(addButton.top + addButton.height + 10);
      setLeft(addButton.left - addButton.width/2 - 5);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("click", handlePopupPosition);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("click", handlePopupPosition);
    };
  }, [popupRef, props])


  const handleInputInfo = (value: string): void => {
    setInputValue(value);
  }

  const handleAdd = (): void => {
    if (inputValue.trim()) {
      props.onAddResources(inputValue);
    }
    setInputValue('');
  }

  const handleCancel = (): void => {
    props.onCancel();
    setInputValue('');
  }

  const popup = props.isPopupDisplay ? (
    <div
      className="popup"
      ref={popupRef}
      style={{top, left}}
    >
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

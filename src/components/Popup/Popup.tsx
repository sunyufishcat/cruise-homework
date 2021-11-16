import * as React from 'react';
import './Popup.scss';
import ReactDOM from 'react-dom';

type IProps = {
  isPopupDisplay: boolean,
}

const Popup = (props: IProps) => {

  const handleInputInfo = (value: string): void => {

  }

  const handleAddResources = (): void => {

  }

  const handleCancel = (): void => {

  }

  const popup = props.isPopupDisplay ? (
    <div className="popup">
      {/*<span className="iconfont icon-angle-up"/>*/}
      <span className="iconfont icon-close" />
      <p>Separate multiple resource name with commas</p>
      <input type="text"
             onChange={(event) => handleInputInfo(event.target.value)} />
      <div className="popup-buttons">
        <button className="add-resources-button" onClick={() => handleAddResources()}>
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

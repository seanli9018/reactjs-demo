import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

class AppModal {
    constructor(){
        this.config = {
            icon: <ExclamationCircleOutlined />
        }
    }

    _configModal(onOk, onCancel, title, content){
        this.config.onOk = onOk;
        this.config.onCancel = onCancel;
        this.config.title = title;
        this.config.content = content;
    }

    confirm(onOK, onCancel, title="Do you want to delete this item?", content="Click Yes or Cancel") {
        this._configModal(onOK, onCancel, title, content, );
        confirm(this.config);
    }
}

export default new AppModal();
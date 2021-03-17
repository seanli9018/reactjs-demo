import { notification } from 'antd';

class AppNotification {
    constructor(){
        this.config = {}
    }

    _configNotice(message, description, duration){
        this.config.message = message;
        this.config.description = description;
        this.config.duration = duration;
    }

    success(message="Notice", description="Successfully operated", duration=3) {
        this._configNotice(message, description, duration);
        notification.success(this.config)
    }

    info(message="Notice", description="Infomation", duration=3) {
        this._configNotice(message, description, duration);
        notification.info(this.config)
    }

    warning(message="Warning", description="Warning message", duration=5) {
        this._configNotice(message, description, duration);
        notification.warning(this.config)
    }

    error(message="Error", description="Operation failed", duration=5) {
        this._configNotice(message, description, duration);
        notification.error(this.config)
    }
}

export default new AppNotification();
import React, { Component } from 'react';

class DeleteItem extends Component {
    render() {
        const { open, onSubmit, onClose } = this.props;
        return (
            <div className={`modal fade ${open ? "in" : ""}`} style={{
                display: open ? "block" : "none"
            }}>
                <div className="modal-dialog modals-default">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" onClick={onClose}>×</button>
                        </div>
                        <div className="modal-body">
                            <h2>Bạn có muốn xóa</h2>
                            <p>Sau khi xóa sẽ không thể khôi phục được, nếu muốn ẩn nó có thể thay đổi trang thái sang INACTIVE thay vì xóa!!!</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" onClick={onSubmit}>Xóa</button>
                            <button type="button" className="btn btn-default" onClick={onClose}>Hủy</button>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default DeleteItem;
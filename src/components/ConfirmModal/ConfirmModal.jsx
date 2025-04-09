import React, { useState } from 'react';
import { Button, Modal } from 'antd';



export const ConfirmModal = ({message}) => {
    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleOk = () => {
      setIsModalOpen(false);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    
    return (
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <h2>{message}</h2>
      </Modal>
  );
    
}

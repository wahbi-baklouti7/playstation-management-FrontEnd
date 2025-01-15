import React, { useState } from 'react';
import { Button, Form, Modal } from 'antd';
import { BsPlus } from 'react-icons/bs';
const ModalP = ({form,title,icon}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleOk = () => {
      setIsModalOpen(false);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
      
    };

    const formWithProps = React.cloneElement(form, {
        setIsModalOpen
    })
  return (
      <>
          
          
        <Button icon={icon} type="primary" onClick={showModal}>
          {title}
        </Button>
          <Modal title={title}
              footer={null}
              open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        // destroyOnClose
        
        
          >
          {formWithProps}
        </Modal>
      </>
    
  )
}

export default ModalP
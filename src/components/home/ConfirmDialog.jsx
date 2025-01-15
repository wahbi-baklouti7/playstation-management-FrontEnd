import React from 'react'

import { Modal, Button } from 'antd'
import { BsExclamationCircle } from 'react-icons/bs'
import { AiFillExclamationCircle } from 'react-icons/ai'
import { ExclamationCircleFilled } from '@ant-design/icons'

const { confirm } = Modal
const ConfirmDialog = (title,description, type, handleConfirm) => {
  return (
      confirm({
        title: title,
        icon: <ExclamationCircleFilled style={{ color: type == 'warning' ? 'orange' : 'red' }}  />,
        content: description,
        okText: 'Yes',
        okType: type == 'warning' ? 'primary' : 'danger',
        cancelType: 'primary',
        cancelText: 'No',
        onOk() {
          handleConfirm()
        },
          onCancel() {
           
            
          }
      })
  )
}

export default ConfirmDialog
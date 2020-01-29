import React from 'react';
import AlertContext from '../context/alert/alertContext';

export default function Alert() {
  const alertContext = useContext(AlertContext);

  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map(alert => {
      <div key={alert.id}>{alert.msg}</div>;
    })
  );
}

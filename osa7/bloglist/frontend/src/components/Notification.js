import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const info = useSelector(state => state.info)

  if (!info.message) {
    return
  }

  /*const style = {
    color: info.type === 'error' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  return (
    <div style={style} id="info">
      {info.message}
    </div>
  )*/

  // info.type has value "success" or "danger" as defined by Bootstrap

  return <Alert variant={info.type}>{info.message}</Alert>
}

export default Notification

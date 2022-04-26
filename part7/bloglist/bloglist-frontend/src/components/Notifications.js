import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notifications)

  const notifStyle = {
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
  if (notification === null) {
    return null
  }

  return (
    <div style={{ ...notifStyle, color: notification.color }}>
      {notification.message}
    </div>
  )
}
export default Notification

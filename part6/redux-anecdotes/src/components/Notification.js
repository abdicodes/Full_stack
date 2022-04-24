// import { useSelector } from 'react-redux'
import { connect } from 'react-redux'

const Notification = ({ notifications }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }

  // const notification = useSelector((state) => state.notifications)
  return notifications ? <div style={style}>{notifications}</div> : null
}
const mapStatetoProps = (state) => {
  return { notifications: state.notifications }
}
// export default Notification

export default connect(mapStatetoProps)(Notification)

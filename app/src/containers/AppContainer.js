import { connect } from 'react-redux'
import AppView from '../components/AppView'

const mapStateToProps = (state) => {
  return {
    isLogged: state.user.isLogged
  }
}

const LoginContainer = connect(
  mapStateToProps
)(AppView)

export default LoginContainer

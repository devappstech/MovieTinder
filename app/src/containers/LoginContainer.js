import { connect } from 'react-redux'
import { fetchLogUser } from '../actions/LoginActions'
import LoginView from '../components/LoginView'

const mapStateToProps = (state) => {
  return {
    user:state.user.user
  }
}

const mapDispatchToProps = (dispatch,ownProps) => {
  return {
    login: (token) => {
      dispatch(fetchLogUser(token))
    }
  }
}

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginView)

export default LoginContainer

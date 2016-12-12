import { connect } from 'react-redux'
import { logoutUser } from '../actions/LoginActions'
import ProfilView from '../components/ProfilView'

const mapStateToProps = (state) => {
  return {
    user:state.user.user
  }
}

const mapDispatchToProps = (dispatch,ownProps) => {
  return {
    logout: () => {
      dispatch(logoutUser())
    }
  }
}

const ProfilContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilView)

export default ProfilContainer

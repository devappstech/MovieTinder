function cards(state = []
, action) {
  switch (action.type) {
    case 'RESET_CARDS':
      return []
    case 'LOAD_CARDS':
      if(state.length==0){
      return [...action.cards]
    }else if(state.length==10){
      return [...(state.slice(4)),...action.cards]
    }else{
      return [...(state.slice(10)),...action.cards]
    }
    default:
      return state
  }
}

export default cards

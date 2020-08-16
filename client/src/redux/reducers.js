export const reducer = (state, { type, payload }) => {
  
  switch(type) {
    case 'SET_SENDER_NAME': 
      return {
        ...state,
        form: { ...state.form, senderName: payload }
      }
      
    case 'SET_SENDER_EMAIL': 
      return {
        ...state,
        form: { ...state.form, senderMail: payload }
      }
    
    case 'SET_RECIPICIENT_NAME': 
      return {
        ...state,
        form: { ...state.form, recipicientName: payload }
      }
      
    case 'SET_RECIPICIENT_EMAIL': 
      return {
        ...state,
        form: { ...state.form, recipicientMail: payload }
      }
    
    case 'SET_SUBJECT': 
      return {
        ...state,
        form: { ...state.form, subject: payload }
      }

    case 'SET_MESSAGE': 
      return {
        ...state,
        form: { ...state.form, message: payload }
      }

    case 'ADD_FILES': 
      return {
        ...state,
        form: { ...state.form, files: payload }
      }

    default: 
      return {
        ...state
      }
  }
}
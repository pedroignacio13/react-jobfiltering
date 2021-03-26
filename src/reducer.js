export const defaultValues = {
  level: [],
  role: [],
  langtools: []
}

export const reducer = (state, action) => {
  let indexof
  switch(action.type){
    case 'addRole':
      return {
        ...state,
        role: [...state.role, action.value]
      };
      break;
    case 'addLevel':
      return {
        ...state,
        level: [...state.level, action.value]
      }
      break;
    case 'addLangtools':
      return {
        ...state,
        langtools: [...state.langtools, action.value]
      }
      break;
    case 'restore':
      return {
        level: [],
        role: [],
        langtools: []
      }
      break;
    case 'removeRole':
      indexof = state.role.indexOf(action.value)
      return {
        ...state,
        role: state.role.splice(indexof, 1)
      }
      break;
    case 'removeLevel':
      indexof = state.level.indexOf(action.value)
      return {
        ...state,
        level: state.level.splice(indexof, 1)
      }
      break;
    case 'removeLangtools':
      indexof = state.langtools.indexOf(action.value)
      return {
        ...state,
        langtools: state.langtools.splice(indexof, 1)
      }
      break;
  }
}
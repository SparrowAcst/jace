import { find } from "lodash"

export default {
  
  setState( context, state) {
    context.commit('SET_STATE', state)
  },

  setMode (context, mode) {
    context.commit('SET_MODE', mode)
  },

  setConfig(context, config){
    context.commit('SET_CONFIG', config)
  },

  setUser(context, user){
    context.commit('SET_USER', user)
  },

  setAuthor(context, author){
    context.commit('SET_AUTHOR', author)
  },

  setName(context, name){
    context.commit('SET_NAME', name)
  },

   setId(context, id){
    context.commit('SET_NAME', id)
  },

  setNeedSave(context, value){
    context.commit('SET_NEED_SAVE', value)
  },

  setCurrentPage(context, value){
    value.url = window.location.href;
    context.commit('SET_CURRENT_PAGE', value)
  },

  setHolderContent(context, data){
    return new Promise(resolve => {
      
      let page,holder;
      // let newPages = JSON.parse(JSON.stringify(context.state.app.pages))
     
      if(data.page){
        page = find(context.state.app.pages, p => p.id == data.page.id)
        holder = page.holders[data.holder.name]
      } else {
        holder = context.state.app.skin.holders[data.holder.name]
      }
     
      holder.widgets = JSON.parse(JSON.stringify(data.widgets))  
      // context.commit('SET_PAGES', newPages)
      // if(page) context.commit('SET_CURRENT_PAGE', page)
     
      resolve()
    })
     
  },

  setSkin(context, value){
    context.commit('SET_SKIN', value)
  },

  setDescription(context, value){
    context.commit('SET_DESCRIPTION', value)
  },

  setTitle(context, value){
    context.commit('SET_TITLE', value)
  }




}

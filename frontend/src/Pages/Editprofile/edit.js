import React from 'react'
import "./edit.css"



const Edit = () => {



  const HandSubit = (e) => {
    e.preventDefault()
  }


    return(<div id='edit-profile' >
    <h2>Edite seus Dados.</h2>
       
    <p className='subtitle' >Adicione uma imagem de perfil e conte mais sobre você.</p>
    <form onSubmit={HandSubit}>
      <input type="text" placeholder='Name' />
      <input type="email" placeholder='E-mail' disabled />  

       <label>
         <span>Imagem do Perfil:</span>
         <input type="file" /> 
       </label>    

       <label>
        <span>Bio:</span>
        <input type="text" placeholder='Descrição do Perfil.' />
       </label>
        
        <label>
            <span>Quer alterar sua Senha?</span>
            <input type="passoword" placeholder='Digite sua Nova senha.'  />
        </label>
        <input type='submit' value='Atualizar'  />
    
    </form>
    </div> )
}

export default Edit
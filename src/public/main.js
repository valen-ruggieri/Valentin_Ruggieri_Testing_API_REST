const buttonLogOut = document.getElementById("buttonLogOut")
const buttonLogOutAndDelete = document.getElementById('buttonLogOutAndDelete')
const alertMessageContainer = document.getElementById('alertMessage')
const  background = document.getElementById('bodyHome')


buttonLogOut.addEventListener("click",(event)=>{
 

background.setAttribute('class','controlBlur')    
alertMessageContainer.setAttribute('class','container d-flex justify-content-center containerAlertLogout')

 
})

buttonLogOutAndDelete.addEventListener("click",(event)=>{
 

    background.setAttribute('class','controlBlur')    
    alertMessageContainer.setAttribute('class','container d-flex justify-content-center containerAlertLogout')
    
     
    })
    
    


 
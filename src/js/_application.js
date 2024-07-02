import Inputmask from 'imask';
import JustValidate from 'just-validate';

let selector = document.querySelector("#phone")
let im = new Inputmask("+7(999)999-99-99")
im.mask(selector)

const validation = new JustValidate('#form');

validation.addField("#name", [
    {
        rule: "required", 
        errorMessage: "Enter your name",    
    },
    {
        rule: "minLength", 
        value: 2,
        errorMessage: "Please enter your name with at least 2 characters"  
    },
    {
        rule: "customRegexp",
        value: /^[a-zA-Zа-яА-Я\s]+$/,
        errorMessage: "Only letters and spaces are allowed in the name"
        }
]).addField("#email", [
    {
        rule: "required", 
        errorMessage: "Enter your email adress"  
    },
    {
        rule: "email", 
        errorMessage: "Please enter a valid email address "  
    }
]).addField("#phone", [
  {
    validator: (value) => {
      const tel = selector.inputmask.unmaskedvalue()
      return Boolean(Number(tel) && tel.length > 0)
    },
    errorMessage: "Enter your phone number"  
  },
  {
    validator: (value) => {
      const tel = selector.inputmask.unmaskedvalue()
      return Boolean(Number(tel) && tel.length === 10)
    }, 
      errorMessage: "Enter a valid phone number"  
    }
  ]).addField("#message", [
    {
        rule: "required", 
        errorMessage: "Enter your message"  
    },
    {
        rule: "minLength", 
        value: 10,
        errorMessage: "Please enter a message with at least 10 characters"  
    },
    {
        rule: "maxLength", 
        value: 150,
        errorMessage: "Message must be 150 characters or less"  
    }
]).addField("#checkbox",[
    {
        rule: "required",
        errorMessage: " Please agree to our data processing policy"
    }
]).onSuccess((event) => {

        console.log('Validation passes and form submitted', event);

        console.log('Validation passes and form submitted', event);
    
        let formData = new FormData(event.target);
    
        console.log(...formData);
    
        let xhr = new XMLHttpRequest();
    
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              console.log('Отправлено');
              showModal();
            }
          }
        }
    
        xhr.open('POST', 'mail.php', true);
        xhr.send(formData);
    
        event.target.reset();
      });

      function showModal(){
        document.getElementById("modal").classList.add("open")
      }
      
      document.getElementById("close-modal").addEventListener("click",  function(){
        document.getElementById("modal").classList.remove("open")
      });

      window.addEventListener("keydown", (e) => {
        if(e.key === "Escape") {
            document.getElementById("modal").classList.remove("open")
        }
      });

      document.querySelector("#modal .modal__box").addEventListener("click", (e) => {
        e._isCklickWithinModal = true;
      });

      document.getElementById("modal").addEventListener("click", (e) =>{
        if(e._isCklickWithinModal) return;
        e.currentTarget.classList.remove("open");
      })


        
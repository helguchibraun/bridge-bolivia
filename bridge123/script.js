const packageDetails = {
    'basico': {
        title: 'Paquete Básico 🚀',
        price: 'Precio: $60 USD ',
        includes: [
            'Página web básica con diseño personalizado, colores y logo del cliente',
            'Hosting + dominio por 1 año.',
            'Optimización básica para móviles.',
            '(Entrega de 3 a 5 día hábiles y soporte técnico de 1 semana posterior a la entrega)'
        ]
    },
    'medio': {
        title: 'Paquete Medio ✨',
        price: 'Precio: $120 USD ',
        includes: [
            'Página web con diseño personalizado y animaciones básicas, colores y logo del cliente.',
            'Dominio y Hosting por 1 año',
            'Formulario de contacto funcional con Email.JS o WhatsApp',
            'Integración Redes Sociales',
            'Hasta 3 secciones (Inicio – Sobre nosotros - Servicios)',
            '(Entrega de 5 a 7 día hábiles y soporte técnico de 2 semanas posteriores a la entrega)'
        ]
    },
    'pro': {
        title: 'Paquete PRO 💎',
        price: 'Precio: $200 USD ',
        includes: [
            'Página web con diseño personalizado y animaciones básicas, colores y logo del cliente.',
            'Hosting + dominio por 1 año.',
            'Optimización básica para móviles.',
            'Formulario de contacto funcional con Email.JS o WhatsApp',
            'Integración Redes Sociales ',
            'Asesoría personalizada (Estructura, textos y Estrategias)',
            'Creación de imágenes optimizadas y libres de derechos.',
            '(Entrega de 7 a 10 día hábiles y soporte técnico de 2 semanas posteriores a la entrega)'
        ]
    }
};

const modal = document.getElementById('package-modal');
const modalTitle = document.getElementById('modal-title');
const modalPrice = document.getElementById('modal-price');
const modalIncludes = document.getElementById('modal-includes');
const selectServicio = document.getElementById('servicio');

/**
 * Abre la ventana modal y carga los detalles del paquete.
 * @param {string} packageName 
 */
function openModal(packageName) {
    const detail = packageDetails[packageName];
    if (detail) {
        modalTitle.textContent = detail.title;
        modalPrice.textContent = detail.price;
        
        
        modalIncludes.innerHTML = '';
        detail.includes.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            modalIncludes.appendChild(li);
        });
        
        
        const optionValue = detail.title.replace(/ \uD83D[\ude80\u2728\uD83D\udc8e]/g, '').trim(); 
        selectServicio.value = optionValue;
        
        modal.style.display = 'block';
    }
}


function closeModal() {
    modal.style.display = 'none';
}


 
 
function contactAndClose() {
    closeModal();
    
    document.getElementById('contactanos').scrollIntoView({ behavior: 'smooth' });
}


window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}


//  FORMULARIO DE CONTACTO CON EMAIL.JS


document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    const statusMessage = document.getElementById('form-status');
    const sendButton = document.getElementById('send-button');
    
    statusMessage.textContent = 'Enviando...';
    sendButton.disabled = true;

    
    const templateParams = {
        name: this.elements['from_name'].value, 
        email: this.elements['from_email'].value, 
        phone: this.elements['phone'].value, 
        service: this.elements['service_interest'].value, 
        budget: this.elements['budget'].value, 
        message: this.elements['message'].value, 
    };

    console.log("Datos a enviar:", templateParams); 

    
    emailjs.send('service_bridge', 'template_bridge', templateParams)
        .then(function(response) {
            statusMessage.style.color = 'var(--color-green)';
            statusMessage.textContent = '✅ ¡Mensaje enviado con éxito! Te contactaremos pronto.';
            document.getElementById('contact-form').reset(); 
            console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
            statusMessage.style.color = 'red';
            statusMessage.textContent = '❌ Error al enviar el mensaje. Revisa la consola o tu configuración de Email.js.';
            console.log('FAILED...', error);
        })
        .finally(() => {
            sendButton.disabled = false;
        });
});
const btnElement = document.getElementById('btn')
const errorMessageElement = document.getElementById('errorMessage')

const galleryElement = document.getElementById('gallery')

async function fetchImage(){
    const inputValue = document.getElementById('input').value;

    if(inputValue > 10 || inputValue < 1 ){
        errorMessageElement.style.display = 'block';
        errorMessageElement.innerText = 'Number should between 1  and 10'
        return

    }

    imgs = ''; 

    try {
        btnElement.style.display = 'none';
        const loading = `<img src='spinner.svg'/>`
        galleryElement.innerHTML = loading;
        await fetch(`https://api.unsplash.com/photos?per_page=${inputValue}&page=${Math.round(Math.random() * 1000)}&client_id=FkLne4CTJWg0AtnJV1cL20wcAN3wzFnebjbsCbFNSN4`).then((res)=>res.json().then((data)=>{
    if(data){
        data.forEach((pic)=>{
            imgs +=`
            <img src=${pic.urls.small} alt='image'/>
            `;
            galleryElement.style.display = 'block';
            galleryElement.innerHTML = imgs;
            btnElement.style.display = 'block';
            errorMessageElement.style.display = 'none';
        })
    }
   })
   
   );

   
    } catch (error) {
        console.log(error);
        errorMessageElement.style.display = 'block';
        errorMessageElement.innerText = 'You have exceeded the limit,try again later';
        btnElement.style.display = 'block';
        galleryElement.style.display = 'none';
    }
    
   
    
}

btnElement.addEventListener('click',fetchImage )

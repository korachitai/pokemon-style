    const canvas = document.querySelector('canvas')

    const context = canvas.getContext('2d')

    canvas.width = 1024
    
    canvas.height = 576
    
    context.fillStyle = 'white'
    context.fillRect(0, 0, canvas.width, canvas.height)

    const image = new Image()
    image.src = './img/Pellet Town.png'

    
    image.onload = () => {
        context.drawImage(image, -250, -575)
    }
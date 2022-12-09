    const canvas = document.querySelector('canvas')

    const context = canvas.getContext('2d')

    canvas.width = 1024
    
    canvas.height = 576
    
    context.fillStyle = 'white'
    context.fillRect(0, 0, canvas.width, canvas.height)

    const image = new Image()
    const playerImage = new Image()
    image.src = './img/Pellet Town.png'
    playerImage.src = './img/playerDown.png'
    
    image.onload = () => {
        context.drawImage(image, -127 , -640 )
        context.drawImage(
            playerImage,
            canvas.width / 2 - playerImage.width / 2,
            canvas.height / 2 - playerImage.height / 2
            )
    }

    

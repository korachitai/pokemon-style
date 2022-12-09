    
    const canvas = document.querySelector('canvas')
    const context = canvas.getContext('2d')

    //Set the canvas width and height
    canvas.width = 1024
    canvas.height = 576
    

    context.fillStyle = 'white'
    context.fillRect(0, 0, canvas.width, canvas.height)

    //Creates a constant for the images and stores it inside the variable
    const image = new Image()
    const playerImage = new Image()
    image.src = './img/Pellet Town.png'
    playerImage.src = './img/playerDown.png'
    
    //When a new instance of sprite call automaticly what is inside the constructor function
    class Sprite {
        constructor({ position, velocity, image }) {
            //Declare properties of each sprite
            this.position = position
            this.image = image
        }

        //Create a new method. Determine what is being drawned in the canvas
        draw(){
            context.drawImage(this.image, this.position.x , this.position.y)
        }
    }

    //Create a new sprite within the background constant
    const background = new Sprite({
        //Location for the image to be rendered x-y axis
        position: {
            x:-112,
            y:-640
        },
        //What is the image equal to (gets from the constructor)
        image: image
    })

    //Const for the keys
    const keys = {
        //W key is not pressed by default
        w: {
            pressed: false
        },
        //A key is not pressed by default
        a: {
            pressed: false
        },
        //S key is not pressed by default
        s: {
            pressed:false
        },
        //D key is not pressed by deafult
        d: {
            pressed:false
        }

    }

    //Animates the player
    function animate(){
        window.requestAnimationFrame(animate)
        //Call the draw method from background
        background.draw()
        context.drawImage(
            playerImage,
            //Crop image
            //Crop X left to right
            0,
            //Crop Y top down
            0,
            //Crop width
            playerImage.width / 4,
            //Crop height
            playerImage.height,
            //Location is placed on canvas 
            canvas.width / 2 - playerImage.width / 4 / 2,
            canvas.height / 2 - playerImage.height / 2,
            //Location that is rendered
            playerImage.width / 4,
            playerImage.height,
        )
        
        //Listen for the key press W and if was the last key pressed
        if (keys.w.pressed && lastKey === 'w') 
            //If the key is pressed moves the background down to give the illusion the player is moving
            background.position.y = background.position.y + 2
        else if (keys.a.pressed && lastKey === 'a')
            //Cleaner way to do the same thing
            background.position.x += 2
        //Same thing in one line. Opposite direction
        else if (keys.s.pressed && lastKey === 's') background.position.y -= 2
        else if (keys.d.pressed && lastKey === 'd') background.position.x -= 2
        

    }
    animate()

    //Listens for the last key pressed. For example currently pressing W then D, you should move in the direction of D
    let lastKey = ''
    //Listens for a keydown event and only works for 'WASD' because of the switch
    window.addEventListener('keydown', (e) => {
        
        switch(e.key){    
            case 'w':
                    //Is it pressed down - yes
                    keys.w.pressed = true
                    //Was the last key pressed
                    lastKey = 'w'
                break
            case 'a':
                    //Is it pressed down - yes
                    keys.a.pressed = true
                    //Was the last key pressed
                    lastKey = 'a'
                break

            case 's':
                    //Is it pressed down - yes
                    keys.s.pressed = true
                    //Was the last key pressed
                    lastKey = 's'
                break

            case 'd':
                    //Is it pressed down - yes
                    keys.d.pressed = true
                    //Was the last key pressed
                    lastKey = 'd'
                break

        }
    })

    //Checks if the key is no longer beeing pressed down
    window.addEventListener('keyup', (e) => {
        
        switch(e.key){    
            case 'w':
                    //when you realease the key changes the state to false
                    keys.w.pressed = false
                break
            case 'a':
                    //when you realease the key changes the state to false
                    keys.a.pressed = false
                break

            case 's':
                    //when you realease the key changes the state to false
                    keys.s.pressed = false
                break

            case 'd':
                    //when you realease the key changes the state to false
                    keys.d.pressed = false
                break

        }
    })

    

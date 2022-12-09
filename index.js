    
    const canvas = document.querySelector('canvas')
    const context = canvas.getContext('2d')

    //Set the canvas width and height
    canvas.width = 1024
    canvas.height = 576
    
    //Store rows of collision in the array
    const collisionsMap = []
    //Create a sub array for collisions. Creating rows on map.
    for (let i = 0; i < collisions.length; i += 70) {
        //Sub arrays of 70 tiles each. Size of the map. To be stored in the const above
        collisionsMap.push(collisions.slice(i, 70 + i))        
    }

    //Create the object collision to be rendered
    class Boundary {
        //Creates a static propertie to reference the Bondary class below
        static width = 48 
        static height = 48
        constructor({ position }) {
            this.position = position
            //Size of the boundary block 12px times 400%
            this.width = 48
            this.height = 48
        }

        //Draws the boundary
        draw() {
            context.fillStyle = 'red'
            context.fillRect(this.position.x, this.position.y, this.width, this.height)
        }
    }

    //Stores the several boundaries through the map
    const boundaries = []
    //Offset the boundaries of the map. Without this the boundaries appear
    //without the offset that was set in the background.
    const offset = {
        x: -112,
        y: -640
    }

    //Loop over each row at a time. i is for index for each row
    collisionsMap.forEach((row, i) => {
        //Within each row looks for a symbol. J is the index for each column
        row.forEach((symbol, j) => {
            //Only draw the boundary for each 1025 value inside the subarray
            if (symbol === 1025)
            boundaries.push(
                new Boundary({
                position: {
                x: j * Boundary.width + offset.x,
                y: i * Boundary.height + offset.y
                }
            })
            )
        })
    })

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
            x: offset.x,
            y: offset.y
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

    const testBOundary = new Boundary({
        position: {
            x: 400,
            y: 400
        }
    })
    //Animates the player
    function animate(){
        window.requestAnimationFrame(animate)
        //Call the draw method from background
        background.draw()
        //Draws the boundary on top of backgound and below the player
        //Calls the draw function above
        //boundaries.forEach((boundary) => {
        //    boundary.draw()
        //})
        testBOundary.draw()
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

    

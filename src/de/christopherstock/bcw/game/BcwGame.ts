
    /*****************************************************************************
    *   Handles the main game logic.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    class BcwGame
    {
        /** The canvas context. */
        public      static      canvas              :BcwCanvas                  = null;

        /** The player object. */
        public      static      player              :BcwPlayer                  = null;

        /** List of collectable items */
        public      static      items               :Array<BcwItem>             = null;

        /*****************************************************************************
        *   Inits the game engine.
        *****************************************************************************/
        public static init():void
        {
            //set document's title
            document.title = BcwSettings.WEBPAGE_TITLE;

            //create and add canvas context
            BcwGame.canvas = new BcwCanvas( BcwSettings.CANVAS_WIDTH, BcwSettings.CANVAS_HEIGHT );
            document.body.appendChild( BcwGame.canvas.getCanvasTag() );
            
            //load all sounds
            BcwSound.loadSounds();

            //load all images
            BcwImage.loadImages(BcwGame.initRest);
        }

        /*****************************************************************************
        *   Inits all game components after all images have been invoked.
        *****************************************************************************/
        private static initRest():void
        {
            //create all sprites
            BcwSprite.init();

            //create player instance
            BcwGame.player = new BcwPlayer
            (
                BcwSprite.PLAYER_STAND_RIGHT,
                BcwSettings.PLAYER_START_X,
                BcwSettings.PLAYER_START_Y,
                BcwSprite.PLAYER_WALK_LEFT.iFrameWidth,
                BcwSprite.PLAYER_WALK_LEFT.iFrameHeight
            );

            //create all items
            BcwGame.items  = BcwItem.generateRandomItems();

            //init key system
            LibKeySystem.init();

            //start the bg sound
            //BcwSound.playSound( BcwSound.BG_ENCHANTED_WOODS );

            //start game loop
            setInterval( BcwGame.tick, BcwSettings.THREAD_DELAY );
        }

        /*****************************************************************************
        *   Being invoked each tick, this method specifies the 'game loop'.
        *****************************************************************************/
        public static tick():void
        {
            BcwGame.render();
            BcwGame.draw( BcwGame.canvas.getContext() );
        }

        /*****************************************************************************
        *   Specifies all rendering operations being invoked each tick.
        *****************************************************************************/
        public static render():void
        {
            //render all sprites
            BcwSprite.ITEM_MF_LOGO.nextTick();
            BcwSprite.PLAYER_WALK_LEFT.nextTick();
            BcwSprite.PLAYER_WALK_RIGHT.nextTick();

            var moveLeft:boolean  = LibKeySystem.isKeyPressed( BcwSettings.KEY_LEFT  );
            var moveRight:boolean = LibKeySystem.isKeyPressed( BcwSettings.KEY_RIGHT );
            var moveUp:boolean    = LibKeySystem.isKeyPressed( BcwSettings.KEY_UP    );
            var moveDown:boolean  = LibKeySystem.isKeyPressed( BcwSettings.KEY_DOWN  );

            if ( moveRight )
            {
                BcwGame.player.setNewSprite(BcwSprite.PLAYER_WALK_RIGHT);
                BcwGame.player.setX( BcwGame.player.getX() + BcwSettings.PLAYER_SPEED );
                BcwGame.player.lookingdirection = BcwPlayer.LOOKINGDIRECTION_RIGHT;
            }
            if ( moveLeft )
            {
                BcwGame.player.setNewSprite(BcwSprite.PLAYER_WALK_LEFT);
                BcwGame.player.setX( BcwGame.player.getX() - BcwSettings.PLAYER_SPEED );
                BcwGame.player.lookingdirection = BcwPlayer.LOOKINGDIRECTION_LEFT;
            }
            if ( moveUp   ) BcwGame.player.setY( BcwGame.player.getY() - BcwSettings.PLAYER_SPEED );
            if ( moveDown ) BcwGame.player.setY( BcwGame.player.getY() + BcwSettings.PLAYER_SPEED );

            if (!moveLeft && !moveRight)
            {
                if (BcwGame.player.lookingdirection == BcwPlayer.LOOKINGDIRECTION_RIGHT) BcwGame.player.setNewSprite(BcwSprite.PLAYER_STAND_RIGHT);
                if (BcwGame.player.lookingdirection == BcwPlayer.LOOKINGDIRECTION_LEFT) BcwGame.player.setNewSprite(BcwSprite.PLAYER_STAND_LEFT);
            }

            //clip level bounds
            if ( BcwGame.player.getX() >= BcwSettings.LEVEL_WIDTH  - BcwGame.player.getWidth()  )
            {
                BcwGame.player.setX( BcwSettings.LEVEL_WIDTH  - BcwGame.player.getWidth()  );
                if (moveRight) BcwGame.player.setNewSprite(BcwSprite.PLAYER_STAND_RIGHT);
            }
            if ( BcwGame.player.getY() >= BcwSettings.LEVEL_HEIGHT - BcwGame.player.getHeight() ) BcwGame.player.setY( BcwSettings.LEVEL_HEIGHT - BcwGame.player.getHeight() );
            if ( BcwGame.player.getX() < 0 )
            {
                BcwGame.player.setX( 0 );
                if (moveLeft) BcwGame.player.setNewSprite(BcwSprite.PLAYER_STAND_LEFT);
            }
            if ( BcwGame.player.getY() < 0 ) BcwGame.player.setY( 0 );

            //render items
            BcwItem.renderAll();

            //render camera
            BcwCamera.update();
        }

        /*****************************************************************************
        *   Specifies all drawing operations being invoked each tick.
        *****************************************************************************/
        public static draw( ctx:CanvasRenderingContext2D ):void
        {
            //clear the canvas
            LibDrawing.fillRect(
                ctx,
                BcwSettings.COLOR_BG_CANVAS,
                0,
                0,
                BcwGame.canvas.getWidth(),
                BcwGame.canvas.getHeight()
            );

            //draw the level
            BcwLevel.draw( ctx );

            //draw all items
            BcwItem.drawAll( ctx );

            //draw player
            BcwGame.player.draw( ctx );
        }
    }

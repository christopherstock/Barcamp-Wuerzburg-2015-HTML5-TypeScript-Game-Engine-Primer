
    /*****************************************************************************
    *   Represents an animated image.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    class BcwSprite
    {
        /** The mayflower logo. */
        public      static      ITEM_MF_LOGO                :BcwSprite                  = null;
        /** The player standing left. */
        public      static      PLAYER_STAND_LEFT           :BcwSprite                  = null;
        /** The player standing right. */
        public      static      PLAYER_STAND_RIGHT          :BcwSprite                  = null;
        /** The player walking left. */
        public      static      PLAYER_WALK_LEFT            :BcwSprite                  = null;
        /** The player walking right. */
        public      static      PLAYER_WALK_RIGHT           :BcwSprite                  = null;

        /** The image being used by this sprite, containing all frames. */
        private                 iImg                        :HTMLImageElement           = null;
        /** The number of horizontal frames in this sprite's image. */
        private                 iFramesX                    :number                     = 0;
        /** The number of vertical frames in this sprite's image. */
        private                 iFramesY                    :number                     = 0;
        /** The width of one frame in px. */
        public                  iFrameWidth                 :number                     = 0;
        /** The height of one frame in px. */
        public                  iFrameHeight                :number                     = 0;
        /** The total number of frames in this sprite. */
        private                 iFrameCount                 :number                     = 0;
        /** The index of the current active frame in this sprite. */
        private                 iCurrentFrame               :number                     = 0;
        /** The current tick between frame changes in this sprite. */
        private                 iCurrentTick                :number                     = 0;
        /** The delay time between frame change in ticks. */
        private                 iTicksBetweenFrameChange    :number                     = 0;

        public static init()
        {
            BcwSprite.ITEM_MF_LOGO       = new BcwSprite( BcwImage.getImage( BcwImage.ITEM_MAYFLOWER_SPRITE ), 3, 6, 18, 4  );
            BcwSprite.PLAYER_STAND_LEFT  = new BcwSprite( BcwImage.getImage( BcwImage.PLAYER_STAND_LEFT     ), 1, 1, 1,  0  );
            BcwSprite.PLAYER_STAND_RIGHT = new BcwSprite( BcwImage.getImage( BcwImage.PLAYER_STAND_RIGHT    ), 1, 1, 1,  0  );
            BcwSprite.PLAYER_WALK_LEFT   = new BcwSprite( BcwImage.getImage( BcwImage.PLAYER_WALK_LEFT      ), 2, 1, 2,  4  );
            BcwSprite.PLAYER_WALK_RIGHT  = new BcwSprite( BcwImage.getImage( BcwImage.PLAYER_WALK_RIGHT     ), 2, 1, 2,  4  );
        }

        /*****************************************************************************
         *   Creates a new sprite with the specified properties.
         *
         *   @param  aImg                        The image that contains all the frames for this sprite.
         *   @param  aFramesX                    The number of horizontal frames in this image.
         *   @param  aFramesY                    The number of vertical frames in this image.
         *   @param  aFrameCount                 The total number of frames in this image.
         *   @param  aTicksBetweenFrameChange    The number of game ticks to delay till this sprite
         *                                       changes to the next frame.
         *****************************************************************************/
        public constructor( aImg:HTMLImageElement, aFramesX:number, aFramesY:number, aFrameCount:number, aTicksBetweenFrameChange:number )
        {
            this.iImg                     = aImg;
            this.iFramesX                 = aFramesX;
            this.iFramesY                 = aFramesY;
            this.iFrameCount              = aFrameCount;
            this.iFrameWidth              = aImg.width  / aFramesX;
            this.iFrameHeight             = aImg.height / aFramesY;
            this.iTicksBetweenFrameChange = aTicksBetweenFrameChange;
        }

        /*****************************************************************************
         *   Draws the current frame of this sprite onto the specified screen position.
         *
         *   @param  ctx     The 2d rendering context.
         *   @param  x       The x location to draw this sprite's current frame onto.
         *   @param  y       The y location to draw this sprite's current frame onto.
         *   @param  alpha   The alpha value to draw this image with.
         *****************************************************************************/
        public draw( ctx:CanvasRenderingContext2D, x:number, y:number, alpha:number )
        {
            LibDrawing.drawImageScaledClipped
                (
                    ctx,
                    this.iImg,
                    x,
                    y,
                    this.iFrameWidth  * Math.floor( this.iCurrentFrame % this.iFramesX ),
                    this.iFrameHeight * Math.floor( this.iCurrentFrame / this.iFramesX ),
                    this.iFrameWidth,
                    this.iFrameHeight,
                    this.iFrameWidth,
                    this.iFrameHeight,
                    alpha
                );
        }

        /*****************************************************************************
        *   Performs the next tick for this sprite.
        *****************************************************************************/
        public nextTick()
        {
            if ( ++this.iCurrentTick > this.iTicksBetweenFrameChange )
            {
                this.iCurrentTick = 0;
                this.nextFrame();
            }
        }

        /*****************************************************************************
        *   Changes the current frame of this sprite to the next one
        *   or resets it's current frame back to the first frame
        *   if the last one has been reached.
        *****************************************************************************/
        private nextFrame()
        {
            ++this.iCurrentFrame;
            if ( this.iCurrentFrame >= this.iFrameCount )
            {
                this.iCurrentFrame = 0;
            }
        }

        public reset()
        {
            this.iCurrentFrame = 0;
            this.iCurrentTick  = 0;
        }
    }

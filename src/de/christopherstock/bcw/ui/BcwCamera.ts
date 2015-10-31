
    /*****************************************************************************
    *   Manages the scrolling offset.
    *
    *   @author     Christopher Stock
    *   @version    0.0.8
    *****************************************************************************/
    class BcwCamera
    {
        /** The scrolling offset X. */
        public          static          offsetX         :number                         = 0;

        /** The scrolling offset Y. */
        public          static          offsetY         :number                         = 0;

        /*****************************************************************************
        *   Renders the camera for this tick.
        *****************************************************************************/
        public static update()
        {
            BcwCamera.offsetX = BcwGame.player.getX() + BcwGame.player.getWidth()  / 2 - BcwGame.canvas.getWidth()  / 2;
            BcwCamera.offsetY = BcwGame.player.getY() + BcwGame.player.getHeight() / 2 - BcwGame.canvas.getHeight() / 2;

            if ( BcwCamera.offsetX < 0 ) BcwCamera.offsetX = 0;
            if ( BcwCamera.offsetY < 0 ) BcwCamera.offsetY = 0;
            if ( BcwCamera.offsetX > BcwSettings.LEVEL_WIDTH  - BcwGame.canvas.getWidth()  ) BcwCamera.offsetX = BcwSettings.LEVEL_WIDTH  - BcwGame.canvas.getWidth();
            if ( BcwCamera.offsetY > BcwSettings.LEVEL_HEIGHT - BcwGame.canvas.getHeight() ) BcwCamera.offsetY = BcwSettings.LEVEL_HEIGHT - BcwGame.canvas.getHeight();
        }
    }

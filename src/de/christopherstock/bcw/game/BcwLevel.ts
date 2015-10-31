
    /*****************************************************************************
    *   Represents the game level.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    class BcwLevel
    {
        /*****************************************************************************
        *   Draws the level.
        *****************************************************************************/
        public static draw( ctx:CanvasRenderingContext2D )
        {
/*
            LibDrawing.fillRect( ctx, BcwSettings.COLOR_BG_LEVEL,     0, 0, BcwSettings.LEVEL_WIDTH, BcwSettings.LEVEL_HEIGHT      );
            LibDrawing.fillRect( ctx, BcwSettings.COLOR_BORDER_LEVEL, 0, 0, BcwSettings.LEVEL_WIDTH, BcwSettings.LEVEL_BORDER_SIZE );
            LibDrawing.fillRect( ctx, BcwSettings.COLOR_BORDER_LEVEL, 0, BcwSettings.LEVEL_HEIGHT - BcwSettings.LEVEL_BORDER_SIZE, BcwSettings.LEVEL_WIDTH, BcwSettings.LEVEL_BORDER_SIZE );
            LibDrawing.fillRect( ctx, BcwSettings.COLOR_BORDER_LEVEL, 0, 0, BcwSettings.LEVEL_BORDER_SIZE, BcwSettings.LEVEL_HEIGHT );
            LibDrawing.fillRect( ctx, BcwSettings.COLOR_BORDER_LEVEL, BcwSettings.LEVEL_WIDTH - BcwSettings.LEVEL_BORDER_SIZE, 0, BcwSettings.LEVEL_BORDER_SIZE, BcwSettings.LEVEL_HEIGHT );
*/
            LibDrawing.drawImage
            (
                ctx,
                BcwImage.getImage( BcwImage.LEVEL_BG_ZAUBERWALD ),
                -BcwCamera.offsetX,
                -BcwCamera.offsetY,
                1.0
            );
        }
    }

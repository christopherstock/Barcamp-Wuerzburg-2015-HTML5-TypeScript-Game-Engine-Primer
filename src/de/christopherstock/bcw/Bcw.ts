
    /*****************************************************************************
    *   The main class contains the application's points of entry and termination.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    class Bcw
    {
        /*****************************************************************************
        *   This method is invoked when the application starts.
        *****************************************************************************/
        public static main():void
        {
            BcwDebug.log( "Welcome to the HTML5 TypeScript Game Engine Primer." );

            BcwGame.init();
        }
    }

    /*****************************************************************************
    *   This is the application's point of entry.
    *****************************************************************************/
    window.onload = function()
    {
        //invoke main method
        Bcw.main();
    };

    /*****************************************************************************
    *   This is the application's point of termination.
    *****************************************************************************/
    window.onunload = function()
    {
    };


    /*****************************************************************************
    *   Represents the sound system.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    class BcwSound
    {
        public      static      PICK_UP                 :string                     = "res/sound/pickUp.mp3";
        public      static      BG_ENCHANTED_WOODS      :string                     = "res/sound/bgEnchantedWoods.mp3";

        private     static      FILENAMES               :Array<string>              =
        [
            BcwSound.PICK_UP,
            BcwSound.BG_ENCHANTED_WOODS,
        ];

        /** This array contains all loaded sounds. */
        private     static      allSounds               :Array<HTMLAudioElement>    = [];

        public static loadSounds():void
        {
            //load all sounds
            for ( var i:number = 0; i < BcwSound.FILENAMES.length; ++i )
            {
                try
                {
                    BcwSound.allSounds[BcwSound.FILENAMES[i]] = new Audio();
                    BcwSound.allSounds[BcwSound.FILENAMES[i]].src = BcwSound.FILENAMES[i];
                }
                catch ( ex )
                {
                    BcwDebug.log("Exception raised on loading sound [" + BcwSound.FILENAMES[i] + "]");
                }
            }
        }

        /*****************************************************************************
        *   Creates and plays a COPY of the specified audio object.
        *
        *   @param id The ID of the audio object to play.
        *****************************************************************************/
        public static playSound( id:string )
        {
            if ( BcwSound.allSounds[ id ] != null )
            {
                var clipClone:HTMLAudioElement = <HTMLAudioElement>BcwSound.allSounds[id].cloneNode(true);
                clipClone.play();
            }
        }
    }

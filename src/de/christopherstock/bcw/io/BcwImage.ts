
    /*****************************************************************************
    *   Represents the image system.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    class BcwImage
    {
        public  static  PLAYER_STAND_LEFT           :string                 = "res/image/player/standLeft.png";
        public  static  PLAYER_STAND_RIGHT          :string                 = "res/image/player/standRight.png";
        public  static  PLAYER_WALK_LEFT            :string                 = "res/image/player/walkLeft.png";
        public  static  PLAYER_WALK_RIGHT           :string                 = "res/image/player/walkRight.png";
        public  static  ITEM_MAYFLOWER_STATIC       :string                 = "res/image/item/mfLogoStatic.png";
        public  static  ITEM_MAYFLOWER_SPRITE       :string                 = "res/image/item/mfLogoSprite.png";
        public  static  LEVEL_BG_ZAUBERWALD         :string                 = "res/image/level/bgZauberwald.jpg";

        private static  FILENAMES               :Array<string>          =
        [
            BcwImage.PLAYER_STAND_LEFT,
            BcwImage.PLAYER_STAND_RIGHT,
            BcwImage.PLAYER_WALK_LEFT,
            BcwImage.PLAYER_WALK_RIGHT,
            BcwImage.ITEM_MAYFLOWER_STATIC,
            BcwImage.ITEM_MAYFLOWER_SPRITE,
            BcwImage.LEVEL_BG_ZAUBERWALD,
        ];

        private static  images                  :Array<string>          = new Array<string>();
        private static  callback                :any                    = null;
        private static  imgCount                :number                 = 0;

        public static getImage( key:string ):HTMLImageElement
        {
            return BcwImage.images[ key ];
        }

        public static loadImages( callback:any ):void
        {
            BcwImage.callback = callback;

            for ( var i = 0; i < BcwImage.FILENAMES.length; i++ )
            {
                BcwImage.images[ BcwImage.FILENAMES[ i ] ]        = new Image();
                BcwImage.images[ BcwImage.FILENAMES[ i ] ].src    = BcwImage.FILENAMES[ i ];
                BcwImage.images[ BcwImage.FILENAMES[ i ] ].onload = BcwImage.onLoadImage;
            }
        }

        private static onLoadImage():void
        {
            ++BcwImage.imgCount;

            BcwDebug.log( "Loaded image [" + BcwImage.imgCount + "] / [" + BcwImage.FILENAMES.length + "]" );

            if ( BcwImage.imgCount == BcwImage.FILENAMES.length )
            {
                BcwImage.callback();
            }
        }
    }

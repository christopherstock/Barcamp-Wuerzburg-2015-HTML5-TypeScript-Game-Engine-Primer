
    /*****************************************************************************
    *   Represents a collectable item.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    class BcwItem
    {
        /** Location X. */
        private            x               :number             = 0;
        /** Location Y. */
        private            y               :number             = 0;
        /** Points gained by player if collected */
        private            points          :number             = 0;
        /** Flag, which indicates if item is picked up by player */
        private            pickedUp        :boolean            = false;
        /** Current alpha-color-value of item */
        private            alpha           :number             = 1;

        /**
         * @param x
         * @param y
         * @param points
         */
        constructor(x:number, y:number, points:number)
        {
            this.x = x;
            this.y = y;
            this.points = points;
        }

        /**
         * @return {number}
         */
        public getX():number
        {
            return this.x;
        }

        /**
         * @return {number}
         */
        public getY():number
        {
            return this.y;
        }

        /**
         * @return {number}
         */
        public getAlpha():number
        {
            return this.alpha;
        }

        /**
         * @param alpha
         */
        public setAlpha(alpha:number)
        {
            this.alpha = alpha;
        }

        /**
         * @return {BcwItem[]}
         */
        public static generateRandomItems():Array<BcwItem>
        {
            var itemList = new Array<BcwItem>();

            var iBreakCounter = 0;

            while(true) {
                var newX   = LibMath.generateRandomNumber(0, BcwSettings.LEVEL_WIDTH - BcwSettings.ITEM_WIDTH);
                var newY   = LibMath.generateRandomNumber(0, BcwSettings.LEVEL_HEIGHT - BcwSettings.ITEM_HEIGHT);
                var points = LibMath.generateRandomNumber(
                    BcwSettings.MIN_ITEM_POINS,
                    BcwSettings.MAX_ITEM_POINS
                );

                var newItem = new BcwItem(newX, newY, points);

                if (itemList.length == 0) {
                    itemList.push(newItem);
                } else {
                    var newItemOverlaps = false;

                    for(var i:number = 0; i < itemList.length; i++) {
                        newItemOverlaps = newItem.doesItemOverlap(itemList[i]);
                        if ( newItemOverlaps ) break;
                    }
                    
                    if (!newItemOverlaps) {
                        itemList.push(newItem);
                    }
                }

                if (itemList.length == BcwSettings.ITEM_COUNT) {
                    return itemList;
                }

                iBreakCounter ++;

                if (iBreakCounter == 1000) {
                    return itemList;
                }
            }
        }

        /**
         * @param item
         */
        public doesItemOverlap(item:BcwItem):boolean
        {
            return (
                    item.x + BcwSettings.ITEM_WIDTH  >= this.x
                &&  item.y + BcwSettings.ITEM_HEIGHT >= this.y
                &&  item.x                           <= this.x + BcwSettings.ITEM_WIDTH
                &&  item.y                           <= this.y + BcwSettings.ITEM_HEIGHT
            );
        }

        /**
         * Checks of player collides with item
         *
         * @param player
         * @return {boolean}
         */
        public collidesWithPlayer( player:BcwPlayer ):boolean
        {
            return (
                    player.getX() + player.getWidth()  >= this.x
                &&  player.getY() + player.getHeight() >= this.y
                &&  player.getX()                      <= this.x + BcwSettings.ITEM_WIDTH
                &&  player.getY()                      <= this.y + BcwSettings.ITEM_HEIGHT
            );
        }

        /**
         * Changes the alpha-color-value
         */
        public render()
        {
            //check if item is picked
            if ( this.pickedUp )
            {
                this.alpha -= BcwSettings.ITEM_FADE_OUT_DELAY;
                if ( this.alpha < 0 )
                {
                    this.alpha = 0;
                }
            }
            else
            {
                if ( this.collidesWithPlayer( BcwGame.player ) )
                {
                    this.pickedUp = true;

                    BcwSound.playSound( BcwSound.PICK_UP );

                    BcwDebug.log( "Picked up item with point value [" + this.points + "]" );
                    BcwGame.player.increasePoints( this.points );
                    BcwDebug.log( "Player's point account is now [" + BcwGame.player.getPoints() + "]" );
                }
            }
        }

        /**
         * @param ctx
         */
        public static drawAll(ctx:CanvasRenderingContext2D)
        {
            for ( var i:number = 0; i < BcwGame.items.length; ++i )
            {
                if ( BcwGame.items[i].getAlpha() == 0 )
                {
                    continue;
                }

                if ( BcwSettings.DEBUG_DRAW_RECTS_ITEMS )
                {
                    LibDrawing.fillRect(
                        ctx,
                        BcwSettings.COLOR_ITEM,
                        BcwGame.items[i].getX() - BcwCamera.offsetX,
                        BcwGame.items[i].getY() - BcwCamera.offsetY,
                        BcwSettings.ITEM_WIDTH,
                        BcwSettings.ITEM_HEIGHT
                    );
                }

                BcwSprite.ITEM_MF_LOGO.draw(
                    ctx,
                    BcwGame.items[ i ].getX() - BcwCamera.offsetX,
                    BcwGame.items[ i ].getY() - BcwCamera.offsetY,
                    BcwGame.items[ i ].alpha
                );
            }
        }

        public static renderAll():void
        {
            for ( var i:number = 0; i < BcwGame.items.length; i++ )
            {
                BcwGame.items[ i ].render();
            }
        }

        public static checkAllPicked():boolean
        {
            for ( var i:number = 0; i < BcwGame.items.length; i++ )
            {
                if ( !BcwGame.items[ i ].pickedUp )
                {
                    return false;
                }
            }
            return true;
        }
    }

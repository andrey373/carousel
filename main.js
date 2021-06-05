let multiItemSlider = (function(){
    return function(selector, config){
        let carousel = document.querySelector('.carousel'),
        innerSlide = carousel.querySelector('.inner_slide'),
        itemSlide = carousel.querySelectorAll('.item_slide'),
        controlBtn = carousel.querySelectorAll('.control_btn'),
        btnRight = carousel.querySelector('.right_btn'),
        btnleft = carousel.querySelector('.left_btn'),
        widthInnerSlide = parseFloat(getComputedStyle(innerSlide).width),
        widthItemSlide = parseFloat(getComputedStyle(itemSlide[0]).width),
        positionFirstElement = 0,
        transformInnerSlide = 0,
        step = widthItemSlide / widthInnerSlide * 100,
        arrItems = [];

        itemSlide.forEach((elt, inx) => {
            arrItems.push({
                itemElt: elt,
                positionElt: inx,
                transformElt: 0
            })
        });

        let positionItem = {
            getItemMin: function(){
                let indexItem = 0;
                arrItems.forEach(function(el, i){
                    if(el.positionElt < arrItems[indexItem].positionElt){
                        indexItem = i;
                    }
                })
                return indexItem;
            },
            getItemMax: function(){
                let indexItem = 0;
                arrItems.forEach(function(el, i){
                    if(el.positionElt > arrItems[indexItem].positionElt){
                        indexItem = i;
                    }
                })
                return indexItem;
            },
            getMin: function(){
                return arrItems[this.getItemMin()].positionElt;
            },
            getMax: function(){
                return arrItems[this.getItemMax()].positionElt;
            }
        };

        let transformItem = function(direction){
            let nextItem;
            if(direction === 'right'){
                positionFirstElement++;
                if((positionFirstElement + widthInnerSlide / widthItemSlide -1) > positionItem.getMax()){
                    nextItem = positionItem.getItemMin();
                    arrItems[nextItem].positionElt = positionItem.getMax() +1;
                    arrItems[nextItem].transformElt += arrItems.length * 100; 
                    arrItems[nextItem].itemElt.style.transform = `translateX(${arrItems[nextItem].  transformElt}%)`; 
                }
                transformInnerSlide -= step;
            }
            if(direction === 'left'){
                positionFirstElement--;
                if(positionFirstElement < positionItem.getMin()){
                    nextItem = positionItem.getItemMax();
                    arrItems[nextItem].positionElt = positionItem.getMin() -1;
                    arrItems[nextItem].transformElt -= arrItems.length * 100; 
                    arrItems[nextItem].itemElt.style.transform = `translateX(${arrItems[nextItem].  transformElt}%)`; 
                }
                transformInnerSlide += step;
            }
            innerSlide.style.transform = `translateX(${transformInnerSlide}%)`;
        };

        let controlClick = function(evt){
            if(evt.target.classList.contains('control_btn')){
                evt.preventDefault();
                let directionValue = evt.target.classList.contains('right_btn') ? 'right' : 'left';
                transformItem(directionValue);
            }
        };

        let setUpListeners = function(){
            controlBtn.forEach((elt) => {
                elt.addEventListener('click', controlClick);
            });
        };

        setUpListeners();

        return {
            right: function(){
                transformItem('right');
            },
            left: function(){
                transformItem('left');
            }
        }
    }
}());

multiItemSlider('.carousel');


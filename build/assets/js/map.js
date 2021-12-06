document.addEventListener('DOMContentLoaded', function() {
    var mapElements = Array.from(document.querySelectorAll('.js-map'));
    mapElements.forEach(mapElement => {
        if (!mapElement) return;
        ymaps.ready(initMap);

        function initMap() {
            const pin = {
                preset: 'islands#blueStarCircleIcon',
                iconColor: '#FEBA00'
            };

            const coords = mapElement.hasAttribute('data-coords') ? mapElement.getAttribute('data-coords').split(',') : null;
            const address = mapElement.getAttribute('data-address');
            const phone = mapElement.getAttribute('data-phone');
            const instagram = mapElement.getAttribute('data-instagram');
            const center = mapElement.hasAttribute('data-center') ? mapElement.getAttribute('data-center').split(',') : null;

            console.log('Coords', coords);

            var pointsMapData = [
                {
                    coords: coords,
                    content: `
                        <div class="popover-contacts">
                            ${
                                address
                                    ? `
                                    <div class="popover-contacts-block">
                                        <div class="popover-contacts-block-title">
                                            Адрес:
                                        </div>
                                        <div class="popover-contacts-block-info">
                                            ${address}
                                        </div>
                                    </div>
                                `
                                    : ''
                            }
                            ${
                                phone
                                    ? `
                                    <div class="popover-contacts-block">
                                        <div class="popover-contacts-block-title">
                                            Телефон:
                                        </div>
                                        <div class="popover-contacts-block-info">
                                            ${phone}
                                        </div>
                                    </div>
                                `
                                    : ''
                            }
                        </div>
                        ${instagram ? `<a class="popover-link" href="${instagram}">instagram</a>` : ''}
                    
                    `
                }
            ];

            var mapInstance = new ymaps.Map(mapElement, {
                center: center ?? coords,
                zoom: 14,
                controls: []
            });

            var zoomControl = new ymaps.control.ZoomControl({
                options: {
                    size: 'small',
                    position: {
                        right: 20,
                        bottom: 60
                    }
                }
            });
            mapInstance.controls.add(zoomControl);

            mapInstance.behaviors.disable('scrollZoom');

            var MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
                '<div class="popover top">' +
                    '<div class="arrow"></div>' +
                    '<div class="popover-inner">' +
                    '$[[options.contentLayout observeSize minWidth=280 maxWidth=300]]' +
                    '</div>' +
                    '</div>',
                {
                    /**
                     * Строит экземпляр макета на основе шаблона и добавляет его в родительский HTML-элемент.
                     * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#build
                     * @function
                     * @name build
                     */
                    build: function() {
                        this.constructor.superclass.build.call(this);

                        this._$element = $('.popover', this.getParentElement());

                        this.applyElementOffset();

                        this._$element.find('.close').on('click', $.proxy(this.onCloseClick, this));
                    },

                    /**
                     * Удаляет содержимое макета из DOM.
                     * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#clear
                     * @function
                     * @name clear
                     */
                    clear: function() {
                        this._$element.find('.close').off('click');

                        this.constructor.superclass.clear.call(this);
                    },

                    /**
                     * Метод будет вызван системой шаблонов АПИ при изменении размеров вложенного макета.
                     * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
                     * @function
                     * @name onSublayoutSizeChange
                     */
                    onSublayoutSizeChange: function() {
                        MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);

                        if (!this._isElement(this._$element)) {
                            return;
                        }

                        this.applyElementOffset();

                        this.events.fire('shapechange');
                    },

                    /**
                     * Сдвигаем балун, чтобы "хвостик" указывал на точку привязки.
                     * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
                     * @function
                     * @name applyElementOffset
                     */
                    applyElementOffset: function() {
                        this._$element.css({
                            // left: -(this._$element[0].offsetWidth / 2),
                            left: -this._$element[0].offsetWidth,
                            top: -(this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight)
                        });
                    },

                    /**
                     * Закрывает балун при клике на крестик, кидая событие "userclose" на макете.
                     * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
                     * @function
                     * @name onCloseClick
                     */
                    onCloseClick: function(e) {
                        e.preventDefault();

                        this.events.fire('userclose');
                    },

                    /**
                     * Используется для автопозиционирования (balloonAutoPan).
                     * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ILayout.xml#getClientBounds
                     * @function
                     * @name getClientBounds
                     * @returns {Number[][]} Координаты левого верхнего и правого нижнего углов шаблона относительно точки привязки.
                     */
                    getShape: function() {
                        if (!this._isElement(this._$element)) {
                            return MyBalloonLayout.superclass.getShape.call(this);
                        }

                        var position = this._$element.position();

                        return new ymaps.shape.Rectangle(
                            new ymaps.geometry.pixel.Rectangle([
                                [position.left, position.top],
                                [
                                    position.left + this._$element[0].offsetWidth,
                                    position.top + this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight
                                ]
                            ])
                        );
                    },

                    /**
                     * Проверяем наличие элемента (в ИЕ и Опере его еще может не быть).
                     * @function
                     * @private
                     * @name _isElement
                     * @param {jQuery} [element] Элемент.
                     * @returns {Boolean} Флаг наличия.
                     */
                    _isElement: function(element) {
                        return element && element[0] && element.find('.arrow')[0];
                    }
                }
            );
            // Создание вложенного макета содержимого балуна.
            var MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass('<div class="popover-content">$[properties.balloonContent]</div>');

            var objectManager = new ymaps.ObjectManager({
                clusterize: false,
                clusterHasBalloon: false,
                geoObjectOpenBalloonOnClick: true
            });
            mapInstance.geoObjects.add(objectManager);

            pointsMapData.forEach(function(item) {
                var objectToAdd = {
                    id: item.coords,
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: item.coords
                    },
                    options: {
                        ...pin,
                        balloonShadow: false,
                        balloonLayout: MyBalloonLayout,
                        balloonContentLayout: MyBalloonContentLayout,
                        balloonPanelMaxMapArea: 0,
                        hideIconOnBalloonOpen: false,
                        balloonOffset: [0, -20]
                    },
                    properties: {
                        balloonContent: item.content
                    }
                };
                objectManager.add(objectToAdd);
            });

            objectManager.objects.balloon.open(coords);
        }
    });
});

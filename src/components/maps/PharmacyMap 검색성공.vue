<template>
    <div class="container" style="width:100%;height:900px;margin-top: 100px;">
        <div>
            
            <select class="form-control">
                <option>d</option>
                <option>d</option>
                <option>d</option>
            </select>
            <input value="시" v-model="si" >
            <input value="구" v-model="gu">
            <input value="동" v-model="dong" >
            <input type="button" v-on:click="searchPlace" value="변경">
            <input type="button" v-on:click="change" value="변경확인">
            
            <div class="map_wrap">
                <div id="map" style="width:100%;height:150%;position:relative;overflow:scroll;"></div>
                <!-- 카테고리 선택 마커(보이지 않도록 처리) -->
                <ul id="category" v-show="false">
                    <li id="PM9" data-order="2">
                        <span class="category_bg pharmacy"></span>
                        약국
                    </li>
                </ul>
            </div>
        </div>
        <input type="button" value="변경" v-on:click="change" style="height: 300px;">
        <input type="button" value="변경" v-on:click="change2" style="height: 300px;">
    </div>

</template>

<script>
// bounds = new kakao.maps.LatLngBounds() 카카오맵에서 사용할 코드
    // 아래 코드를 사용하여 eslint를 해당 파일에서 사용 불능으로 만들 수 있다. 
    // 반드시 script 코드 맨 위에 작성할 것.
    /* eslint-disable */
    export default {
        name: 'PharmacyMap',
        data() {
            return {
                lat: 37.566826, // 위도
                lon: 126.9786567, // 경도
                si:'서울시',
                gu:'서대문구',
                dong:'연희동',
                newlat:0,
                newlon:0


            }
        },
        methods: {
            change() {
                console.log('newlat'+this.newlat);
                console.log('newlon'+this.newlon);
                console.log('lat'+this.lat);
                console.log('lon'+this.lon);
                
                this.lat = this.newlat;
                this.lon = this.newlon;
                console.log('대입후lat'+this.lat);
                console.log('대입후lon'+this.lon);
                this.createMap();
            },
            change2() {
                this.lat = 37.156826
                this.createMap()
            },

            createMap() {
                // 마커를 클릭했을 때 해당 장소의 상세정보를 보여줄 커스텀오버레이입니다
                var placeOverlay = new kakao.maps.CustomOverlay({ zIndex: 1 }),
                    contentNode = document.createElement('div'), // 커스텀 오버레이의 컨텐츠 엘리먼트 입니다 
                    markers = [], // 마커를 담을 배열입니다
                    // 약국의 카테고리(PM9)로 고정
                    currCategory = 'PM9'; // 현재 선택된 카테고리를 가지고 있을 변수입니다

                var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
                    mapOption = {
                        center: new kakao.maps.LatLng(this.lat, this.lon), // 지도의 중심좌표
                        level: 4 // 지도의 확대 레벨
                    };

                // 지도를 생성합니다    
                var map = new kakao.maps.Map(mapContainer, mapOption);

                // 장소 검색 객체를 생성합니다
                var ps = new kakao.maps.services.Places(map);

                // 지도에 idle 이벤트를 등록합니다
                kakao.maps.event.addListener(map, 'idle', searchPlaces);

                // 커스텀 오버레이의 컨텐츠 노드에 css class를 추가합니다 
                contentNode.className = 'placeinfo_wrap';

                // 커스텀 오버레이의 컨텐츠 노드에 mousedown, touchstart 이벤트가 발생했을때
                // 지도 객체에 이벤트가 전달되지 않도록 이벤트 핸들러로 kakao.maps.event.preventMap 메소드를 등록합니다 
                addEventHandle(contentNode, 'mousedown', kakao.maps.event.preventMap);
                addEventHandle(contentNode, 'touchstart', kakao.maps.event.preventMap);

                // 커스텀 오버레이 컨텐츠를 설정합니다
                placeOverlay.setContent(contentNode);

                // 각 카테고리에 클릭 이벤트를 등록합니다
                addCategoryClickEvent();

                // 엘리먼트에 이벤트 핸들러를 등록하는 함수입니다
                function addEventHandle(target, type, callback) {
                    if (target.addEventListener) {
                        target.addEventListener(type, callback);
                    } else {
                        target.attachEvent('on' + type, callback);
                    }
                }

                // 카테고리 검색을 요청하는 함수입니다
                function searchPlaces() {
                    if (!currCategory) {
                        return;
                    }

                    // 커스텀 오버레이를 숨깁니다 
                    placeOverlay.setMap(null);

                    // 지도에 표시되고 있는 마커를 제거합니다
                    removeMarker();

                    ps.categorySearch(currCategory, placesSearchCB, { useMapBounds: true });
                }
                // 페이지가 처음 로딩되었을 때 약국이 표시되도록 호출
                searchPlaces();




                // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
                function placesSearchCB(data, status, pagination) {
                    if (status === kakao.maps.services.Status.OK) {

                        // 정상적으로 검색이 완료됐으면 지도에 마커를 표출합니다
                        displayPlaces(data);
                    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
                        // 검색결과가 없는경우 해야할 처리가 있다면 이곳에 작성해 주세요

                    } else if (status === kakao.maps.services.Status.ERROR) {
                        // 에러로 인해 검색결과가 나오지 않은 경우 해야할 처리가 있다면 이곳에 작성해 주세요

                    }
                }



                // 지도에 마커를 표출하는 함수입니다
                function displayPlaces(places) {

                    // 몇번째 카테고리가 선택되어 있는지 얻어옵니다
                    // 이 순서는 스프라이트 이미지에서의 위치를 계산하는데 사용됩니다
                    var order = document.getElementById(currCategory).getAttribute('data-order');



                    for (var i = 0; i < places.length; i++) {

                        // 마커를 생성하고 지도에 표시합니다
                        var marker = addMarker(new kakao.maps.LatLng(places[i].y, places[i].x), order);

                        // 마커와 검색결과 항목을 클릭 했을 때
                        // 장소정보를 표출하도록 클릭 이벤트를 등록합니다
                        (function (marker, place) {
                            kakao.maps.event.addListener(marker, 'click', function () {
                                displayPlaceInfo(place);
                            });
                        })(marker, places[i]);
                    }
                }

                // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
                function addMarker(position, order) {
                    var imageSrc = 'http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_category.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
                        imageSize = new kakao.maps.Size(27, 28),  // 마커 이미지의 크기
                        imgOptions = {
                            spriteSize: new kakao.maps.Size(72, 208), // 스프라이트 이미지의 크기
                            spriteOrigin: new kakao.maps.Point(46, (order * 36)), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
                            offset: new kakao.maps.Point(11, 28) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
                        },
                        markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
                        marker = new kakao.maps.Marker({
                            position: position, // 마커의 위치
                            image: markerImage
                        });

                    marker.setMap(map); // 지도 위에 마커를 표출합니다
                    markers.push(marker);  // 배열에 생성된 마커를 추가합니다

                    return marker;
                }

                // 지도 위에 표시되고 있는 마커를 모두 제거합니다
                function removeMarker() {
                    for (var i = 0; i < markers.length; i++) {
                        markers[i].setMap(null);
                    }
                    markers = [];
                }

                // 클릭한 마커에 대한 장소 상세정보를 커스텀 오버레이로 표시하는 함수입니다
                function displayPlaceInfo(place) {
                    var content = '<div class="placeinfo">' +
                        '   <a class="title" href="' + place.place_url + '" target="_blank" title="' + place.place_name + '">' + place.place_name + '</a>';

                    if (place.road_address_name) {
                        content += '    <span title="' + place.road_address_name + '">' + place.road_address_name + '</span>' +
                            '  <span class="jibun" title="' + place.address_name + '">(지번 : ' + place.address_name + ')</span>';
                    } else {
                        content += '    <span title="' + place.address_name + '">' + place.address_name + '</span>';
                    }

                    content += '    <span class="tel">' + place.phone + '</span>' +
                        '</div>' +
                        '<div class="after"></div>';

                    contentNode.innerHTML = content;
                    placeOverlay.setPosition(new kakao.maps.LatLng(place.y, place.x));
                    placeOverlay.setMap(map);
                }


                // 각 카테고리에 클릭 이벤트를 등록합니다
                function addCategoryClickEvent() {
                    var category = document.getElementById('category'),
                        children = category.children;

                    for (var i = 0; i < children.length; i++) {
                        children[i].onclick = onClickCategory;
                    }
                }

                // 카테고리를 클릭했을 때 호출되는 함수입니다
                function onClickCategory() {
                    var id = this.id,
                        className = this.className;

                    placeOverlay.setMap(null);

                    if (className === 'on') {
                        currCategory = '';
                        changeCategoryClass();
                        removeMarker();
                    } else {
                        currCategory = id;
                        changeCategoryClass(this);
                        searchPlaces();
                    }
                }

                // 클릭된 카테고리에만 클릭된 스타일을 적용하는 함수입니다
                function changeCategoryClass(el) {
                    var category = document.getElementById('category'),
                        children = category.children,
                        i;

                    for (i = 0; i < children.length; i++) {
                        children[i].className = '';
                    }

                    if (el) {
                        el.className = 'on';
                    }
                }
            },
            searchPlace(){
              
                var component = this;
                console.log(component);
                console.log(component.lat);

                var geocoder = new kakao.maps.services.Geocoder();
                // 경도와 위도를 담을 변수
                var lat; // 경도
                var lon; // 위도

                    // 주소에 해당하는 좌표를 검색
                    geocoder.addressSearch(this.si + this.gu + this.dong, function(result, status){
                        
                        function callback(){
                             if (status === kakao.maps.services.Status.OK) {
                            console.log(result);
                            console.log('x='+result[0].x)
                            console.log('y='+result[0].y)
                            // 주의할 점 x=위도, y=경도
                            lat = result[0].y; 
                            lon = result[0].x; 

                            return new Promise(function (resolve, reject) {
                                    resolve(lat,lon);
                                });
                         }

                        }
                        callback().then(function(result){
                            console.log(result)
                            component.newlat = lat;
                            component.newlon = lon;
                        })
                    });
            }
        },
        mounted: function () {
            this.createMap()

        }// mounted end
    }

</script>
<template>
    <div class="container" style="width:100%;height:900px;margin-top: 100px;">
        <div>

            <!-- change 이벤트는 요소의 값(value)가 변경되면 발생 -->
            <div class="form-group row">
                <select class="form-control col-md-3" v-model="si" @change="select_gu">
                    <option disabled value="">선택</option>
                    <!-- 파일 맨 아래 주석 참고  -->
                    <!-- **case.1 ** -->
                    <option v-for="(one,idx) in lacation.si" :key="idx" :value="one.value">{{one.value}}</option>
                </select>
                <select class="form-control col-md-3" v-model="gu" @change="select_dong">
                    <option disabled value="">선택</option>
                    <!-- (gu,index) 로 표현하면 gu=배열의 요소,idx= 배열 인덱스를 가리킴 -->
                    <!-- key를 유니크한 값으로 표현하라는 에러메시지를 막기 위해서 index를 key로 사용하길 권장  -->
                    <option v-for="(gu,idx) in optionGu" v-bind:key="idx" :value="gu.value">{{gu.value}}</option>
                </select>
                <select class="form-control col-md-3" v-model="dong" @change="searchPlace">
                    <option disabled value="">선택</option>
                    <option v-for="(dong,idx) in optionDong" v-bind:key="idx">{{dong.value}}</option>
                </select>
            </div>
            <!-- <input type="text" v-model="si">
            <input type="text" v-model="gu">
            <input type="text" v-model="dong"> -->
            <!-- <input type="button" v-on:click="searchPlace" value="변경"> -->

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
                lacation: {
                    si: [{ value: '서울시' }, { value: '강원도' }],
                    gu: {
                        Seoul_si_gu: [{ value: '중구' }, { value: '용산구' }],
                        GangwonDo_gu: ['속초', '강릉'],
                    },
                    // 소공동 · 회현동 · 명동 · 필동 · 장충동 · 광희동 · 을지로동 · 신당동 · 다산동 · 약수동 · 청구동 · 신당5동 · 동화동 · 황학동 · 중림동
                    dong: {
                        Jung_gu_dong: [
                            { value: '광희동 1가' },
                            { value: '광희동 2가' },
                            { value: '다산동' },
                            { value: '명동' },
                            { value: '회현동' },
                        ]
                    }

                },
                si: '', // 지역설정(시) -> 검색에 사용 & 
                gu: '',  // 지역설정(구)
                dong: '', // 지역설정(동)
                optionGu: [],
                optionDong: [],
                map: {},
                center: (0.0), // 지도 중심 좌표
                level: 5  // 지도 확대 레벨
            }
        },
        methods: {
            select_gu() {
                if (this.si === '서울시') {
                    this.optionGu = this.lacation.gu.Seoul_si_gu
                } else if (this.si === '강원도') {
                    this.optionGu = this.lacation.gu.Gangwondo_gu
                }
            },
            select_dong() {
                if (this.gu === '중구') {
                    this.optionDong = this.lacation.dong.Jung_gu_dong;
                } else if (this.gu === '마포구') {

                }
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
                        level: this.level // 지도의 확대 레벨
                    };
                this.center = mapOption.center;
                // 지도를 생성합니다    
                var map = new kakao.maps.Map(mapContainer, mapOption);
                this.map = map;
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
            searchPlace() {
                var component = this;
                var geocoder = new kakao.maps.services.Geocoder();
                
                // 주소에 해당하는 좌표를 검색
                geocoder.addressSearch(this.si + this.gu + this.dong, function (result, status) {

                    if (status === kakao.maps.services.Status.OK) {
                        console.log(result);
                        console.log('x=' + result[0].x)
                        console.log('y=' + result[0].y)
                        // x=위도, y=경도
                        let lat = result[0].y;
                        let lon = result[0].x;

                        // 버튼을 클릭하면 아래 배열의 좌표들이 모두 보이게 지도 범위를 재설정합니다 
                        var points = [
                            new kakao.maps.LatLng(lat, lon),
                        ];

                        // 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체를 생성합니다
                        var bounds = new kakao.maps.LatLngBounds();

                        var i, marker;
                        for (i = 0; i < points.length; i++) {
                            // LatLngBounds 객체에 좌표를 추가합니다
                            bounds.extend(points[i]);
                        }
                        // function setBounds() {
                        // LatLngBounds 객체에 추가된 좌표들을 기준으로 지도의 범위를 재설정합니다
                        // 이때 지도의 중심좌표와 레벨이 변경될 수 있습니다
                        component.map.setBounds(bounds);
                        // 검색 후 지도의 레벨이 카카오에서 설정한 초기 레벨(2)로 변경되므로
                        // 지도의 레벨을 현재 지도의 레벨과 같게 재설정해준다.
                        component.map.setLevel(component.level);
                        // }
                        // setBounds();

                    }
                })
            }
        },
        mounted: function () {
            this.createMap()
        }// mounted end
    }
</script>
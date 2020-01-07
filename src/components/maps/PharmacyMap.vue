<template>
    
    <!-- <div id="dmap">
        <h1>{{msg}}</h1>
        <div id="map" style="width:100%; height:400px;"></div>
      </div> -->
      <div id="map" style="width:100%;height:350px;">
        지도
    
    </div>

</template>

<script>
// 아래 코드를 사용하여 eslint를 해당 파일에서 사용 불능으로 만들 수 있다. 
// 반드시 script 코드 맨 위에 작성할 것.
/* eslint-disable */ 

export default {
    name: 'PharmacyMap',
    mounted:function(){
        var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = { 
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

// 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
var map = new kakao.maps.Map(mapContainer, mapOption); 

    }

}

</script>
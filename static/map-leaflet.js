// 繪製曲線 (航線)
function calculateBezierPoints(start, control, end, segments = 100) {
  const points = [];
  for (let t = 0; t <= 1; t += 1 / segments) {
    const lat =
      Math.pow(1 - t, 2) * start[0] +
      2 * (1 - t) * t * control[0] +
      Math.pow(t, 2) * end[0]
    const lng =
      Math.pow(1 - t, 2) * start[1] +
      2 * (1 - t) * t * control[1] +
      Math.pow(t, 2) * end[1]
    points.push([lat, lng])
  }
  return points
}


// 地圖一：航線圖 (收信)
var mymap = L.map('mapid', {
	// options can go in here
  }).setView(
	[25.000205219171278,121.30057531237935], // center is set here   // 經緯度
  4);   // 縮放

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'    // 地圖樣式圖層
  }).addTo(mymap);

  function map_marker(selectmap, apiUrl) {

    const token = localStorage.getItem('token')
    
    const container2 = document.querySelector('#container2')

    fetch(apiUrl, {
        method: 'GET',
        headers: {'Authorization': `Bearer ${token}`}
    })
        .then(response => response.json())
        .then(data => {

			console.log(data)

            for (let i=0;i<data.data.length;i++){

              const start = [25.000205219171278,121.30057531237935]
              const end = [data.data[i].latitude, data.data[i].longitude]
              const deltaLat = end[0] - start[0]  // 緯度差 (用於control的緯度偏移)
              const control = [(start[0] + end[0]) / 2 + deltaLat * 0.2, (start[1] + end[1]) / 2] // 曲線最高點：[緯度於兩點中和 + 上方增加移位、經度不加偏移位於兩點中間]

              // 計算曲線點
              const curvePoints = calculateBezierPoints(start, control, end)

              // 繪製曲線
              L.polyline(curvePoints, { weight: 3, opacity: 0.7 }).addTo(mymap)

              // 顯示彈出視窗
              const marker = L.marker([data.data[i].latitude, data.data[i].longitude])
                .addTo(selectmap)
                .bindPopup(`
                  <div style="width: 200px; height: 200px; display: flex; align-items: center; justify-content: center;">
                    <img src="${data.data[i].image}" style="width: 180px; height: 140px;" alt="Postcard Image">
                  </div>
                  `)
                .openPopup(); // 自動打開彈出框

            }
            nextPage = data.nextPage; 
        })
        .catch(error => {
            console.error('Error:', error)
        });
}


// // 地圖一：收信地圖 (依次打開每個彈出框)
// var mymap = L.map('mapid', {
// 	// options can go in here
//   }).setView(
// 	[25.000205219171278,121.30057531237935], // center is set here   // 經緯度
//   4);   // 縮放

//   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
// 	maxZoom: 19,
// 	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'    // 地圖樣式圖層
//   }).addTo(mymap);


//   // L.marker([25.000205219171278,121.30057531237935]).addTo(mymap).bindPopup('Hi 我在這裡').openPopup(); // create marker here
//   // L.marker([25.000205219171278,100.30057531237935]).addTo(mymap).bindPopup('來自朋友的明信片 <img src="http://via.placeholder.com/100x50">'); // create marker here
//   // L.marker([40.000205219171278,80.30057531237935]).addTo(mymap).bindPopup('來自朋友的明信片 <img src="http://via.placeholder.com/100x50">'); // create marker here
//   // L.marker([-37.901918, 145.051624]).addTo(mymap).bindPopup('我在澳洲有好可愛的袋鼠！ <img src="http://via.placeholder.com/100x50">'); // create marker here


//   function map_marker(selectmap, apiUrl) {

//     const token = localStorage.getItem('token')


// 	// let apiUrl = `/api/collections`
    
//     const container2 = document.querySelector('#container2')

//     fetch(apiUrl, {
//         method: 'GET',
//         headers: {'Authorization': `Bearer ${token}`}
//     })
//         .then(response => response.json())
//         .then(data => {

// 			console.log(data)

//             for (let i=0;i<data.data.length;i++){

//               // L.marker([data.data[i].latitude, data.data[i].longitude]).addTo(mymap).bindPopup(`動態明信片  <img src="${data.data[i].image}">`);

//               const marker = L.marker([data.data[i].latitude, data.data[i].longitude])
//                 .addTo(selectmap)
//                 .bindPopup(`
//                   <div style="width: 200px; height: 200px; display: flex; align-items: center; justify-content: center;">
//                     <img src="${data.data[i].image}" style="width: 180px; height: 140px;" alt="Postcard Image">
//                   </div>
//                 `)
//                 // .openPopup(); // 自動打開彈出框


//               // 在短時間內依次打開每個彈出框
//               setTimeout(() => marker.openPopup(), i * 3000); // 每個標記延遲3秒打開

//             }
//             nextPage = data.nextPage; 
//         })
//         .catch(error => {
//             console.error('Error:', error)
//         });
// }


// 地圖二：寄件足跡
var mymap2 = L.map('mapid2', {
	// options can go in here
  }).setView(
	[25.000205219171278,121.30057531237935], // center is set here   // 經緯度
  4);   // 縮放

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'    // 地圖樣式圖層
  }).addTo(mymap2);



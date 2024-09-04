function renderStamps() {

	const token = localStorage.getItem('token')
	fetch('/api/stamps', {
		method: 'GET',
		headers: {'Authorization': `Bearer ${token}`}
	  })
	.then(response => response.json())
	.then(data => {

        const regionDiv = document.getElementById('region-stamps')
        const nonstopDiv = document.getElementById('nonstop-stamps')

		data.all.forEach(stamp => {
			const stampDiv = document.createElement('div');
			const stampImg = document.createElement('img');
			stampDiv.classList.add('stamp');
			stampImg.src = stamp.image_url;
			stampDiv.appendChild(stampImg);

			// 根據郵票類別渲染到對應的類別
			if (stamp.cat == 'region') {
				regionDiv.appendChild(stampDiv);
			}
			else if (stamp.cat == 'nonstop') {
				nonstopDiv.appendChild(stampDiv);
			}
		});
	}
)}


function collections(page, keyword = "") {

    console.log(page,keyword);

    const token = localStorage.getItem('token')


	let apiUrl = `/api/collections`
    
    const contactBox = document.querySelector('#mail-contact-box')
    const container2 = document.querySelector('#container2')

    fetch(apiUrl, {
        method: 'GET',
        headers: {'Authorization': `Bearer ${token}`}
    })
        .then(response => response.json())
        .then(data => {

			console.log(data)

            // 顯示 mailFrom 資料到 contact-box
            const uniqueMailFrom = new Set() // 使用 Set 使聯絡人不重複
            data.data.forEach(item => {
                if (!uniqueMailFrom.has(item.mailFrom)) {
                    uniqueMailFrom.add(item.mailFrom)
                    const mailFromDiv = document.createElement('div')
                    mailFromDiv.className = "contact-item"

                    const contactImg = document.createElement('img')
                    contactImg.className = "contact-img"
                    contactImg.src = item.avatar

                    const contactName = document.createElement('span')
                    contactName.innerText = item.mailFrom

                    contactBox.appendChild(mailFromDiv)
                    mailFromDiv.appendChild(contactImg)
                    mailFromDiv.appendChild(contactName)

                    // 監聽是否有點選聯絡人，並調用明信片匣篩選器
                    mailFromDiv.addEventListener('click', () => {
                        console.log("點選聯絡人：",item.mailFrom)
                        const filterText = document.getElementById('mailbox-filter-note')
                        filterText.innerText = "篩選："+ item.mailFrom
                        showPostcardsByContact(item.mailFrom, data.data)
                    })

                }
            })

            // 顯示所有收到的明信片
            for (let i=0;i<data.data.length;i++){
                const div = document.createElement('div')
                div.className = "imgbox"
                // const textdiv = document.createElement('div')
                // textdiv.className = "textbox"
                const p1 = document.createElement('p')
                p1.className = "p1"
                p1.innerText = data.data[i].country  
                const photo = document.createElement('img')
                photo.className = "myphoto"
                photo.src = data.data[i].image
                photo.innerText          
                div.appendChild(photo)
                div.appendChild(p1)                
                container2.appendChild(div)
                // div.appendChild(textdiv)

            }
            nextPage = data.nextPage; 
            read()

        })
        .catch(error => {
            console.error('Error:', error)
        });
}



// 明信片匣篩選器
function showPostcardsByContact(mailFrom, postcards) {
    const container2 = document.querySelector('#container2')
    container2.innerHTML = "" // 清空舊的明信片

    const filteredPostcards = mailFrom 
        ? postcards.filter(postcard => postcard.mailFrom === mailFrom)  // 篩選屬於該聯絡人的明信片
        : postcards  // 如果 mailFrom 為 null，顯示所有明信片

    // 顯示明信片
    filteredPostcards.forEach(postcard => {
        const div = document.createElement('div')
        div.className = "imgbox"

        const p1 = document.createElement('p')
        p1.className = "p1"
        p1.innerText = postcard.country

        const photo = document.createElement('img')
        photo.className = "myphoto"
        photo.src = postcard.image

        div.appendChild(photo)
        div.appendChild(p1)
        container2.appendChild(div)
    })
}



// 更新未讀數量
function read() {
	const token = localStorage.getItem('token')
	fetch('/read', {
		headers: {
			'Authorization': `Bearer ${token}`, // 將 JWT 放在 Authorization Header 中
			'Content-Type': 'application/json'
		},
		method: 'PUT'
	  })
	  .then(response => response.json())
	  .then(data => {
		if (data.ok) {
			const unreadCount = document.getElementById('unreadCount')
            if (unreadCount) {
                unreadCount.style.display = "none" // 如果沒有未讀訊息則隱藏
            }
		}

})
}

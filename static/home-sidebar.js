let isSidebarOpen
function toggleSidebar(isOpen) {
	const sidebar = document.getElementById("mySidebar");
	if(!sidebar.style.width) isSidebarOpen = isOpen;
	if (isSidebarOpen) {
		sidebar.style.width = "0";
		isSidebarOpen = false;
		console.log('sidebar close',sidebar.style.width);
	} else {
		sidebar.style.width = "200px";
		isSidebarOpen = true;
	    console.log('sidebar open',sidebar.style.width);
	}
}

  function closeNav() {
	document.getElementById("mySidebar").style.width = "0";
}

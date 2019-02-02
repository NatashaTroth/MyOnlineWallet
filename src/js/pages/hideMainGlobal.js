export function hideMain() {
	let mainChildren = document.querySelectorAll(".main > div, .main__child1 ")
	mainChildren.forEach(child => {
		child.style.display = "none"
	})
}

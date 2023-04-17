const DISTANCE = 10

document.addEventListener("keydown", (e) => {
  const container = document.querySelector(".container")

  switch (e.key) {
    case "ArrowLeft":
      container.classList.replace("x-center", "x-left")
      container.classList.replace("x-right", "x-center")
      break
    case "ArrowRight":
      container.classList.replace("x-center", "x-right")
      container.classList.replace("x-left", "x-center")
      break
    case "ArrowUp":
      container.classList.replace("y-center", "y-top")
      container.classList.replace("y-bottom", "y-center")
      break
    case "ArrowDown":
      container.classList.replace("y-center", "y-bottom")
      container.classList.replace("y-top", "y-center")
      break
  }
})

const container = document.querySelector(".container")

const tooltipContainer = document.createElement("div")
tooltipContainer.classList.add("tooltip-container")
container.appendChild(tooltipContainer)

const tooltip = document.createElement("div")
tooltip.classList.add("tooltip")
tooltipContainer.appendChild(tooltip)

const tooltipData = document.querySelector(".help-text")
tooltip.innerHTML = tooltipData.dataset.tooltip

function getDivDimension(element) {
  const width = element.offsetWidth
  const height = element.offsetHeight
  return [width, height]
}

function getDivWindowDistance(element) {
  const top = element.getBoundingClientRect().top
  const left = element.getBoundingClientRect().left
  return [top, left]
}

function setToolTipPosition(position, targetElement) {
  const [width, height] = getDivDimension(targetElement)
  const [top, left] = getDivWindowDistance(targetElement)

  const tooltip = document.querySelector(".tooltip")
  const [tooltipWidth, tooltipHeight] = getDivDimension(tooltip)

  switch (position) {
    case "top":
      tooltip.style.top = top - tooltipHeight - DISTANCE + "px"
      tooltip.style.left = left - (tooltipWidth - width) / 2 + "px"
      break
    case "bottom":
      tooltip.style.top = top + tooltipHeight - DISTANCE + "px"
      tooltip.style.left = left - (tooltipWidth - width) / 2 + "px"
      break
    case "left":
      tooltip.style.top = top - height / 2 + "px"
      tooltip.style.left = left - tooltipWidth - DISTANCE + "px"
      break
    case "right":
      tooltip.style.top = top - height / 2 + "px"
      tooltip.style.left = left + width + DISTANCE + "px"
    default:
      return false
  }
}

function setProperTooltipPosition() {
  const tooltip = document.querySelector(".tooltip")

  const [tooltipWidth, tooltipHeight] = getDivDimension(tooltip)
  const [top, left] = getDivWindowDistance(tooltipData)

  const isValidTop = tooltipHeight + 2 * DISTANCE < top
  const isValidBottom = window.innerHeight - tooltipHeight + 2 * DISTANCE >= top
  const isValidLeft = tooltipWidth + 2 * DISTANCE < left
  const isValidRight = window.innerWidth - tooltipWidth + 2 * DISTANCE >= left

  if (isValidTop && isValidLeft && isValidRight) {
    setToolTipPosition("top", tooltipData)
  } else if (isValidTop && !isValidLeft) {
    setToolTipPosition("right", tooltipData)
  } else if (isValidTop && !isValidRight) {
    setToolTipPosition("left", tooltipData)
  } else if (!isValidTop && !isValidRight) {
    setToolTipPosition("left", tooltipData)
  } else if (!isValidTop && !isValidLeft) {
    setToolTipPosition("right", tooltipData)
  } else {
    setToolTipPosition("bottom", tooltipData)
  }
}

setProperTooltipPosition()

window.addEventListener("scroll", setProperTooltipPosition)
window.addEventListener("resize", setProperTooltipPosition)
window.addEventListener("keydown", setProperTooltipPosition)

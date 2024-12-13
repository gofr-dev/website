import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'

dayjs.extend(relativeTime)
dayjs.extend(utc)

export const formatBlogDate = (time, type) => {
  // Normalize the time string for Safari compatibility
  const normalizedTime = time.replace(' +0000 UTC', 'Z')

  const utcTime = dayjs.utc(normalizedTime)
  const timeDifference = dayjs().diff(utcTime, 'second')

  if (timeDifference < 0) {
    return dayjs.utc(utcTime).local().format('MMMM DD, YYYY, [at] HH:mm')
  } else if (timeDifference < 5) {
    return 'Just now'
  } else if (timeDifference < 60) {
    return `${timeDifference} seconds ago`
  } else if (timeDifference < 60 * 60) {
    return `${Math.floor(timeDifference / 60)} minutes ago`
  } else if (timeDifference < 60 * 60 * 24) {
    return `${Math.floor(timeDifference / (60 * 60))} hours ago`
  } else if (timeDifference < 60 * 60 * 24 * 2) {
    return `Yesterday at ${utcTime.local().format('HH:mm')}`
  } else {
    return type === 'table'
      ? utcTime.local().format('YYYY-MM-DD HH:mm:ss')
      : dayjs.utc(utcTime).local().format('MMMM DD, YYYY, [at] HH:mm')
  }
}

export const formatMD = (value) => {
  // First, identify and store code blocks
  const codeBlockRegex = /```([\s\S]*?)```/g
  const codeBlocks = []
  value = value.replace(codeBlockRegex, (match, code) => {
    const placeholder = `{{CODE_BLOCK_${codeBlocks.length}}}` // Create a placeholder for the code block
    codeBlocks.push(code) // Store the actual code block
    return placeholder // Replace with placeholder
  })

  // Perform markdown parsing on the rest of the content
  value = value
    .replace(/==(.+?)==/g, '<mark>$1</mark>') // Highlight text
    .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>') // Bold text
    .replace(
      /(?:\s|^)=!\s*(.+?)\s*!=\s*(?=\s|$)/g,
      "<span class='text-primary font-semibold'>$1</span>",
    ) // Primary text
    .replace(/^# (.+)$/gm, '<h1>$1</h1>') // Convert # to <h1>
    .replace(/^#### (.+)$/gm, '<h4>$1</h4>') // Convert #### to <h4>
    .replace(
      /^->\s*([^:]+):\s*(.+)$/gm,
      "<div class='custom-list-wrapper'>" +
        '<svg class="icon text-primary" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">\n' +
        '  <path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clip-rule="evenodd"></path>\n' +
        '</svg>' +
        "<span class='custom-list-head'>$1</span> " +
        "<span class='custom-list-content'>$2</span>" +
        '</div>',
    )
    .replace(
      /^=>\s(.*?)!\(([^)]+)\)\[([^-]+?)\s*-\s*(.+)\]/gm,
      `<div class="custom-quote"><blockquote class="quote">$1</blockquote><div class="avatar-container"><img src='$2' /><span><strong>$3</strong> - $4</span></div></div>`,
    )
    .replace(
      /^--->\s*([\s\S]*?)\s*--->$/gm,
      "<div class='custom-list-parent'>$1</div>",
    )

  // Replace code block placeholders with the actual code blocks
  codeBlocks.forEach((code, index) => {
    const placeholder = `{{CODE_BLOCK_${index}}}`
    value = value.replace(
      new RegExp(placeholder, 'g'),
      `<pre><code>${code}</code></pre>`,
    )
  })

  return value
}

export const formatNumber = (num) => {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(1) + 'B'
  } else if (num >= 1e6) {
    return (num / 1e6).toFixed(1) + 'M'
  } else if (num >= 1e3) {
    return (num / 1e3).toFixed(1) + 'K'
  } else {
    return num.toString()
  }
}

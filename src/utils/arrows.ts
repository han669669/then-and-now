export function drawModernArrow(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  color: string
) {
  const circleRadius = size * 0.7;
  const arrowWidth = size * 0.65; // Shortened overall width
  const arrowHeight = size * 0.55;
  const shaftWidth = arrowHeight * 0.45;
  const headWidth = arrowHeight * 0.85;
  const headLength = arrowWidth * 0.4;
  const borderWidth = Math.max(2, size * 0.03);

  // Draw circle background
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, circleRadius, 0, Math.PI * 2);
  ctx.fill();

  // Add circle border
  const borderColor = color === '#000000' ? '#ffffff' : '#000000';
  ctx.strokeStyle = borderColor;
  ctx.lineWidth = borderWidth;
  ctx.stroke();

  // Draw arrow inside circle with black border
  const arrowColor = color === '#ffffff' ? '#000000' : '#ffffff';
  
  // Create arrow path with shortened tail
  ctx.beginPath();
  // Left side of shaft (shortened tail)
  ctx.moveTo(x - arrowWidth * 0.35, y - shaftWidth / 2); // Shortened from 0.5
  ctx.lineTo(x + arrowWidth / 2 - headLength, y - shaftWidth / 2);
  // Top of arrow head
  ctx.lineTo(x + arrowWidth / 2 - headLength, y - headWidth / 2);
  // Arrow point
  ctx.lineTo(x + arrowWidth / 2, y);
  // Bottom of arrow head
  ctx.lineTo(x + arrowWidth / 2 - headLength, y + headWidth / 2);
  ctx.lineTo(x + arrowWidth / 2 - headLength, y + shaftWidth / 2);
  // Bottom of shaft (shortened tail)
  ctx.lineTo(x - arrowWidth * 0.35, y + shaftWidth / 2); // Shortened from 0.5
  ctx.closePath();
  
  // Draw black border on arrow
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = Math.max(2, borderWidth * 1.2); // Thickened border
  ctx.lineJoin = 'miter';
  ctx.lineCap = 'square';
  ctx.stroke();
  
  // Fill arrow
  ctx.fillStyle = arrowColor;
  ctx.fill();
}

export function drawClassicArrow(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  color: string
) {
  const arrowWidth = size * 1.4;
  const arrowHeight = size * 0.8;
  const shaftWidth = arrowHeight * 0.4;
  const headWidth = arrowHeight;
  const headLength = arrowWidth * 0.4;
  const borderWidth = Math.max(3, size * 0.05);

  // Determine border color: white/red gets black borders, black gets white borders
  const borderColor = color === '#000000' ? '#ffffff' : '#000000';
  
  // Create arrow path
  ctx.beginPath();
  // Left side of shaft
  ctx.moveTo(x - arrowWidth / 2, y - shaftWidth / 2);
  ctx.lineTo(x + arrowWidth / 2 - headLength, y - shaftWidth / 2);
  // Top of arrow head
  ctx.lineTo(x + arrowWidth / 2 - headLength, y - headWidth / 2);
  // Arrow point
  ctx.lineTo(x + arrowWidth / 2, y);
  // Bottom of arrow head
  ctx.lineTo(x + arrowWidth / 2 - headLength, y + headWidth / 2);
  ctx.lineTo(x + arrowWidth / 2 - headLength, y + shaftWidth / 2);
  // Bottom of shaft
  ctx.lineTo(x - arrowWidth / 2, y + shaftWidth / 2);
  ctx.closePath();
  
  // Draw border (stroke first)
  ctx.strokeStyle = borderColor;
  ctx.lineWidth = borderWidth;
  ctx.lineJoin = 'miter';
  ctx.lineCap = 'square';
  ctx.stroke();
  
  // Fill arrow
  ctx.fillStyle = color;
  ctx.fill();
}

export function drawMinimalArrow(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  color: string
) {
  const chevronWidth = size * 0.35;
  const chevronHeight = size * 0.6;
  const spacing = chevronWidth * 0.9;
  const strokeWidth = Math.max(6, size * 0.08); // Increased thickness

  // Draw three chevrons with white outlines (like in the image)
  for (let i = 0; i < 3; i++) {
    const offsetX = (i - 1) * spacing;
    
    // Draw white outline first (thicker)
    ctx.strokeStyle = color === '#000000' ? '#ffffff' : '#000000';
    ctx.lineWidth = strokeWidth + 3; // Increased outline thickness
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    ctx.beginPath();
    ctx.moveTo(x + offsetX - chevronWidth / 2, y - chevronHeight / 2);
    ctx.lineTo(x + offsetX + chevronWidth / 2, y);
    ctx.lineTo(x + offsetX - chevronWidth / 2, y + chevronHeight / 2);
    ctx.stroke();
    
    // Draw main color on top (thicker)
    ctx.strokeStyle = color;
    ctx.lineWidth = strokeWidth;
    
    ctx.beginPath();
    ctx.moveTo(x + offsetX - chevronWidth / 2, y - chevronHeight / 2);
    ctx.lineTo(x + offsetX + chevronWidth / 2, y);
    ctx.lineTo(x + offsetX - chevronWidth / 2, y + chevronHeight / 2);
    ctx.stroke();
  }
}

export function drawArrow(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  style: string,
  color: string
) {
  switch (style) {
    case 'modern':
      drawModernArrow(ctx, x, y, size, color);
      break;
    case 'classic':
      drawClassicArrow(ctx, x, y, size, color);
      break;
    case 'minimal':
      drawMinimalArrow(ctx, x, y, size, color);
      break;
    case 'none':
      // Don't draw anything for "none" option
      break;
  }
}

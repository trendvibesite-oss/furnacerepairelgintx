import os
from PIL import Image, ImageDraw, ImageFilter

def create_hvac_icon(size):
    # Render at 4x super-sampling for ultra crisp, anti-aliased edges
    scale = 4
    w = size * scale
    h = size * scale
    
    # 1. Base Image with transparency
    img = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Corner radius & badge margins
    margin = int(0.04 * w)
    radius = int(0.22 * w)
    
    # Background Navy Gradient
    # Draw rounded rectangle badge
    badge_box = [margin, margin, w - margin, h - margin]
    
    # Create mask for gradient filling
    mask = Image.new('L', (w, h), 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.rounded_rectangle(badge_box, radius=radius, fill=255)
    
    # Gradient badge from top-left #08182b to bottom-right #18416d
    grad = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    grad_draw = ImageDraw.Draw(grad)
    for y in range(h):
        t = y / h
        # Linear blend between #08182b (8, 24, 43) and #18416d (24, 65, 109)
        r = int(8 + (24 - 8) * t)
        g = int(24 + (65 - 24) * t)
        b = int(43 + (109 - 43) * t)
        grad_draw.line([(0, y), (w, y)], fill=(r, g, b, 255))
    
    img.paste(grad, (0, 0), mask)
    
    # Draw Border Stroke (Gradient from Flame Orange to Cool Cyan)
    border_width = max(2, int(0.025 * w))
    draw.rounded_rectangle(badge_box, radius=radius, outline=(230, 81, 0, 255), width=border_width)
    
    # Center coordinates
    cx = w * 0.5
    cy = h * 0.52
    
    # 2. LEFT: Heating Flame
    # Draw outer flame in rich warm orange-red
    flame_pts = [
        (cx - 0.02 * w, cy - 0.34 * h),  # Tip
        (cx - 0.12 * w, cy - 0.20 * h),
        (cx - 0.22 * w, cy - 0.05 * h),
        (cx - 0.26 * w, cy + 0.12 * h),
        (cx - 0.20 * w, cy + 0.28 * h),
        (cx - 0.04 * w, cy + 0.34 * h),  # Bottom
        (cx - 0.02 * w, cy + 0.24 * h),  # Inner indent
        (cx - 0.12 * w, cy + 0.12 * h),
        (cx - 0.08 * w, cy - 0.05 * h),
        (cx - 0.02 * w, cy - 0.18 * h),
    ]
    draw.polygon(flame_pts, fill=(230, 81, 0, 255))
    
    # Inner bright flame core (Yellow/Gold)
    core_pts = [
        (cx - 0.02 * w, cy - 0.12 * h),
        (cx - 0.08 * w, cy - 0.02 * h),
        (cx - 0.15 * w, cy + 0.10 * h),
        (cx - 0.12 * w, cy + 0.22 * h),
        (cx - 0.03 * w, cy + 0.25 * h),
        (cx - 0.02 * w, cy + 0.15 * h),
        (cx - 0.06 * w, cy + 0.08 * h),
        (cx - 0.02 * w, cy + 0.00 * h),
    ]
    draw.polygon(core_pts, fill=(255, 183, 77, 255))
    
    # White-hot center highlight
    white_core = [
        (cx - 0.02 * w, cy + 0.04 * h),
        (cx - 0.06 * w, cy + 0.12 * h),
        (cx - 0.03 * w, cy + 0.18 * h),
        (cx - 0.02 * w, cy + 0.10 * h),
    ]
    draw.polygon(white_core, fill=(255, 255, 255, 240))
    
    # 3. RIGHT: Cooling Snowflake
    snow_col = (56, 189, 248, 255) # Cyan
    snow_thick = max(2, int(0.035 * w))
    
    # Central vertical stem
    sx = cx + 0.02 * w
    draw.line([(sx, cy - 0.32 * h), (sx, cy + 0.32 * h)], fill=snow_col, width=snow_thick)
    
    # Top & Bottom arrowheads
    draw.line([(sx, cy - 0.32 * h), (sx + 0.06 * w, cy - 0.26 * h)], fill=snow_col, width=snow_thick)
    draw.line([(sx, cy + 0.32 * h), (sx + 0.06 * w, cy + 0.26 * h)], fill=snow_col, width=snow_thick)
    
    # Horizontal right arm
    draw.line([(sx, cy), (sx + 0.32 * w, cy)], fill=snow_col, width=snow_thick)
    draw.line([(sx + 0.20 * w, cy), (sx + 0.14 * w, cy - 0.07 * h)], fill=snow_col, width=snow_thick)
    draw.line([(sx + 0.20 * w, cy), (sx + 0.14 * w, cy + 0.07 * h)], fill=snow_col, width=snow_thick)
    draw.line([(sx + 0.32 * w, cy), (sx + 0.26 * w, cy - 0.06 * h)], fill=snow_col, width=snow_thick)
    draw.line([(sx + 0.32 * w, cy), (sx + 0.26 * w, cy + 0.06 * h)], fill=snow_col, width=snow_thick)
    
    # Upper diagonal arm (+45 deg)
    ux2 = sx + 0.23 * w
    uy2 = cy - 0.23 * h
    draw.line([(sx, cy), (ux2, uy2)], fill=snow_col, width=snow_thick)
    draw.line([(sx + 0.14 * w, cy - 0.14 * h), (sx + 0.16 * w, cy - 0.06 * h)], fill=snow_col, width=snow_thick)
    draw.line([(sx + 0.14 * w, cy - 0.14 * h), (sx + 0.06 * w, cy - 0.16 * h)], fill=snow_col, width=snow_thick)
    draw.line([(ux2, uy2), (ux2 - 0.01 * w, uy2 + 0.06 * h)], fill=snow_col, width=snow_thick)
    draw.line([(ux2, uy2), (ux2 - 0.06 * w, uy2 + 0.01 * h)], fill=snow_col, width=snow_thick)
    
    # Lower diagonal arm (-45 deg)
    lx2 = sx + 0.23 * w
    ly2 = cy + 0.23 * h
    draw.line([(sx, cy), (lx2, ly2)], fill=snow_col, width=snow_thick)
    draw.line([(sx + 0.14 * w, cy + 0.14 * h), (sx + 0.16 * w, cy + 0.06 * h)], fill=snow_col, width=snow_thick)
    draw.line([(sx + 0.14 * w, cy + 0.14 * h), (sx + 0.06 * w, cy + 0.16 * h)], fill=snow_col, width=snow_thick)
    draw.line([(lx2, ly2), (lx2 - 0.01 * w, ly2 - 0.06 * h)], fill=snow_col, width=snow_thick)
    draw.line([(lx2, ly2), (lx2 - 0.06 * w, ly2 - 0.01 * h)], fill=snow_col, width=snow_thick)
    
    # 4. Center Spark
    spark_r = int(0.03 * w)
    draw.ellipse([cx - spark_r, cy - spark_r, cx + spark_r, cy + spark_r], fill=(255, 255, 255, 255))
    
    # Downsample with high-quality Lanczos resampling
    final_img = img.resize((size, size), Image.Resampling.LANCZOS)
    return final_img

# Generate icons
dist_dir = './dist'
assets_dir = './assets/images'
os.makedirs(dist_dir, exist_ok=True)
os.makedirs(assets_dir, exist_ok=True)

# Generate PNGs
sizes = [16, 32, 48, 180, 192, 512]
imgs = {}
for s in sizes:
    icon = create_hvac_icon(s)
    imgs[s] = icon
    if s == 16:
        icon.save(os.path.join(dist_dir, 'favicon-16x16.png'))
    elif s == 32:
        icon.save(os.path.join(dist_dir, 'favicon-32x32.png'))
    elif s == 180:
        icon.save(os.path.join(dist_dir, 'apple-touch-icon.png'))
        icon.save(os.path.join(assets_dir, 'apple-touch-icon.png'))
    elif s == 192:
        icon.save(os.path.join(dist_dir, 'icon-192.png'))
        icon.save(os.path.join(assets_dir, 'icon-192.png'))
    elif s == 512:
        icon.save(os.path.join(dist_dir, 'icon-512.png'))
        icon.save(os.path.join(assets_dir, 'icon-512.png'))

# Generate multi-size favicon.ico (16, 32, 48)
ico_16 = imgs[16]
ico_16.save(
    os.path.join(dist_dir, 'favicon.ico'),
    format='ICO',
    sizes=[(16, 16), (32, 32), (48, 48)]
)
ico_16.save(
    os.path.join(assets_dir, 'favicon.ico'),
    format='ICO',
    sizes=[(16, 16), (32, 32), (48, 48)]
)

print('PNG and ICO files created successfully.')

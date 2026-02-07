# Shell Specification — LinKreator

## Layout

- **Pattern**: Fixed sidebar (left) + scrollable content area (right)
- **Sidebar width**: 256px (`w-64`)
- **Content area**: Fills remaining width
- **Height**: Full viewport (`h-screen`)

## Sidebar

### Logo
- "LinKreator" text at top of sidebar, styled with Space Grotesk font
- Blue-600 accent color

### Navigation Items

| Order | Label             | Icon (lucide-react) | Route               |
|-------|-------------------|---------------------|----------------------|
| 1     | Content Creator   | PenLine             | /content-creator     |
| 2     | Carousel Builder  | Layers              | /carousel-builder    |
| 3     | Image Generator   | ImagePlus           | /image-generator     |
| 4     | Brand & Avatar    | UserCircle          | /brand-avatar        |
| 5     | Content Calendar  | CalendarDays        | /content-calendar    |
| 6     | Content Sources   | Bookmark            | /content-sources     |

### Navigation States
- **Default**: slate-700 text / slate-300 dark text
- **Hover**: slate-50 bg / slate-800 dark bg
- **Active**: blue-50 bg / blue-900 dark bg, blue-600 text

### User Menu
- Positioned at bottom of sidebar
- Shows avatar circle (image or initials fallback)
- User name displayed next to avatar
- Logout action

## Responsive Behavior

- **Desktop (md+)**: Sidebar visible, fixed position
- **Mobile (<md)**: Sidebar hidden, hamburger menu icon in top bar toggles sidebar as overlay

## Design Tokens

- **Primary**: blue
- **Secondary**: amber
- **Neutral**: slate
- **Heading font**: Space Grotesk
- **Body font**: Inter
- **Mono font**: JetBrains Mono

## Dark Mode

All elements support `dark:` variants. Sidebar background:
- Light: white (`bg-white`)
- Dark: slate-900 (`dark:bg-slate-900`)

Content area background:
- Light: slate-50
- Dark: slate-950
